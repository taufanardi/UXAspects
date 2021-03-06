import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ContentChild, EventEmitter, Input, OnDestroy, Output, TemplateRef } from '@angular/core';
import { filter } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { ReorderEvent } from '../../directives/reorderable/index';
import { FacetClearButtonDirective } from './facet-clear-button/facet-clear-button.directive';
import { FacetDeselect, FacetEvent } from './facet-events';
import { FacetService } from './facet.service';
import { Facet } from './models/facet';

@Component({
    selector: 'ux-facet-container',
    templateUrl: './facet-container.component.html',
    providers: [FacetService]
})
export class FacetContainerComponent implements OnDestroy {

    @Input() header: string = 'Selected';
    @Input() clearTooltip: string = 'Clear All';
    @Input() emptyText: string = 'No Items';
    @Input() facetsReorderable: boolean = false;

    @Input() set facets(facets: Facet[]) {
        this.facetService.facets$.next(facets);
    }

    get facets(): Facet[] {
        return this.facetService.facets$.value;
    }

    @Output() facetsChange: EventEmitter<Facet[]> = new EventEmitter<Facet[]>();
    @Output() events: EventEmitter<FacetEvent> = new EventEmitter<FacetEvent>();

    /** Allow a custom clear button */
    @ContentChild(FacetClearButtonDirective, { read: TemplateRef }) clearButton: TemplateRef<FacetClearButtonDirective>;

    private _onDestroy = new Subject<void>();

    constructor(private _announcer: LiveAnnouncer, public facetService: FacetService) {
        facetService.facets$.subscribe(facets => this.facetsChange.next(facets));
        facetService.events$.subscribe(event => this.triggerEvent(event));

        // announce deselection
        facetService.events$.pipe(filter<FacetDeselect>(event => event instanceof FacetDeselect))
            .subscribe(event => this._announcer.announce(`Option ${event.facet.title} deselected.`, 'assertive'));
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    selectFacet(facet: Facet): void {
        this.facetService.select(facet);
    }

    deselectFacet(facet: Facet, tag?: HTMLElement): void {

        // find the index of the item in the selected array
        const idx = this.facets.findIndex(selectedFacet => facet === selectedFacet);

        // if match there was no match then finish
        if (idx === -1) {
            return;
        }

        // remove the last item
        this.facetService.deselect(facet);

        // announce the facet removal
        this._announcer.announce(`Option ${facet.title} deselected.`, 'assertive');

        // focus another tag if there is one
        if (tag) {
            const sibling = tag.previousElementSibling || tag.nextElementSibling;

            // if there is a sibling then focus it
            if (sibling) {
                (sibling as HTMLElement).focus();
            }
        }
    }

    deselectAllFacets(): void {

        // empty the selected array
        this.facetService.deselectAll();

        // announce the facet removal
        this._announcer.announce(`All options deselected.`, 'assertive');
    }

    trackBy(_index: number, facet: Facet): string | number {
        return facet.id || facet.title;
    }

    shiftRight(facet: Facet, element: HTMLElement): void {
        // only move the item if reordering is allowed
        if (this.facetsReorderable === false) {
            return;
        }

        // perform the movement
        this.shiftFacet(facet, 1);

        // the item may become unfocused during the reorder so we should refocus it
        requestAnimationFrame(() => element.focus());

        // announce the move
        this._announcer.announce(`Option ${facet.title} moved down.`);
    }

    shiftLeft(facet: Facet, element: HTMLElement): void {
        // only move the item if reordering is allowed
        if (this.facetsReorderable === false) {
            return;
        }

        // perform the movement
        this.shiftFacet(facet, -1);

        // the item may become unfocused during the reorder so we should refocus it
        requestAnimationFrame(() => element.focus());

        // announce the move
        this._announcer.announce(`Option ${facet.title} moved up.`);
    }

    private shiftFacet(facet: Facet, distance: number) {
        const index = this.facets.indexOf(facet);
        const target = index + distance;

        // Ensure the move is valid
        if (target < 0 || target === this.facets.length) {
            return;
        }

        // Perform the move
        this.facets.splice(index, 1);
        this.facets.splice(target, 0, facet);
    }

    private triggerEvent(event: FacetEvent) {
        this.events.next(event);
    }
}

export interface FacetReorderEvent extends ReorderEvent {
    index: number;
}