import { Component, Input, NgModule, Injectable, NgZone, RendererFactory2, Directive, ElementRef, EventEmitter, Output, ChangeDetectionStrategy, ContentChild, TemplateRef, HostBinding, ViewChild, forwardRef, QueryList, ContentChildren, ViewEncapsulation, Pipe, Host, ChangeDetectorRef, Renderer2, ViewContainerRef, HostListener, Attribute, ViewChildren, Optional, SkipSelf, Inject, ComponentFactoryResolver, Injector } from '@angular/core';
import { CommonModule, DOCUMENT as DOCUMENT$1 } from '@angular/common';
import { RouterModule, ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { debounceTime, filter, map, delay, distinctUntilChanged, takeUntil, first, auditTime, combineLatest as combineLatest$1, switchMap } from 'rxjs/operators';
import { __read, __extends, __spread, __assign, __values } from 'tslib';
import { NG_VALUE_ACCESSOR, FormsModule, NG_VALIDATORS, NgModel } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs/observable/from';
import { of } from 'rxjs/observable/of';
import { Overlay, ScrollDispatcher, OverlayModule } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ObserversModule } from '@angular/cdk/observers';
import * as dragulaNamespace from 'dragula';
import dragulaNamespace__default, {  } from 'dragula';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { BsDropdownDirective, BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { animate, query, stagger, style, transition, trigger, state } from '@angular/animations';
import { TooltipDirective } from 'ngx-bootstrap/tooltip';
import { ESCAPE } from '@angular/cdk/keycodes';
import { map as map$1 } from 'rxjs/operators/map';
import { DOCUMENT } from '@angular/platform-browser';
import { Http, ResponseContentType, HttpModule } from '@angular/http';
import { concat } from 'rxjs/observable/concat';
import { timer } from 'rxjs/observable/timer';
import { UpgradeComponent } from '@angular/upgrade/static';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var BreadcrumbsComponent = (function () {
    function BreadcrumbsComponent() {
    }
    /**
     * @param {?} event
     * @param {?} crumb
     * @return {?}
     */
    BreadcrumbsComponent.prototype.clickCrumb = /**
     * @param {?} event
     * @param {?} crumb
     * @return {?}
     */
    function (event, crumb) {
        if (crumb.onClick) {
            crumb.onClick.call(null, event);
        }
    };
    BreadcrumbsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-breadcrumbs',
                    template: "<nav aria-label=\"Breadcrumb\">\n    <ol class=\"breadcrumb\">\n        <li *ngFor=\"let crumb of crumbs\">\n\n            <!-- If there is a router link then use a tag -->\n            <a *ngIf=\"crumb.routerLink || crumb.onClick\"\n                tabindex=\"0\"\n                [routerLink]=\"crumb.routerLink\"\n                [fragment]=\"crumb.fragment\"\n                [queryParams]=\"crumb.queryParams\"\n                (click)=\"clickCrumb($event, crumb)\">\n                {{ crumb.title }}\n            </a>\n\n            <!-- If there is not router link then display text in a span -->\n            <span *ngIf=\"!crumb.routerLink && !crumb.onClick\">{{ crumb.title }}</span>\n        </li>\n    </ol>\n</nav>"
                },] },
    ];
    /** @nocollapse */
    BreadcrumbsComponent.propDecorators = {
        "crumbs": [{ type: Input },],
    };
    return BreadcrumbsComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var BreadcrumbsModule = (function () {
    function BreadcrumbsModule() {
    }
    BreadcrumbsModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        RouterModule
                    ],
                    exports: [BreadcrumbsComponent],
                    declarations: [BreadcrumbsComponent]
                },] },
    ];
    return BreadcrumbsModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ResizeService = (function () {
    function ResizeService(rendererFactory, _ngZone) {
        this._ngZone = _ngZone;
        this._subscription = new Subscription();
        this._renderer = rendererFactory.createRenderer(null, null);
    }
    /**
     * @return {?}
     */
    ResizeService.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._subscription.unsubscribe();
    };
    /**
     * @param {?} nativeElement
     * @return {?}
     */
    ResizeService.prototype.addResizeListener = /**
     * @param {?} nativeElement
     * @return {?}
     */
    function (nativeElement) {
        var _this = this;
        // create a behavior subject subject
        var /** @type {?} */ subject = new BehaviorSubject({ width: nativeElement.offsetWidth, height: nativeElement.offsetHeight });
        // determine the style of the element
        var /** @type {?} */ displayMode = window.getComputedStyle(nativeElement).getPropertyValue('display');
        // create the iframe element
        var /** @type {?} */ iframe = this._renderer.createElement('iframe');
        // style the iframe to be invisible but fill containing element
        this._renderer.setStyle(iframe, 'position', 'absolute');
        this._renderer.setStyle(iframe, 'width', '100%');
        this._renderer.setStyle(iframe, 'height', '100%');
        this._renderer.setStyle(iframe, 'top', '0');
        this._renderer.setStyle(iframe, 'right', '0');
        this._renderer.setStyle(iframe, 'bottom', '0');
        this._renderer.setStyle(iframe, 'left', '0');
        this._renderer.setStyle(iframe, 'z-index', '-1');
        this._renderer.setStyle(iframe, 'opacity', '0');
        this._renderer.setStyle(iframe, 'border', 'none');
        this._renderer.setStyle(iframe, 'margin', '0');
        this._renderer.setStyle(iframe, 'pointer-events', 'none');
        this._renderer.setStyle(iframe, 'overflow', 'hidden');
        // ensure the iframe ignores any tabbing
        this._renderer.setAttribute(iframe, 'tabindex', '-1');
        // statically positioned elements need changed to relative for this method to work
        if (displayMode !== 'relative' && displayMode !== 'absolute' && displayMode !== 'fixed') {
            this._renderer.setStyle(nativeElement, 'position', 'relative');
        }
        // add the iframe to the container element
        this._renderer.appendChild(nativeElement, iframe);
        this.waitUntilReady(iframe, function () {
            var /** @type {?} */ iframeDoc = iframe.contentDocument || /** @type {?} */ (iframe.contentWindow.document);
            var /** @type {?} */ attachListener = function () {
                // watch for any future resizes - run inside ngzone as an iframe event listener is not patched
                // watch for any future resizes - run inside ngzone as an iframe event listener is not patched
                _this._subscription.add(fromEvent(iframe.contentWindow, 'resize').subscribe(function (event) {
                    return _this._ngZone.run(function () { return subject.next({ width: nativeElement.offsetWidth, height: nativeElement.offsetHeight }); });
                }));
            };
            if (iframeDoc.readyState === 'complete') {
                attachListener();
            }
            else {
                // wait for iframe to load
                iframe.addEventListener('load', function () { return attachListener(); });
            }
        });
        return subject;
    };
    /**
     * @param {?} iframe
     * @param {?} callback
     * @return {?}
     */
    ResizeService.prototype.waitUntilReady = /**
     * @param {?} iframe
     * @param {?} callback
     * @return {?}
     */
    function (iframe, callback) {
        var _this = this;
        if (iframe.contentDocument || iframe.contentWindow) {
            callback.call(this);
        }
        else {
            setTimeout(function () { return _this.waitUntilReady(iframe, callback); });
        }
    };
    ResizeService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ResizeService.ctorParameters = function () { return [
        { type: RendererFactory2, },
        { type: NgZone, },
    ]; };
    return ResizeService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ResizeDirective = (function () {
    function ResizeDirective(_elementRef, _resizeService, _ngZone) {
        this._elementRef = _elementRef;
        this._resizeService = _resizeService;
        this._ngZone = _ngZone;
        this.throttle = 0;
        this.uxResize = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ResizeDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._subscription = this._resizeService.addResizeListener(this._elementRef.nativeElement)
            .pipe(debounceTime(this.throttle))
            .subscribe(function (event) { return _this._ngZone.run(function () { return _this.uxResize.emit(event); }); });
    };
    /**
     * @return {?}
     */
    ResizeDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._subscription.unsubscribe();
    };
    ResizeDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxResize]',
                    providers: [ResizeService]
                },] },
    ];
    /** @nocollapse */
    ResizeDirective.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: ResizeService, },
        { type: NgZone, },
    ]; };
    ResizeDirective.propDecorators = {
        "throttle": [{ type: Input },],
        "uxResize": [{ type: Output },],
    };
    return ResizeDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ResizeModule = (function () {
    function ResizeModule() {
    }
    ResizeModule.decorators = [
        { type: NgModule, args: [{
                    exports: [ResizeDirective],
                    declarations: [ResizeDirective],
                    providers: [ResizeService]
                },] },
    ];
    return ResizeModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var CardTabContentDirective = (function () {
    function CardTabContentDirective() {
    }
    CardTabContentDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxCardTabContent]'
                },] },
    ];
    return CardTabContentDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var CardTabsService = (function () {
    function CardTabsService() {
        var _this = this;
        this.tab$ = new BehaviorSubject(null);
        this.tabs$ = new BehaviorSubject([]);
        this.position$ = new BehaviorSubject('top');
        // when a tab is added or removed ensure we always select one if any are available
        this._subscription = this.tabs$.pipe(filter(function (tabs) { return !_this.tab$.value || !tabs.find(function (tab) { return tab === _this.tab$.value; }); })).subscribe(function (tabs) { return _this.tab$.next(tabs.length > 0 ? tabs[0] : null); });
    }
    /**
     * @return {?}
     */
    CardTabsService.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._subscription.unsubscribe();
    };
    /**
     * Add a tab to the list of tabs
     */
    /**
     * Add a tab to the list of tabs
     * @param {?} tab
     * @return {?}
     */
    CardTabsService.prototype.addTab = /**
     * Add a tab to the list of tabs
     * @param {?} tab
     * @return {?}
     */
    function (tab) {
        this.tabs$.next(__spread(this.tabs$.value, [tab]));
    };
    /**
     * Remove a tab from the list
     */
    /**
     * Remove a tab from the list
     * @param {?} tab
     * @return {?}
     */
    CardTabsService.prototype.removeTab = /**
     * Remove a tab from the list
     * @param {?} tab
     * @return {?}
     */
    function (tab) {
        this.tabs$.next(this.tabs$.value.filter(function (_tab) { return _tab !== tab; }));
    };
    /**
     * Select the tab
     */
    /**
     * Select the tab
     * @param {?} tab
     * @return {?}
     */
    CardTabsService.prototype.select = /**
     * Select the tab
     * @param {?} tab
     * @return {?}
     */
    function (tab) {
        this.tab$.next(tab);
    };
    /**
     * Set the position of the tab content
     */
    /**
     * Set the position of the tab content
     * @param {?} position
     * @return {?}
     */
    CardTabsService.prototype.setPosition = /**
     * Set the position of the tab content
     * @param {?} position
     * @return {?}
     */
    function (position) {
        this.position$.next(position);
    };
    CardTabsService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    CardTabsService.ctorParameters = function () { return []; };
    return CardTabsService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var CardTabComponent = (function () {
    function CardTabComponent(_tabService) {
        var _this = this;
        this._tabService = _tabService;
        this.active$ = this._tabService.tab$.pipe(map(function (tab) { return tab === _this; }));
        this._tabService.addTab(this);
    }
    /**
     * @return {?}
     */
    CardTabComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._tabService.removeTab(this);
    };
    CardTabComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-card-tab',
                    template: "<ng-content *ngIf=\"active$ | async\"></ng-content>",
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    CardTabComponent.ctorParameters = function () { return [
        { type: CardTabsService, },
    ]; };
    CardTabComponent.propDecorators = {
        "content": [{ type: ContentChild, args: [CardTabContentDirective, { read: TemplateRef },] },],
    };
    return CardTabComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var CardTabsetComponent = (function () {
    function CardTabsetComponent(tabService) {
        this.tabService = tabService;
        this.offset = 0;
        this.bounds = { lower: 0, upper: 0 };
    }
    Object.defineProperty(CardTabsetComponent.prototype, "position", {
        get: /**
         * @return {?}
         */
        function () {
            return this.tabService.position$.getValue();
        },
        set: /**
         * @param {?} direction
         * @return {?}
         */
        function (direction) {
            this.tabService.setPosition(direction);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} tab
     * @param {?} element
     * @return {?}
     */
    CardTabsetComponent.prototype.select = /**
     * @param {?} tab
     * @param {?} element
     * @return {?}
     */
    function (tab, element) {
        // select the tab
        this.tabService.select(tab);
        // ensure the tab is moved into view if required
        this.moveIntoView(element);
    };
    /**
     * @param {?} dimensions
     * @return {?}
     */
    CardTabsetComponent.prototype.resize = /**
     * @param {?} dimensions
     * @return {?}
     */
    function (dimensions) {
        this._width = dimensions.width;
        this._innerWidth = this.tablist.nativeElement.scrollWidth;
        this.bounds.lower = 0;
        this.bounds.upper = -(this._innerWidth - this._width);
    };
    /**
     * @return {?}
     */
    CardTabsetComponent.prototype.previous = /**
     * @return {?}
     */
    function () {
        this.offset += this._width;
        // ensure it remains within the allowed bounds
        this.offset = Math.min(this.offset, this.bounds.lower);
    };
    /**
     * @return {?}
     */
    CardTabsetComponent.prototype.next = /**
     * @return {?}
     */
    function () {
        this.offset -= this._width;
        // ensure it remains within the allowed bounds
        this.offset = Math.max(this.offset, this.bounds.upper);
    };
    /**
     * @param {?} element
     * @return {?}
     */
    CardTabsetComponent.prototype.moveIntoView = /**
     * @param {?} element
     * @return {?}
     */
    function (element) {
        // if we dont have the dimensions we cant check
        if (!this._width || !this._innerWidth) {
            return;
        }
        // get the current element bounds
        var offsetLeft = element.offsetLeft, offsetWidth = element.offsetWidth;
        var _a = getComputedStyle(element), marginLeft = _a.marginLeft, marginRight = _a.marginRight;
        // calculate the visible area
        var /** @type {?} */ viewportStart = Math.abs(this.offset);
        var /** @type {?} */ viewportEnd = viewportStart + this._width;
        var /** @type {?} */ cardWidth = parseFloat(marginLeft) + offsetWidth + parseFloat(marginRight);
        // if we need to move to the left - figure out how much
        if (offsetLeft < viewportStart) {
            this.offset -= (offsetLeft - parseFloat(marginLeft)) - viewportStart;
        }
        // if we need to move to the right - figure out how much
        if ((offsetLeft + cardWidth) > viewportEnd) {
            this.offset -= (offsetLeft + cardWidth) - viewportEnd;
        }
    };
    CardTabsetComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-card-tabset',
                    template: "<div class=\"card-tab-content\" role=\"tabpanel\" *ngIf=\"(tabService.tab$ | async)\">\n    <ng-content></ng-content>\n</div>\n\n<div class=\"card-tabs\" #tabs>\n\n    <button class=\"card-tabs-paging-btn card-tabs-paging-btn-previous\" aria-label=\"Previous Tabs\" (click)=\"previous()\" *ngIf=\"offset < bounds.lower\">\n        <i class=\"hpe-icon hpe-previous\"></i>\n    </button>\n\n    <div class=\"card-tabs-list\" role=\"tablist\" #tablist (uxResize)=\"resize($event)\" [style.transform]=\"'translateX(' + offset + 'px)'\">\n\n        <div class=\"card-tab\"\n            role=\"tab\"\n            tabindex=\"0\" #card\n            *ngFor=\"let tab of tabService.tabs$ | async\"\n            [ngClass]=\"tabService.position$ | async\"\n            [class.active]=\"tab.active$ | async\"\n            [attr.aria-selected]=\"tab.active$ | async\"\n            (click)=\"select(tab, card)\"\n            (focus)=\"tabs.scrollLeft = 0\"\n            (keydown.enter)=\"select(tab, card)\">\n\n            <ng-container [ngTemplateOutlet]=\"tab.content\"></ng-container>\n        </div>\n\n    </div>\n\n    <button class=\"card-tabs-paging-btn card-tabs-paging-btn-next\" aria-label=\"Next Tabs\" (click)=\"next()\" *ngIf=\"offset > bounds.upper\">\n        <i class=\"hpe-icon hpe-next\"></i>\n    </button>\n</div>",
                    providers: [CardTabsService]
                },] },
    ];
    /** @nocollapse */
    CardTabsetComponent.ctorParameters = function () { return [
        { type: CardTabsService, },
    ]; };
    CardTabsetComponent.propDecorators = {
        "position": [{ type: HostBinding, args: ['class',] }, { type: Input },],
        "tablist": [{ type: ViewChild, args: ['tablist',] },],
    };
    return CardTabsetComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var CardTabsModule = (function () {
    function CardTabsModule() {
    }
    CardTabsModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        ResizeModule
                    ],
                    declarations: [CardTabsetComponent, CardTabComponent, CardTabContentDirective],
                    exports: [CardTabsetComponent, CardTabComponent, CardTabContentDirective]
                },] },
    ];
    return CardTabsModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ CHECKBOX_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return CheckboxComponent; }),
    multi: true
};
var /** @type {?} */ uniqueCheckboxId = 0;
var CheckboxComponent = (function () {
    function CheckboxComponent() {
        this._checkboxId = "ux-checkbox-" + ++uniqueCheckboxId;
        this.id = this._checkboxId;
        this.tabindex = 0;
        this.clickable = true;
        this.simplified = false;
        this.indeterminateValue = -1;
        this.disabled = false;
        this.ariaLabel = '';
        this.ariaLabelledby = null;
        this.valueChange = new EventEmitter();
        this._value = false;
        this.indeterminate = false;
        this.focused = false;
        this.onTouchedCallback = function () { };
        this.onChangeCallback = function () { };
    }
    Object.defineProperty(CheckboxComponent.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () {
            return this._value;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._value = value;
            // determine if it is in the indeterminate state
            this.indeterminate = this._value === this.indeterminateValue;
            // determine the checked state
            this.ariaChecked = this.indeterminate ? 'mixed' : this._value;
            // invoke change event
            this.valueChange.emit(this._value);
            // call callback
            this.onChangeCallback(this._value);
            this.onTouchedCallback();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckboxComponent.prototype, "inputId", {
        get: /**
         * @return {?}
         */
        function () {
            return (this.id || this._checkboxId) + "-input";
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    CheckboxComponent.prototype.toggle = /**
     * @return {?}
     */
    function () {
        if (this.disabled || !this.clickable) {
            return;
        }
        if (this.value === this.indeterminateValue) {
            this.value = true;
            return;
        }
        // toggle the checked state
        this.value = !this.value;
    };
    // Functions required to update ngModel
    /**
     * @param {?} value
     * @return {?}
     */
    CheckboxComponent.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (value !== this._value) {
            this._value = value;
        }
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    CheckboxComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChangeCallback = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    CheckboxComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouchedCallback = fn;
    };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    CheckboxComponent.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
    };
    CheckboxComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-checkbox',
                    template: "<label [attr.for]=\"inputId\"\n       class=\"ux-checkbox\"\n       [class.ux-checkbox-checked]=\"value === true\"\n       [class.ux-checkbox-indeterminate]=\"indeterminate\"\n       [class.ux-checkbox-simplified]=\"simplified\"\n       [class.ux-checkbox-disabled]=\"disabled\"\n       [class.ux-checkbox-focused]=\"focused\">\n\n    <div class=\"ux-checkbox-container\">\n        <input type=\"checkbox\"\n               class=\"ux-checkbox-input\"\n               [id]=\"inputId\"\n               [required]=\"required\"\n               [checked]=\"value\"\n               [attr.value]=\"value\"\n               [disabled]=\"disabled\"\n               [attr.name]=\"name\"\n               [tabindex]=\"tabindex\"\n               [indeterminate]=\"indeterminate\"\n               [attr.aria-label]=\"ariaLabel\"\n               [attr.aria-labelledby]=\"ariaLabelledby\"\n               [attr.aria-checked]=\"ariaChecked\"\n               (focus)=\"focused = true\"\n               (blur)=\"focused = false\"\n               (change)=\"$event.stopPropagation()\"\n               (click)=\"toggle()\">\n    </div>\n\n    <span class=\"ux-checkbox-label\">\n        <ng-content></ng-content>\n    </span>\n</label>\n",
                    providers: [CHECKBOX_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    CheckboxComponent.propDecorators = {
        "id": [{ type: Input },],
        "name": [{ type: Input },],
        "required": [{ type: Input },],
        "tabindex": [{ type: Input },],
        "clickable": [{ type: Input },],
        "simplified": [{ type: Input },],
        "indeterminateValue": [{ type: Input },],
        "disabled": [{ type: Input },],
        "ariaLabel": [{ type: Input, args: ['aria-label',] },],
        "ariaLabelledby": [{ type: Input, args: ['aria-labelledby',] },],
        "valueChange": [{ type: Output },],
        "value": [{ type: Input },],
    };
    return CheckboxComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var CheckboxModule = (function () {
    function CheckboxModule() {
    }
    CheckboxModule.decorators = [
        { type: NgModule, args: [{
                    imports: [FormsModule],
                    exports: [CheckboxComponent],
                    declarations: [CheckboxComponent]
                },] },
    ];
    return CheckboxModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ColumnSortingComponent = (function () {
    function ColumnSortingComponent() {
        this.stateChange = new EventEmitter();
        this.columnSortingState = ColumnSortingState;
    }
    /**
     * @param {?} parent
     * @return {?}
     */
    ColumnSortingComponent.prototype.initParent = /**
     * @param {?} parent
     * @return {?}
     */
    function (parent) {
        var _this = this;
        this._parent = parent;
        // watch for any events
        this._parent.events.subscribe(function (event) {
            var /** @type {?} */ idx = event.findIndex(function (column) { return column.key === _this.key; });
            if (idx == -1) {
                _this.state = ColumnSortingState.NoSort;
            }
            // only store the number if we have 2 or more columns being sorted
            if (event.length > 1) {
                _this.orderNumber = idx === -1 ? null : idx + 1;
            }
            else {
                _this.orderNumber = null;
            }
            _this.stateChange.emit(_this.state);
        });
    };
    /**
     * @return {?}
     */
    ColumnSortingComponent.prototype.changeState = /**
     * @return {?}
     */
    function () {
        if (this.state === ColumnSortingState.Ascending) {
            this.state = ColumnSortingState.Descending;
        }
        else if (this.state === ColumnSortingState.Descending) {
            this.state = ColumnSortingState.NoSort;
        }
        else {
            this.state = ColumnSortingState.Ascending;
        }
        // inform parent
        return this._parent.toggleColumn(this.key, this.state);
    };
    ColumnSortingComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-column-sorting',
                    template: "<div class=\"ux-column-sorting\">\n    <i class=\"ux-column-sorting-icon hpe-icon\" \n        [class.hpe-ascend]=\"state === columnSortingState.Ascending\" \n        [class.hpe-descend]=\"state === columnSortingState.Descending\" \n        [class.column-sorting-icon-hidden]=\"state === columnSortingState.NoSort\"></i>\n    <p class=\"ux-column-sorting-number\">{{ orderNumber }}</p>\n</div>",
                    exportAs: 'ux-column-sorting'
                },] },
    ];
    /** @nocollapse */
    ColumnSortingComponent.propDecorators = {
        "state": [{ type: Input },],
        "key": [{ type: Input },],
        "orderNumber": [{ type: Input },],
        "stateChange": [{ type: Output },],
    };
    return ColumnSortingComponent;
}());
/** @enum {number} */
var ColumnSortingState = {
    Ascending: 0,
    Descending: 1,
    NoSort: 2,
};
ColumnSortingState[ColumnSortingState.Ascending] = "Ascending";
ColumnSortingState[ColumnSortingState.Descending] = "Descending";
ColumnSortingState[ColumnSortingState.NoSort] = "NoSort";

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ColumnSortingDirective = (function () {
    function ColumnSortingDirective() {
        this.events = new Subject();
        this.order = [];
    }
    /**
     * @return {?}
     */
    ColumnSortingDirective.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.components.forEach(function (component) { return component.initParent(_this); });
    };
    /**
     * @param {?} key
     * @param {?} state
     * @return {?}
     */
    ColumnSortingDirective.prototype.toggleColumn = /**
     * @param {?} key
     * @param {?} state
     * @return {?}
     */
    function (key, state$$1) {
        if (this.singleSort) {
            if (state$$1 === ColumnSortingState.NoSort) {
                this.order = [];
            }
            else {
                this.order = [{ key: key, state: state$$1 }];
            }
        }
        else {
            // reorder columns here
            var /** @type {?} */ idx = this.order.findIndex(function (column) { return column.key === key; });
            // if wasnt previously selected add to list
            if (idx === -1) {
                this.order.push({ key: key, state: state$$1 });
            }
            else if (state$$1 === ColumnSortingState.Ascending || state$$1 === ColumnSortingState.Descending) {
                this.order.splice(idx, 1);
                this.order.push({ key: key, state: state$$1 });
            }
            else {
                this.order.splice(idx, 1);
            }
        }
        this.events.next(this.order);
        // return the order
        return this.order;
    };
    ColumnSortingDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxColumnSorting]'
                },] },
    ];
    /** @nocollapse */
    ColumnSortingDirective.propDecorators = {
        "singleSort": [{ type: Input },],
        "components": [{ type: ContentChildren, args: [ColumnSortingComponent,] },],
    };
    return ColumnSortingDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ColumnSortingModule = (function () {
    function ColumnSortingModule() {
    }
    ColumnSortingModule.decorators = [
        { type: NgModule, args: [{
                    exports: [ColumnSortingComponent, ColumnSortingDirective],
                    declarations: [ColumnSortingComponent, ColumnSortingDirective]
                },] },
    ];
    return ColumnSortingModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DashboardService = (function () {
    function DashboardService() {
        var _this = this;
        this._rowHeight = 0;
        this.widgets$ = new BehaviorSubject([]);
        this.options$ = new BehaviorSubject(defaultOptions);
        this.dimensions$ = new BehaviorSubject({});
        this.height$ = this.dimensions$.pipe(delay(0), map(function (dimensions) { return dimensions.height; }), distinctUntilChanged());
        this.placeholder$ = new BehaviorSubject({ visible: false, x: 0, y: 0, width: 0, height: 0 });
        this.layout$ = new Subject();
        this.stacked$ = new BehaviorSubject(false);
        this.layout$.subscribe(this.setLayoutData.bind(this));
        this.stacked$.pipe(filter(function (stacked) { return stacked === true; })).subscribe(this.updateWhenStacked.bind(this));
        this.widgets$.pipe(delay(0)).subscribe(function () { return _this.renderDashboard(); });
        this.dimensions$.pipe(delay(0)).subscribe(function () { return _this.renderDashboard(); });
    }
    Object.defineProperty(DashboardService.prototype, "options", {
        get: /**
         * @return {?}
         */
        function () {
            return this.options$.getValue();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DashboardService.prototype, "widgets", {
        get: /**
         * @return {?}
         */
        function () {
            return this.widgets$.getValue();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DashboardService.prototype, "stacked", {
        get: /**
         * @return {?}
         */
        function () {
            return this.stacked$.getValue();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DashboardService.prototype, "dimensions", {
        get: /**
         * @return {?}
         */
        function () {
            return this.dimensions$.getValue();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DashboardService.prototype, "columnWidth", {
        get: /**
         * @return {?}
         */
        function () {
            return this.dimensions.width / this.options.columns;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Add a widget to the dashboard
     * @param widget The widget component to add to the dashboard
     */
    /**
     * Add a widget to the dashboard
     * @param {?} widget The widget component to add to the dashboard
     * @return {?}
     */
    DashboardService.prototype.addWidget = /**
     * Add a widget to the dashboard
     * @param {?} widget The widget component to add to the dashboard
     * @return {?}
     */
    function (widget) {
        this.widgets$.next(__spread(this.widgets$.getValue(), [widget]));
    };
    /**
     * Remove a widget from the dashboard
     * @param widget The widget to remove
     */
    /**
     * Remove a widget from the dashboard
     * @param {?} widget The widget to remove
     * @return {?}
     */
    DashboardService.prototype.removeWidget = /**
     * Remove a widget from the dashboard
     * @param {?} widget The widget to remove
     * @return {?}
     */
    function (widget) {
        this.widgets$.next(this.widgets$.getValue().filter(function (_widget) { return _widget !== widget; }));
    };
    /**
     * Indicate that the dashboard element has been resized
     * @param width The width of the dashboard element in px
     * @param height The height of the dashboard element in px
     */
    /**
     * Indicate that the dashboard element has been resized
     * @param {?=} width The width of the dashboard element in px
     * @param {?=} height The height of the dashboard element in px
     * @return {?}
     */
    DashboardService.prototype.setDimensions = /**
     * Indicate that the dashboard element has been resized
     * @param {?=} width The width of the dashboard element in px
     * @param {?=} height The height of the dashboard element in px
     * @return {?}
     */
    function (width, height) {
        if (width === void 0) { width = this.dimensions.width; }
        if (height === void 0) { height = this.dimensions.height; }
        if (this.dimensions.width !== width || this.dimensions.height !== height) {
            this.dimensions$.next({ width: width, height: height });
        }
    };
    /**
     * Produce an object containing all the required layout data.
     * This can be useful for exporting/saving a layout
     */
    /**
     * Produce an object containing all the required layout data.
     * This can be useful for exporting/saving a layout
     * @return {?}
     */
    DashboardService.prototype.getLayoutData = /**
     * Produce an object containing all the required layout data.
     * This can be useful for exporting/saving a layout
     * @return {?}
     */
    function () {
        return this.widgets.map(function (widget) {
            return { id: widget.id, col: widget.getColumn(), row: widget.getRow(), colSpan: widget.getColumnSpan(), rowSpan: widget.getRowSpan() };
        });
    };
    /**
     * Position widgets programatically
     */
    /**
     * Position widgets programatically
     * @param {?} widgets
     * @return {?}
     */
    DashboardService.prototype.setLayoutData = /**
     * Position widgets programatically
     * @param {?} widgets
     * @return {?}
     */
    function (widgets) {
        var _this = this;
        // iterate through each widget data and find a match
        widgets.forEach(function (widget) {
            // find the matching widget
            var /** @type {?} */ target = _this.widgets.find(function (_widget) { return _widget.id === widget.id; });
            if (target) {
                target.setColumn(widget.col);
                target.setRow(widget.row);
                target.setColumnSpan(widget.colSpan);
                target.setRowSpan(widget.rowSpan);
            }
        });
    };
    /**
     * Update the positions and sizes of the widgets
     */
    /**
     * Update the positions and sizes of the widgets
     * @return {?}
     */
    DashboardService.prototype.renderDashboard = /**
     * Update the positions and sizes of the widgets
     * @return {?}
     */
    function () {
        var _this = this;
        // get the dimensions of the dashboard
        this._rowHeight = this.options.rowHeight || this.columnWidth;
        // ensure the column width is not below the min widths
        this.stacked$.next(this.columnWidth < this.options.minWidth);
        // ensure the row height is not below the min widths
        if (this._rowHeight < this.options.minWidth) {
            this._rowHeight = this.options.minWidth;
        }
        this.setDashboardLayout();
        // iterate through each widget and set the size - except the one being resized
        this.widgets.filter(function (widget) { return !_this._actionWidget || widget !== _this._actionWidget.widget; })
            .forEach(function (widget) { return widget.render(); });
    };
    /**
     * Determine where widgets should be positioned based on their positions, width and the size of the container
     */
    /**
     * Determine where widgets should be positioned based on their positions, width and the size of the container
     * @return {?}
     */
    DashboardService.prototype.setDashboardLayout = /**
     * Determine where widgets should be positioned based on their positions, width and the size of the container
     * @return {?}
     */
    function () {
        var _this = this;
        // find any widgets that do not currently have a position set
        this.widgets.filter(function (widget) { return widget.getColumn() === undefined || widget.getRow() === undefined; })
            .forEach(function (widget) { return _this.setWidgetPosition(widget); });
        this.setDashboardHeight();
    };
    /**
     * @return {?}
     */
    DashboardService.prototype.updateWhenStacked = /**
     * @return {?}
     */
    function () {
        // iterate through each widget set it's stacked state and
        this.getWidgetsByOrder().forEach(function (widget, idx) {
            widget.setColumn(0);
            widget.setRow(idx);
        });
    };
    /**
     * @return {?}
     */
    DashboardService.prototype.getWidgetsByOrder = /**
     * @return {?}
     */
    function () {
        return this.widgets.sort(function (w1, w2) {
            var /** @type {?} */ w1Position = w1.getColumn() * w1.getRow();
            var /** @type {?} */ w2Position = w2.getColumn() * w2.getRow();
            if (w1Position < w2Position) {
                return -1;
            }
            if (w1Position > w2Position) {
                return 1;
            }
            return 0;
        });
    };
    /**
     * Find a position that a widget can fit in the dashboard
     * @param widget The widget to try and position
     */
    /**
     * Find a position that a widget can fit in the dashboard
     * @param {?} widget The widget to try and position
     * @return {?}
     */
    DashboardService.prototype.setWidgetPosition = /**
     * Find a position that a widget can fit in the dashboard
     * @param {?} widget The widget to try and position
     * @return {?}
     */
    function (widget) {
        // find a position for the widget
        var /** @type {?} */ position = 0;
        var /** @type {?} */ success = false;
        // repeat until a space is found
        while (!success) {
            // get a position to try
            var /** @type {?} */ column = position % this.options.columns;
            var /** @type {?} */ row = Math.floor(position / this.options.columns);
            // check the current position
            if (this.getPositionAvailable(column, row, widget.getColumnSpan(), widget.getRowSpan())) {
                success = true;
                widget.setColumn(column);
                widget.setRow(row);
                return;
            }
            if (column === 0 && widget.colSpan > this.options.columns) {
                throw new Error('Dashboard widgets have a colSpan greater than the max number of dashboard columns!');
            }
            position++;
        }
    };
    /**
     * Check if a position in the dashboard is vacant or not
     */
    /**
     * Check if a position in the dashboard is vacant or not
     * @param {?} column
     * @param {?} row
     * @param {?} columnSpan
     * @param {?} rowSpan
     * @param {?=} ignoreWidget
     * @return {?}
     */
    DashboardService.prototype.getPositionAvailable = /**
     * Check if a position in the dashboard is vacant or not
     * @param {?} column
     * @param {?} row
     * @param {?} columnSpan
     * @param {?} rowSpan
     * @param {?=} ignoreWidget
     * @return {?}
     */
    function (column, row, columnSpan, rowSpan, ignoreWidget) {
        // get a list of grid spaces that are populated
        var /** @type {?} */ spaces = this.getOccupiedSpaces();
        // check if the block would still be in bounds
        if (column + columnSpan > this.options.columns) {
            return false;
        }
        var _loop_1 = function (x) {
            var _loop_2 = function (y) {
                if (spaces.find(function (block) { return block.column === x && block.row === y && block.widget !== ignoreWidget; })) {
                    return { value: false };
                }
            };
            for (var /** @type {?} */ y = row; y < row + rowSpan; y++) {
                var state_1 = _loop_2(y);
                if (typeof state_1 === "object")
                    return state_1;
            }
        };
        // check each required position
        for (var /** @type {?} */ x = column; x < column + columnSpan; x++) {
            var state_2 = _loop_1(x);
            if (typeof state_2 === "object")
                return state_2.value;
        }
        return true;
    };
    /**
     * @return {?}
     */
    DashboardService.prototype.getOccupiedSpaces = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // find all spaces that are currently occupied
        return this.widgets.filter(function (widget) { return widget.getColumn() !== undefined && widget.getRow() !== undefined; })
            .reduce(function (value, widget) {
            _this.forEachBlock(widget, function (column, row) { return value.push({ widget: widget, column: column, row: row }); });
            return value;
        }, []);
    };
    /**
     * Begin resizing a widget
     * @param action The the widget to resize
     */
    /**
     * Begin resizing a widget
     * @param {?} action The the widget to resize
     * @return {?}
     */
    DashboardService.prototype.onResizeStart = /**
     * Begin resizing a widget
     * @param {?} action The the widget to resize
     * @return {?}
     */
    function (action) {
        // store the mouse event
        this._mouseEvent = action.event;
        this._actionWidget = action;
        // bring the widget to the font
        this.bringToFront(action.widget);
    };
    /**
     * @param {?} action
     * @return {?}
     */
    DashboardService.prototype.onResizeDrag = /**
     * @param {?} action
     * @return {?}
     */
    function (action) {
        var /** @type {?} */ mousePosX = this._mouseEvent.pageX - pageXOffset;
        var /** @type {?} */ mousePosY = this._mouseEvent.pageY - pageYOffset;
        // if there was no movement then do nothing
        if (action.event.x === mousePosX && action.event.y === mousePosY) {
            return;
        }
        // update the stored mouse event
        this._mouseEvent = action.event;
        // get handle for direction
        var handle = action.handle;
        // get the bounds of the handle
        var /** @type {?} */ bounds = handle.getBoundingClientRect();
        // get the center of the handle
        var /** @type {?} */ centerX = bounds.left + (bounds.width / 2);
        var /** @type {?} */ centerY = bounds.top + (bounds.height / 2);
        // get the current mouse position
        var /** @type {?} */ mouseX = mousePosX - centerX;
        var /** @type {?} */ mouseY = mousePosY - centerY;
        // store the new proposed dimensions for the widget
        var /** @type {?} */ dimensions = {
            x: action.widget.x,
            y: action.widget.y,
            width: action.widget.width,
            height: action.widget.height
        };
        // update widget based on the handle being dragged
        switch (action.direction) {
            case ActionDirection.Right:
                dimensions.width += mouseX;
                break;
            case ActionDirection.Left:
                dimensions.x += mouseX;
                dimensions.width -= mouseX;
                if (dimensions.width < this.options.minWidth) {
                    var /** @type {?} */ difference = this.options.minWidth - dimensions.width;
                    dimensions.x -= difference;
                    dimensions.width += difference;
                }
                break;
            case ActionDirection.Bottom:
                dimensions.height += mouseY;
                break;
            case ActionDirection.Top:
                dimensions.y += mouseY;
                dimensions.height -= mouseY;
                if (dimensions.height < this.options.minHeight) {
                    var /** @type {?} */ difference = this.options.minHeight - dimensions.height;
                    dimensions.y -= difference;
                    dimensions.height += difference;
                }
                break;
            // Support resizing on multiple axis simultaneously
            case ActionDirection.TopLeft:
                dimensions.x += mouseX;
                dimensions.width -= mouseX;
                if (dimensions.width < this.options.minWidth) {
                    var /** @type {?} */ difference = this.options.minWidth - dimensions.width;
                    dimensions.x -= difference;
                    dimensions.width += difference;
                }
                dimensions.y += mouseY;
                dimensions.height -= mouseY;
                if (dimensions.height < this.options.minHeight) {
                    var /** @type {?} */ difference = this.options.minHeight - dimensions.height;
                    dimensions.y -= difference;
                    dimensions.height += difference;
                }
                break;
            case ActionDirection.TopRight:
                dimensions.width += mouseX;
                dimensions.y += mouseY;
                dimensions.height -= mouseY;
                if (dimensions.height < this.options.minHeight) {
                    var /** @type {?} */ difference = this.options.minHeight - dimensions.height;
                    dimensions.y -= difference;
                    dimensions.height += difference;
                }
                break;
            case ActionDirection.BottomLeft:
                dimensions.height += mouseY;
                dimensions.x += mouseX;
                dimensions.width -= mouseX;
                if (dimensions.width < this.options.minWidth) {
                    var /** @type {?} */ difference = this.options.minWidth - dimensions.width;
                    dimensions.x -= difference;
                    dimensions.width += difference;
                }
                break;
            case ActionDirection.BottomRight:
                dimensions.height += mouseY;
                dimensions.width += mouseX;
                break;
        }
        var /** @type {?} */ currentWidth = action.widget.x + action.widget.width;
        var /** @type {?} */ currentHeight = action.widget.y + action.widget.height;
        // ensure values are within the dashboard bounds
        if (dimensions.x < 0) {
            dimensions.x = 0;
            dimensions.width = currentWidth;
        }
        if (dimensions.y < 0) {
            dimensions.y = 0;
            dimensions.height = currentHeight;
        }
        if ((dimensions.x + dimensions.width) > this.dimensions.width) {
            dimensions.width = this.dimensions.width - dimensions.x;
        }
        // if the proposed width is smaller than allowed then reset width to minimum and ignore x changes
        if (dimensions.width < this.options.minWidth) {
            dimensions.x = action.widget.x;
            dimensions.width = this.options.minWidth;
        }
        // if the proposed height is smaller than allowed then reset height to minimum and ignore y changes
        if (dimensions.height < this.options.minHeight) {
            dimensions.y = action.widget.y;
            dimensions.height = this.options.minHeight;
        }
        // update the widget actual values
        action.widget.setBounds(dimensions.x, dimensions.y, dimensions.width, dimensions.height);
        // update placeholder position and value
        this.setPlaceholderBounds(true, dimensions.x, dimensions.y, dimensions.width, dimensions.height);
        // show the widget positions if the current positions and sizes were to persist
        this.updateWidgetPositions(action.widget);
    };
    /**
     * @return {?}
     */
    DashboardService.prototype.onResizeEnd = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ placeholder = this.placeholder$.getValue();
        // commit resize changes
        this.commitWidgetChanges();
        // hide placeholder
        placeholder.visible = false;
        // update the placeholder
        this.placeholder$.next(placeholder);
        this._actionWidget = null;
        this._mouseEvent = null;
        // ensure any vacant upper spaces are filled where required
        this.shiftWidgetsUp();
        // update dashboard height
        this.setDashboardHeight();
        // emit information about the layout
        this.layout$.next(this.getLayoutData());
    };
    /**
     * @param {?} action
     * @return {?}
     */
    DashboardService.prototype.onDragStart = /**
     * @param {?} action
     * @return {?}
     */
    function (action) {
        this.onResizeStart(action);
        // store the starting placeholder position
        this.setWidgetOrigin();
        this.cacheWidgets();
    };
    /**
     * @return {?}
     */
    DashboardService.prototype.onDragEnd = /**
     * @return {?}
     */
    function () {
        this.onResizeEnd();
        this._widgetOrigin = {};
    };
    /**
     * @param {?} action
     * @return {?}
     */
    DashboardService.prototype.onDrag = /**
     * @param {?} action
     * @return {?}
     */
    function (action) {
        // if there was no movement then do nothing
        if (action.event.pageX === this._mouseEvent.pageX && action.event.pageY === this._mouseEvent.pageY) {
            return;
        }
        // get the current mouse position
        var /** @type {?} */ mouseX = action.event.pageX - this._mouseEvent.pageX;
        var /** @type {?} */ mouseY = action.event.pageY - this._mouseEvent.pageY;
        // store the latest event
        this._mouseEvent = action.event;
        var /** @type {?} */ dimensions = {
            x: action.widget.x + mouseX,
            y: action.widget.y + mouseY,
            width: action.widget.width,
            height: action.widget.height
        };
        this.restoreWidgets(true);
        // update widget position
        action.widget.setBounds(dimensions.x, dimensions.y, dimensions.width, dimensions.height);
        // update placeholder position and value
        this.setPlaceholderBounds(true, dimensions.x, dimensions.y, dimensions.width, dimensions.height);
        // show the widget positions if the current positions and sizes were to persist
        this.shiftWidgets();
        this.setDashboardHeight();
    };
    /**
     * @return {?}
     */
    DashboardService.prototype.getRowHeight = /**
     * @return {?}
     */
    function () {
        return this._rowHeight;
    };
    /**
     * @return {?}
     */
    DashboardService.prototype.cacheWidgets = /**
     * @return {?}
     */
    function () {
        this._cache = this.widgets.map(function (widget) { return ({ id: widget.id, column: widget.getColumn(), row: widget.getRow() }); });
    };
    /**
     * @param {?=} ignoreActionWidget
     * @return {?}
     */
    DashboardService.prototype.restoreWidgets = /**
     * @param {?=} ignoreActionWidget
     * @return {?}
     */
    function (ignoreActionWidget) {
        var _this = this;
        if (ignoreActionWidget === void 0) { ignoreActionWidget = false; }
        this._cache.filter(function (widget) { return !ignoreActionWidget || widget.id !== _this._actionWidget.widget.id; }).forEach(function (widget) {
            var /** @type {?} */ match = _this.widgets.find(function (wgt) { return wgt.id === widget.id; });
            if (match) {
                match.setColumn(widget.column);
                match.setRow(widget.row);
            }
        });
    };
    /**
     * When dragging any widgets that need to be moved should be moved to an appropriate position
     */
    /**
     * When dragging any widgets that need to be moved should be moved to an appropriate position
     * @return {?}
     */
    DashboardService.prototype.shiftWidgets = /**
     * When dragging any widgets that need to be moved should be moved to an appropriate position
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ widgetsToMove = [];
        var /** @type {?} */ placeholder = this.placeholder$.getValue();
        var _loop_3 = function (row) {
            var _loop_4 = function (column) {
                // store reference to any widgets that need moved
                this_1.getOccupiedSpaces()
                    .filter(function (space) { return space.column === column && space.row === row && space.widget !== _this._actionWidget.widget; })
                    .forEach(function (space) { return widgetsToMove.push(space.widget); });
            };
            for (var /** @type {?} */ column = placeholder.column; column < placeholder.column + placeholder.columnSpan; column++) {
                _loop_4(column);
            }
        };
        var this_1 = this;
        // check if there are any widgets under the placeholder
        for (var /** @type {?} */ row = placeholder.row; row < placeholder.row + placeholder.rowSpan; row++) {
            _loop_3(row);
        }
        // remove any duplicates
        widgetsToMove = widgetsToMove.filter(function (widget, idx, array) { return array.indexOf(widget) === idx; });
        // if no widgets need moved then we can stop here
        if (widgetsToMove.length === 0) {
            return;
        }
        // create a duplicate we can use to keep track of which have been moved
        var /** @type {?} */ unmovedWidgets = widgetsToMove.slice();
        // attempt to move any widgets to the previous widget position
        widgetsToMove.forEach(function (widget) {
            // get a grid off all occupied spaces - taking into account the placeholder and ignoring widgets that need moved
            var /** @type {?} */ grid = _this.getOccupiedSpaces().filter(function (space) { return !unmovedWidgets.find(function (wgt) { return wgt === space.widget; }); });
            // iterate each free block
            for (var /** @type {?} */ row = _this._widgetOrigin.row; row < _this._widgetOrigin.row + _this._widgetOrigin.rowSpan; row++) {
                for (var /** @type {?} */ column = _this._widgetOrigin.column; column < _this._widgetOrigin.column + _this._widgetOrigin.columnSpan; column++) {
                    // determine if the block can fit in this space
                    var /** @type {?} */ requiredSpaces = _this.getRequiredSpacesFromPoint(widget, column, row);
                    // check if widget would fit in space
                    var /** @type {?} */ available = requiredSpaces.every(function (space) {
                        return !grid.find(function (gridSpace) { return gridSpace.column === space.column && gridSpace.row === space.row; }) && space.column < _this.getColumnCount();
                    });
                    if (available) {
                        widget.setColumn(column);
                        widget.setRow(row);
                        unmovedWidgets.splice(unmovedWidgets.findIndex(function (wgt) { return wgt === widget; }), 1);
                        return;
                    }
                }
            }
            // if we get to here then we can't simply swap the positions - next try moving right
            if (_this.canWidgetMoveRight(widget, true)) {
                // after the shift check if placeholder position is still valid
                // after the shift check if placeholder position is still valid
                _this.validatePlaceholderPosition(ActionDirection.Right);
                return;
            }
            // next try moving left
            if (_this.canWidgetMoveLeft(widget, true)) {
                // after the shift check if placeholder position is still valid
                // after the shift check if placeholder position is still valid
                _this.validatePlaceholderPosition(ActionDirection.Left);
                return;
            }
            // determine the distance that the widget needs to be moved down
            var /** @type {?} */ distance = (_this._actionWidget.widget.getRow() - widget.getRow()) + _this._actionWidget.widget.getRowSpan();
            // as a last resort move the widget downwards
            // as a last resort move the widget downwards
            _this.moveWidgetDown(widget, distance);
        });
    };
    /**
     * After shifts have taken place we should verify the place holder position is still valid
     * @param shiftDirection - the position widgets were shifted
     */
    /**
     * After shifts have taken place we should verify the place holder position is still valid
     * @param {?} shiftDirection - the position widgets were shifted
     * @return {?}
     */
    DashboardService.prototype.validatePlaceholderPosition = /**
     * After shifts have taken place we should verify the place holder position is still valid
     * @param {?} shiftDirection - the position widgets were shifted
     * @return {?}
     */
    function (shiftDirection) {
        var /** @type {?} */ placeholder = this.placeholder$.getValue();
        // check if the placeholder is over a widget
        if (this.getWidgetsAtPosition(placeholder.column, placeholder.row, true).length > 0) {
            // move the placeholder the opposite direction
            switch (shiftDirection) {
                case ActionDirection.Left:
                    this.setPlaceholderBounds(placeholder.visible, placeholder.x + this.getColumnWidth(), placeholder.y, placeholder.width, placeholder.height);
                    break;
                case ActionDirection.Right:
                    this.setPlaceholderBounds(placeholder.visible, placeholder.x - this.getColumnWidth(), placeholder.y, placeholder.width, placeholder.height);
                    break;
            }
            // validate this new position again
            this.validatePlaceholderPosition(shiftDirection);
        }
    };
    /**
     * Determine if a widget can be moved left - or if it can move the widgets to the right to make space for the widget
     */
    /**
     * Determine if a widget can be moved left - or if it can move the widgets to the right to make space for the widget
     * @param {?} widget
     * @param {?=} performMove
     * @return {?}
     */
    DashboardService.prototype.canWidgetMoveLeft = /**
     * Determine if a widget can be moved left - or if it can move the widgets to the right to make space for the widget
     * @param {?} widget
     * @param {?=} performMove
     * @return {?}
     */
    function (widget, performMove) {
        var _this = this;
        if (performMove === void 0) { performMove = false; }
        // check if the widget is the action widget or occupies the first column
        if (widget === this._actionWidget.widget || widget.getColumn() === 0) {
            return false;
        }
        // find the positions required
        var /** @type {?} */ targetSpaces = this.getOccupiedSpaces().filter(function (space) { return space.widget === widget; }).map(function (space) {
            return { column: space.column - widget.getColumnSpan(), row: space.row, widget: space.widget };
        });
        // check if there are widget in the required positions and if so, can they move right?
        var /** @type {?} */ moveable = targetSpaces.every(function (space) { return _this.getWidgetsAtPosition(space.column, space.row).filter(function (wgt) { return wgt !== space.widget; }).every(function (wgt) { return _this.canWidgetMoveLeft(wgt); }); });
        if (performMove && moveable) {
            // move all widgets to the right
            targetSpaces.forEach(function (space) { return _this.getWidgetsAtPosition(space.column, space.row).filter(function (wgt) { return wgt !== space.widget; }).forEach(function (wgt) { return _this.canWidgetMoveLeft(wgt, true); }); });
            // move current widget to the right
            widget.setColumn(widget.getColumn() - 1);
        }
        return moveable;
    };
    /**
     * Determine if a widget can be moved right - or if it can move the widgets to the right to make space for the widget
     */
    /**
     * Determine if a widget can be moved right - or if it can move the widgets to the right to make space for the widget
     * @param {?} widget
     * @param {?=} performMove
     * @return {?}
     */
    DashboardService.prototype.canWidgetMoveRight = /**
     * Determine if a widget can be moved right - or if it can move the widgets to the right to make space for the widget
     * @param {?} widget
     * @param {?=} performMove
     * @return {?}
     */
    function (widget, performMove) {
        var _this = this;
        if (performMove === void 0) { performMove = false; }
        // check if the widget is the dragging widget or the widget occupies the final column
        if (widget === this._actionWidget.widget || widget.getColumn() + widget.getColumnSpan() === this.options.columns) {
            return false;
        }
        // find the positions required
        var /** @type {?} */ targetSpaces = this.getOccupiedSpaces().filter(function (space) { return space.widget === widget; }).map(function (space) {
            return { column: space.column + widget.getColumnSpan(), row: space.row, widget: space.widget };
        });
        // check if there are widget in the required positions and if so, can they move right?
        var /** @type {?} */ moveable = targetSpaces.every(function (space) { return _this.getWidgetsAtPosition(space.column, space.row).filter(function (wgt) { return wgt !== space.widget; }).every(function (wgt) { return _this.canWidgetMoveRight(wgt); }); });
        if (performMove && moveable) {
            // move all widgets to the right
            targetSpaces.forEach(function (space) { return _this.getWidgetsAtPosition(space.column, space.row).filter(function (wgt) { return wgt !== space.widget; }).forEach(function (wgt) { return _this.canWidgetMoveRight(wgt, true); }); });
            // move current widget to the right
            widget.setColumn(widget.getColumn() + 1);
        }
        return moveable;
    };
    /**
     * Store the initial position of the widget being dragged
     */
    /**
     * Store the initial position of the widget being dragged
     * @return {?}
     */
    DashboardService.prototype.setWidgetOrigin = /**
     * Store the initial position of the widget being dragged
     * @return {?}
     */
    function () {
        this._widgetOrigin = {
            column: this._actionWidget.widget.getColumn(),
            row: this._actionWidget.widget.getRow(),
            columnSpan: this._actionWidget.widget.getColumnSpan(),
            rowSpan: this._actionWidget.widget.getRowSpan()
        };
    };
    /**
     * Calculate all the required positions is a widget was to be positioned at a particular point
     */
    /**
     * Calculate all the required positions is a widget was to be positioned at a particular point
     * @param {?} widget
     * @param {?} column
     * @param {?} row
     * @return {?}
     */
    DashboardService.prototype.getRequiredSpacesFromPoint = /**
     * Calculate all the required positions is a widget was to be positioned at a particular point
     * @param {?} widget
     * @param {?} column
     * @param {?} row
     * @return {?}
     */
    function (widget, column, row) {
        var /** @type {?} */ spaces = [];
        for (var /** @type {?} */ y = row; y < row + widget.getRowSpan(); y++) {
            for (var /** @type {?} */ x = column; x < column + widget.getColumnSpan(); x++) {
                spaces.push({ column: x, row: y, widget: widget });
            }
        }
        return spaces;
    };
    /**
     * Position widgets based on the position of the placeholder - this is temporary until confirmed
     */
    /**
     * Position widgets based on the position of the placeholder - this is temporary until confirmed
     * @param {?} widget
     * @return {?}
     */
    DashboardService.prototype.updateWidgetPositions = /**
     * Position widgets based on the position of the placeholder - this is temporary until confirmed
     * @param {?} widget
     * @return {?}
     */
    function (widget) {
        var _this = this;
        var /** @type {?} */ placeholder = this.placeholder$.getValue();
        // check all spaces the placeholder will occupy and move any widget currently in them down
        for (var /** @type {?} */ column = placeholder.column; column < placeholder.column + placeholder.columnSpan; column++) {
            for (var /** @type {?} */ row = placeholder.row; row < placeholder.row + placeholder.rowSpan; row++) {
                this.getWidgetsAtPosition(column, row, true)
                    .filter(function (wgt) { return wgt !== widget; })
                    .forEach(function (wgt) { return _this.moveWidgetDown(wgt); });
            }
        }
        // update the height of the dashboard
        this.setDashboardHeight();
        // if we arent dragging the top handle then fill spaces
        if (this._actionWidget.direction !== ActionDirection.Top &&
            this._actionWidget.direction !== ActionDirection.TopLeft &&
            this._actionWidget.direction !== ActionDirection.TopRight) {
            this.shiftWidgetsUp();
        }
    };
    /**
     * Determine if a widget is occupying a specific row and column
     * @param column The columns to check if occupied
     * @param row The row to check if occupied
     * @param ignoreResizing Whether or not to ignore the widget currently being resized
     */
    /**
     * Determine if a widget is occupying a specific row and column
     * @param {?} column The columns to check if occupied
     * @param {?} row The row to check if occupied
     * @param {?=} ignoreResizing Whether or not to ignore the widget currently being resized
     * @return {?}
     */
    DashboardService.prototype.getWidgetsAtPosition = /**
     * Determine if a widget is occupying a specific row and column
     * @param {?} column The columns to check if occupied
     * @param {?} row The row to check if occupied
     * @param {?=} ignoreResizing Whether or not to ignore the widget currently being resized
     * @return {?}
     */
    function (column, row, ignoreResizing) {
        var _this = this;
        if (ignoreResizing === void 0) { ignoreResizing = false; }
        return this.getOccupiedSpaces()
            .filter(function (space) { return space.column === column && space.row === row; })
            .filter(function (space) { return space.widget !== _this._actionWidget.widget || !ignoreResizing; })
            .map(function (space) { return space.widget; });
    };
    /**
     * Update the placeholder visibility, position and size
     */
    /**
     * Update the placeholder visibility, position and size
     * @param {?} visible
     * @param {?} x
     * @param {?} y
     * @param {?} width
     * @param {?} height
     * @return {?}
     */
    DashboardService.prototype.setPlaceholderBounds = /**
     * Update the placeholder visibility, position and size
     * @param {?} visible
     * @param {?} x
     * @param {?} y
     * @param {?} width
     * @param {?} height
     * @return {?}
     */
    function (visible, x, y, width, height) {
        var _this = this;
        var /** @type {?} */ placeholder = this.placeholder$.getValue();
        var /** @type {?} */ rounding = this._actionWidget.direction === ActionDirection.Left ||
            this._actionWidget.direction === ActionDirection.Top ? Rounding.RoundDownBelowHalf : Rounding.RoundUpOverHalf;
        placeholder.visible = visible;
        placeholder.column = this.getPlaceholderColumn(x, width);
        placeholder.row = this.getPlaceholderRow(y, height);
        placeholder.columnSpan = this.getPlaceholderColumnSpan(width);
        placeholder.rowSpan = this.getPlaceholderRowSpan(height);
        // calculate the maximum number of rows
        var /** @type {?} */ rowCount = this.widgets.filter(function (widget) { return widget !== _this._actionWidget.widget; })
            .reduce(function (previous, widget) { return Math.max(widget.getRow() + widget.getRowSpan(), previous); }, 0);
        // constrain maximum placeholder row
        placeholder.row = Math.min(placeholder.row, rowCount);
        placeholder.x = (placeholder.column * this.getColumnWidth()) + this.options.padding;
        placeholder.y = (placeholder.row * this._rowHeight) + this.options.padding;
        placeholder.width = (placeholder.columnSpan * this.getColumnWidth()) - (this.options.padding * 2);
        placeholder.height = (placeholder.rowSpan * this._rowHeight) - (this.options.padding * 2);
        // set the values of the widget to match the values of the placeholder - however do not render the changes
        this._actionWidget.widget.setColumn(placeholder.column, false);
        this._actionWidget.widget.setRow(placeholder.row, false);
        this._actionWidget.widget.setColumnSpan(placeholder.columnSpan, false);
        this._actionWidget.widget.setRowSpan(placeholder.rowSpan, false);
        // update the placeholder
        this.placeholder$.next(placeholder);
    };
    /**
     * Get the placeholder column position
     */
    /**
     * Get the placeholder column position
     * @param {?} x
     * @param {?} width
     * @return {?}
     */
    DashboardService.prototype.getPlaceholderColumn = /**
     * Get the placeholder column position
     * @param {?} x
     * @param {?} width
     * @return {?}
     */
    function (x, width) {
        var /** @type {?} */ column = this.getColumnFromPx(x, this._actionWidget.direction === ActionDirection.Move ? Rounding.RoundUpOverHalf : Rounding.RoundDown);
        var /** @type {?} */ columnSpan = Math.floor(width / this.getColumnWidth());
        var /** @type {?} */ upperLimit = this.getColumnCount() - columnSpan;
        // if we arent dragging left then just return the column
        if (this._actionWidget.direction !== ActionDirection.Left &&
            this._actionWidget.direction !== ActionDirection.TopLeft &&
            this._actionWidget.direction !== ActionDirection.BottomLeft) {
            return Math.max(Math.min(column, upperLimit), 0);
        }
        // get any overflow
        var /** @type {?} */ overflow = width % this.getColumnWidth();
        return (x <= 0 || overflow === 0 || columnSpan === 0 || overflow > (this.getColumnWidth() / 2)) ?
            Math.max(Math.min(column, upperLimit), 0) :
            Math.max(Math.min(column + 1, upperLimit), 0);
    };
    /**
     * Get the column span of the placeholder
     */
    /**
     * Get the column span of the placeholder
     * @param {?} width
     * @return {?}
     */
    DashboardService.prototype.getPlaceholderColumnSpan = /**
     * Get the column span of the placeholder
     * @param {?} width
     * @return {?}
     */
    function (width) {
        var /** @type {?} */ columnSpan = this.getColumnFromPx(width);
        // if we arent dragging right or left then just return the column span
        if (this._actionWidget.direction !== ActionDirection.Right &&
            this._actionWidget.direction !== ActionDirection.TopRight &&
            this._actionWidget.direction !== ActionDirection.BottomRight &&
            this._actionWidget.direction !== ActionDirection.Left &&
            this._actionWidget.direction !== ActionDirection.TopLeft &&
            this._actionWidget.direction !== ActionDirection.BottomLeft) {
            return Math.max(columnSpan, 1);
        }
        // get the current column span and any overflow
        var /** @type {?} */ overflow = width % this.getColumnWidth();
        return (columnSpan > 0 && overflow > (this.getColumnWidth() / 2)) ? Math.max(columnSpan + 1, 1) : Math.max(columnSpan, 1);
    };
    /**
     * Get the row position of the placeholder
     */
    /**
     * Get the row position of the placeholder
     * @param {?} y
     * @param {?} height
     * @return {?}
     */
    DashboardService.prototype.getPlaceholderRow = /**
     * Get the row position of the placeholder
     * @param {?} y
     * @param {?} height
     * @return {?}
     */
    function (y, height) {
        var /** @type {?} */ row = this.getRowFromPx(y, this._actionWidget.direction === ActionDirection.Move ? Rounding.RoundUpOverHalf : Rounding.RoundDown);
        var /** @type {?} */ rowSpan = Math.ceil(height / this._rowHeight);
        // if we arent dragging up then just return the row
        if (this._actionWidget.direction !== ActionDirection.Top &&
            this._actionWidget.direction !== ActionDirection.TopLeft &&
            this._actionWidget.direction !== ActionDirection.TopRight) {
            return Math.max(row, 0);
        }
        // get any overflow
        var /** @type {?} */ overflow = height < this._rowHeight ? 0 : height % this._rowHeight;
        return (y <= 0 || rowSpan === 0 || overflow === 0 || overflow > (this._rowHeight / 2)) ? Math.max(row, 0) : Math.max(row + 1, 0);
    };
    /**
     * Get the row span of the placeholder
     */
    /**
     * Get the row span of the placeholder
     * @param {?} height
     * @return {?}
     */
    DashboardService.prototype.getPlaceholderRowSpan = /**
     * Get the row span of the placeholder
     * @param {?} height
     * @return {?}
     */
    function (height) {
        var /** @type {?} */ rowSpan = this.getRowFromPx(height);
        // if we arent dragging up or down then just return the column span
        if (this._actionWidget.direction !== ActionDirection.Top &&
            this._actionWidget.direction !== ActionDirection.TopLeft &&
            this._actionWidget.direction !== ActionDirection.TopRight &&
            this._actionWidget.direction !== ActionDirection.Bottom &&
            this._actionWidget.direction !== ActionDirection.BottomLeft &&
            this._actionWidget.direction !== ActionDirection.BottomRight) {
            return Math.max(rowSpan, 1);
        }
        // get the current column span and any overflow
        var /** @type {?} */ overflow = height % this._rowHeight;
        return (overflow > (this._rowHeight / 2)) ? Math.max(rowSpan + 1, 1) : Math.max(rowSpan, 1);
    };
    /**
     * @param {?} x
     * @param {?=} rounding
     * @return {?}
     */
    DashboardService.prototype.getColumnFromPx = /**
     * @param {?} x
     * @param {?=} rounding
     * @return {?}
     */
    function (x, rounding) {
        if (rounding === void 0) { rounding = Rounding.RoundDown; }
        var /** @type {?} */ column = Math.floor(x / Math.floor(this.getColumnWidth()));
        var /** @type {?} */ overflow = (x % Math.floor(this.getColumnWidth()));
        var /** @type {?} */ half = this.getColumnWidth() / 2;
        switch (rounding) {
            case Rounding.RoundDown:
                return column;
            case Rounding.RoundDownBelowHalf:
                return overflow < half ? column : column + 1;
            case Rounding.RoundUpOverHalf:
                return overflow > half ? column + 1 : column;
            case Rounding.RoundUp:
                return overflow > 0 ? column + 1 : column;
        }
    };
    /**
     * @param {?} y
     * @param {?=} rounding
     * @return {?}
     */
    DashboardService.prototype.getRowFromPx = /**
     * @param {?} y
     * @param {?=} rounding
     * @return {?}
     */
    function (y, rounding) {
        if (rounding === void 0) { rounding = Rounding.RoundDown; }
        var /** @type {?} */ row = Math.floor(y / Math.floor(this._rowHeight));
        var /** @type {?} */ overflow = (y % Math.floor(this._rowHeight));
        var /** @type {?} */ half = this._rowHeight / 2;
        switch (rounding) {
            case Rounding.RoundDown:
                return row;
            case Rounding.RoundDownBelowHalf:
                return overflow < half ? row : row + 1;
            case Rounding.RoundUpOverHalf:
                return overflow > half ? row + 1 : row;
            case Rounding.RoundUp:
                return overflow > 0 ? row + 1 : row;
        }
    };
    /**
     * @return {?}
     */
    DashboardService.prototype.commitWidgetChanges = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ placeholder = this.placeholder$.getValue();
        // check that we have all the values we need
        if (placeholder.column === undefined || placeholder.row === undefined ||
            placeholder.columnSpan === undefined || placeholder.rowSpan === undefined) {
            return;
        }
        if (this._actionWidget) {
            this._actionWidget.widget.setColumn(placeholder.column);
            this._actionWidget.widget.setRow(placeholder.row);
            this._actionWidget.widget.setColumnSpan(placeholder.columnSpan);
            this._actionWidget.widget.setRowSpan(placeholder.rowSpan);
        }
        // reset all placeholder values
        placeholder.column = undefined;
        placeholder.row = undefined;
        placeholder.columnSpan = undefined;
        placeholder.rowSpan = undefined;
        // emit the new placeholder values
        this.placeholder$.next(placeholder);
    };
    /**
     * Get the current column width
     */
    /**
     * Get the current column width
     * @return {?}
     */
    DashboardService.prototype.getColumnWidth = /**
     * Get the current column width
     * @return {?}
     */
    function () {
        return Math.floor(this.columnWidth);
    };
    /**
     * Calculate the number of rows populated with widgets
     */
    /**
     * Calculate the number of rows populated with widgets
     * @return {?}
     */
    DashboardService.prototype.getRowCount = /**
     * Calculate the number of rows populated with widgets
     * @return {?}
     */
    function () {
        return this.widgets.reduce(function (previous, widget) { return Math.max(widget.getRow() + widget.getRowSpan(), previous); }, 0);
    };
    /**
     * Set the height of the dashboard container element
     */
    /**
     * Set the height of the dashboard container element
     * @return {?}
     */
    DashboardService.prototype.setDashboardHeight = /**
     * Set the height of the dashboard container element
     * @return {?}
     */
    function () {
        // size the dashboard container to ensure all rows fit
        var /** @type {?} */ rowCount = this.getRowCount();
        // if we should show an empty row increment the row count by 1
        if (this.options.emptyRow) {
            rowCount++;
        }
        this.setDimensions(undefined, rowCount * this._rowHeight);
    };
    /**
     * Orders the z-index of all widgets to move the active one to the front
     * @param widget The widget that should be brought to the front
     */
    /**
     * Orders the z-index of all widgets to move the active one to the front
     * @param {?} widget The widget that should be brought to the front
     * @return {?}
     */
    DashboardService.prototype.bringToFront = /**
     * Orders the z-index of all widgets to move the active one to the front
     * @param {?} widget The widget that should be brought to the front
     * @return {?}
     */
    function (widget) {
        this.widgets.forEach(function (_widget) { return _widget === widget ? _widget.bringToFront() : _widget.sendToBack(); });
    };
    /**
     * Move a widget down - if widgets are in the position below, then move them down further
     * @param widget The widget to move downwards
     */
    /**
     * Move a widget down - if widgets are in the position below, then move them down further
     * @param {?} widget The widget to move downwards
     * @param {?=} distance
     * @return {?}
     */
    DashboardService.prototype.moveWidgetDown = /**
     * Move a widget down - if widgets are in the position below, then move them down further
     * @param {?} widget The widget to move downwards
     * @param {?=} distance
     * @return {?}
     */
    function (widget, distance) {
        var _this = this;
        if (distance === void 0) { distance = 1; }
        // move the widget down one position
        widget.setRow(widget.getRow() + distance);
        // check every space the widget occupies for collisions
        this.forEachBlock(widget, function (column, row) {
            return _this.getWidgetsAtPosition(column, row, true)
                .filter(function (wgt) { return wgt !== widget; })
                .forEach(function (wgt) { return _this.moveWidgetDown(wgt, distance); });
        });
    };
    /**
     * Widgets should not be allowed to have a vacant space above them - if there is one they should move upwards to fill it
     */
    /**
     * Widgets should not be allowed to have a vacant space above them - if there is one they should move upwards to fill it
     * @return {?}
     */
    DashboardService.prototype.shiftWidgetsUp = /**
     * Widgets should not be allowed to have a vacant space above them - if there is one they should move upwards to fill it
     * @return {?}
     */
    function () {
        var _this = this;
        // check whether or not changes have been made - if so we need to repeat until stable
        var /** @type {?} */ stable = true;
        // iterate each widget and
        this.widgets.forEach(function (widget) {
            // if widget is already on the top row then do nothing
            if (widget.getRow() === 0) {
                return;
            }
            // if we are currently dragging and this is the dragging widget then skip
            if (_this._actionWidget && _this._actionWidget.widget === widget) {
                return;
            }
            if (_this.getPositionAvailable(widget.getColumn(), widget.getRow() - 1, widget.getColumnSpan(), 1)) {
                widget.setRow(widget.getRow() - 1);
                stable = false;
            }
        });
        // if changes occurred then we should repeat the process
        if (!stable) {
            this.shiftWidgetsUp();
        }
    };
    /**
     * Iterate over each space a widget occupied
     * @param widget The widget to determine spaces
     * @param callback The function to be called for each space, should expect a column and row argument witht he context being the widget
     */
    /**
     * Iterate over each space a widget occupied
     * @param {?} widget The widget to determine spaces
     * @param {?} callback The function to be called for each space, should expect a column and row argument witht he context being the widget
     * @return {?}
     */
    DashboardService.prototype.forEachBlock = /**
     * Iterate over each space a widget occupied
     * @param {?} widget The widget to determine spaces
     * @param {?} callback The function to be called for each space, should expect a column and row argument witht he context being the widget
     * @return {?}
     */
    function (widget, callback) {
        for (var /** @type {?} */ row = widget.getRow(); row < widget.getRow() + widget.getRowSpan(); row++) {
            for (var /** @type {?} */ column = widget.getColumn(); column < widget.getColumn() + widget.getColumnSpan(); column++) {
                callback.call(widget, column, row);
            }
        }
    };
    /**
     * Returns the number of columns available
     */
    /**
     * Returns the number of columns available
     * @return {?}
     */
    DashboardService.prototype.getColumnCount = /**
     * Returns the number of columns available
     * @return {?}
     */
    function () {
        return this.stacked ? 1 : this.options.columns;
    };
    DashboardService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DashboardService.ctorParameters = function () { return []; };
    return DashboardService;
}());
var /** @type {?} */ defaultOptions = { columns: 5, padding: 5, minWidth: 100, minHeight: 100, emptyRow: true };
/** @enum {number} */
var ActionDirection = {
    Top: 0,
    TopRight: 1,
    Right: 2,
    BottomRight: 3,
    Bottom: 4,
    BottomLeft: 5,
    Left: 6,
    TopLeft: 7,
    Move: 8,
};
ActionDirection[ActionDirection.Top] = "Top";
ActionDirection[ActionDirection.TopRight] = "TopRight";
ActionDirection[ActionDirection.Right] = "Right";
ActionDirection[ActionDirection.BottomRight] = "BottomRight";
ActionDirection[ActionDirection.Bottom] = "Bottom";
ActionDirection[ActionDirection.BottomLeft] = "BottomLeft";
ActionDirection[ActionDirection.Left] = "Left";
ActionDirection[ActionDirection.TopLeft] = "TopLeft";
ActionDirection[ActionDirection.Move] = "Move";
/** @enum {number} */
var Rounding = {
    RoundDown: 0,
    RoundDownBelowHalf: 1,
    RoundUp: 2,
    RoundUpOverHalf: 3,
};
Rounding[Rounding.RoundDown] = "RoundDown";
Rounding[Rounding.RoundDownBelowHalf] = "RoundDownBelowHalf";
Rounding[Rounding.RoundUp] = "RoundUp";
Rounding[Rounding.RoundUpOverHalf] = "RoundUpOverHalf";

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DashboardComponent = (function () {
    function DashboardComponent(dashboardService) {
        var _this = this;
        this.dashboardService = dashboardService;
        this.layoutChange = new EventEmitter();
        dashboardService.layout$.subscribe(function (layout) { return _this.layoutChange.emit(layout); });
    }
    Object.defineProperty(DashboardComponent.prototype, "layout", {
        set: /**
         * @param {?} layout
         * @return {?}
         */
        function (layout) {
            if (layout) {
                this.dashboardService.layout$.next(layout);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DashboardComponent.prototype, "options", {
        set: /**
         * @param {?} options
         * @return {?}
         */
        function (options) {
            this.dashboardService.options$.next(__assign({}, defaultOptions, options));
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Set the initial dimensions
     */
    /**
     * Set the initial dimensions
     * @return {?}
     */
    DashboardComponent.prototype.ngAfterViewInit = /**
     * Set the initial dimensions
     * @return {?}
     */
    function () {
        this.dashboardService.setDimensions(this.dashboardElement.nativeElement.offsetWidth, this.dashboardElement.nativeElement.offsetHeight);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DashboardComponent.prototype.onResize = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.dashboardService.setDimensions(event.width, event.height);
    };
    DashboardComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-dashboard',
                    template: "<div #dashboard class=\"dashboard-container\" [style.height.px]=\"dashboardService.height$ | async\">\n    <div (uxResize)=\"onResize($event)\" [throttle]=\"16\" class=\"dashboard\">\n        <ng-content></ng-content>\n    </div>\n    \n    <div class=\"position-indicator\" *ngIf=\"(dashboardService.placeholder$ | async).visible\" \n        [style.left.px]=\"(dashboardService.placeholder$ | async).x\" \n        [style.top.px]=\"(dashboardService.placeholder$ | async).y\" \n        [style.width.px]=\"(dashboardService.placeholder$ | async).width\"\n        [style.height.px]=\"(dashboardService.placeholder$ | async).height\"></div>\n</div>",
                    providers: [DashboardService],
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    DashboardComponent.ctorParameters = function () { return [
        { type: DashboardService, },
    ]; };
    DashboardComponent.propDecorators = {
        "layout": [{ type: Input },],
        "options": [{ type: Input },],
        "layoutChange": [{ type: Output },],
        "dashboardElement": [{ type: ViewChild, args: ['dashboard',] },],
    };
    return DashboardComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DashboardWidgetComponent = (function () {
    function DashboardWidgetComponent(dashboardService) {
        var _this = this;
        this.dashboardService = dashboardService;
        this.colSpan = 1;
        this.rowSpan = 1;
        this.resizable = false;
        this.x = 0;
        this.y = 0;
        this.width = 100;
        this.height = 100;
        this.padding = 0;
        this.zIndex = 0;
        this._column = { regular: undefined, stacked: undefined };
        this._row = { regular: undefined, stacked: undefined };
        this._columnSpan = { regular: 1, stacked: 1 };
        this._rowSpan = { regular: 1, stacked: 1 };
        this._subscription = dashboardService.options$.subscribe(function () { return _this.update(); });
    }
    /**
     * @return {?}
     */
    DashboardWidgetComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this._columnSpan.regular = this.colSpan;
        this._rowSpan.regular = this.rowSpan;
        if (!this.id) {
            console.warn('Dashboard Widget is missing an ID.');
            // set random id - keeps things working but prevents exporting of positions
            this.id = Math.floor(Math.random() * 100000).toString();
        }
    };
    /**
     * @return {?}
     */
    DashboardWidgetComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        // add the widget to the dashboard
        this.dashboardService.addWidget(this);
        // apply the current options
        this.update();
    };
    /**
     * If component is removed, then unregister it from the service
     */
    /**
     * If component is removed, then unregister it from the service
     * @return {?}
     */
    DashboardWidgetComponent.prototype.ngOnDestroy = /**
     * If component is removed, then unregister it from the service
     * @return {?}
     */
    function () {
        this._subscription.unsubscribe();
        this.dashboardService.removeWidget(this);
    };
    /**
     * Apply the current dashboard options
     */
    /**
     * Apply the current dashboard options
     * @return {?}
     */
    DashboardWidgetComponent.prototype.update = /**
     * Apply the current dashboard options
     * @return {?}
     */
    function () {
        // get the current options at the time
        var _a = this.dashboardService.options, padding = _a.padding, columns = _a.columns;
        this.padding = padding;
        this._columnSpan.stacked = columns;
    };
    /**
     * Set the actual position and size values
     */
    /**
     * Set the actual position and size values
     * @return {?}
     */
    DashboardWidgetComponent.prototype.render = /**
     * Set the actual position and size values
     * @return {?}
     */
    function () {
        this.x = this.getColumn() * this.dashboardService.getColumnWidth();
        this.y = this.getRow() * this.dashboardService.getRowHeight();
        this.width = this.getColumnSpan() * this.dashboardService.getColumnWidth();
        this.height = this.getRowSpan() * this.dashboardService.getRowHeight();
    };
    /**
     * @return {?}
     */
    DashboardWidgetComponent.prototype.getColumn = /**
     * @return {?}
     */
    function () {
        return this.getStackableValue(this._column);
    };
    /**
     * @return {?}
     */
    DashboardWidgetComponent.prototype.getRow = /**
     * @return {?}
     */
    function () {
        return this.getStackableValue(this._row);
    };
    /**
     * @param {?} column
     * @param {?=} render
     * @return {?}
     */
    DashboardWidgetComponent.prototype.setColumn = /**
     * @param {?} column
     * @param {?=} render
     * @return {?}
     */
    function (column, render) {
        if (render === void 0) { render = true; }
        this.setStackableValue(this._column, column);
        if (render) {
            this.render();
        }
    };
    /**
     * @param {?} row
     * @param {?=} render
     * @return {?}
     */
    DashboardWidgetComponent.prototype.setRow = /**
     * @param {?} row
     * @param {?=} render
     * @return {?}
     */
    function (row, render) {
        if (render === void 0) { render = true; }
        this.setStackableValue(this._row, row);
        if (render) {
            this.render();
        }
    };
    /**
     * @return {?}
     */
    DashboardWidgetComponent.prototype.getColumnSpan = /**
     * @return {?}
     */
    function () {
        return this.getStackableValue(this._columnSpan);
    };
    /**
     * @return {?}
     */
    DashboardWidgetComponent.prototype.getRowSpan = /**
     * @return {?}
     */
    function () {
        return this.getStackableValue(this._rowSpan);
    };
    /**
     * @param {?} columnSpan
     * @param {?=} render
     * @return {?}
     */
    DashboardWidgetComponent.prototype.setColumnSpan = /**
     * @param {?} columnSpan
     * @param {?=} render
     * @return {?}
     */
    function (columnSpan, render) {
        if (render === void 0) { render = true; }
        this.setStackableValue(this._columnSpan, columnSpan);
        if (render) {
            this.render();
        }
    };
    /**
     * @param {?} rowSpan
     * @param {?=} render
     * @return {?}
     */
    DashboardWidgetComponent.prototype.setRowSpan = /**
     * @param {?} rowSpan
     * @param {?=} render
     * @return {?}
     */
    function (rowSpan, render) {
        if (render === void 0) { render = true; }
        this.setStackableValue(this._rowSpan, rowSpan);
        if (render) {
            this.render();
        }
    };
    /**
     * @return {?}
     */
    DashboardWidgetComponent.prototype.bringToFront = /**
     * @return {?}
     */
    function () {
        this.zIndex = 1;
    };
    /**
     * @return {?}
     */
    DashboardWidgetComponent.prototype.sendToBack = /**
     * @return {?}
     */
    function () {
        this.zIndex = 0;
    };
    /**
     * @param {?} x
     * @param {?} y
     * @param {?} width
     * @param {?} height
     * @return {?}
     */
    DashboardWidgetComponent.prototype.setBounds = /**
     * @param {?} x
     * @param {?} y
     * @param {?} width
     * @param {?} height
     * @return {?}
     */
    function (x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    };
    /**
     * @param {?} handle
     * @param {?} event
     * @param {?} direction
     * @return {?}
     */
    DashboardWidgetComponent.prototype.dragstart = /**
     * @param {?} handle
     * @param {?} event
     * @param {?} direction
     * @return {?}
     */
    function (handle, event, direction) {
        this.dashboardService.onResizeStart({ widget: this, direction: direction, event: event, handle: handle });
    };
    /**
     * @param {?} handle
     * @param {?} event
     * @param {?} direction
     * @return {?}
     */
    DashboardWidgetComponent.prototype.drag = /**
     * @param {?} handle
     * @param {?} event
     * @param {?} direction
     * @return {?}
     */
    function (handle, event, direction) {
        this.dashboardService.onResizeDrag({ widget: this, direction: direction, event: event, handle: handle });
    };
    /**
     * @return {?}
     */
    DashboardWidgetComponent.prototype.dragend = /**
     * @return {?}
     */
    function () {
        this.dashboardService.onResizeEnd();
    };
    /**
     * Allows automatic setting of stackable value
     * @param {?} property The current StackableValue object
     * @param {?} value The value to set in the appropriate field
     * @return {?}
     */
    DashboardWidgetComponent.prototype.setStackableValue = /**
     * Allows automatic setting of stackable value
     * @param {?} property The current StackableValue object
     * @param {?} value The value to set in the appropriate field
     * @return {?}
     */
    function (property, value) {
        if (this.dashboardService.stacked) {
            property.stacked = value;
        }
        else {
            property.regular = value;
        }
    };
    /**
     * Return the appropriate value from a stackable value
     * @param {?} property The Stackable value object
     * @return {?}
     */
    DashboardWidgetComponent.prototype.getStackableValue = /**
     * Return the appropriate value from a stackable value
     * @param {?} property The Stackable value object
     * @return {?}
     */
    function (property) {
        return this.dashboardService.stacked ? property.stacked : property.regular;
    };
    DashboardWidgetComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-dashboard-widget',
                    template: "<div class=\"widget-content widget-col-span-{{ getColumnSpan() }} widget-row-span-{{ getRowSpan() }}\">\n    <ng-content></ng-content>\n</div>\n\n<div uxDrag #handleTop class=\"resizer-handle handle-top\" \n    (dragstart)=\"dragstart(handleTop, $event, 0)\"\n    (drag)=\"drag(handleTop, $event, 0)\"\n    (dragend)=\"dragend()\"\n    [style.top.px]=\"padding\" \n    [hidden]=\"!resizable\">\n</div>\n\n<div uxDrag #handleTopRight class=\"resizer-handle handle-top-right\" \n    (dragstart)=\"dragstart(handleTopRight, $event, 1)\"\n    (drag)=\"drag(handleTopRight, $event, 1)\"\n    (dragend)=\"dragend()\"\n    [style.top.px]=\"padding\" \n    [style.right.px]=\"padding\" \n    [hidden]=\"!resizable && !(dashboardService.stacked$ | async)\">\n</div>\n\n<div uxDrag #handleRight class=\"resizer-handle handle-right\" \n    (dragstart)=\"dragstart(handleRight, $event, 2)\"\n    (drag)=\"drag(handleRight, $event, 2)\"\n    (dragend)=\"dragend()\"\n    [style.right.px]=\"padding\" \n    [hidden]=\"!resizable || (dashboardService.stacked$ | async)\">\n</div>\n\n<div uxDrag #handleBottomRight class=\"resizer-handle handle-bottom-right\" \n    (dragstart)=\"dragstart(handleBottomRight, $event, 3)\"\n    (drag)=\"drag(handleBottomRight, $event, 3)\"\n    (dragend)=\"dragend()\"\n    [style.bottom.px]=\"padding\" \n    [style.right.px]=\"padding\" \n    [hidden]=\"!resizable && !(dashboardService.stacked$ | async)\">\n</div>\n\n<div uxDrag #handleBottom class=\"resizer-handle handle-bottom\" \n    (dragstart)=\"dragstart(handleBottom, $event, 4)\"\n    (drag)=\"drag(handleBottom, $event, 4)\"\n    (dragend)=\"dragend()\"\n    [style.bottom.px]=\"padding\" \n    [hidden]=\"!resizable\">\n</div>\n\n<div uxDrag #handleBottomLeft class=\"resizer-handle handle-bottom-left\" \n    (dragstart)=\"dragstart(handleBottomLeft, $event, 5)\"\n    (drag)=\"drag(handleBottomLeft, $event, 5)\"\n    (dragend)=\"dragend()\"\n    [style.bottom.px]=\"padding\" \n    [style.left.px]=\"padding\" \n    [hidden]=\"!resizable && !(dashboardService.stacked$ | async)\">\n</div>\n\n<div uxDrag #handleLeft class=\"resizer-handle handle-left\" \n    (dragstart)=\"dragstart(handleLeft, $event, 6)\"\n    (drag)=\"drag(handleLeft, $event, 6)\"\n    (dragend)=\"dragend()\"\n    [style.left.px]=\"padding\" \n    [hidden]=\"!resizable || (dashboardService.stacked$ | async)\">\n</div>\n\n<div uxDrag #handleTopLeft class=\"resizer-handle handle-top-left\" \n    (dragstart)=\"dragstart(handleTopLeft, $event, 7)\"\n    (drag)=\"drag(handleTopLeft, $event, 7)\"\n    (dragend)=\"dragend()\"\n    [style.top.px]=\"padding\" \n    [style.left.px]=\"padding\" \n    [hidden]=\"!resizable && !(dashboardService.stacked$ | async)\">\n</div>"
                },] },
    ];
    /** @nocollapse */
    DashboardWidgetComponent.ctorParameters = function () { return [
        { type: DashboardService, },
    ]; };
    DashboardWidgetComponent.propDecorators = {
        "id": [{ type: Input },],
        "col": [{ type: Input },],
        "row": [{ type: Input },],
        "colSpan": [{ type: Input },],
        "rowSpan": [{ type: Input },],
        "resizable": [{ type: Input },],
        "x": [{ type: HostBinding, args: ['style.left.px',] },],
        "y": [{ type: HostBinding, args: ['style.top.px',] },],
        "width": [{ type: HostBinding, args: ['style.width.px',] },],
        "height": [{ type: HostBinding, args: ['style.height.px',] },],
        "padding": [{ type: HostBinding, args: ['style.padding.px',] },],
        "zIndex": [{ type: HostBinding, args: ['style.z-index',] },],
    };
    return DashboardWidgetComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DragDirective = (function () {
    function DragDirective(elementRef, ngZone) {
        var _this = this;
        this.dragstart = new EventEmitter();
        this.drag = new EventEmitter();
        this.dragend = new EventEmitter();
        var /** @type {?} */ mousedown$ = fromEvent(elementRef.nativeElement, 'mousedown');
        var /** @type {?} */ mousemove$ = fromEvent(document, 'mousemove');
        var /** @type {?} */ mouseup$ = fromEvent(document, 'mouseup');
        this._subscription = mousedown$.subscribe(function (event) {
            event.preventDefault();
            // emit the drag start event
            ngZone.run(function () { return _this.dragstart.emit(event); });
            mousemove$.pipe(takeUntil(mouseup$)).subscribe(function (moveevent) {
                moveevent.preventDefault();
                // emit the drag start event
                ngZone.run(function () { return _this.drag.emit(moveevent); });
            }, null, function () { return ngZone.run(function () { return _this.dragend.emit(); }); });
        });
    }
    /**
     * @return {?}
     */
    DragDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._subscription.unsubscribe();
    };
    DragDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxDrag]'
                },] },
    ];
    /** @nocollapse */
    DragDirective.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: NgZone, },
    ]; };
    DragDirective.propDecorators = {
        "dragstart": [{ type: Output },],
        "drag": [{ type: Output },],
        "dragend": [{ type: Output },],
    };
    return DragDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DashboardDragHandleDirective = (function (_super) {
    __extends(DashboardDragHandleDirective, _super);
    function DashboardDragHandleDirective(widget, dashboardService, elementRef, ngZone) {
        var _this = _super.call(this, elementRef, ngZone) || this;
        _this.dragstart.subscribe(function (event) { return dashboardService.onDragStart({ widget: widget, direction: ActionDirection.Move, event: event }); });
        _this.drag.subscribe(function (event) { return dashboardService.onDrag({ widget: widget, direction: ActionDirection.Move, event: event }); });
        _this.dragend.subscribe(function () { return dashboardService.onDragEnd(); });
        return _this;
    }
    DashboardDragHandleDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxDashboardWidgetDragHandle], [ux-dashboard-widget-drag-handle]'
                },] },
    ];
    /** @nocollapse */
    DashboardDragHandleDirective.ctorParameters = function () { return [
        { type: DashboardWidgetComponent, },
        { type: DashboardService, },
        { type: ElementRef, },
        { type: NgZone, },
    ]; };
    return DashboardDragHandleDirective;
}(DragDirective));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DragModule = (function () {
    function DragModule() {
    }
    DragModule.decorators = [
        { type: NgModule, args: [{
                    exports: [DragDirective],
                    declarations: [DragDirective]
                },] },
    ];
    return DragModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ DECLARATIONS = [
    DashboardComponent,
    DashboardWidgetComponent,
    DashboardDragHandleDirective
];
var DashboardModule = (function () {
    function DashboardModule() {
    }
    DashboardModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        ResizeModule,
                        DragModule
                    ],
                    exports: DECLARATIONS,
                    declarations: DECLARATIONS,
                    providers: [DashboardService],
                },] },
    ];
    return DashboardModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ SPIN_BUTTON_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return SpinButtonComponent; }),
    multi: true
};
var SpinButtonComponent = (function () {
    function SpinButtonComponent() {
        this.type = 'text';
        this.placeholder = '';
        this.disabled = false;
        this.spinners = true;
        this.readOnly = true;
        this.scrolling = true;
        this.arrowkeys = true;
        this.valueChange = new EventEmitter();
        this.increment = new EventEmitter();
        this.decrement = new EventEmitter();
        this.onTouchedCallback = function () { };
        this.onChangeCallback = function () { };
    }
    Object.defineProperty(SpinButtonComponent.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () {
            return this._value;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._value = value;
            this.onChangeCallback(value);
            this.onTouchedCallback();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} event
     * @return {?}
     */
    SpinButtonComponent.prototype.scroll = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (!this.scrolling) {
            return;
        }
        if (event.deltaY > 0) {
            this.triggerDecrement();
        }
        else {
            this.triggerIncrement();
        }
        event.preventDefault();
    };
    /**
     * @return {?}
     */
    SpinButtonComponent.prototype.triggerIncrement = /**
     * @return {?}
     */
    function () {
        if (!this.disabled) {
            this.increment.emit();
        }
    };
    /**
     * @return {?}
     */
    SpinButtonComponent.prototype.triggerDecrement = /**
     * @return {?}
     */
    function () {
        if (!this.disabled) {
            this.decrement.emit();
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    SpinButtonComponent.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.value = value;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    SpinButtonComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChangeCallback = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    SpinButtonComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouchedCallback = fn;
    };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    SpinButtonComponent.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
    };
    SpinButtonComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-spin-button',
                    template: "<button class=\"spin-button\"\n        *ngIf=\"spinners\"\n        tabindex=\"-1\"\n        [disabled]=\"disabled\"\n        [attr.aria-label]=\"incrementAriaLabel\"\n        [attr.aria-disabled]=\"disabled\"\n        (click)=\"triggerIncrement()\">\n\n  <span class=\"hpe-icon hpe-up\"></span>\n</button>\n\n<input [type]=\"type\"\n       role=\"spinbutton\"\n       [min]=\"min\"\n       [max]=\"max\"\n       [tabindex]=\"0\"\n       class=\"form-control\"\n       [placeholder]=\"placeholder\"\n       [readOnly]=\"readOnly\"\n       [disabled]=\"disabled\"\n       [attr.aria-label]=\"inputAriaLabel\"\n       [attr.aria-disabled]=\"disabled\"\n       [attr.aria-valuemin]=\"min\"\n       [attr.aria-valuenow]=\"value\"\n       [attr.aria-valuemax]=\"max\"\n       [attr.aria-readonly]=\"readOnly\"\n       [ngModel]=\"value\"\n       (ngModelChange)=\"valueChange.emit($event)\"\n       (wheel)=\"scroll($event)\"\n       (keydown.arrowup)=\"arrowkeys ? triggerIncrement() : null; $event.preventDefault()\"\n       (keydown.arrowdown)=\"arrowkeys ? triggerDecrement() : null; $event.preventDefault()\">\n\n<button class=\"spin-button\"\n        *ngIf=\"spinners\"\n        tabindex=\"-1\"\n        [disabled]=\"disabled\"\n        [attr.aria-label]=\"decrementAriaLabel\"\n        [attr.aria-disabled]=\"disabled\"\n        (click)=\"triggerDecrement()\">\n\n  <span class=\"hpe-icon hpe-down\"></span>\n</button>",
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [SPIN_BUTTON_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    SpinButtonComponent.propDecorators = {
        "value": [{ type: Input },],
        "type": [{ type: Input },],
        "min": [{ type: Input },],
        "max": [{ type: Input },],
        "placeholder": [{ type: Input },],
        "disabled": [{ type: Input },],
        "spinners": [{ type: Input },],
        "readOnly": [{ type: Input },],
        "scrolling": [{ type: Input },],
        "arrowkeys": [{ type: Input },],
        "incrementAriaLabel": [{ type: Input },],
        "inputAriaLabel": [{ type: Input },],
        "decrementAriaLabel": [{ type: Input },],
        "valueChange": [{ type: Output },],
        "increment": [{ type: Output },],
        "decrement": [{ type: Output },],
    };
    return SpinButtonComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var SpinButtonModule = (function () {
    function SpinButtonModule() {
    }
    SpinButtonModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule
                    ],
                    exports: [SpinButtonComponent],
                    declarations: [SpinButtonComponent]
                },] },
    ];
    return SpinButtonModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var TimeFormatPipe = (function () {
    function TimeFormatPipe() {
    }
    /**
     * @param {?} value
     * @return {?}
     */
    TimeFormatPipe.prototype.transform = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return value < 10 ? '0' + value : value;
    };
    TimeFormatPipe.decorators = [
        { type: Pipe, args: [{
                    name: 'timeFormat'
                },] },
    ];
    return TimeFormatPipe;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ TIME_PICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return TimePickerComponent; }),
    multi: true
};
var TimePickerComponent = (function () {
    function TimePickerComponent() {
        var _this = this;
        this.arrowkeys = true;
        this.mousewheel = true;
        this.disabled = false;
        this.readOnly = false;
        this.showMeridian = false;
        this.showHours = true;
        this.showMinutes = true;
        this.showSeconds = false;
        this.showSpinners = true;
        this.hourStep = 1;
        this.minuteStep = 1;
        this.secondStep = 1;
        this.meridians = ['AM', 'PM'];
        this.valueChange = new EventEmitter();
        this.isValid = new EventEmitter();
        this.onTouchedCallback = function () { };
        this.onChangeCallback = function () { };
        this.value$ = new BehaviorSubject(new Date());
        // create observables that are derived from the latest value
        this.hour$ = this.value$.pipe(map(function (date) { return date.getHours(); }), map(function (hour) { return _this.showMeridian ? _this.getMeridianTime(hour) : hour; }));
        this.minute$ = this.value$.pipe(map(function (date) { return date.getMinutes(); }));
        this.second$ = this.value$.pipe(map(function (date) { return date.getSeconds(); }));
        this.meridian$ = this.value$.pipe(map(function (date) { return date.getHours() < 12 ? _this.meridians[0] : _this.meridians[1]; }));
        this.valid$ = this.value$.pipe(map(function (date) { return _this.checkValidity(date); }));
        this._meridian = this.meridians[0];
        this._subscription = this.valid$.pipe(distinctUntilChanged()).subscribe(function (valid) { return _this.isValid.emit(valid); });
    }
    Object.defineProperty(TimePickerComponent.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () {
            return new Date(this.value$.value);
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.value$.next(new Date(value));
            this.valueChange.emit(this.value$.value);
            this.onChangeCallback(this.value$.value);
            this.onTouchedCallback();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    TimePickerComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._subscription.unsubscribe();
    };
    /**
     * @param {?} value
     * @return {?}
     */
    TimePickerComponent.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.value = value;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    TimePickerComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChangeCallback = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    TimePickerComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouchedCallback = fn;
    };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    TimePickerComponent.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
    };
    /**
     * @param {?} hour
     * @return {?}
     */
    TimePickerComponent.prototype.getMeridianTime = /**
     * @param {?} hour
     * @return {?}
     */
    function (hour) {
        return hour > 12 ? hour - 12 : hour;
    };
    /**
     * @param {?} hour
     * @return {?}
     */
    TimePickerComponent.prototype.setHour = /**
     * @param {?} hour
     * @return {?}
     */
    function (hour) {
        var /** @type {?} */ date = this.value;
        date.setHours(hour ? hour : 0);
        this.value = date;
    };
    /**
     * @param {?} minute
     * @return {?}
     */
    TimePickerComponent.prototype.setMinute = /**
     * @param {?} minute
     * @return {?}
     */
    function (minute) {
        var /** @type {?} */ date = this.value;
        date.setMinutes(minute ? minute : 0);
        this.value = date;
    };
    /**
     * @param {?} seconds
     * @return {?}
     */
    TimePickerComponent.prototype.setSeconds = /**
     * @param {?} seconds
     * @return {?}
     */
    function (seconds) {
        var /** @type {?} */ date = this.value;
        date.setSeconds(seconds ? seconds : 0);
        this.value = date;
    };
    /**
     * @param {?=} arrowkey
     * @return {?}
     */
    TimePickerComponent.prototype.incrementHour = /**
     * @param {?=} arrowkey
     * @return {?}
     */
    function (arrowkey) {
        if (arrowkey === void 0) { arrowkey = false; }
        if (this.disabled || arrowkey && !this.arrowkeys) {
            return;
        }
        this.setHour(this.value.getHours() + this.hourStep);
    };
    /**
     * @param {?=} arrowkey
     * @return {?}
     */
    TimePickerComponent.prototype.decrementHour = /**
     * @param {?=} arrowkey
     * @return {?}
     */
    function (arrowkey) {
        if (arrowkey === void 0) { arrowkey = false; }
        if (this.disabled || arrowkey && !this.arrowkeys) {
            return;
        }
        this.setHour(this.value.getHours() - this.hourStep);
    };
    /**
     * @param {?=} arrowkey
     * @return {?}
     */
    TimePickerComponent.prototype.incrementMinute = /**
     * @param {?=} arrowkey
     * @return {?}
     */
    function (arrowkey) {
        if (arrowkey === void 0) { arrowkey = false; }
        if (this.disabled || arrowkey && !this.arrowkeys) {
            return;
        }
        this.setMinute(this.value.getMinutes() + this.minuteStep);
    };
    /**
     * @param {?=} arrowkey
     * @return {?}
     */
    TimePickerComponent.prototype.decrementMinute = /**
     * @param {?=} arrowkey
     * @return {?}
     */
    function (arrowkey) {
        if (arrowkey === void 0) { arrowkey = false; }
        if (this.disabled || arrowkey && !this.arrowkeys) {
            return;
        }
        this.setMinute(this.value.getMinutes() - this.minuteStep);
    };
    /**
     * @param {?=} arrowkey
     * @return {?}
     */
    TimePickerComponent.prototype.incrementSecond = /**
     * @param {?=} arrowkey
     * @return {?}
     */
    function (arrowkey) {
        if (arrowkey === void 0) { arrowkey = false; }
        if (this.disabled || arrowkey && !this.arrowkeys) {
            return;
        }
        this.setSeconds(this.value.getSeconds() + this.secondStep);
    };
    /**
     * @param {?=} arrowkey
     * @return {?}
     */
    TimePickerComponent.prototype.decrementSecond = /**
     * @param {?=} arrowkey
     * @return {?}
     */
    function (arrowkey) {
        if (arrowkey === void 0) { arrowkey = false; }
        if (this.disabled || arrowkey && !this.arrowkeys) {
            return;
        }
        this.setSeconds(this.value.getSeconds() - this.secondStep);
    };
    /**
     * @param {?} meridian
     * @return {?}
     */
    TimePickerComponent.prototype.selectMeridian = /**
     * @param {?} meridian
     * @return {?}
     */
    function (meridian) {
        this._meridian = meridian;
        // get the current time
        var /** @type {?} */ hour = this.value.getHours();
        // if we have selected AM
        if (meridian === this.meridians[0]) {
            if (hour >= 12) {
                this.setHour(hour - 12);
            }
        }
        // if we have selected PM
        if (meridian === this.meridians[1]) {
            if (hour < 12) {
                this.setHour(hour + 12);
            }
        }
    };
    /**
     * @param {?} date
     * @return {?}
     */
    TimePickerComponent.prototype.checkValidity = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        var /** @type {?} */ valid = true;
        if (this.min && date.getTime() <= this.min.getTime()) {
            valid = false;
        }
        if (this.max && date.getTime() >= this.max.getTime()) {
            valid = false;
        }
        return valid;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    TimePickerComponent.prototype.hourChange = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        // convert the string to a number
        var /** @type {?} */ hour = parseInt(value);
        var /** @type {?} */ currentHour = this.value.getHours();
        // if the value hasn't changed, do nothing
        if (hour === currentHour) {
            return;
        }
        // ensure the hours is valid
        if (!isNaN(hour)) {
            if (hour < 0) {
                hour = 0;
            }
            if (hour > (this.showMeridian ? 12 : 23)) {
                hour = this.showMeridian ? 12 : 23;
            }
        }
        hour = isNaN(hour) ? currentHour : hour;
        // if the number is invalid then restore it to the previous value
        if (this._meridian === this.meridians[0]) {
            if (hour >= 12) {
                hour -= 12;
            }
        }
        // if we have selected PM
        if (this._meridian === this.meridians[1]) {
            if (hour < 12) {
                hour += 12;
            }
        }
        this.setHour(hour);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    TimePickerComponent.prototype.minuteChange = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        // convert the string to a number
        var /** @type {?} */ minute = parseInt(value);
        var /** @type {?} */ currentMinute = this.value.getMinutes();
        // if the value hasn't changed, do nothing
        if (minute === currentMinute) {
            return;
        }
        // ensure the hours is valid
        if (!isNaN(minute)) {
            if (minute < 0) {
                minute = 59;
            }
            if (minute > 59) {
                minute = 0;
            }
        }
        // if the number is invalid then restore it to the previous value
        this.setMinute(isNaN(minute) ? currentMinute : minute);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    TimePickerComponent.prototype.secondChange = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        // convert the string to a number
        var /** @type {?} */ second = parseInt(value);
        var /** @type {?} */ currentSecond = this.value.getSeconds();
        // if the value hasn't changed, do nothing
        if (second === currentSecond) {
            return;
        }
        // ensure the hours is valid
        if (!isNaN(second)) {
            if (second < 0) {
                second = 0;
            }
            if (second > 59) {
                second = 59;
            }
        }
        // if the number is invalid then restore it to the previous value
        this.setSeconds(isNaN(second) ? currentSecond : second);
    };
    TimePickerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-time-picker',
                    template: "<div class=\"time-picker\" aria-label=\"Time picker\">\n\n    <div class=\"time-picker-column\" [class.has-error]=\"!(valid$ | async)\" *ngIf=\"showHours\">\n\n        <ux-spin-button\n            type=\"number\"\n            class=\"time-spinner\"\n            placeholder=\"HH\"\n            [min]=\"0\"\n            [max]=\"showMeridian ? 12 : 23\"\n            [value]=\"hour$ | async | timeFormat\"\n            (valueChange)=\"hourChange($event)\"\n            [spinners]=\"showSpinners\"\n            [disabled]=\"disabled\"\n            [readOnly]=\"readOnly\"\n            inputAriaLabel=\"hour\"\n            incrementAriaLabel=\"Increment the hour\"\n            decrementAriaLabel=\"Decrement the hour\"\n            (increment)=\"incrementHour()\"\n            (decrement)=\"decrementHour()\">\n        </ux-spin-button>\n\n    </div>\n\n    <div class=\"time-picker-separator\" *ngIf=\"showMinutes\">:</div>\n\n    <div class=\"time-picker-column\" [class.has-error]=\"!(valid$ | async)\" *ngIf=\"showMinutes\">\n\n        <ux-spin-button\n            type=\"number\"\n            class=\"time-spinner\"\n            placeholder=\"MM\"\n            [min]=\"0\"\n            [max]=\"59\"\n            [value]=\"minute$ | async | timeFormat\"\n            (valueChange)=\"minuteChange($event)\"\n            [spinners]=\"showSpinners\"\n            [disabled]=\"disabled\"\n            [readOnly]=\"readOnly\"\n            inputAriaLabel=\"minute\"\n            incrementAriaLabel=\"Increment the minute\"\n            decrementAriaLabel=\"Decrement the minute\"\n            (increment)=\"incrementMinute()\"\n            (decrement)=\"decrementMinute()\">\n        </ux-spin-button>\n\n    </div>\n\n    <div class=\"time-picker-separator\" *ngIf=\"showSeconds\">:</div>\n\n    <div class=\"time-picker-column\" [class.has-error]=\"!(valid$ | async)\" *ngIf=\"showSeconds\">\n\n        <ux-spin-button\n            type=\"number\"\n            class=\"time-spinner\"\n            type=\"number\"\n            placeholder=\"SS\"\n            [min]=\"0\"\n            [max]=\"59\"\n            [value]=\"second$ | async | timeFormat\"\n            (valueChange)=\"secondChange($event)\"\n            [spinners]=\"showSpinners\"\n            [disabled]=\"disabled\"\n            [readOnly]=\"readOnly\"\n            inputAriaLabel=\"seconds\"\n            incrementAriaLabel=\"Increment the second\"\n            decrementAriaLabel=\"Decrement the second\"\n            (increment)=\"incrementSecond()\"\n            (decrement)=\"decrementSecond()\">\n        </ux-spin-button>\n\n    </div>\n</div>\n\n<div class=\"time-picker-meridian\" *ngIf=\"showMeridian\">\n\n    <div class=\"btn-group\" role=\"radiogroup\">\n\n        <button class=\"btn button-toggle-accent\"\n                *ngFor=\"let meridian of meridians\"\n                role=\"radio\"\n                tabindex=\"0\"\n                [disabled]=\"disabled\"\n                (click)=\"selectMeridian(meridian)\"\n                [class.active]=\"meridian === (meridian$ | async)\"\n                [attr.aria-label]=\"meridian\"\n                [attr.aria-checked]=\"meridian === (meridian$ | async)\"\n                [attr.aria-disabled]=\"disabled\">\n                {{ meridian }}\n        </button>\n\n    </div>\n</div>",
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [TIME_PICKER_VALUE_ACCESSOR],
                    host: {
                        'aria-label': 'Time Picker'
                    }
                },] },
    ];
    /** @nocollapse */
    TimePickerComponent.ctorParameters = function () { return []; };
    TimePickerComponent.propDecorators = {
        "arrowkeys": [{ type: Input },],
        "mousewheel": [{ type: Input },],
        "disabled": [{ type: Input },],
        "readOnly": [{ type: Input },],
        "showMeridian": [{ type: Input },],
        "showHours": [{ type: Input },],
        "showMinutes": [{ type: Input },],
        "showSeconds": [{ type: Input },],
        "showSpinners": [{ type: Input },],
        "hourStep": [{ type: Input },],
        "minuteStep": [{ type: Input },],
        "secondStep": [{ type: Input },],
        "min": [{ type: Input },],
        "max": [{ type: Input },],
        "meridians": [{ type: Input },],
        "value": [{ type: Input },],
        "valueChange": [{ type: Output },],
        "isValid": [{ type: Output },],
    };
    return TimePickerComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var TimePickerModule = (function () {
    function TimePickerModule() {
    }
    TimePickerModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        SpinButtonModule
                    ],
                    exports: [TimePickerComponent],
                    declarations: [TimePickerComponent, TimeFormatPipe],
                },] },
    ];
    return TimePickerModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Convert a single dimension array to a double dimension array
 * @template T
 * @param {?} items the single dimension array to convert
 * @param {?} columns the number of items each array should have
 * @return {?}
 */
function gridify(items, columns) {
    // create a copy of array so not to effect the original
    items = items.slice(0);
    var /** @type {?} */ grid = [];
    while (items.length) {
        grid.push(items.splice(0, columns));
    }
    return grid;
}
/**
 * Create an array of numbers between two limits
 * @param {?} start the lower limit
 * @param {?} end the upper limit
 * @return {?}
 */
function range(start, end) {
    var /** @type {?} */ list = [];
    for (var /** @type {?} */ idx = start; idx <= end; idx++) {
        list.push(idx);
    }
    return list;
}
/**
 * Create an array of dates between two points
 * @param {?} start the date to start the array
 * @param {?} end the date to end the array
 * @return {?}
 */
function dateRange(start, end) {
    var /** @type {?} */ dates = [];
    // loop through all the days between the date range
    while (start <= end) {
        // add the date to the array
        dates.push(new Date(start));
        // move to the next day
        start.setDate(start.getDate() + 1);
    }
    return dates;
}
/**
 * Compare two dates to see if they are on the same day
 * @param {?} day1 the first date to compare
 * @param {?} day2 the second date to compare
 * @return {?}
 */
function compareDays(day1, day2) {
    return day1.getDate() === day2.getDate() &&
        day1.getMonth() === day2.getMonth() &&
        day1.getFullYear() === day2.getFullYear();
}
/**
 * Date comparison for use primarily with distinctUntilChanged
 * @param {?} dateOne
 * @param {?} dateTwo
 * @return {?}
 */
function dateComparator(dateOne, dateTwo) {
    return dateOne.getTime() === dateTwo.getTime();
}
/**
 * Timezone comparison for use primarily with distinctUntilChanged
 * @param {?} zoneOne
 * @param {?} zoneTwo
 * @return {?}
 */
function timezoneComparator(zoneOne, zoneTwo) {
    return zoneOne.name === zoneTwo.name && zoneOne.offset === zoneTwo.offset;
}
/**
 * Export an array of all the available months
 */
var /** @type {?} */ months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var /** @type {?} */ monthsShort = months.map(function (month) { return month.substring(0, 3); });
/**
 * Export an array of all the available days of the week
 */
var /** @type {?} */ weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
var /** @type {?} */ weekdaysShort = weekdays.map(function (weekday) { return weekday.substring(0, 3); });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DateTimePickerConfig = (function () {
    function DateTimePickerConfig() {
        this.showDate = true;
        this.showTime = true;
        this.showTimezone = true;
        this.showSeconds = false;
        this.showMeridian = true;
        this.showSpinners = true;
        this.weekdays = weekdaysShort;
        this.nowBtnText = 'Today';
        this.timezones = [
            { name: 'GMT-11', offset: 660 },
            { name: 'GMT-10', offset: 600 },
            { name: 'GMT-9', offset: 540 },
            { name: 'GMT-8', offset: 480 },
            { name: 'GMT-7', offset: 420 },
            { name: 'GMT-6', offset: 360 },
            { name: 'GMT-5', offset: 300 },
            { name: 'GMT-4', offset: 240 },
            { name: 'GMT-3', offset: 180 },
            { name: 'GMT-2', offset: 120 },
            { name: 'GMT-1', offset: 60 },
            { name: 'GMT', offset: 0 },
            { name: 'GMT+1', offset: -60 },
            { name: 'GMT+2', offset: -120 },
            { name: 'GMT+3', offset: -180 },
            { name: 'GMT+4', offset: -240 },
            { name: 'GMT+5', offset: -300 },
            { name: 'GMT+6', offset: -360 },
            { name: 'GMT+7', offset: -420 },
            { name: 'GMT+8', offset: -480 },
            { name: 'GMT+9', offset: -540 },
            { name: 'GMT+10', offset: -600 },
            { name: 'GMT+11', offset: -660 },
            { name: 'GMT+12', offset: -720 }
        ];
    }
    DateTimePickerConfig.decorators = [
        { type: Injectable },
    ];
    return DateTimePickerConfig;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DateTimePickerService = (function () {
    function DateTimePickerService(_config) {
        var _this = this;
        this._config = _config;
        this.mode$ = new BehaviorSubject(DatePickerMode.Day);
        this.date$ = new BehaviorSubject(new Date());
        this.timezone$ = new BehaviorSubject(this.getCurrentTimezone());
        this.selected$ = new BehaviorSubject(new Date());
        // the month and year to display in the viewport
        this.month$ = new BehaviorSubject(new Date().getMonth());
        this.year$ = new BehaviorSubject(new Date().getFullYear());
        this.showDate$ = new BehaviorSubject(this._config.showDate);
        this.showTime$ = new BehaviorSubject(this._config.showTime);
        this.showTimezone$ = new BehaviorSubject(this._config.showTimezone);
        this.showSeconds$ = new BehaviorSubject(this._config.showSeconds);
        this.showMeridian$ = new BehaviorSubject(this._config.showMeridian);
        this.showSpinners$ = new BehaviorSubject(this._config.showSpinners);
        this.weekdays$ = new BehaviorSubject(this._config.weekdays);
        this.nowBtnText$ = new BehaviorSubject(this._config.nowBtnText);
        this.timezones$ = new BehaviorSubject(this._config.timezones);
        this.header$ = new BehaviorSubject(null);
        this.headerEvent$ = new Subject();
        this.modeDirection = ModeDirection.None;
        // when the active date changes set the currently selected date
        this._subscription = this.selected$.pipe(distinctUntilChanged(dateComparator)).subscribe(function (date) {
            // the month and year displayed in the viewport should reflect the newly selected items
            // the month and year displayed in the viewport should reflect the newly selected items
            _this.setViewportMonth(date.getMonth());
            _this.setViewportYear(date.getFullYear());
            // emit the new date to the component host
            // emit the new date to the component host
            _this.date$.next(date);
        });
    }
    /**
     * @return {?}
     */
    DateTimePickerService.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._subscription.unsubscribe();
    };
    /**
     * @param {?} month
     * @return {?}
     */
    DateTimePickerService.prototype.setViewportMonth = /**
     * @param {?} month
     * @return {?}
     */
    function (month) {
        if (month < 0) {
            this.month$.next(11);
            this.year$.next(this.year$.value - 1);
        }
        else if (month > 11) {
            this.month$.next(0);
            this.year$.next(this.year$.value + 1);
        }
        else {
            this.month$.next(month);
        }
    };
    /**
     * @param {?} year
     * @return {?}
     */
    DateTimePickerService.prototype.setViewportYear = /**
     * @param {?} year
     * @return {?}
     */
    function (year) {
        this.year$.next(year);
    };
    /**
     * @param {?} day
     * @param {?} month
     * @param {?} year
     * @return {?}
     */
    DateTimePickerService.prototype.setDate = /**
     * @param {?} day
     * @param {?} month
     * @param {?} year
     * @return {?}
     */
    function (day, month, year) {
        var /** @type {?} */ date = new Date(this.selected$.value);
        date.setDate(day);
        date.setMonth(month);
        date.setFullYear(year);
        this.selected$.next(date);
    };
    /**
     * @return {?}
     */
    DateTimePickerService.prototype.setDateToNow = /**
     * @return {?}
     */
    function () {
        this.selected$.next(new Date());
    };
    /**
     * @param {?} mode
     * @return {?}
     */
    DateTimePickerService.prototype.setViewportMode = /**
     * @param {?} mode
     * @return {?}
     */
    function (mode) {
        this.mode$.next(mode);
    };
    /**
     * @return {?}
     */
    DateTimePickerService.prototype.goToChildMode = /**
     * @return {?}
     */
    function () {
        this.modeDirection = ModeDirection.Descend;
        switch (this.mode$.value) {
            case DatePickerMode.Year:
                return this.setViewportMode(DatePickerMode.Month);
            case DatePickerMode.Month:
                return this.setViewportMode(DatePickerMode.Day);
        }
    };
    /**
     * @return {?}
     */
    DateTimePickerService.prototype.goToParentMode = /**
     * @return {?}
     */
    function () {
        this.modeDirection = ModeDirection.Ascend;
        switch (this.mode$.value) {
            case DatePickerMode.Day:
                return this.setViewportMode(DatePickerMode.Month);
            case DatePickerMode.Month:
                return this.setViewportMode(DatePickerMode.Year);
        }
    };
    /**
     * @return {?}
     */
    DateTimePickerService.prototype.goToNext = /**
     * @return {?}
     */
    function () {
        this.headerEvent$.next(DatePickerHeaderEvent.Next);
    };
    /**
     * @return {?}
     */
    DateTimePickerService.prototype.goToPrevious = /**
     * @return {?}
     */
    function () {
        this.headerEvent$.next(DatePickerHeaderEvent.Previous);
    };
    /**
     * @param {?} header
     * @return {?}
     */
    DateTimePickerService.prototype.setHeader = /**
     * @param {?} header
     * @return {?}
     */
    function (header) {
        this.header$.next(header);
    };
    /**
     * @return {?}
     */
    DateTimePickerService.prototype.getCurrentTimezone = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ offset = new Date().getTimezoneOffset();
        return this._config.timezones.find(function (timezone) { return timezone.offset === offset; });
    };
    /**
     * @param {?} timezone
     * @return {?}
     */
    DateTimePickerService.prototype.setTimezone = /**
     * @param {?} timezone
     * @return {?}
     */
    function (timezone) {
        this.timezone$.next(timezone);
    };
    DateTimePickerService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DateTimePickerService.ctorParameters = function () { return [
        { type: DateTimePickerConfig, },
    ]; };
    return DateTimePickerService;
}());
/** @enum {number} */
var DatePickerMode = {
    Day: 0,
    Month: 1,
    Year: 2,
};
DatePickerMode[DatePickerMode.Day] = "Day";
DatePickerMode[DatePickerMode.Month] = "Month";
DatePickerMode[DatePickerMode.Year] = "Year";
/** @enum {number} */
var ModeDirection = {
    None: 0,
    Ascend: 1,
    Descend: 2,
};
ModeDirection[ModeDirection.None] = "None";
ModeDirection[ModeDirection.Ascend] = "Ascend";
ModeDirection[ModeDirection.Descend] = "Descend";
/** @enum {number} */
var DatePickerHeaderEvent = {
    Previous: 0,
    Next: 1,
};
DatePickerHeaderEvent[DatePickerHeaderEvent.Previous] = "Previous";
DatePickerHeaderEvent[DatePickerHeaderEvent.Next] = "Next";

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DateTimePickerComponent = (function () {
    function DateTimePickerComponent(datepicker) {
        var _this = this;
        this.datepicker = datepicker;
        this.dateChange = new EventEmitter();
        this.timezoneChange = new EventEmitter();
        // expose enum to view
        this.DatePickerMode = DatePickerMode;
        this._subscription = new Subscription();
        var /** @type {?} */ valueChange = datepicker.selected$.pipe(distinctUntilChanged(dateComparator))
            .subscribe(function (date) { return _this.dateChange.emit(date); });
        var /** @type {?} */ timezoneChange = datepicker.timezone$.pipe(distinctUntilChanged(timezoneComparator))
            .subscribe(function (timezone) { return _this.timezoneChange.emit(timezone); });
    }
    Object.defineProperty(DateTimePickerComponent.prototype, "showDate", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.datepicker.showDate$.next(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerComponent.prototype, "showTime", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.datepicker.showTime$.next(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerComponent.prototype, "showTimezone", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.datepicker.showTimezone$.next(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerComponent.prototype, "showSeconds", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.datepicker.showSeconds$.next(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerComponent.prototype, "showMeridian", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.datepicker.showMeridian$.next(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerComponent.prototype, "showSpinners", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.datepicker.showSpinners$.next(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerComponent.prototype, "weekdays", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.datepicker.weekdays$.next(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerComponent.prototype, "nowBtnText", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.datepicker.nowBtnText$.next(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerComponent.prototype, "timezones", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.datepicker.timezones$.next(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerComponent.prototype, "date", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (!dateComparator(value, this.datepicker.selected$.value)) {
                this.datepicker.selected$.next(new Date(value));
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerComponent.prototype, "timezone", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.datepicker.timezone$.next(value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DateTimePickerComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._subscription.unsubscribe();
    };
    /**
     * Change the date to the current date and time
     */
    /**
     * Change the date to the current date and time
     * @return {?}
     */
    DateTimePickerComponent.prototype.setToNow = /**
     * Change the date to the current date and time
     * @return {?}
     */
    function () {
        // set the date to the current moment
        this.datepicker.setDateToNow();
    };
    DateTimePickerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-date-time-picker',
                    template: "<div class=\"calendar-container\">\n\n  <ux-date-time-picker-header></ux-date-time-picker-header>\n\n  <ng-container *ngIf=\"datepicker.showDate$ | async\" [ngSwitch]=\"datepicker.mode$ | async\">\n\n      <!-- Display days in the current month -->\n      <ux-date-time-picker-day-view *ngSwitchCase=\"DatePickerMode.Day\"></ux-date-time-picker-day-view>\n\n      <!-- Display the months in the current year -->\n      <ux-date-time-picker-month-view *ngSwitchCase=\"DatePickerMode.Month\"></ux-date-time-picker-month-view>\n\n      <!-- Display a decade -->\n      <ux-date-time-picker-year-view *ngSwitchCase=\"DatePickerMode.Year\"></ux-date-time-picker-year-view>\n\n  </ng-container>\n\n  <!-- Display a Time Picker -->\n  <ux-date-time-picker-time-view *ngIf=\"datepicker.showTime$ | async\"></ux-date-time-picker-time-view>\n\n</div>\n\n<button class=\"now-button\" aria-label=\"Set date to now\" (click)=\"setToNow()\">{{ datepicker.nowBtnText$ | async }}</button>",
                    providers: [DateTimePickerService],
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    DateTimePickerComponent.ctorParameters = function () { return [
        { type: DateTimePickerService, },
    ]; };
    DateTimePickerComponent.propDecorators = {
        "showDate": [{ type: Input },],
        "showTime": [{ type: Input },],
        "showTimezone": [{ type: Input },],
        "showSeconds": [{ type: Input },],
        "showMeridian": [{ type: Input },],
        "showSpinners": [{ type: Input },],
        "weekdays": [{ type: Input },],
        "nowBtnText": [{ type: Input },],
        "timezones": [{ type: Input },],
        "dateChange": [{ type: Output },],
        "timezoneChange": [{ type: Output },],
        "date": [{ type: Input },],
        "timezone": [{ type: Input },],
    };
    return DateTimePickerComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DayViewService = (function () {
    function DayViewService(_datepicker) {
        var _this = this;
        this._datepicker = _datepicker;
        this.grid$ = new BehaviorSubject([[]]);
        this.focused$ = new BehaviorSubject(null);
        this._subscription = combineLatest(_datepicker.month$, _datepicker.year$)
            .subscribe(function (_a) {
            var _b = __read(_a, 2), month = _b[0], year = _b[1];
            return _this.createDayGrid(month, year);
        });
    }
    /**
     * @return {?}
     */
    DayViewService.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._subscription.unsubscribe();
    };
    /**
     * @param {?} day
     * @param {?} month
     * @param {?} year
     * @return {?}
     */
    DayViewService.prototype.setFocus = /**
     * @param {?} day
     * @param {?} month
     * @param {?} year
     * @return {?}
     */
    function (day, month, year) {
        this.focused$.next({ day: day, month: month, year: year });
        // update the date picker to show the required month and year
        this._datepicker.setViewportMonth(month);
        this._datepicker.setViewportYear(year);
    };
    /**
     * @param {?} month
     * @param {?} year
     * @return {?}
     */
    DayViewService.prototype.createDayGrid = /**
     * @param {?} month
     * @param {?} year
     * @return {?}
     */
    function (month, year) {
        var _this = this;
        // update the header
        this._datepicker.setHeader(months[month] + ' ' + year);
        // find the lower and upper boundaries
        var /** @type {?} */ start = new Date(year, month, 1);
        var /** @type {?} */ end = new Date(year, month + 1, 0);
        // we always want to show from the sunday - this may include showing some dates from the previous month
        start.setDate(start.getDate() - start.getDay());
        // we also want to make sure that the range ends on a saturday
        end.setDate(end.getDate() + (6 - end.getDay()));
        // create an array of all the days to display
        var /** @type {?} */ dates = dateRange(start, end).map(function (date) {
            return ({
                day: date.getDate(),
                month: date.getMonth(),
                year: date.getFullYear(),
                date: date,
                isToday: _this.isToday(date),
                isActive: _this.isActive(date),
                isCurrentMonth: date.getMonth() === month
            });
        });
        // turn the dates into a grid
        var /** @type {?} */ items = gridify(dates, 7);
        this.grid$.next(items);
        // if no item has yet been focused then focus the first day of the month
        if ((this._datepicker.modeDirection === ModeDirection.None || this._datepicker.modeDirection === ModeDirection.Descend) && this.focused$.value === null) {
            // check if the selected item is visible
            var /** @type {?} */ selectedDay = dates.find(function (day) { return day.isCurrentMonth && day.isActive; });
            if (selectedDay) {
                this.setFocus(selectedDay.day, selectedDay.month, selectedDay.year);
            }
            else {
                // find the first day of the month
                var /** @type {?} */ first$$1 = dates.find(function (date) { return date.day === 1; });
                // focus the date
                this.setFocus(first$$1.day, first$$1.month, first$$1.year);
            }
        }
    };
    /**
     * Determine whether or not a specific date is today
     * @param {?} date The date to check
     * @return {?}
     */
    DayViewService.prototype.isToday = /**
     * Determine whether or not a specific date is today
     * @param {?} date The date to check
     * @return {?}
     */
    function (date) {
        return compareDays(new Date(), date);
    };
    /**
     * Determines whether or not a specific date is the selected one
     * @param {?} date the date to check
     * @return {?}
     */
    DayViewService.prototype.isActive = /**
     * Determines whether or not a specific date is the selected one
     * @param {?} date the date to check
     * @return {?}
     */
    function (date) {
        return compareDays(this._datepicker.selected$.value, date);
    };
    DayViewService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DayViewService.ctorParameters = function () { return [
        { type: DateTimePickerService, },
    ]; };
    return DayViewService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DayViewComponent = (function () {
    function DayViewComponent(datePicker, dayService) {
        var _this = this;
        this.datePicker = datePicker;
        this.dayService = dayService;
        this._subscription = datePicker.headerEvent$
            .subscribe(function (event) { return event === DatePickerHeaderEvent.Next ? _this.next() : _this.previous(); });
    }
    /**
     * @return {?}
     */
    DayViewComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._subscription.unsubscribe();
    };
    /**
     * Navigate to the previous page of dates
     */
    /**
     * Navigate to the previous page of dates
     * @return {?}
     */
    DayViewComponent.prototype.previous = /**
     * Navigate to the previous page of dates
     * @return {?}
     */
    function () {
        this.datePicker.setViewportMonth(this.datePicker.month$.value - 1);
    };
    /**
     * Navigate to the next page of dates
     */
    /**
     * Navigate to the next page of dates
     * @return {?}
     */
    DayViewComponent.prototype.next = /**
     * Navigate to the next page of dates
     * @return {?}
     */
    function () {
        this.datePicker.setViewportMonth(this.datePicker.month$.value + 1);
    };
    /**
     * Select a particular date
     * @param date the date to select
     */
    /**
     * Select a particular date
     * @param {?} date the date to select
     * @return {?}
     */
    DayViewComponent.prototype.select = /**
     * Select a particular date
     * @param {?} date the date to select
     * @return {?}
     */
    function (date) {
        // update the current date object
        this.datePicker.setDate(date.getDate(), date.getMonth(), date.getFullYear());
        // focus the newly selected date
        this.dayService.setFocus(date.getDate(), date.getMonth(), date.getFullYear());
    };
    /**
     * @param {?} index
     * @return {?}
     */
    DayViewComponent.prototype.trackWeekByFn = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        return index;
    };
    /**
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    DayViewComponent.prototype.trackDayByFn = /**
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    function (index, item) {
        return item.day + " " + item.month + " " + item.year;
    };
    /**
     * @param {?} item
     * @param {?} dayOffset
     * @return {?}
     */
    DayViewComponent.prototype.focusDate = /**
     * @param {?} item
     * @param {?} dayOffset
     * @return {?}
     */
    function (item, dayOffset) {
        // determine the date of the day
        var /** @type {?} */ target = new Date(item.date.setDate(item.date.getDate() + dayOffset));
        // identify which date should be focused
        this.dayService.setFocus(target.getDate(), target.getMonth(), target.getFullYear());
    };
    /**
     * @param {?} item
     * @return {?}
     */
    DayViewComponent.prototype.getTabbable = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        var /** @type {?} */ focused = this.dayService.focused$.value;
        var /** @type {?} */ grid = this.dayService.grid$.value;
        // if there is a focused month check if this is it
        if (focused) {
            // check if the focused day is visible
            var /** @type {?} */ isFocusedDayVisible = !!grid.find(function (row) { return !!row.find(function (_item) { return _item.day === focused.day && _item.month === focused.month && _item.year === focused.year; }); });
            if (isFocusedDayVisible) {
                return focused.day === item.day && focused.month === item.month && focused.year === item.year;
            }
        }
        // if there is no focusable day then check if there is a selected day
        var /** @type {?} */ isSelectedDayVisible = !!grid.find(function (row) { return !!row.find(function (day) { return day.isActive; }); });
        if (isSelectedDayVisible) {
            return item.isActive;
        }
        // otherwise make the first day tabbable
        return item.day === 1;
    };
    DayViewComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-date-time-picker-day-view',
                    template: "<table class=\"calendar\">\n    <thead>\n        <tr>\n            <th *ngFor=\"let day of datePicker.weekdays$ | async\" class=\"weekday\" [attr.aria-label]=\"day\">{{ day }}</th>\n        </tr>\n    </thead>\n\n    <tbody role=\"grid\">\n        <tr role=\"row\" *ngFor=\"let row of dayService.grid$ | async; trackBy: trackWeekByFn\">\n\n            <td *ngFor=\"let item of row; trackBy: trackDayByFn\" class=\"date-cell\" role=\"gridcell\">\n\n                <button class=\"date-button\"\n                        [focusIf]=\"(dayService.focused$ | async)?.day === item.day && (dayService.focused$ | async)?.month === item.month && (dayService.focused$ | async)?.year === item.year\"\n                        [attr.aria-label]=\"item.date | date\"\n                        [attr.aria-selected]=\"item.isActive\"\n                        [attr.aria-hidden]=\"!item.isCurrentMonth\"\n                        [class.current]=\"item.isToday\"\n                        [class.active]=\"item.isActive\"\n                        [class.preview]=\"!item.isCurrentMonth\"\n                        [tabindex]=\"getTabbable(item) ? 0 : -1\"\n                        (click)=\"select(item.date); $event.stopPropagation()\"\n                        (keydown.ArrowLeft)=\"focusDate(item, -1); $event.preventDefault()\"\n                        (keydown.ArrowRight)=\"focusDate(item, 1); $event.preventDefault()\"\n                        (keydown.ArrowUp)=\"focusDate(item, -7); $event.preventDefault()\"\n                        (keydown.ArrowDown)=\"focusDate(item, 7); $event.preventDefault()\">\n\n                    {{ item.date.getDate() }}\n                </button>\n\n            </td>\n        </tr>\n    </tbody>\n</table>",
                    providers: [DayViewService],
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    DayViewComponent.ctorParameters = function () { return [
        { type: DateTimePickerService, },
        { type: DayViewService, },
    ]; };
    return DayViewComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var HeaderComponent = (function () {
    function HeaderComponent(datepicker) {
        this.datepicker = datepicker;
        this.canAscend$ = this.datepicker.mode$.pipe(map(function (mode) { return mode !== DatePickerMode.Year; }));
        this.mode$ = this.datepicker.mode$.pipe(map(function (mode) {
            switch (mode) {
                case DatePickerMode.Day:
                    return 'Day';
                case DatePickerMode.Month:
                    return 'Month';
                case DatePickerMode.Year:
                    return 'Year';
            }
        }));
        this.headerAria$ = this.datepicker.mode$.pipe(map(function (mode) {
            switch (mode) {
                case DatePickerMode.Day:
                    return 'Switch to show months in the year';
                case DatePickerMode.Month:
                    return 'Switch to show years in the decade';
                case DatePickerMode.Year:
                    return '';
            }
        }));
        this.previousAria$ = this.datepicker.mode$.pipe(map(function (mode) {
            switch (mode) {
                case DatePickerMode.Day:
                    return 'Previous month';
                case DatePickerMode.Month:
                    return 'Previous year';
                case DatePickerMode.Year:
                    return 'Previous decade';
            }
        }));
        this.nextAria$ = this.datepicker.mode$.pipe(map(function (mode) {
            switch (mode) {
                case DatePickerMode.Day:
                    return 'Next month';
                case DatePickerMode.Month:
                    return 'Next year';
                case DatePickerMode.Year:
                    return 'Next decade';
            }
        }));
    }
    /**
     * @return {?}
     */
    HeaderComponent.prototype.previous = /**
     * @return {?}
     */
    function () {
        this.datepicker.goToPrevious();
    };
    /**
     * @return {?}
     */
    HeaderComponent.prototype.ascend = /**
     * @return {?}
     */
    function () {
        this.datepicker.goToParentMode();
    };
    /**
     * @return {?}
     */
    HeaderComponent.prototype.next = /**
     * @return {?}
     */
    function () {
        this.datepicker.goToNext();
    };
    HeaderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-date-time-picker-header',
                    template: "<header class=\"header\">\n\n  <button class=\"header-navigation\"\n          (click)=\"previous(); $event.stopPropagation()\"\n          [attr.aria-label]=\"previousAria$ | async\"\n          tabindex=\"0\">\n\n    <i class=\"hpe-icon hpe-previous\"></i>\n  </button>\n\n  <button class=\"header-title\"\n          [attr.aria-label]=\"headerAria$ | async\"\n          [class.active]=\"canAscend$ | async\"\n          (click)=\"ascend(); $event.stopPropagation()\"\n          [tabindex]=\"(canAscend$ | async) ? 0 : -1\">\n       {{ datepicker.header$ | async }}\n  </button>\n\n  <button class=\"header-navigation\"\n          (click)=\"next(); $event.stopPropagation()\"\n          [attr.aria-label]=\"nextAria$ | async\"\n          tabindex=\"0\">\n\n    <i class=\"hpe-icon hpe-next\"></i>\n  </button>\n</header>",
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    HeaderComponent.ctorParameters = function () { return [
        { type: DateTimePickerService, },
    ]; };
    return HeaderComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var MonthViewService = (function () {
    function MonthViewService(_datepicker) {
        var _this = this;
        this._datepicker = _datepicker;
        this.grid$ = new BehaviorSubject([[]]);
        this.focused$ = new BehaviorSubject(null);
        this._subscription = _datepicker.year$.subscribe(function (year) { return _this.createMonthGrid(year); });
    }
    /**
     * @return {?}
     */
    MonthViewService.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._subscription.unsubscribe();
    };
    /**
     * @param {?} month
     * @param {?} year
     * @return {?}
     */
    MonthViewService.prototype.setFocus = /**
     * @param {?} month
     * @param {?} year
     * @return {?}
     */
    function (month, year) {
        this.focused$.next({ month: month, year: year });
        // update the viewport to ensure focused month is visible
        this._datepicker.setViewportYear(year);
    };
    /**
     * @param {?} year
     * @return {?}
     */
    MonthViewService.prototype.createMonthGrid = /**
     * @param {?} year
     * @return {?}
     */
    function (year) {
        // update the header
        this._datepicker.setHeader(year.toString());
        // get the current year and month
        var /** @type {?} */ currentMonth = new Date().getMonth();
        var /** @type {?} */ currentYear = new Date().getFullYear();
        // get the currently selected month
        var /** @type {?} */ activeMonth = this._datepicker.selected$.value.getMonth();
        var /** @type {?} */ activeYear = this._datepicker.selected$.value.getFullYear();
        // create a 4x3 grid of month numbers
        var /** @type {?} */ months$$1 = range(0, 11).map(function (month) {
            return {
                name: monthsShort[month],
                month: month,
                year: year,
                isCurrentMonth: year === currentYear && month === currentMonth,
                isActiveMonth: year === activeYear && month === activeMonth
            };
        });
        // map these to the appropriate format
        var /** @type {?} */ items = gridify(months$$1, 4);
        // update the grid
        this.grid$.next(items);
        // if there is no focused month select the first one
        if (this._datepicker.modeDirection === ModeDirection.Descend && this.focused$.value === null) {
            // check if the selected month is in view
            var /** @type {?} */ selectedMonth = months$$1.find(function (month) { return month.isActiveMonth; });
            this.setFocus(selectedMonth ? selectedMonth.month : 0, year);
        }
    };
    MonthViewService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    MonthViewService.ctorParameters = function () { return [
        { type: DateTimePickerService, },
    ]; };
    return MonthViewService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var MonthViewComponent = (function () {
    function MonthViewComponent(_datePicker, monthService) {
        var _this = this;
        this._datePicker = _datePicker;
        this.monthService = monthService;
        this._subscription = _datePicker.headerEvent$
            .subscribe(function (event) { return event === DatePickerHeaderEvent.Next ? _this.next() : _this.previous(); });
    }
    /**
     * @return {?}
     */
    MonthViewComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._subscription.unsubscribe();
    };
    /**
     * Go to the previous year
     */
    /**
     * Go to the previous year
     * @return {?}
     */
    MonthViewComponent.prototype.previous = /**
     * Go to the previous year
     * @return {?}
     */
    function () {
        this._datePicker.setViewportYear(this._datePicker.year$.value - 1);
    };
    /**
     * Go to the next year
     */
    /**
     * Go to the next year
     * @return {?}
     */
    MonthViewComponent.prototype.next = /**
     * Go to the next year
     * @return {?}
     */
    function () {
        this._datePicker.setViewportYear(this._datePicker.year$.value + 1);
    };
    /**
     * Select a month in the calendar
     * @param month the index of the month to select
     */
    /**
     * Select a month in the calendar
     * @param {?} month the index of the month to select
     * @return {?}
     */
    MonthViewComponent.prototype.select = /**
     * Select a month in the calendar
     * @param {?} month the index of the month to select
     * @return {?}
     */
    function (month) {
        this._datePicker.setViewportMonth(month);
        // show the day picker
        this._datePicker.goToChildMode();
    };
    /**
     * @param {?} item
     * @param {?} monthOffset
     * @return {?}
     */
    MonthViewComponent.prototype.focusMonth = /**
     * @param {?} item
     * @param {?} monthOffset
     * @return {?}
     */
    function (item, monthOffset) {
        var /** @type {?} */ targetMonth = item.month + monthOffset;
        var /** @type {?} */ targetYear = item.year;
        if (targetMonth < 0) {
            targetMonth += 12;
            targetYear -= 1;
        }
        if (targetMonth >= 12) {
            targetMonth -= 12;
            targetYear += 1;
        }
        this.monthService.setFocus(targetMonth, targetYear);
    };
    /**
     * @param {?} index
     * @return {?}
     */
    MonthViewComponent.prototype.trackRowByFn = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        return index;
    };
    /**
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    MonthViewComponent.prototype.trackMonthByFn = /**
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    function (index, item) {
        return item.month + " " + item.year;
    };
    /**
     * @param {?} item
     * @return {?}
     */
    MonthViewComponent.prototype.getTabbable = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        var /** @type {?} */ focused = this.monthService.focused$.value;
        var /** @type {?} */ grid = this.monthService.grid$.value;
        // if there is a focused month check if this is it
        if (focused) {
            // check if the focused month is visible
            var /** @type {?} */ isFocusedMonthVisible = !!grid.find(function (row) { return !!row.find(function (_item) { return _item.month === focused.month && _item.year === focused.year; }); });
            if (isFocusedMonthVisible) {
                return focused.month === item.month && focused.year === item.year;
            }
        }
        // if there is no focusable month then check if there is a selected month
        var /** @type {?} */ isSelectedMonthVisible = !!grid.find(function (row) { return !!row.find(function (month) { return month.isActiveMonth; }); });
        if (isSelectedMonthVisible) {
            return item.isActiveMonth;
        }
        // otherwise make the first month tabbable
        return item.month === 0;
    };
    MonthViewComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-date-time-picker-month-view',
                    template: "<div class=\"calendar\" role=\"grid\">\n  <div class=\"calendar-row\" *ngFor=\"let row of monthService.grid$ | async; trackBy: trackRowByFn\" role=\"row\">\n\n    <button role=\"gridcell\"\n         class=\"calendar-item\"\n         *ngFor=\"let item of row; trackBy: trackMonthByFn\"\n         [focusIf]=\"(monthService.focused$ | async)?.month === item.month && (monthService.focused$ | async)?.year === item.year\"\n         [tabindex]=\"getTabbable(item) ? 0 : -1\"\n         [attr.aria-label]=\"item.name + ' ' + item.year\"\n         [attr.aria-selected]=\"item.isActiveMonth\"\n         [class.active]=\"item.isActiveMonth\"\n         [class.current]=\"item.isCurrentMonth\"\n         (click)=\"select(item.month); $event.stopPropagation()\"\n         (keydown.ArrowLeft)=\"focusMonth(item, -1); $event.preventDefault()\"\n         (keydown.ArrowRight)=\"focusMonth(item, 1); $event.preventDefault()\"\n         (keydown.ArrowUp)=\"focusMonth(item, -4); $event.preventDefault()\"\n         (keydown.ArrowDown)=\"focusMonth(item, 4); $event.preventDefault()\">\n         {{ item.name }}\n    </button>\n  </div>\n</div>\n",
                    providers: [MonthViewService],
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    MonthViewComponent.ctorParameters = function () { return [
        { type: DateTimePickerService, },
        { type: MonthViewService, },
    ]; };
    return MonthViewComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var TimeViewComponent = (function () {
    function TimeViewComponent(datepicker) {
        this.datepicker = datepicker;
    }
    /**
     * @param {?} name
     * @return {?}
     */
    TimeViewComponent.prototype.selectTimezone = /**
     * @param {?} name
     * @return {?}
     */
    function (name) {
        var /** @type {?} */ timezones = this.datepicker.timezones$.value;
        // find matching timezone
        var /** @type {?} */ timezone = timezones.find(function (_timezone) { return _timezone.name === name; });
        if (timezone) {
            this.datepicker.setTimezone(timezone);
        }
    };
    /**
     * @return {?}
     */
    TimeViewComponent.prototype.incrementTimezone = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ timezone = this.datepicker.timezone$.value;
        var /** @type {?} */ timezones = this.datepicker.timezones$.value;
        var /** @type {?} */ currentZone = timezones.findIndex(function (zone) { return zone.name === timezone.name && zone.offset === timezone.offset; });
        // try to get the previous zone
        this.datepicker.setTimezone(timezones[currentZone + 1] ? timezones[currentZone + 1] : timezones[currentZone]);
    };
    /**
     * @return {?}
     */
    TimeViewComponent.prototype.decrementTimezone = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ timezone = this.datepicker.timezone$.value;
        var /** @type {?} */ timezones = this.datepicker.timezones$.value;
        var /** @type {?} */ currentZone = timezones.findIndex(function (zone) { return zone.name === timezone.name && zone.offset === timezone.offset; });
        // try to get the previous zone
        this.datepicker.setTimezone(timezones[currentZone - 1] ? timezones[currentZone - 1] : timezones[currentZone]);
    };
    TimeViewComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-date-time-picker-time-view',
                    template: "<ux-time-picker *ngIf=\"datepicker.showTime$ | async\"\n    [value]=\"datepicker.selected$ | async\"\n    (valueChange)=\"datepicker.selected$.next($event)\"\n    [showSeconds]=\"datepicker.showSeconds$ | async\"\n    [showMeridian]=\"datepicker.showMeridian$ | async\"\n    [showSpinners]=\"datepicker.showSpinners$ | async\">\n</ux-time-picker>\n\n<ng-container *ngIf=\"datepicker.showTimezone$ | async\">\n\n    <div class=\"time-zone-picker\" *ngIf=\"datepicker.showSpinners$ | async\">\n\n        <ux-spin-button\n            class=\"time-zone-spinner\"\n            [value]=\"(datepicker.timezone$ | async).name\"\n            [readOnly]=\"true\"\n            (increment)=\"incrementTimezone()\"\n            (decrement)=\"decrementTimezone()\"\n            inputAriaLabel=\"Time Zone\"\n            incrementAriaLabel=\"Switch to the next time zone\"\n            decrementAriaLabel=\"Switch to the previous time zone\">\n        </ux-spin-button>\n    </div>\n\n    <div class=\"time-zone-picker\" *ngIf=\"!(datepicker.showSpinners$ | async)\">\n\n        <select class=\"form-control time-zone-select\"\n                tabindex=\"0\"\n                [ngModel]=\"(datepicker.timezone$ | async).name\"\n                (ngModelChange)=\"selectTimezone($event)\"\n                aria-label=\"Timezone\"\n                [attr.aria-valuenow]=\"(datepicker.timezone$ | async).name\">\n\n            <option *ngFor=\"let zone of datepicker.timezones$ | async\"\n                    [selected]=\"zone.name === (datepicker.timezone$ | async).name\"\n                    [value]=\"zone.name\">\n                {{ zone?.name }}\n            </option>\n\n        </select>\n    </div>\n\n</ng-container>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    TimeViewComponent.ctorParameters = function () { return [
        { type: DateTimePickerService, },
    ]; };
    return TimeViewComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var YearViewService = (function () {
    function YearViewService(_datepicker) {
        var _this = this;
        this._datepicker = _datepicker;
        this.grid$ = new BehaviorSubject([[]]);
        this.focused$ = new BehaviorSubject(null);
        this._year = new Date().getFullYear();
        this._subscription = new Subscription();
        var /** @type {?} */ year = _datepicker.year$.subscribe(function (_year) { return _this.createYearGrid(_year); });
        var /** @type {?} */ event = _datepicker.headerEvent$
            .subscribe(function (_event) { return _event === DatePickerHeaderEvent.Next ? _this.goToNextDecade() : _this.goToPreviousDecade(); });
        this._subscription.add(year);
        this._subscription.add(event);
    }
    /**
     * @return {?}
     */
    YearViewService.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._subscription.unsubscribe();
    };
    /**
     * @param {?} year
     * @return {?}
     */
    YearViewService.prototype.setFocus = /**
     * @param {?} year
     * @return {?}
     */
    function (year) {
        this.focused$.next(year);
        this.createYearGrid(year);
    };
    /**
     * @return {?}
     */
    YearViewService.prototype.goToPreviousDecade = /**
     * @return {?}
     */
    function () {
        this.createYearGrid(this._year - 10);
    };
    /**
     * @return {?}
     */
    YearViewService.prototype.goToNextDecade = /**
     * @return {?}
     */
    function () {
        this.createYearGrid(this._year + 10);
    };
    /**
     * @param {?=} year
     * @return {?}
     */
    YearViewService.prototype.createYearGrid = /**
     * @param {?=} year
     * @return {?}
     */
    function (year) {
        var _this = this;
        if (year === void 0) { year = this._year; }
        this._year = year;
        // get the years to display
        var /** @type {?} */ decade = this.getDecade(year);
        var /** @type {?} */ currentYear = new Date().getFullYear();
        // produce items in the correct format
        var /** @type {?} */ items = decade.range.map(function (_year) {
            return {
                year: _year,
                isCurrentYear: _year === currentYear,
                isActiveYear: _year === _this._datepicker.year$.value
            };
        });
        // update the header text
        this._datepicker.setHeader(decade.start + ' - ' + decade.end);
        // create the grid
        this.grid$.next(gridify(items, 4));
    };
    /**
     * Get the years in the current decade to display
     * @param {?} year
     * @return {?}
     */
    YearViewService.prototype.getDecade = /**
     * Get the years in the current decade to display
     * @param {?} year
     * @return {?}
     */
    function (year) {
        // figure the start and end points
        var /** @type {?} */ start = (year - (year % 10));
        var /** @type {?} */ end = start + 9;
        // create an array containing all the numbers between the start and end points
        return { start: start, end: end, range: range(start, end) };
    };
    YearViewService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    YearViewService.ctorParameters = function () { return [
        { type: DateTimePickerService, },
    ]; };
    return YearViewService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var YearViewComponent = (function () {
    function YearViewComponent(_datePicker, yearService) {
        this._datePicker = _datePicker;
        this.yearService = yearService;
    }
    /**
     * @param {?} year
     * @return {?}
     */
    YearViewComponent.prototype.select = /**
     * @param {?} year
     * @return {?}
     */
    function (year) {
        this._datePicker.setViewportYear(year);
        // show the month picker
        this._datePicker.goToChildMode();
    };
    /**
     * @param {?} item
     * @param {?} yearOffset
     * @return {?}
     */
    YearViewComponent.prototype.focusYear = /**
     * @param {?} item
     * @param {?} yearOffset
     * @return {?}
     */
    function (item, yearOffset) {
        this.yearService.setFocus(item.year + yearOffset);
    };
    /**
     * @param {?} index
     * @return {?}
     */
    YearViewComponent.prototype.trackRowByFn = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        return index;
    };
    /**
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    YearViewComponent.prototype.trackYearByFn = /**
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    function (index, item) {
        return item.year;
    };
    /**
     * @param {?} item
     * @return {?}
     */
    YearViewComponent.prototype.getTabbable = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        var /** @type {?} */ focused = this.yearService.focused$.value;
        var /** @type {?} */ grid = this.yearService.grid$.value;
        // if there is a focused year check if this is it
        if (focused) {
            // check if the focused year is visible
            var /** @type {?} */ isFocusedYearVisible = !!grid.find(function (row) { return !!row.find(function (_item) { return _item.year === focused; }); });
            if (isFocusedYearVisible) {
                return focused === item.year;
            }
        }
        // if there is no focusable year then check if there is a selected year
        var /** @type {?} */ isSelectedYearVisible = !!grid.find(function (row) { return !!row.find(function (year) { return year.isActiveYear; }); });
        if (isSelectedYearVisible) {
            return item.isActiveYear;
        }
        // otherwise make the first month tabbable
        return grid[0][0].year === item.year;
    };
    YearViewComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-date-time-picker-year-view',
                    template: "<div class=\"calendar\" role=\"grid\">\n  <div class=\"calendar-row\" role=\"row\" *ngFor=\"let row of yearService.grid$ | async; trackBy: trackRowByFn\">\n\n    <button *ngFor=\"let item of row; trackBy: trackYearByFn\"\n         role=\"gridcell\"\n         class=\"calendar-item\"\n         [focusIf]=\"(yearService.focused$ | async) === item.year\"\n         [attr.aria-label]=\"item.year\"\n         [attr.aria-selected]=\"item.isActiveYear\"\n         [class.current]=\"item.isCurrentYear\"\n         [class.active]=\"item.isActiveYear\"\n         (click)=\"select(item.year); $event.stopPropagation()\"\n         (keydown.ArrowLeft)=\"focusYear(item, -1); $event.preventDefault()\"\n         (keydown.ArrowRight)=\"focusYear(item, 1); $event.preventDefault()\"\n         (keydown.ArrowUp)=\"focusYear(item, -4); $event.preventDefault()\"\n         (keydown.ArrowDown)=\"focusYear(item, 4); $event.preventDefault()\"\n         [tabindex]=\"getTabbable(item) ? 0 : -1\">\n         {{ item.year }}\n    </button>\n  </div>\n</div>\n",
                    providers: [YearViewService],
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    YearViewComponent.ctorParameters = function () { return [
        { type: DateTimePickerService, },
        { type: YearViewService, },
    ]; };
    return YearViewComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var FocusIfDirective = (function () {
    function FocusIfDirective(_elementRef) {
        this._elementRef = _elementRef;
        this.focusIfDelay = 0;
        this._timeout = null;
    }
    Object.defineProperty(FocusIfDirective.prototype, "focusIf", {
        set: /**
         * @param {?} focus
         * @return {?}
         */
        function (focus) {
            var _this = this;
            // if a timeout is pending then cancel it
            if (!focus && this._timeout !== null) {
                clearTimeout(this._timeout);
                this._timeout = null;
            }
            if (focus && this._timeout === null) {
                this._timeout = window.setTimeout(function () {
                    _this._elementRef.nativeElement.focus();
                    _this._timeout = null;
                }, this.focusIfDelay);
            }
        },
        enumerable: true,
        configurable: true
    });
    FocusIfDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[focusIf]'
                },] },
    ];
    /** @nocollapse */
    FocusIfDirective.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    FocusIfDirective.propDecorators = {
        "focusIfDelay": [{ type: Input },],
        "focusIf": [{ type: Input },],
    };
    return FocusIfDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var FocusIfModule = (function () {
    function FocusIfModule() {
    }
    FocusIfModule.decorators = [
        { type: NgModule, args: [{
                    exports: [FocusIfDirective],
                    declarations: [FocusIfDirective]
                },] },
    ];
    return FocusIfModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DateTimePickerModule = (function () {
    function DateTimePickerModule() {
    }
    DateTimePickerModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        TimePickerModule,
                        SpinButtonModule,
                        FocusIfModule
                    ],
                    exports: [DateTimePickerComponent],
                    declarations: [DateTimePickerComponent, HeaderComponent, DayViewComponent, MonthViewComponent, YearViewComponent, TimeViewComponent],
                    providers: [
                        DateTimePickerConfig
                    ]
                },] },
    ];
    return DateTimePickerModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var EboxComponent = (function () {
    function EboxComponent() {
    }
    EboxComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-ebox',
                    template: "<div class=\"ux-ebox-header\">\n    <ng-content select=\"ux-ebox-header\"></ng-content>\n</div>\n\n<div class=\"ux-ebox-content\">\n    <ng-content select=\"ux-ebox-content\"></ng-content>\n</div>",
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    return EboxComponent;
}());
var EboxHeaderDirective = (function () {
    function EboxHeaderDirective() {
    }
    EboxHeaderDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'ux-ebox-header'
                },] },
    ];
    return EboxHeaderDirective;
}());
var EboxContentDirective = (function () {
    function EboxContentDirective() {
    }
    EboxContentDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'ux-ebox-content'
                },] },
    ];
    return EboxContentDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var EboxModule = (function () {
    function EboxModule() {
    }
    EboxModule.decorators = [
        { type: NgModule, args: [{
                    exports: [EboxComponent, EboxContentDirective, EboxHeaderDirective],
                    declarations: [EboxComponent, EboxContentDirective, EboxHeaderDirective]
                },] },
    ];
    return EboxModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var FacetSelect = (function () {
    function FacetSelect(facet) {
        this.facet = facet;
    }
    return FacetSelect;
}());
var FacetDeselect = (function () {
    function FacetDeselect(facet) {
        this.facet = facet;
    }
    return FacetDeselect;
}());
var FacetDeselectAll = (function () {
    function FacetDeselectAll() {
    }
    return FacetDeselectAll;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var FacetContainerComponent = (function () {
    function FacetContainerComponent() {
        this.header = 'Selected:';
        this.clearTooltip = 'Clear All';
        this.emptyText = 'No Items';
        this.facets = [];
        this.facetsReorderable = false;
        this.facetsChange = new EventEmitter();
        this.events = new EventEmitter();
    }
    /**
     * @param {?} facet
     * @return {?}
     */
    FacetContainerComponent.prototype.selectFacet = /**
     * @param {?} facet
     * @return {?}
     */
    function (facet) {
        // push the facet on to the list
        this.facets.push(facet);
        // update the two way binding
        this.facetsChange.emit(this.facets);
        // trigger event
        this.triggerEvent(new FacetSelect(facet));
    };
    /**
     * @param {?} facet
     * @return {?}
     */
    FacetContainerComponent.prototype.deselectFacet = /**
     * @param {?} facet
     * @return {?}
     */
    function (facet) {
        // find the index of the item in the selected array
        var /** @type {?} */ idx = this.facets.findIndex(function (selectedFacet) { return facet === selectedFacet; });
        // if match there was no match then finish
        if (idx === -1) {
            return;
        }
        // remove the last item
        this.facets.splice(idx, 1);
        // update the two way binding
        this.facetsChange.emit(this.facets);
        // trigger event
        this.triggerEvent(new FacetDeselect(facet));
    };
    /**
     * @return {?}
     */
    FacetContainerComponent.prototype.deselectAllFacets = /**
     * @return {?}
     */
    function () {
        // empty the selected array
        this.facets = [];
        // update the two way binding
        this.facetsChange.emit(this.facets);
        // trigger event
        this.triggerEvent(new FacetDeselectAll());
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FacetContainerComponent.prototype.triggerEvent = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.events.next(event);
    };
    FacetContainerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-facet-container',
                    template: "<!-- Display Any Selected Facets -->\n<div class=\"facets-selected-container\">\n\n    <!-- Display Title an Clear Button -->\n    <div class=\"facets-selected-header-container\">\n\n        <!-- Show The Selected Text -->\n        <span class=\"facets-selected-header-label\">{{ header }}</span>\n\n        <!-- Add a Clear Button -->\n        <div class=\"facets-selected-clear-button\" tabindex=\"0\" [uxTooltip]=\"clearTooltip\" placement=\"left\" (click)=\"deselectAllFacets()\"\n            (keyup.enter)=\"deselectAllFacets()\" *ngIf=\"facets.length > 0\">\n\n            <svg class=\"facets-selected-clear-graphic\" viewBox=\"0 0 19 12\" shape-rendering=\"geometricPrecision\">\n                <rect class=\"light-grey\" x=\"0\" y=\"2\" width=\"7\" height=\"2\"></rect>\n                <rect class=\"dark-grey\" x=\"0\" y=\"5\" width=\"9\" height=\"2\"></rect>\n                <rect class=\"light-grey\" x=\"0\" y=\"8\" width=\"7\" height=\"2\"></rect>\n                <path class=\"dark-grey\" d=\"M9,1 h1 l9,9 v1 h-1 l-9,-9 v-1 Z\"></path>\n                <path class=\"dark-grey\" d=\"M9,11 v-1 l9,-9 h1 v1 l-9,9 h-1 Z\"></path>\n            </svg>\n        </div>\n\n    </div>\n\n    <!-- Display Tags For Selected Items -->\n    <div class=\"facets-selected-list\" uxReorderable [reorderingDisabled]=\"!facetsReorderable\" [(reorderableModel)]=\"facets\" (reorderableModelChange)=\"facetsChange.emit(facets)\">\n\n        <!-- Show Selected Tags -->\n        <div class=\"facet-selected-tag\" tabindex=\"0\" *ngFor=\"let facet of facets\" (mousedown)=\"$event.preventDefault()\" (click)=\"deselectFacet(facet)\" (keyup.enter)=\"deselectFacet(facet)\"\n             [uxReorderableModel]=\"facet\">\n\n            <!-- Display Label -->\n            <span class=\"facet-selected-tag-label\" uxReorderableHandle>{{ facet.title }}</span>\n\n            <!-- Display Remove Icon -->\n            <span class=\"hpe-icon hpe-close\"></span>\n        </div>\n\n    </div>\n\n    <!-- Show Message Here if No Facets Selected -->\n    <p class=\"facets-selected-none-label\" *ngIf=\"emptyText && facets.length === 0\">{{ emptyText }}</p>\n\n</div>\n\n<!-- Any Facet Elements Should be Added Here By User -->\n<div class=\"facets-region\">\n    <ng-content></ng-content>\n</div>"
                },] },
    ];
    /** @nocollapse */
    FacetContainerComponent.propDecorators = {
        "header": [{ type: Input },],
        "clearTooltip": [{ type: Input },],
        "emptyText": [{ type: Input },],
        "facets": [{ type: Input },],
        "facetsReorderable": [{ type: Input },],
        "facetsChange": [{ type: Output },],
        "events": [{ type: Output },],
    };
    return FacetContainerComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var FacetBaseComponent = (function () {
    function FacetBaseComponent(facetContainer, _elementRef) {
        var _this = this;
        this.facetContainer = facetContainer;
        this._elementRef = _elementRef;
        this.selected = [];
        this.selectedChange = new EventEmitter();
        this.events = new Subject();
        this._onDestroy = new Subject();
        if (facetContainer) {
            // subscribe to any deselect events from the facet container
            facetContainer.events.pipe(filter(function (event) { return event instanceof FacetDeselect; }), filter(function (event) { return !!_this.selected.find(function (facet) { return facet === event.facet; }); }), takeUntil(this._onDestroy)).subscribe(function (event) { return _this.deselectFacet(event.facet); });
            // subscribe to any deselect all events from facet container
            facetContainer.events.pipe(filter(function (event) { return event instanceof FacetDeselectAll; }), takeUntil(this._onDestroy)).subscribe(function (_) { return _this.deselectAll(); });
        }
    }
    /**
     * @return {?}
     */
    FacetBaseComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // check if there should be any facets initially selected
        if (this.facetContainer) {
            this.selected.forEach(function (facet) { return _this.facetContainer.selectFacet(facet); });
        }
    };
    /**
     * @return {?}
     */
    FacetBaseComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._onDestroy.next();
        this._onDestroy.complete();
    };
    /**
     * @param {?} facet
     * @return {?}
     */
    FacetBaseComponent.prototype.selectFacet = /**
     * @param {?} facet
     * @return {?}
     */
    function (facet) {
        // if the facet is disabled it should not be selected
        if (facet.disabled) {
            return;
        }
        // add the facet to the list of selected facets
        this.selected.push(facet);
        // send the new value to the event emitter
        this.selectedChange.emit(this.selected);
        // fire the event to the observable
        this.triggerEvent(new FacetSelect(facet));
        // tell the facet container about the selected facet
        if (this.facetContainer) {
            this.facetContainer.selectFacet(facet);
        }
    };
    /**
     * @param {?} facet
     * @return {?}
     */
    FacetBaseComponent.prototype.deselectFacet = /**
     * @param {?} facet
     * @return {?}
     */
    function (facet) {
        // find facet to remove
        var /** @type {?} */ index = this.selected.findIndex(function (selectedFacet) { return selectedFacet === facet; });
        // only continue if facet is found
        if (index !== -1) {
            // remove the facet from the selected list
            this.selected.splice(index, 1);
            // emit the changes to selected event emitter
            this.selectedChange.emit(this.selected);
            // fire the event to the observable
            this.triggerEvent(new FacetDeselect(facet));
            // deselect the facet in the facet container
            if (this.facetContainer) {
                this.facetContainer.deselectFacet(facet);
            }
        }
    };
    /**
     * @return {?}
     */
    FacetBaseComponent.prototype.deselectAll = /**
     * @return {?}
     */
    function () {
        // remove all selected facets
        this.selected = [];
        // fire the event to the observable
        this.triggerEvent(new FacetDeselectAll());
        // emit the changes to the selected event emitter
        this.selectedChange.emit(this.selected);
    };
    /**
     * @param {?} facet
     * @return {?}
     */
    FacetBaseComponent.prototype.toggleFacetSelection = /**
     * @param {?} facet
     * @return {?}
     */
    function (facet) {
        // if the facet is selected then deselect - otherwise select it
        if (this.isFacetSelected(facet)) {
            this.deselectFacet(facet);
        }
        else {
            this.selectFacet(facet);
        }
    };
    /**
     * @param {?} facet
     * @return {?}
     */
    FacetBaseComponent.prototype.isFacetSelected = /**
     * @param {?} facet
     * @return {?}
     */
    function (facet) {
        // determine if a facet is currently selected
        return !!this.selected.find(function (selectedFacet) { return selectedFacet === facet; });
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FacetBaseComponent.prototype.triggerEvent = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.events.next(event);
    };
    FacetBaseComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-facet-base',
                    template: '',
                },] },
    ];
    /** @nocollapse */
    FacetBaseComponent.ctorParameters = function () { return [
        { type: FacetContainerComponent, decorators: [{ type: Host },] },
        { type: ElementRef, },
    ]; };
    FacetBaseComponent.propDecorators = {
        "selected": [{ type: Input },],
        "selectedChange": [{ type: Output },],
        "events": [{ type: Output },],
    };
    return FacetBaseComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var FacetHeaderComponent = (function () {
    function FacetHeaderComponent() {
        this.canExpand = true;
        this.expanded = true;
        this.expandedChange = new EventEmitter();
    }
    /**
     * @return {?}
     */
    FacetHeaderComponent.prototype.toggleExpand = /**
     * @return {?}
     */
    function () {
        // if not expandable then do nothing
        if (this.canExpand) {
            this.expanded = !this.expanded;
            this.expandedChange.emit(this.expanded);
        }
    };
    FacetHeaderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-facet-header',
                    template: "<span class=\"facet-header-title\">{{ header }}</span>\n<span class=\"hpe-icon\" [class.hpe-down]=\"expanded\" [class.hpe-previous]=\"!expanded\" *ngIf=\"canExpand\"></span>",
                    host: {
                        'tabindex': '0',
                        '(click)': 'toggleExpand()',
                        '(keyup.enter)': 'toggleExpand()'
                    }
                },] },
    ];
    /** @nocollapse */
    FacetHeaderComponent.propDecorators = {
        "header": [{ type: Input },],
        "canExpand": [{ type: Input },],
        "expanded": [{ type: Input },],
        "expandedChange": [{ type: Output },],
    };
    return FacetHeaderComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var FacetCheckListComponent = (function (_super) {
    __extends(FacetCheckListComponent, _super);
    function FacetCheckListComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.facets = [];
        _this.scrollbar = true;
        _this.expanded = true;
        return _this;
    }
    FacetCheckListComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-facet-check-list',
                    template: "<ux-facet-header [header]=\"header\" [(expanded)]=\"expanded\"></ux-facet-header>\n\n<!-- Create a container which will show when section is expanded -->\n<div class=\"facet-check-list-container\" [class.facet-check-list-scrollbar]=\"scrollbar\" *ngIf=\"expanded\">\n\n    <!-- Iterate through each possible facet -->\n    <div class=\"facet-check-list-item\" *ngFor=\"let facet of facets\" [class.facet-active]=\"isFacetSelected(facet)\" tabindex=\"0\"\n        (click)=\"toggleFacetSelection(facet)\" (keyup.enter)=\"toggleFacetSelection(facet)\" [class.disabled]=\"facet.disabled\">\n\n        <!-- Show check icon to indicate the state -->\n        <span class=\"facet-check-list-item-check\">\n            <span class=\"hpe-icon hpe-active\"></span>\n        </span>\n\n        <!-- Display the title -->\n        <span class=\"facet-check-list-item-title\">{{ facet.title }}</span>\n\n        <!-- Display the count if specified -->\n        <span class=\"facet-check-list-item-count\" *ngIf=\"facet.count !== undefined\">({{ facet.count }})</span>\n    </div>\n</div>"
                },] },
    ];
    /** @nocollapse */
    FacetCheckListComponent.propDecorators = {
        "facets": [{ type: Input },],
        "header": [{ type: Input },],
        "scrollbar": [{ type: Input },],
        "expanded": [{ type: Input },],
    };
    return FacetCheckListComponent;
}(FacetBaseComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var FacetTypeaheadListComponent = (function (_super) {
    __extends(FacetTypeaheadListComponent, _super);
    function FacetTypeaheadListComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.expanded = true;
        _this.typeaheadConfig = {};
        _this.suggestions = [];
        _this.simplified = true;
        _this._nativeElement = /** @type {?} */ (_this._elementRef.nativeElement);
        _this._defaultTypeaheadConfig = {
            placeholder: '',
            maxResults: 50,
            minCharacters: 1
        };
        return _this;
    }
    /**
     * @return {?}
     */
    FacetTypeaheadListComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // wrap the observable and filter out any already selected items or any disabled items
        if (this.facets instanceof Observable) {
            // handle an observable of data
            this.typeaheadOptions = from(this.facets).pipe(map(function (facets) {
                // remove disabled facets, selected facets and facets that dont match search term
                return facets.filter(function (facet) { return !facet.disabled; })
                    .filter(function (facet) { return !_this.selected.find(function (selectedFacet) { return selectedFacet === facet; }); })
                    .filter(function (facet) { return facet.title.toUpperCase().includes(_this.searchQuery.toUpperCase()); });
            }));
        }
        else {
            // handle an array of data
            this.typeaheadOptions = of(this.facets).pipe(map(function (facets) {
                // remove disabled facets, selected facets and facets that dont match search term
                return facets.filter(function (facet) { return !facet.disabled; })
                    .filter(function (facet) { return !_this.selected.find(function (selectedFacet) { return selectedFacet === facet; }); })
                    .filter(function (facet) { return facet.title.toUpperCase().includes(_this.searchQuery.toUpperCase()); });
            }));
        }
        // provide default values for typeahead config
        for (var /** @type {?} */ prop in this._defaultTypeaheadConfig) {
            // check if prop has been defined in the users typeahead config - if not set default value
            if (this.typeaheadConfig.hasOwnProperty(prop) === false) {
                this.typeaheadConfig[prop] = this._defaultTypeaheadConfig[prop];
            }
        }
    };
    /**
     * @param {?} typeaheadOption
     * @return {?}
     */
    FacetTypeaheadListComponent.prototype.selectOption = /**
     * @param {?} typeaheadOption
     * @return {?}
     */
    function (typeaheadOption) {
        // check to make sure that the item is not currently selected
        if (this.selected.find(function (facet) { return facet === typeaheadOption.item; })) {
            return;
        }
        // select the facet
        this.selectFacet(typeaheadOption.item);
        // clear the typeahead
        this.searchQuery = '';
    };
    /**
     * @return {?}
     */
    FacetTypeaheadListComponent.prototype.scrollToFocused = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ dropdown = this._nativeElement.querySelector('.dropdown-menu');
        // delay to allow the typeahead ui to update
        setTimeout(function () {
            // find the currently active element if there is one
            var /** @type {?} */ activeElement = dropdown.querySelector('.dropdown-menu > li.active');
            if (activeElement) {
                // check if element is not in view
                var /** @type {?} */ elementBounds = activeElement.getBoundingClientRect();
                var /** @type {?} */ dropdownBounds = dropdown.getBoundingClientRect();
                if (elementBounds.top < dropdownBounds.top) {
                    dropdown.scrollTop += elementBounds.top - dropdownBounds.top;
                }
                if (elementBounds.bottom > dropdownBounds.bottom) {
                    dropdown.scrollTop += elementBounds.bottom - dropdownBounds.bottom;
                }
            }
        });
    };
    FacetTypeaheadListComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-facet-typeahead-list',
                    template: "<ux-facet-header [header]=\"header\" [(expanded)]=\"expanded\"></ux-facet-header>\n\n<div class=\"facet-typeahead-list-container\" *ngIf=\"expanded\">\n\n    <div class=\"facet-typeahead-list-selected-container\" *ngIf=\"suggestions?.length > 0\">\n\n        <div class=\"facet-typeahead-list-selected-option\" tabindex=\"0\" *ngFor=\"let facet of suggestions\" (click)=\"toggleFacetSelection(facet)\"\n            (keyup.enter)=\"toggleFacetSelection(facet)\">\n\n            <ux-checkbox [clickable]=\"false\" [value]=\"isFacetSelected(facet)\" [simplified]=\"simplified\">\n                <span class=\"facet-typeahead-list-selected-option-title\">{{ facet.title }}</span>\n                <span class=\"facet-typeahead-list-selected-option-count\">({{ facet.count }})</span>\n            </ux-checkbox>\n\n        </div>\n\n    </div>\n\n    <div class=\"facet-typeahead-list-control\">\n\n        <!-- Create Typeahead Control -->\n        <input type=\"text\" class=\"form-control\" [placeholder]=\"typeaheadConfig?.placeholder\" [typeahead]=\"typeaheadOptions\" [(ngModel)]=\"searchQuery\"\n            [typeaheadMinLength]=\"typeaheadConfig?.minCharacters\" [typeaheadOptionsLimit]=\"typeaheadConfig?.maxResults\" [typeaheadWaitMs]=\"typeaheadConfig?.delay\"\n            (typeaheadOnSelect)=\"selectOption($event)\" [typeaheadItemTemplate]=\"facetOptionTemplate\" (keyup.ArrowUp)=\"scrollToFocused()\" (keyup.ArrowDown)=\"scrollToFocused()\">\n\n    </div>\n\n</div>\n\n<ng-template #facetOptionTemplate let-model=\"item\" let-index=\"index\">\n    <p class=\"facet-typeahead-list-option\"><span [innerHTML]=\"model.title | facetTypeaheadHighlight: searchQuery\"></span> <span class=\"facet-typeahead-list-option-count\"\n            *ngIf=\"model.count\">({{ model.count }})</span></p>\n</ng-template>"
                },] },
    ];
    /** @nocollapse */
    FacetTypeaheadListComponent.propDecorators = {
        "facets": [{ type: Input },],
        "header": [{ type: Input },],
        "expanded": [{ type: Input },],
        "typeaheadConfig": [{ type: Input },],
        "suggestions": [{ type: Input },],
        "simplified": [{ type: Input },],
    };
    return FacetTypeaheadListComponent;
}(FacetBaseComponent));
var FacetTypeaheadHighlight = (function () {
    function FacetTypeaheadHighlight() {
    }
    /**
     * @param {?} value
     * @param {?} searchQuery
     * @return {?}
     */
    FacetTypeaheadHighlight.prototype.transform = /**
     * @param {?} value
     * @param {?} searchQuery
     * @return {?}
     */
    function (value, searchQuery) {
        var /** @type {?} */ regex = new RegExp(searchQuery, 'i');
        return value.replace(regex, "<b class=\"facet-typeahead-highlighted\">" + value.match(regex) + "</b>");
    };
    FacetTypeaheadHighlight.decorators = [
        { type: Pipe, args: [{
                    name: 'facetTypeaheadHighlight'
                },] },
    ];
    return FacetTypeaheadHighlight;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ uniqueTooltipId = 0;
var TooltipComponent = (function () {
    function TooltipComponent(_changeDetectorRef) {
        this._changeDetectorRef = _changeDetectorRef;
        /**
         * Define a unique id for each tooltip
         */
        this.id = "ux-tooltip-" + ++uniqueTooltipId;
        /**
         * Define the tooltip role
         */
        this.role = 'tooltip';
        /**
         * Allow a custom class to be added to the tooltip to allow custom styling
         */
        this.customClass = '';
        /**
         * Indicates whether or not the content is a string or a TemplateRef
         */
        this.isTemplateRef = false;
        /**
         * Emit when the tooltip need to update it's position
         */
        this.reposition$ = new Subject();
    }
    /** Cleanup after the component is destroyed */
    /**
     * Cleanup after the component is destroyed
     * @return {?}
     */
    TooltipComponent.prototype.ngOnDestroy = /**
     * Cleanup after the component is destroyed
     * @return {?}
     */
    function () {
        this.reposition$.complete();
    };
    /** Inform the parent directive that it needs to recalulate the position */
    /**
     * Inform the parent directive that it needs to recalulate the position
     * @return {?}
     */
    TooltipComponent.prototype.reposition = /**
     * Inform the parent directive that it needs to recalulate the position
     * @return {?}
     */
    function () {
        this.reposition$.next();
    };
    /** This will update the content of the tooltip and trigger change detection */
    /**
     * This will update the content of the tooltip and trigger change detection
     * @param {?} content
     * @return {?}
     */
    TooltipComponent.prototype.setContent = /**
     * This will update the content of the tooltip and trigger change detection
     * @param {?} content
     * @return {?}
     */
    function (content) {
        this.content = content;
        this.isTemplateRef = content instanceof TemplateRef;
        this._changeDetectorRef.markForCheck();
    };
    /** This will update the tooltip placement and trigger change detection */
    /**
     * This will update the tooltip placement and trigger change detection
     * @param {?} placement
     * @return {?}
     */
    TooltipComponent.prototype.setPlacement = /**
     * This will update the tooltip placement and trigger change detection
     * @param {?} placement
     * @return {?}
     */
    function (placement) {
        if (!placement) {
            return;
        }
        this.placement = placement;
        this._changeDetectorRef.markForCheck();
    };
    /** This will set a custom class on the tooltip and trigger change detection */
    /**
     * This will set a custom class on the tooltip and trigger change detection
     * @param {?} customClass
     * @return {?}
     */
    TooltipComponent.prototype.setClass = /**
     * This will set a custom class on the tooltip and trigger change detection
     * @param {?} customClass
     * @return {?}
     */
    function (customClass) {
        if (!customClass) {
            return;
        }
        this.customClass = customClass;
        this._changeDetectorRef.markForCheck();
    };
    /** Updates the context used by the TemplateRef */
    /**
     * Updates the context used by the TemplateRef
     * @param {?} context
     * @return {?}
     */
    TooltipComponent.prototype.setContext = /**
     * Updates the context used by the TemplateRef
     * @param {?} context
     * @return {?}
     */
    function (context) {
        if (!context) {
            return;
        }
        this.context = context;
        this._changeDetectorRef.markForCheck();
    };
    /** Specify the tooltip role attribute */
    /**
     * Specify the tooltip role attribute
     * @param {?} role
     * @return {?}
     */
    TooltipComponent.prototype.setRole = /**
     * Specify the tooltip role attribute
     * @param {?} role
     * @return {?}
     */
    function (role) {
        if (!role) {
            return;
        }
        this.role = role;
        this._changeDetectorRef.markForCheck();
    };
    TooltipComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-tooltip',
                    template: "<div class=\"tooltip in\" [id]=\"id\" [attr.role]=\"role\" [ngClass]=\"[placement, customClass]\">\n    <div class=\"tooltip-arrow\"></div>\n    <div class=\"tooltip-inner\" (cdkObserveContent)=\"reposition()\">\n        <ng-container *ngIf=\"!isTemplateRef\">{{ content }}</ng-container>\n        <ng-container *ngIf=\"isTemplateRef\" [ngTemplateOutlet]=\"content\" [ngTemplateOutletContext]=\"context\"></ng-container>\n    </div>\n</div>",
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    TooltipComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef, },
    ]; };
    return TooltipComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var TooltipService = (function () {
    function TooltipService() {
        this.shown$ = new Subject();
    }
    TooltipService.decorators = [
        { type: Injectable },
    ];
    return TooltipService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var TooltipDirective$1 = (function () {
    function TooltipDirective$$1(_elementRef, _viewContainerRef, _overlay, _scrollDispatcher, _changeDetectorRef, _renderer, _tooltipService) {
        this._elementRef = _elementRef;
        this._viewContainerRef = _viewContainerRef;
        this._overlay = _overlay;
        this._scrollDispatcher = _scrollDispatcher;
        this._changeDetectorRef = _changeDetectorRef;
        this._renderer = _renderer;
        this._tooltipService = _tooltipService;
        /**
         * All the user to add a custom class to the tooltip
         */
        this.customClass = '';
        /**
         * All the user to add a role to the tooltip - default is tooltip
         */
        this.role = 'tooltip';
        /**
         * Provide the TemplateRef a context object
         */
        this.context = {};
        /**
         * Delay the showing of the tooltip by a number of miliseconds
         */
        this.delay = 0;
        /**
         * Programmatically show and hide the tooltip
         */
        this.isOpen = false;
        /**
         * Customize how the tooltip should be positioned relative to the element
         */
        this.placement = 'top';
        /**
         * Specify which events should show the tooltip
         */
        this.showTriggers = ['mouseenter', 'focus'];
        /**
         * Specify which events should hide the tooltip
         */
        this.hideTriggers = ['mouseleave', 'blur'];
        /**
         * Emits an event when the tooltip is shown
         */
        this.shown = new EventEmitter();
        /**
         * Emits a event when the tooltip is hidden
         */
        this.hidden = new EventEmitter();
        /**
         * Allow two way binding to track the visibility of the tooltip
         */
        this.isOpenChange = new EventEmitter();
        /**
         * Keep track of the tooltip visibility
         */
        this.isVisible = false;
        /**
         * This will emit when the directive is destroyed allowing us to unsubscribe all subscriptions automatically
         */
        this._onDestroy = new Subject();
        /**
         * Internally store the type of this component - usual for distinctions when extending this class
         */
        this._type = 'tooltip';
    }
    /** Set up the triggers and bind to the show/hide events to keep visibility in sync */
    /**
     * Set up the triggers and bind to the show/hide events to keep visibility in sync
     * @return {?}
     */
    TooltipDirective$$1.prototype.ngOnInit = /**
     * Set up the triggers and bind to the show/hide events to keep visibility in sync
     * @return {?}
     */
    function () {
        var _this = this;
        // set up show and hide event triggers
        fromEvent(this._elementRef.nativeElement, 'click').pipe(takeUntil(this._onDestroy)).subscribe(this.onClick.bind(this));
        fromEvent(this._elementRef.nativeElement, 'mouseenter').pipe(takeUntil(this._onDestroy)).subscribe(this.onMouseEnter.bind(this));
        fromEvent(this._elementRef.nativeElement, 'mouseleave').pipe(takeUntil(this._onDestroy)).subscribe(this.onMouseLeave.bind(this));
        fromEvent(this._elementRef.nativeElement, 'focus').pipe(takeUntil(this._onDestroy)).subscribe(this.onFocus.bind(this));
        fromEvent(this._elementRef.nativeElement, 'blur').pipe(takeUntil(this._onDestroy)).subscribe(this.onBlur.bind(this));
        // when any other tooltips open hide this one
        this._tooltipService.shown$.pipe(filter(function () { return _this._type === 'tooltip'; }), filter(function (tooltip) { return tooltip !== _this._instance; }), takeUntil(this._onDestroy)).subscribe(this.hide.bind(this));
        // if the tooltip should be initially visible then open it
        if (this.isOpen) {
            this.show();
        }
    };
    /**
     * We need to send input changes to the tooltip component
     * We can't use setters as they may trigger before tooltip initialised and can't resend once initialised
     **/
    /**
     * We need to send input changes to the tooltip component
     * We can't use setters as they may trigger before tooltip initialised and can't resend once initialised
     *
     * @param {?} changes
     * @return {?}
     */
    TooltipDirective$$1.prototype.ngOnChanges = /**
     * We need to send input changes to the tooltip component
     * We can't use setters as they may trigger before tooltip initialised and can't resend once initialised
     *
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        // we can ignore the first change as it's handled in ngOnInit
        if (changes["isOpen"] && !changes["isOpen"].firstChange && changes["isOpen"].currentValue !== this.isVisible) {
            changes["isOpen"].currentValue ? this.show() : this.hide();
        }
        // destroy the overlay ref so a new correctly positioned instance will be created next time
        if (changes["placement"]) {
            this.destroyOverlay();
        }
        if (this._instance && changes["placement"]) {
            this._instance.setPlacement(changes["placement"].currentValue);
        }
        if (this._instance && changes["content"]) {
            this._instance.setContent(changes["content"].currentValue);
        }
        if (this._instance && changes["customClass"]) {
            this._instance.setClass(changes["customClass"].currentValue);
        }
        if (this._instance && changes["context"]) {
            this._instance.setContext(changes["context"].currentValue);
        }
        if (this._instance && changes["role"]) {
            this._instance.setContext(changes["role"].currentValue);
        }
    };
    /** Ensure we clean up after ourselves */
    /**
     * Ensure we clean up after ourselves
     * @return {?}
     */
    TooltipDirective$$1.prototype.ngOnDestroy = /**
     * Ensure we clean up after ourselves
     * @return {?}
     */
    function () {
        // ensure we close the tooltip when the host is destroyed
        if (this._overlayRef) {
            this._overlayRef.dispose();
            this._instance = null;
        }
        // emit this event to automatically unsubscribe from all subscriptions
        this._onDestroy.next();
        this._onDestroy.complete();
    };
    /** Make the tooltip open */
    /**
     * Make the tooltip open
     * @return {?}
     */
    TooltipDirective$$1.prototype.show = /**
     * Make the tooltip open
     * @return {?}
     */
    function () {
        var _this = this;
        // if the tooltip is disabled then do nothing
        if (this.disabled || this.isVisible || this._showTimeoutId || !this.content) {
            return;
        }
        // delay the show by the delay amount
        this._showTimeoutId = window.setTimeout(function () {
            // create the tooltip and get the overlay ref
            var /** @type {?} */ overlayRef = _this.createOverlay();
            // create the portal to create the tooltip component
            // create the portal to create the tooltip component
            _this._portal = _this.createPortal();
            _this._instance = _this.createInstance(overlayRef);
            // watch for any changes to the content
            // watch for any changes to the content
            _this._instance.reposition$.pipe(takeUntil(_this._onDestroy)).subscribe(_this.reposition.bind(_this));
            // store the visible state
            // store the visible state
            _this.isVisible = true;
            // ensure the overlay has the correct initial position
            // ensure the overlay has the correct initial position
            _this.reposition();
            // emit the show events
            // emit the show events
            _this.shown.emit();
            _this.isOpenChange.next(true);
            // clear the interval id
            // clear the interval id
            _this._showTimeoutId = null;
            // emit the show event to close any other tooltips
            // emit the show event to close any other tooltips
            _this._tooltipService.shown$.next(_this._instance);
            // ensure change detection is run
            // ensure change detection is run
            _this._changeDetectorRef.detectChanges();
        }, this.delay);
    };
    /** If a tooltip exists and is visible, hide it */
    /**
     * If a tooltip exists and is visible, hide it
     * @return {?}
     */
    TooltipDirective$$1.prototype.hide = /**
     * If a tooltip exists and is visible, hide it
     * @return {?}
     */
    function () {
        // if we are waiting to show a tooltip then cancel the pending timeout
        if (this._showTimeoutId) {
            clearTimeout(this._showTimeoutId);
            this._showTimeoutId = null;
            return;
        }
        if (this._overlayRef && this._overlayRef.hasAttached()) {
            this._overlayRef.detach();
        }
        this.setAriaDescribedBy(null);
        this._instance = null;
        // store the visible state
        this.isVisible = false;
        // emit the hide events
        this.hidden.emit();
        this.isOpenChange.next(false);
        // ensure change detection is run
        this._changeDetectorRef.detectChanges();
    };
    /** Toggle the visibility of the tooltip */
    /**
     * Toggle the visibility of the tooltip
     * @return {?}
     */
    TooltipDirective$$1.prototype.toggle = /**
     * Toggle the visibility of the tooltip
     * @return {?}
     */
    function () {
        this.isVisible ? this.hide() : this.show();
    };
    /** Recalculate the position of the popover */
    /**
     * Recalculate the position of the popover
     * @return {?}
     */
    TooltipDirective$$1.prototype.reposition = /**
     * Recalculate the position of the popover
     * @return {?}
     */
    function () {
        if (this.isVisible && this._overlayRef) {
            this._overlayRef.updatePosition();
        }
    };
    /** Create an instance from the overlay ref - allows overriding and additional logic here */
    /**
     * Create an instance from the overlay ref - allows overriding and additional logic here
     * @param {?} overlayRef
     * @return {?}
     */
    TooltipDirective$$1.prototype.createInstance = /**
     * Create an instance from the overlay ref - allows overriding and additional logic here
     * @param {?} overlayRef
     * @return {?}
     */
    function (overlayRef) {
        var /** @type {?} */ instance = /** @type {?} */ (overlayRef.attach(this._portal).instance);
        // supply the tooltip with the correct properties
        instance.setContent(this.content);
        instance.setPlacement(this.placement);
        instance.setClass(this.customClass);
        instance.setContext(this.context);
        instance.setRole(this.role);
        // Update the aria-describedby attribute
        this.setAriaDescribedBy(instance.id);
        return instance;
    };
    /** Create the component portal - allows overriding to allow other portals eg. popovers */
    /**
     * Create the component portal - allows overriding to allow other portals eg. popovers
     * @return {?}
     */
    TooltipDirective$$1.prototype.createPortal = /**
     * Create the component portal - allows overriding to allow other portals eg. popovers
     * @return {?}
     */
    function () {
        return this._portal || new ComponentPortal(TooltipComponent, this._viewContainerRef);
    };
    /**
     * Create the overlay and set up the scroll handling behavior
     * @return {?}
     */
    TooltipDirective$$1.prototype.createOverlay = /**
     * Create the overlay and set up the scroll handling behavior
     * @return {?}
     */
    function () {
        // if the tooltip has already been created then just return the existing instance
        if (this._overlayRef) {
            return this._overlayRef;
        }
        // configure the tooltip
        var /** @type {?} */ strategy = this._overlay.position()
            .connectedTo(this._elementRef, this.getOrigin(), this.getOverlayPosition());
        // correctly handle scrolling
        var /** @type {?} */ scrollableAncestors = this._scrollDispatcher
            .getAncestorScrollContainers(this._elementRef);
        strategy.withScrollableContainers(scrollableAncestors);
        this._overlayRef = this._overlay.create({
            positionStrategy: strategy,
            panelClass: 'ux-overlay-pane',
            scrollStrategy: this._overlay.scrollStrategies.reposition({ scrollThrottle: 0 }),
            hasBackdrop: false
        });
        return this._overlayRef;
    };
    /**
     * Recreate the overlay ref using the updated origin and overlay positions
     * @return {?}
     */
    TooltipDirective$$1.prototype.destroyOverlay = /**
     * Recreate the overlay ref using the updated origin and overlay positions
     * @return {?}
     */
    function () {
        // destroy the existing overlay
        if (this._overlayRef && this._overlayRef.hasAttached()) {
            this._overlayRef.detach();
        }
        if (this._overlayRef) {
            this._overlayRef.dispose();
            this._overlayRef = null;
        }
        this.isVisible = false;
    };
    /**
     * Get the origin position based on the specified tooltip placement
     * @return {?}
     */
    TooltipDirective$$1.prototype.getOrigin = /**
     * Get the origin position based on the specified tooltip placement
     * @return {?}
     */
    function () {
        // ensure placement is defined
        this.placement = this.placement || 'top';
        if (this.placement == 'top' || this.placement == 'bottom') {
            return { originX: 'center', originY: this.placement };
        }
        else if (this.placement == 'left') {
            return { originX: 'start', originY: 'center' };
        }
        else if (this.placement == 'right') {
            return { originX: 'end', originY: 'center' };
        }
    };
    /**
     * Calculate the overlay position based on the specified tooltip placement
     * @return {?}
     */
    TooltipDirective$$1.prototype.getOverlayPosition = /**
     * Calculate the overlay position based on the specified tooltip placement
     * @return {?}
     */
    function () {
        // ensure placement is defined
        this.placement = this.placement || 'top';
        if (this.placement == 'top') {
            return { overlayX: 'center', overlayY: 'bottom' };
        }
        else if (this.placement == 'bottom') {
            return { overlayX: 'center', overlayY: 'top' };
        }
        else if (this.placement == 'left') {
            return { overlayX: 'end', overlayY: 'center' };
        }
        else if (this.placement == 'right') {
            return { overlayX: 'start', overlayY: 'center' };
        }
    };
    /**
     * Simple utility method - because IE doesn't support array.includes
     * And it isn't included in the core-js/es6 polyfills which are the
     * only ones required by Angular and guaranteed to be there
     **/
    /**
     * Simple utility method - because IE doesn't support array.includes
     * And it isn't included in the core-js/es6 polyfills which are the
     * only ones required by Angular and guaranteed to be there
     *
     * @template T
     * @param {?} array
     * @param {?} value
     * @return {?}
     */
    TooltipDirective$$1.prototype.includes = /**
     * Simple utility method - because IE doesn't support array.includes
     * And it isn't included in the core-js/es6 polyfills which are the
     * only ones required by Angular and guaranteed to be there
     *
     * @template T
     * @param {?} array
     * @param {?} value
     * @return {?}
     */
    function (array, value) {
        return Array.isArray(array) && !!array.find(function (item) { return item === value; });
    };
    /** Handle the click event - show or hide accordingly */
    /**
     * Handle the click event - show or hide accordingly
     * @param {?} event
     * @return {?}
     */
    TooltipDirective$$1.prototype.onClick = /**
     * Handle the click event - show or hide accordingly
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // if its not visible and click is a show trigger open it
        if (!this.isVisible && this.includes(this.showTriggers, 'click')) {
            return this.show();
        }
        // if its visible and click is a hide trigger close it
        if (this.isVisible && this.includes(this.hideTriggers, 'click')) {
            return this.hide();
        }
    };
    /** Handle the mouse enter event - show or hide accordingly */
    /**
     * Handle the mouse enter event - show or hide accordingly
     * @param {?} event
     * @return {?}
     */
    TooltipDirective$$1.prototype.onMouseEnter = /**
     * Handle the mouse enter event - show or hide accordingly
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // this is an show only trigger - if already open or it isn't a trigger do nothing
        if (this.isVisible || !this.includes(this.showTriggers, 'mouseenter')) {
            return;
        }
        // otherwise open the tooltip
        this.show();
    };
    /** Handle the mouse leave event - show or hide accordingly */
    /**
     * Handle the mouse leave event - show or hide accordingly
     * @param {?} event
     * @return {?}
     */
    TooltipDirective$$1.prototype.onMouseLeave = /**
     * Handle the mouse leave event - show or hide accordingly
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // this is an hide only trigger - if not open or it isn't a trigger do nothing
        if (!this.isVisible || !this.includes(this.hideTriggers, 'mouseleave')) {
            return;
        }
        // otherwise close the tooltip
        this.hide();
    };
    /** Handle the focus event - show or hide accordingly */
    /**
     * Handle the focus event - show or hide accordingly
     * @param {?} event
     * @return {?}
     */
    TooltipDirective$$1.prototype.onFocus = /**
     * Handle the focus event - show or hide accordingly
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // this is an show only trigger - if already open or it isn't a trigger do nothing
        if (this.isVisible || !this.includes(this.showTriggers, 'focus')) {
            return;
        }
        // otherwise open the tooltip
        this.show();
    };
    /** Handle the blur event - show or hide accordingly */
    /**
     * Handle the blur event - show or hide accordingly
     * @param {?} event
     * @return {?}
     */
    TooltipDirective$$1.prototype.onBlur = /**
     * Handle the blur event - show or hide accordingly
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // this is an hide only trigger - if not open or it isn't a trigger do nothing
        if (!this.isVisible || !this.includes(this.hideTriggers, 'blur')) {
            return;
        }
        // otherwise close the tooltip
        this.hide();
    };
    /**
     * Determine if the trigger element is focused
     * @return {?}
     */
    TooltipDirective$$1.prototype.isFocused = /**
     * Determine if the trigger element is focused
     * @return {?}
     */
    function () {
        return document.activeElement === this._elementRef.nativeElement;
    };
    /** Programmatically update the aria-describedby property */
    /**
     * Programmatically update the aria-describedby property
     * @param {?} id
     * @return {?}
     */
    TooltipDirective$$1.prototype.setAriaDescribedBy = /**
     * Programmatically update the aria-describedby property
     * @param {?} id
     * @return {?}
     */
    function (id) {
        if (id === null) {
            this._renderer.removeAttribute(this._elementRef.nativeElement, 'aria-describedby');
        }
        else {
            this._renderer.setAttribute(this._elementRef.nativeElement, 'aria-describedby', id);
        }
    };
    TooltipDirective$$1.decorators = [
        { type: Directive, args: [{
                    selector: '[uxTooltip]',
                    exportAs: 'ux-tooltip'
                },] },
    ];
    /** @nocollapse */
    TooltipDirective$$1.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: ViewContainerRef, },
        { type: Overlay, },
        { type: ScrollDispatcher, },
        { type: ChangeDetectorRef, },
        { type: Renderer2, },
        { type: TooltipService, },
    ]; };
    TooltipDirective$$1.propDecorators = {
        "content": [{ type: Input, args: ['uxTooltip',] },],
        "disabled": [{ type: Input, args: ['tooltipDisabled',] },],
        "customClass": [{ type: Input, args: ['tooltipClass',] },],
        "role": [{ type: Input, args: ['tooltipRole',] },],
        "context": [{ type: Input, args: ['tooltipContext',] },],
        "delay": [{ type: Input, args: ['tooltipDelay',] },],
        "isOpen": [{ type: Input },],
        "placement": [{ type: Input },],
        "showTriggers": [{ type: Input },],
        "hideTriggers": [{ type: Input },],
        "shown": [{ type: Output },],
        "hidden": [{ type: Output },],
        "isOpenChange": [{ type: Output },],
    };
    return TooltipDirective$$1;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var TooltipModule = (function () {
    function TooltipModule() {
    }
    TooltipModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        OverlayModule,
                        ObserversModule
                    ],
                    exports: [TooltipDirective$1],
                    declarations: [TooltipComponent, TooltipDirective$1],
                    providers: [TooltipService],
                    entryComponents: [TooltipComponent]
                },] },
    ];
    return TooltipModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ReorderableHandleDirective = (function () {
    function ReorderableHandleDirective() {
    }
    ReorderableHandleDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxReorderableHandle]'
                },] },
    ];
    return ReorderableHandleDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ReorderableModelDirective = (function () {
    // this can be used to identify which instance of the directive relates to which element
    function ReorderableModelDirective(elementRef) {
        this.elementRef = elementRef;
    }
    ReorderableModelDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxReorderableModel]'
                },] },
    ];
    /** @nocollapse */
    ReorderableModelDirective.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    ReorderableModelDirective.propDecorators = {
        "uxReorderableModel": [{ type: Input },],
    };
    return ReorderableModelDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
// WORKAROUND: Angular Cli 6 has removed the globals patch, dragular requires this to we can patch it here
(/** @type {?} */ (window)).global = (/** @type {?} */ (window)).global || {};
var /** @type {?} */ dragula = dragulaNamespace__default || dragulaNamespace;

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ReorderableService = (function () {
    function ReorderableService() {
        this._groups = {};
        this._uniqueGroupId = 0;
    }
    /**
     * Returns a unique string which can be used as a group name if one was not configured.
     */
    /**
     * Returns a unique string which can be used as a group name if one was not configured.
     * @return {?}
     */
    ReorderableService.prototype.getUniqueGroupName = /**
     * Returns a unique string which can be used as a group name if one was not configured.
     * @return {?}
     */
    function () {
        return '_uxReorderable_' + this._uniqueGroupId++;
    };
    /**
     * Adds the container to the named group.
     */
    /**
     * Adds the container to the named group.
     * @param {?} groupName
     * @param {?} container
     * @return {?}
     */
    ReorderableService.prototype.register = /**
     * Adds the container to the named group.
     * @param {?} groupName
     * @param {?} container
     * @return {?}
     */
    function (groupName, container) {
        if (!this._groups[groupName]) {
            this._groups[groupName] = new ReorderableGroup();
        }
        this._groups[groupName].register(container);
        return this._groups[groupName];
    };
    /**
     * Removes the container from the named group. If it was the last container in the group, destroys the group.
     */
    /**
     * Removes the container from the named group. If it was the last container in the group, destroys the group.
     * @param {?} groupName
     * @param {?} container
     * @return {?}
     */
    ReorderableService.prototype.unregister = /**
     * Removes the container from the named group. If it was the last container in the group, destroys the group.
     * @param {?} groupName
     * @param {?} container
     * @return {?}
     */
    function (groupName, container) {
        var /** @type {?} */ group = this._groups[groupName];
        if (group) {
            group.unregister(container);
            if (group.isEmpty()) {
                group.destroy();
                delete this._groups[groupName];
            }
        }
    };
    /**
     * Creates the dragula instance with the current config and attaches the events, if not already created.
     */
    /**
     * Creates the dragula instance with the current config and attaches the events, if not already created.
     * @param {?} groupName
     * @return {?}
     */
    ReorderableService.prototype.initialize = /**
     * Creates the dragula instance with the current config and attaches the events, if not already created.
     * @param {?} groupName
     * @return {?}
     */
    function (groupName) {
        var /** @type {?} */ group = this._groups[groupName];
        if (group) {
            group.initialize();
        }
        return group;
    };
    /**
     * Returns the group object for the given name.
     */
    /**
     * Returns the group object for the given name.
     * @param {?} group
     * @return {?}
     */
    ReorderableService.prototype.getGroup = /**
     * Returns the group object for the given name.
     * @param {?} group
     * @return {?}
     */
    function (group) {
        return this._groups[group];
    };
    ReorderableService.decorators = [
        { type: Injectable },
    ];
    return ReorderableService;
}());
/**
 * Represents a collection of drag-and-drop containers (uxReorderable) that items can be dragged between.
 */
var  /**
 * Represents a collection of drag-and-drop containers (uxReorderable) that items can be dragged between.
 */
ReorderableGroup = (function () {
    function ReorderableGroup() {
        this.drag = new EventEmitter();
        this.dragEnd = new EventEmitter();
        this.drop = new EventEmitter();
        this.cancel = new EventEmitter();
        this.cloned = new EventEmitter();
        this._containers = [];
        this._config = {
            moves: this.canMove.bind(this)
        };
    }
    /**
     * Returns true if there are no containers registered with the group.
     */
    /**
     * Returns true if there are no containers registered with the group.
     * @return {?}
     */
    ReorderableGroup.prototype.isEmpty = /**
     * Returns true if there are no containers registered with the group.
     * @return {?}
     */
    function () {
        return this._containers.length === 0;
    };
    /**
     * Returns the model object (uxReorderableModel) for an elements in one of the containers in the group.
     */
    /**
     * Returns the model object (uxReorderableModel) for an elements in one of the containers in the group.
     * @param {?} element
     * @return {?}
     */
    ReorderableGroup.prototype.getModelForElement = /**
     * Returns the model object (uxReorderableModel) for an elements in one of the containers in the group.
     * @param {?} element
     * @return {?}
     */
    function (element) {
        try {
            for (var _a = __values(this._containers), _b = _a.next(); !_b.done; _b = _a.next()) {
                var container = _b.value;
                var /** @type {?} */ model = container.getModelFromElement(element);
                if (model) {
                    return model;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return null;
        var e_1, _c;
    };
    /**
     * Adds the container to the group.
     */
    /**
     * Adds the container to the group.
     * @param {?} container
     * @return {?}
     */
    ReorderableGroup.prototype.register = /**
     * Adds the container to the group.
     * @param {?} container
     * @return {?}
     */
    function (container) {
        this._containers.push(container);
        if (this._instance) {
            this._instance.containers = this._containers.map(function (c) { return c.element; });
        }
        if (!this._config.mirrorContainer) {
            this._config.mirrorContainer = container.element;
        }
    };
    /**
     * Removes the container from the group.
     */
    /**
     * Removes the container from the group.
     * @param {?} container
     * @return {?}
     */
    ReorderableGroup.prototype.unregister = /**
     * Removes the container from the group.
     * @param {?} container
     * @return {?}
     */
    function (container) {
        var /** @type {?} */ index = this._containers.indexOf(container);
        if (index >= 0) {
            this._containers.splice(index, 1);
            if (this._instance) {
                this._instance.containers = this._containers.map(function (c) { return c.element; });
            }
        }
    };
    /**
     * Creates the dragula instance with the current config and attaches the events, if not already created.
     */
    /**
     * Creates the dragula instance with the current config and attaches the events, if not already created.
     * @return {?}
     */
    ReorderableGroup.prototype.initialize = /**
     * Creates the dragula instance with the current config and attaches the events, if not already created.
     * @return {?}
     */
    function () {
        var _this = this;
        if (this._instance) {
            return;
        }
        this._instance = dragula(this._containers.map(function (c) { return c.element; }), this._config);
        this._instance.on('drag', function (element, source) {
            _this.drag.emit({
                model: _this.getModelForElement(element),
                element: element,
                source: source
            });
        });
        this._instance.on('dragend', function (element) {
            _this.dragEnd.emit({
                model: _this.getModelForElement(element),
                element: element
            });
        });
        this._instance.on('drop', function (element, target, source, sibling) {
            _this.drop.emit({
                model: _this.getModelForElement(element),
                element: element,
                target: target,
                source: source,
                sibling: sibling
            });
        });
        this._instance.on('cancel', function (element) {
            _this.cancel.emit({
                model: _this.getModelForElement(element),
                element: element
            });
        });
        this._instance.on('cloned', function (clone, element, type) {
            _this.cloned.emit({
                clone: clone,
                element: element,
                type: type
            });
        });
    };
    /**
     * Destroys the dragula instance.
     */
    /**
     * Destroys the dragula instance.
     * @return {?}
     */
    ReorderableGroup.prototype.destroy = /**
     * Destroys the dragula instance.
     * @return {?}
     */
    function () {
        if (this._instance) {
            this._instance.destroy();
            this._instance = null;
        }
    };
    /**
     * Finds the container for the containerElement and returns the results of canMove.
     * @param {?} element
     * @param {?} containerElement
     * @param {?} handle
     * @return {?}
     */
    ReorderableGroup.prototype.canMove = /**
     * Finds the container for the containerElement and returns the results of canMove.
     * @param {?} element
     * @param {?} containerElement
     * @param {?} handle
     * @return {?}
     */
    function (element, containerElement, handle) {
        try {
            for (var _a = __values(this._containers), _b = _a.next(); !_b.done; _b = _a.next()) {
                var container = _b.value;
                if (container.element.isSameNode(containerElement)) {
                    return container.canMove(element, containerElement, handle);
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_2) throw e_2.error; }
        }
        var e_2, _c;
    };
    return ReorderableGroup;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ReorderableDirective = (function () {
    function ReorderableDirective(_elementRef, _renderer, _service) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._service = _service;
        this.reorderingDisabled = false;
        this.reorderableModelChange = new EventEmitter();
        this.reorderStart = new EventEmitter();
        this.reorderCancel = new EventEmitter();
        this.reorderEnd = new EventEmitter();
        this.dragging = false;
        this._subscriptions = new Subscription();
    }
    /**
     * Initialise dragula and bind to all the required events
     */
    /**
     * Initialise dragula and bind to all the required events
     * @return {?}
     */
    ReorderableDirective.prototype.ngOnInit = /**
     * Initialise dragula and bind to all the required events
     * @return {?}
     */
    function () {
        var _this = this;
        // If no group name then generate a unique one for this instance only
        if (!this.reorderableGroup) {
            this.reorderableGroup = this._service.getUniqueGroupName();
        }
        this._container = {
            element: this._elementRef.nativeElement,
            getModelFromElement: this.getModelFromElement.bind(this),
            canMove: this.canMove.bind(this)
        };
        // Register for drag events on this element
        var /** @type {?} */ group = this._service.register(this.reorderableGroup, this._container);
        this._subscriptions.add(group.drag.subscribe(this.onDrag.bind(this)));
        this._subscriptions.add(group.dragEnd.subscribe(this.onDragEnd.bind(this)));
        this._subscriptions.add(group.drop.subscribe(this.onDrop.bind(this)));
        this._subscriptions.add(group.cancel.subscribe(function (event) { return _this.reorderCancel.emit({ element: event.element, model: event.model }); }));
        this._subscriptions.add(group.cloned.subscribe(this.onClone.bind(this)));
    };
    /**
     * @return {?}
     */
    ReorderableDirective.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this._service.initialize(this.reorderableGroup);
    };
    /**
     * We need to destroy the dragula instance on component destroy
     */
    /**
     * We need to destroy the dragula instance on component destroy
     * @return {?}
     */
    ReorderableDirective.prototype.ngOnDestroy = /**
     * We need to destroy the dragula instance on component destroy
     * @return {?}
     */
    function () {
        this._service.unregister(this.reorderableGroup, this._container);
        this._subscriptions.unsubscribe();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    ReorderableDirective.prototype.onDrag = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.dragging = true;
        this.reorderStart.emit({ element: event.element, model: event.model });
    };
    /**
     * This is fired when items get reordered - we need to emit the new order of the models
     */
    /**
     * This is fired when items get reordered - we need to emit the new order of the models
     * @param {?} event
     * @return {?}
     */
    ReorderableDirective.prototype.onDrop = /**
     * This is fired when items get reordered - we need to emit the new order of the models
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // if there is no provided module we can skip this
        if (!this.reorderableModel) {
            return;
        }
        var /** @type {?} */ changed = false;
        if (event.source.isSameNode(this._elementRef.nativeElement)) {
            // remove this model from the list of models
            var /** @type {?} */ index = this.reorderableModel.indexOf(event.model);
            if (index >= 0) {
                this.reorderableModel.splice(index, 1);
                changed = true;
            }
        }
        if (event.target.isSameNode(this._elementRef.nativeElement)) {
            // get the position of sibling element
            var /** @type {?} */ index = event.sibling && !event.sibling.classList.contains('gu-mirror') ?
                this.reorderableModel.indexOf(this.getModelFromElement(event.sibling)) :
                this.reorderableModel.length;
            // insert the model at its new location
            this.reorderableModel.splice(index, 0, event.model);
            changed = true;
        }
        // Emit event if any changes were made
        if (changed) {
            this.reorderableModelChange.emit(this.reorderableModel);
        }
    };
    /**
     * Return the model assciated with a particular element in the list.
     * This should ensure that the items have the draggable model directive applied
     */
    /**
     * Return the model assciated with a particular element in the list.
     * This should ensure that the items have the draggable model directive applied
     * @param {?} element
     * @return {?}
     */
    ReorderableDirective.prototype.getModelFromElement = /**
     * Return the model assciated with a particular element in the list.
     * This should ensure that the items have the draggable model directive applied
     * @param {?} element
     * @return {?}
     */
    function (element) {
        var /** @type {?} */ model = this.models.find(function (_model) { return _model.elementRef.nativeElement === element; });
        if (!model) {
            return null;
        }
        return model.uxReorderableModel;
    };
    /**
     * When we finish dragging remove the utillity class from the element being moved
     */
    /**
     * When we finish dragging remove the utillity class from the element being moved
     * @param {?} event
     * @return {?}
     */
    ReorderableDirective.prototype.onDragEnd = /**
     * When we finish dragging remove the utillity class from the element being moved
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.dragging = false;
        if (this._elementRef.nativeElement.contains(event.element)) {
            this._renderer.removeClass(event.element, 'ux-reorderable-moving');
            this.reorderEnd.emit({
                element: event.element,
                model: event.model
            });
        }
    };
    /**
     * We want to ensure that the cloned element is identical
     * to the original, regardless of it's location in the DOM tree
     */
    /**
     * We want to ensure that the cloned element is identical
     * to the original, regardless of it's location in the DOM tree
     * @param {?} event
     * @return {?}
     */
    ReorderableDirective.prototype.onClone = /**
     * We want to ensure that the cloned element is identical
     * to the original, regardless of it's location in the DOM tree
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this._elementRef.nativeElement.contains(event.element)) {
            this.setTableCellWidths(event.element, event.clone);
            this.captureCanvases(event.element, event.clone);
            this._renderer.addClass(event.element, 'ux-reorderable-moving');
        }
    };
    /**
     * If elements contain handles then only drag when the handle is dragged
     * otherwise drag whenever an immediate child is specified
     */
    /**
     * If elements contain handles then only drag when the handle is dragged
     * otherwise drag whenever an immediate child is specified
     * @param {?} element
     * @param {?} container
     * @param {?} handle
     * @return {?}
     */
    ReorderableDirective.prototype.canMove = /**
     * If elements contain handles then only drag when the handle is dragged
     * otherwise drag whenever an immediate child is specified
     * @param {?} element
     * @param {?} container
     * @param {?} handle
     * @return {?}
     */
    function (element, container, handle) {
        if (this.reorderingDisabled) {
            return false;
        }
        return this.handles.length === 0 ? true : !!this.handles.find(function (_handle) { return _handle.nativeElement === handle; });
    };
    /**
     * @param {?} source
     * @param {?} target
     * @return {?}
     */
    ReorderableDirective.prototype.setTableCellWidths = /**
     * @param {?} source
     * @param {?} target
     * @return {?}
     */
    function (source, target) {
        // if it is not a table row then skip this
        if (source.tagName !== 'TR') {
            return;
        }
        // find any immediate td children and fix their width
        var /** @type {?} */ sourceCells = /** @type {?} */ (Array.from(source.children));
        var /** @type {?} */ targetCells = /** @type {?} */ (Array.from(target.children));
        // fix the width of these cells
        sourceCells.forEach(function (cell, idx) { return targetCells[idx].style.minWidth = getComputedStyle(cell).getPropertyValue('width'); });
    };
    /**
     * @param {?} source
     * @param {?} target
     * @return {?}
     */
    ReorderableDirective.prototype.captureCanvases = /**
     * @param {?} source
     * @param {?} target
     * @return {?}
     */
    function (source, target) {
        // find all child canvas elements
        var /** @type {?} */ sourceCanvases = Array.from(source.querySelectorAll('canvas'));
        var /** @type {?} */ targetCanvases = Array.from(target.querySelectorAll('canvas'));
        // replicate the canvas content
        targetCanvases.map(function (canvas) { return canvas.getContext('2d'); })
            .forEach(function (context, idx) { return context.drawImage(sourceCanvases[idx], 0, 0); });
    };
    ReorderableDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxReorderable]'
                },] },
    ];
    /** @nocollapse */
    ReorderableDirective.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Renderer2, },
        { type: ReorderableService, },
    ]; };
    ReorderableDirective.propDecorators = {
        "reorderableModel": [{ type: Input },],
        "reorderableGroup": [{ type: Input },],
        "reorderingDisabled": [{ type: Input },],
        "reorderableModelChange": [{ type: Output },],
        "reorderStart": [{ type: Output },],
        "reorderCancel": [{ type: Output },],
        "reorderEnd": [{ type: Output },],
        "handles": [{ type: ContentChildren, args: [ReorderableHandleDirective, { read: ElementRef, descendants: true },] },],
        "models": [{ type: ContentChildren, args: [ReorderableModelDirective,] },],
        "dragging": [{ type: HostBinding, args: ['class.ux-reorderable-container-moving',] },],
    };
    return ReorderableDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ReorderableModule = (function () {
    function ReorderableModule() {
    }
    ReorderableModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule
                    ],
                    declarations: [
                        ReorderableDirective,
                        ReorderableHandleDirective,
                        ReorderableModelDirective
                    ],
                    exports: [
                        ReorderableDirective,
                        ReorderableHandleDirective,
                        ReorderableModelDirective
                    ],
                    providers: [
                        ReorderableService
                    ]
                },] },
    ];
    return ReorderableModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ DECLARATIONS$1 = [
    FacetContainerComponent,
    FacetHeaderComponent,
    FacetBaseComponent,
    FacetCheckListComponent,
    FacetTypeaheadListComponent,
    FacetTypeaheadHighlight
];
var FacetsModule = (function () {
    function FacetsModule() {
    }
    FacetsModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        CheckboxModule,
                        TooltipModule,
                        ReorderableModule,
                        TypeaheadModule.forRoot()
                    ],
                    exports: DECLARATIONS$1,
                    declarations: DECLARATIONS$1
                },] },
    ];
    return FacetsModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var Facet = (function () {
    function Facet(title, data, count, disabled, id) {
        if (data === void 0) { data = {}; }
        if (disabled === void 0) { disabled = false; }
        this.title = title;
        this.data = data;
        this.count = count;
        this.disabled = disabled;
        this.id = id;
    }
    return Facet;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var FilterContainerComponent = (function () {
    function FilterContainerComponent() {
        this.filters = [];
        this.filtersChange = new EventEmitter();
        this.events = new EventEmitter();
    }
    /**
     * @param {?} filter
     * @return {?}
     */
    FilterContainerComponent.prototype.addFilter = /**
     * @param {?} filter
     * @return {?}
     */
    function (filter$$1) {
        this.filters.push(filter$$1);
        this.events.next(new FilterAddEvent(filter$$1));
        this.filtersChange.emit(this.filters);
    };
    /**
     * @param {?} filter
     * @return {?}
     */
    FilterContainerComponent.prototype.removeFilter = /**
     * @param {?} filter
     * @return {?}
     */
    function (filter$$1) {
        var /** @type {?} */ idx = this.filters.findIndex(function (filters) { return filters === filter$$1; });
        if (idx !== -1) {
            this.filters.splice(idx, 1);
            this.events.next(new FilterRemoveEvent(filter$$1));
            this.filtersChange.emit(this.filters);
        }
    };
    /**
     * @return {?}
     */
    FilterContainerComponent.prototype.removeAll = /**
     * @return {?}
     */
    function () {
        this.events.next(new FilterRemoveAllEvent());
    };
    FilterContainerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-filter-container',
                    template: "<ng-content></ng-content>\n\n<!-- Add a Clear Button -->\n<div class=\"filter-selected-clear-button\" *ngIf=\"filters.length > 0\" [uxTooltip]=\"clearTooltip || 'Clear All'\" (click)=\"removeAll()\">\n\n    <svg class=\"filter-selected-clear-graphic\" width=\"19\" height=\"12\" viewBox=\"0 0 19 12\" shape-rendering=\"geometricPrecision\">\n        <rect class=\"light-grey\" x=\"0\" y=\"2\" width=\"7\" height=\"2\"></rect>\n        <rect class=\"dark-grey\" x=\"0\" y=\"5\" width=\"9\" height=\"2\"></rect>\n        <rect class=\"light-grey\" x=\"0\" y=\"8\" width=\"7\" height=\"2\"></rect>\n        <path class=\"dark-grey\" d=\"M9,1 h1 l9,9 v1 h-1 l-9,-9 v-1 Z\"></path>\n        <path class=\"dark-grey\" d=\"M9,11 v-1 l9,-9 h1 v1 l-9,9 h-1 Z\"></path>\n    </svg>\n\n</div>"
                },] },
    ];
    /** @nocollapse */
    FilterContainerComponent.propDecorators = {
        "filters": [{ type: Input },],
        "clearTooltip": [{ type: Input },],
        "filtersChange": [{ type: Output },],
        "events": [{ type: Output },],
    };
    return FilterContainerComponent;
}());
var FilterAddEvent = (function () {
    function FilterAddEvent(filter$$1) {
        this.filter = filter$$1;
    }
    return FilterAddEvent;
}());
var FilterRemoveEvent = (function () {
    function FilterRemoveEvent(filter$$1) {
        this.filter = filter$$1;
    }
    return FilterRemoveEvent;
}());
var FilterRemoveAllEvent = (function () {
    function FilterRemoveAllEvent() {
    }
    return FilterRemoveAllEvent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var FilterBaseComponent = (function () {
    function FilterBaseComponent(filtersContainer) {
        this.filtersContainer = filtersContainer;
        this._subscription = filtersContainer.events.pipe(filter(function (event) { return event instanceof FilterRemoveAllEvent; })).subscribe(this.removeFilter.bind(this));
    }
    /**
     * @return {?}
     */
    FilterBaseComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._subscription.unsubscribe();
    };
    /**
     * @param {?} _filter
     * @return {?}
     */
    FilterBaseComponent.prototype.addFilter = /**
     * @param {?} _filter
     * @return {?}
     */
    function (_filter) {
        if (!_filter.initial) {
            this.filtersContainer.addFilter(_filter);
        }
    };
    /**
     * @param {?} _filter
     * @return {?}
     */
    FilterBaseComponent.prototype.removeFilter = /**
     * @param {?} _filter
     * @return {?}
     */
    function (_filter) {
        if (!_filter) {
            return;
        }
        this.filtersContainer.removeFilter(_filter);
    };
    FilterBaseComponent.decorators = [
        { type: Directive, args: [{
                    selector: 'ux-filter-base'
                },] },
    ];
    /** @nocollapse */
    FilterBaseComponent.ctorParameters = function () { return [
        { type: FilterContainerComponent, decorators: [{ type: Host },] },
    ]; };
    FilterBaseComponent.propDecorators = {
        "filters": [{ type: Input },],
    };
    return FilterBaseComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var FilterDropdownComponent = (function (_super) {
    __extends(FilterDropdownComponent, _super);
    function FilterDropdownComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @return {?}
     */
    FilterDropdownComponent.prototype.removeFilter = /**
     * @return {?}
     */
    function () {
        _super.prototype.removeFilter.call(this, this.selected);
        this.selected = this.initial;
    };
    /**
     * @return {?}
     */
    FilterDropdownComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.selected = this.initial;
    };
    /**
     * @param {?} filter
     * @return {?}
     */
    FilterDropdownComponent.prototype.selectFilter = /**
     * @param {?} filter
     * @return {?}
     */
    function (filter$$1) {
        this.removeFilter();
        this.selected = filter$$1;
        this.addFilter(this.selected);
    };
    FilterDropdownComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-filter-dropdown',
                    template: "<div class=\"btn-group\" dropdown>\n    <button dropdownToggle type=\"button\" class=\"filter-dropdown btn dropdown-toggle\" [class.active]=\"selected !== initial\">{{ selected?.title }} \n        <span class=\"hpe-icon hpe-down\"></span>\n    </button>\n    <ul *dropdownMenu class=\"dropdown-menu\" role=\"menu\">\n        <li class=\"dropdown-list-item\" *ngFor=\"let filter of filters\" role=\"menuitem\">\n            <a class=\"dropdown-item\" (click)=\"selectFilter(filter)\">\n                <i class=\"hpe-icon\" [class.hpe-checkmark]=\"filter === selected\"></i>\n                <span class=\"filter-dropdown-title\">{{ filter.name }}</span>\n            </a>\n        </li>\n    </ul>\n</div>",
                },] },
    ];
    /** @nocollapse */
    FilterDropdownComponent.propDecorators = {
        "initial": [{ type: Input },],
    };
    return FilterDropdownComponent;
}(FilterBaseComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var FilterDynamicComponent = (function (_super) {
    __extends(FilterDynamicComponent, _super);
    function FilterDynamicComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.defaultOptions = {
            placeholder: '',
            minCharacters: 3
        };
        _this.showTypeahead = true;
        _this.typeaheadItems = [];
        return _this;
    }
    /**
     * @return {?}
     */
    FilterDynamicComponent.prototype.getItems = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return this.filters.filter(function (item) { return item !== _this.initial; }).map(function (item) { return item.name; });
    };
    /**
     * @return {?}
     */
    FilterDynamicComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.selected = this.initial;
        this.typeaheadItems = this.getItems();
        if (this.options && this.options.maxIndividualItems && this.options.maxIndividualItems + 1 >= this.filters.length) {
            this.showTypeahead = false;
        }
    };
    /**
     * @param {?} typeaheadOption
     * @return {?}
     */
    FilterDynamicComponent.prototype.selectOption = /**
     * @param {?} typeaheadOption
     * @return {?}
     */
    function (typeaheadOption) {
        this.removeFilter();
        var /** @type {?} */ idx = this.filters.findIndex(function (filter$$1) { return filter$$1.name === typeaheadOption.value; });
        this.selected = this.filters[idx];
        this.addFilter(this.selected);
        this.searchQuery = '';
        this.dropdown.hide();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FilterDynamicComponent.prototype.clickOff = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var /** @type {?} */ target = /** @type {?} */ (event.target);
        var /** @type {?} */ hideDropdown = true;
        while (target && target.nodeName !== 'BODY') {
            if (target.classList.contains('ux-dynamic-filter')) {
                hideDropdown = false;
                break;
            }
            else {
                target = target.parentElement;
            }
        }
        if (hideDropdown) {
            this.searchQuery = '';
            this.dropdown.hide();
        }
    };
    /**
     * @return {?}
     */
    FilterDynamicComponent.prototype.removeFilter = /**
     * @return {?}
     */
    function () {
        if (this.selected !== this.initial) {
            _super.prototype.removeFilter.call(this, this.selected);
            this.selected = this.initial;
        }
        this.searchQuery = '';
    };
    /**
     * @param {?} filter
     * @return {?}
     */
    FilterDynamicComponent.prototype.selectFilter = /**
     * @param {?} filter
     * @return {?}
     */
    function (filter$$1) {
        this.removeFilter();
        this.selected = filter$$1;
        this.addFilter(this.selected);
    };
    FilterDynamicComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-filter-dynamic',
                    template: "<div class=\"btn-group ux-dynamic-filter\" dropdown #dynamicDropdown=\"bs-dropdown\">\n    <button (click)=\"dynamicDropdown.show()\" type=\"button\" [class.active]=\"selected !== initial\" class=\"filter-dropdown btn dropdown-toggle\">{{ selected?.title }} \n        <span class=\"hpe-icon hpe-down\"></span>\n    </button>\n    <ul *dropdownMenu class=\"dropdown-menu\" role=\"menu\">\n\n        <li class=\"dropdown-list-item\" *ngIf=\"showTypeahead\" role=\"menuitem\">\n            <a class=\"dropdown-item\" (click)=\"removeFilter(); dynamicDropdown.hide();\">\n                <i class=\"hpe-icon\" [class.hpe-checkmark]=\"initial === selected\"></i>\n                <span class=\"filter-dropdown-title\">{{ initial.name }}</span>\n            </a>\n        </li>\n\n        <li class=\"dropdown-list-item\" *ngIf=\"selected !== initial && showTypeahead\" role=\"menuitem\">\n            <a class=\"dropdown-item\">\n                <i class=\"hpe-icon hpe-checkmark\"></i>\n                <span class=\"filter-dropdown-title\">{{ selected.name }}</span>\n            </a>\n        </li>\n\n        <hr>\n\n        <li *ngIf=\"showTypeahead\" class=\"typeahead-box\">\n            <input [(ngModel)]=\"searchQuery\" [typeahead]=\"typeaheadItems\" class=\"form-control\" \n            (typeaheadOnSelect)=\"selectOption($event)\" \n            [placeholder]=\"options?.placeholder || defaultOptions.placeholder\"\n            [typeaheadMinLength]=\"options?.minCharacters || defaultOptions.minCharacters\"\n            [typeaheadOptionsLimit]=\"options?.maxResults\">\n        </li>\n\n        <span *ngIf=\"!showTypeahead\">\n            <li class=\"dropdown-list-item\" *ngFor=\"let filter of filters\" role=\"menuitem\">\n                <a class=\"dropdown-item\" (click)=\"selectFilter(filter)\">\n                    <i class=\"hpe-icon\" [class.hpe-checkmark]=\"filter === selected\"></i>\n                    <span class=\"filter-dropdown-title\">{{ filter.name }}</span>\n                </a>\n            </li>\n        </span>\n\n    </ul>\n</div>",
                    host: {
                        '(document:click)': 'clickOff($event)',
                    }
                },] },
    ];
    /** @nocollapse */
    FilterDynamicComponent.propDecorators = {
        "filters": [{ type: Input },],
        "initial": [{ type: Input },],
        "options": [{ type: Input },],
        "dropdown": [{ type: ViewChild, args: [BsDropdownDirective,] },],
    };
    return FilterDynamicComponent;
}(FilterBaseComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ DECLARATIONS$2 = [
    FilterBaseComponent,
    FilterContainerComponent,
    FilterDropdownComponent,
    FilterDynamicComponent
];
var FilterModule = (function () {
    function FilterModule() {
    }
    FilterModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        BsDropdownModule.forRoot(),
                        TypeaheadModule.forRoot(),
                        TooltipModule,
                        FormsModule,
                        CommonModule
                    ],
                    exports: DECLARATIONS$2,
                    declarations: DECLARATIONS$2
                },] },
    ];
    return FilterModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var FlippableCardComponent = (function () {
    function FlippableCardComponent() {
        this.direction = 'horizontal';
        this.trigger = 'hover';
        this.width = 280;
        this.height = 200;
        this.flipped = false;
        this.flippedChange = new EventEmitter();
    }
    /**
     * @param {?} state
     * @return {?}
     */
    FlippableCardComponent.prototype.setFlipped = /**
     * @param {?} state
     * @return {?}
     */
    function (state$$1) {
        this.flipped = state$$1;
        this.flippedChange.emit(this.flipped);
    };
    /**
     * @return {?}
     */
    FlippableCardComponent.prototype.toggleFlipped = /**
     * @return {?}
     */
    function () {
        this.setFlipped(!this.flipped);
    };
    /**
     * @return {?}
     */
    FlippableCardComponent.prototype.clickTrigger = /**
     * @return {?}
     */
    function () {
        // add or remove the class depending on whether or not the card has been flipped
        if (this.trigger === 'click') {
            this.toggleFlipped();
        }
    };
    /**
     * @return {?}
     */
    FlippableCardComponent.prototype.hoverEnter = /**
     * @return {?}
     */
    function () {
        // if the trigger is hover then begin to flip
        if (this.trigger === 'hover') {
            this.setFlipped(true);
        }
    };
    /**
     * @return {?}
     */
    FlippableCardComponent.prototype.hoverExit = /**
     * @return {?}
     */
    function () {
        if (this.trigger === 'hover') {
            this.setFlipped(false);
        }
    };
    FlippableCardComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-flippable-card',
                    template: "<div class=\"ux-flipper\" [class.ux-flip-card]=\"flipped\" [style.width.px]=\"width\" [style.height.px]=\"height\">\n\n    <div class=\"ux-flippable-card-front\" [style.width.px]=\"width\" [style.height.px]=\"height\">\n        <ng-content select=\"ux-flippable-card-front\"></ng-content>\n    </div>\n\n    <div class=\"ux-flippable-card-back\" [style.width.px]=\"width\" [style.height.px]=\"height\">\n        <ng-content select=\"ux-flippable-card-back\"></ng-content>\n    </div>\n</div>",
                    host: {
                        '[class.horizontal]': 'direction === "horizontal"',
                        '[class.vertical]': 'direction === "vertical"'
                    },
                    exportAs: 'ux-flippable-card'
                },] },
    ];
    /** @nocollapse */
    FlippableCardComponent.propDecorators = {
        "direction": [{ type: Input },],
        "trigger": [{ type: Input },],
        "width": [{ type: Input },],
        "height": [{ type: Input },],
        "flipped": [{ type: Input },],
        "flippedChange": [{ type: Output },],
        "clickTrigger": [{ type: HostListener, args: ['click',] },],
        "hoverEnter": [{ type: HostListener, args: ['mouseenter',] },],
        "hoverExit": [{ type: HostListener, args: ['mouseleave',] },],
    };
    return FlippableCardComponent;
}());
var FlippableCardFrontDirective = (function () {
    function FlippableCardFrontDirective() {
    }
    FlippableCardFrontDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'ux-flippable-card-front'
                },] },
    ];
    return FlippableCardFrontDirective;
}());
var FlippableCardBackDirective = (function () {
    function FlippableCardBackDirective() {
    }
    FlippableCardBackDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'ux-flippable-card-back'
                },] },
    ];
    return FlippableCardBackDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var FlippableCardModule = (function () {
    function FlippableCardModule() {
    }
    FlippableCardModule.decorators = [
        { type: NgModule, args: [{
                    exports: [FlippableCardComponent, FlippableCardBackDirective, FlippableCardFrontDirective],
                    declarations: [FlippableCardComponent, FlippableCardBackDirective, FlippableCardFrontDirective]
                },] },
    ];
    return FlippableCardModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var FloatingActionButtonsService = (function () {
    function FloatingActionButtonsService() {
        this.open$ = new BehaviorSubject(false);
    }
    /**
     * @return {?}
     */
    FloatingActionButtonsService.prototype.open = /**
     * @return {?}
     */
    function () {
        this.open$.next(true);
    };
    /**
     * @return {?}
     */
    FloatingActionButtonsService.prototype.toggle = /**
     * @return {?}
     */
    function () {
        this.open$.next(!this.open$.getValue());
    };
    /**
     * @return {?}
     */
    FloatingActionButtonsService.prototype.close = /**
     * @return {?}
     */
    function () {
        this.open$.next(false);
    };
    FloatingActionButtonsService.decorators = [
        { type: Injectable },
    ];
    return FloatingActionButtonsService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var FloatingActionButtonsComponent = (function () {
    function FloatingActionButtonsComponent(fab, _elementRef) {
        this.fab = fab;
        this._elementRef = _elementRef;
        this.direction = 'top';
    }
    /**
     * @return {?}
     */
    FloatingActionButtonsComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._subscription = this.fab.open$.pipe(filter(function (open) { return open === false; }))
            .subscribe(function () { return _this.tooltips.forEach(function (tooltip) { return tooltip.hide(); }); });
    };
    /**
     * @return {?}
     */
    FloatingActionButtonsComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._subscription.unsubscribe();
    };
    /**
     * @param {?} target
     * @return {?}
     */
    FloatingActionButtonsComponent.prototype.close = /**
     * @param {?} target
     * @return {?}
     */
    function (target) {
        if (!this._elementRef.nativeElement.contains(target)) {
            this.fab.close();
        }
    };
    FloatingActionButtonsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-floating-action-buttons',
                    template: "<ng-content select=\"[fab-primary]\"></ng-content>\n\n<div class=\"floating-action-button-list\" [@fabAnimation]=\"fab.open$ | async\" [ngClass]=\"direction\" *ngIf=\"fab.open$ | async\">\n    <ng-content></ng-content>\n</div>",
                    providers: [FloatingActionButtonsService],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    preserveWhitespaces: false,
                    animations: [
                        trigger('fabAnimation', [
                            transition('void => true', [
                                query('ux-floating-action-button', style({ opacity: 0 })),
                                query('ux-floating-action-button', stagger(50, animate(250, style({ opacity: 1 }))))
                            ]),
                            transition('true => void', [
                                query('ux-floating-action-button', stagger(-50, animate(250, style({ opacity: 0 }))))
                            ])
                        ])
                    ]
                },] },
    ];
    /** @nocollapse */
    FloatingActionButtonsComponent.ctorParameters = function () { return [
        { type: FloatingActionButtonsService, },
        { type: ElementRef, },
    ]; };
    FloatingActionButtonsComponent.propDecorators = {
        "direction": [{ type: Input },],
        "tooltips": [{ type: ContentChildren, args: [TooltipDirective,] },],
        "close": [{ type: HostListener, args: ['document:click', ['$event.target'],] },],
    };
    return FloatingActionButtonsComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var FloatingActionButtonComponent = (function () {
    function FloatingActionButtonComponent(primary, fab) {
        this.fab = fab;
        this.tabindex = 1;
        this.primary = false;
        this.primary = primary !== null;
    }
    FloatingActionButtonComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-floating-action-button',
                    template: "<button class=\"btn floating-action-button\" \n        [class.button-primary]=\"primary\" \n        [class.button-secondary]=\"!primary\" \n        (click)=\"primary ? fab.open() : fab.close()\">\n\n    <span class=\"hpe-icon floating-action-button-icon\" *ngIf=\"icon\" [ngClass]=\"icon\"></span>\n    <ng-content *ngIf=\"!icon\"></ng-content>\n\n</button>",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    preserveWhitespaces: false
                },] },
    ];
    /** @nocollapse */
    FloatingActionButtonComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Attribute, args: ['fab-primary',] },] },
        { type: FloatingActionButtonsService, },
    ]; };
    FloatingActionButtonComponent.propDecorators = {
        "icon": [{ type: Input },],
        "tabindex": [{ type: HostBinding },],
    };
    return FloatingActionButtonComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var FloatingActionButtonsModule = (function () {
    function FloatingActionButtonsModule() {
    }
    FloatingActionButtonsModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule
                    ],
                    exports: [
                        FloatingActionButtonsComponent,
                        FloatingActionButtonComponent
                    ],
                    declarations: [
                        FloatingActionButtonsComponent,
                        FloatingActionButtonComponent
                    ]
                },] },
    ];
    return FloatingActionButtonsModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var HierarchyBarService = (function () {
    function HierarchyBarService() {
        this.nodes$ = new BehaviorSubject([]);
        this._nodes = [];
    }
    /**
     * Store the root node of the hierarchy tree
     */
    /**
     * Store the root node of the hierarchy tree
     * @param {?} root
     * @return {?}
     */
    HierarchyBarService.prototype.setRootNode = /**
     * Store the root node of the hierarchy tree
     * @param {?} root
     * @return {?}
     */
    function (root) {
        // store the root node
        this._root = root;
        // create a flat structure of nodes
        this._nodes = this.getNodeList(root);
        // flatten the array - based on the selected node
        this.nodes$.next(this.getSelectedChildren(root));
    };
    /**
     * Select a node. This causes all nodes to be
     * deselected and the path to the selected node
     * to be selected
     */
    /**
     * Select a node. This causes all nodes to be
     * deselected and the path to the selected node
     * to be selected
     * @param {?} node
     * @return {?}
     */
    HierarchyBarService.prototype.selectNode = /**
     * Select a node. This causes all nodes to be
     * deselected and the path to the selected node
     * to be selected
     * @param {?} node
     * @return {?}
     */
    function (node) {
        // deselect all nodes
        this.deselectAll();
        // ensure the current node is selected and its parents
        this.select(node);
        // emit a new node list to trigger change detection
        this.nodes$.next(this.getSelectedChildren(this._root));
    };
    /**
     * Handles getting children with support for both arrays and observables
     */
    /**
     * Handles getting children with support for both arrays and observables
     * @param {?} node
     * @return {?}
     */
    HierarchyBarService.prototype.getChildren = /**
     * Handles getting children with support for both arrays and observables
     * @param {?} node
     * @return {?}
     */
    function (node) {
        var _this = this;
        if (Array.isArray(node.children)) {
            return of({ loading: false, children: node.children });
        }
        var /** @type {?} */ children$ = node.children;
        // if it is an observable then handle loading
        return Observable.create(function (observer) {
            // emit initial value
            observer.next({ loading: true, children: [] });
            // now wait until the children observable completes
            children$.pipe(first()).subscribe(function (children) {
                // replace the observable with an array for future loading
                node.children = children;
                // rebuild the node tree
                // rebuild the node tree
                _this.setRootNode(_this._root);
                // emit the latest value
                observer.next({ loading: false, children: children });
                // close the observable stream
                observer.complete();
            });
        });
    };
    /**
     * Traverses all the parents to ensure they are selected
     * @param {?} node
     * @return {?}
     */
    HierarchyBarService.prototype.select = /**
     * Traverses all the parents to ensure they are selected
     * @param {?} node
     * @return {?}
     */
    function (node) {
        node.selected = true;
        if (node.parent) {
            this.select(node.parent);
        }
    };
    /**
     * Deselects all nodes
     * @return {?}
     */
    HierarchyBarService.prototype.deselectAll = /**
     * Deselects all nodes
     * @return {?}
     */
    function () {
        this._nodes.forEach(function (node) { return node.selected = false; });
    };
    /**
     * Gets all the nodes in the tree as a flat array.
     * It also stores the parent node in a parent property
     * on the node for easy traversal in both directions
     * @param {?} node
     * @return {?}
     */
    HierarchyBarService.prototype.getNodeList = /**
     * Gets all the nodes in the tree as a flat array.
     * It also stores the parent node in a parent property
     * on the node for easy traversal in both directions
     * @param {?} node
     * @return {?}
     */
    function (node) {
        var _this = this;
        // if there are no children then return only itself
        if (!node.children || node.children instanceof Observable || node.children.length === 0) {
            return [node];
        }
        // store the parent property
        node.children.forEach(function (child) { return child.parent = node; });
        // get all descendants of this node
        var /** @type {?} */ descendants = node.children.reduce(function (nodes, current) { return __spread(nodes, _this.getNodeList(current)); }, []);
        return __spread([node], descendants);
    };
    /**
     * Gets all selected nodes from the parent node.
     * @param {?} node
     * @return {?}
     */
    HierarchyBarService.prototype.getSelectedChildren = /**
     * Gets all selected nodes from the parent node.
     * @param {?} node
     * @return {?}
     */
    function (node) {
        if (node.children instanceof Observable) {
            return [node];
        }
        // get the children - and account for when there is none
        var /** @type {?} */ children = node.children || [];
        // check if any child is selected
        var /** @type {?} */ child = children.find(function (_child) { return _child.selected; });
        // return the remaining chain of selected items
        return child ? __spread([node], this.getSelectedChildren(child)) : [node];
    };
    HierarchyBarService.decorators = [
        { type: Injectable },
    ];
    return HierarchyBarService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var HierarchyBarComponent = (function () {
    function HierarchyBarComponent(hierarchyBar) {
        var _this = this;
        this.hierarchyBar = hierarchyBar;
        this.selectedChange = new EventEmitter();
        this.overflow$ = new BehaviorSubject(false);
        this.overflowNodes$ = new BehaviorSubject([]);
        this._subscription = new Subscription();
        // subscribe to changes in the selected node
        var /** @type {?} */ selected = hierarchyBar.nodes$.subscribe(function (nodes) { return _this.selectedChange.emit(nodes.length === 0 ? null : nodes[nodes.length - 1]); });
        var /** @type {?} */ changed = hierarchyBar.nodes$.pipe(debounceTime(0)).subscribe(function () { return _this.scrollIntoView(); });
        // store subscriptions
        this._subscription.add(selected);
        this._subscription.add(changed);
    }
    Object.defineProperty(HierarchyBarComponent.prototype, "root", {
        set: /**
         * @param {?} node
         * @return {?}
         */
        function (node) {
            this.hierarchyBar.setRootNode(node);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HierarchyBarComponent.prototype, "selected", {
        set: /**
         * @param {?} node
         * @return {?}
         */
        function (node) {
            this.hierarchyBar.selectNode(node);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    HierarchyBarComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._subscription.unsubscribe();
    };
    /**
     * When there is overflow ensure that the rightmost
     * node remains in view at all times. The nodes no longer
     * visible be be displayed in a popover available on the
     * overflow indicator
     */
    /**
     * When there is overflow ensure that the rightmost
     * node remains in view at all times. The nodes no longer
     * visible be be displayed in a popover available on the
     * overflow indicator
     * @return {?}
     */
    HierarchyBarComponent.prototype.scrollIntoView = /**
     * When there is overflow ensure that the rightmost
     * node remains in view at all times. The nodes no longer
     * visible be be displayed in a popover available on the
     * overflow indicator
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.nodelist) {
            return;
        }
        // get the native element
        var nativeElement = this.nodelist.nativeElement;
        // emit whether or not there is overflow
        this.overflow$.next(nativeElement.scrollWidth > nativeElement.offsetWidth);
        // if the hierarchy bar contents do not overflow then do nothing
        if (nativeElement.scrollWidth > nativeElement.offsetWidth) {
            // determine the amount of overflow
            var /** @type {?} */ overflowAmount_1 = nativeElement.scrollWidth - nativeElement.offsetWidth;
            // determine which nodes are not fully visible
            this.overflowNodes$.next(this.nodes.filter(function (node) { return node.nativeElement.offsetLeft < overflowAmount_1; })
                .map(function (node, index) { return _this.hierarchyBar.nodes$.value[index]; }));
            // move the scroll position to always show the last itme
            this.nodelist.nativeElement.scrollLeft = overflowAmount_1;
        }
    };
    HierarchyBarComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-hierarchy-bar',
                    template: "<!-- Allow content to be placed on the left of the items -->\n<aside class=\"hierarchy-bar-addons\">\n    <ng-content select=\"[uxHierarchyBarLeftAddon]\"></ng-content>\n</aside>\n\n<main #nodelist class=\"hierarchy-bar-nodes\" (uxResize)=\"scrollIntoView()\">\n\n    <div *ngIf=\"overflow$ | async\"\n         #popover=\"ux-popover\"\n         class=\"hierarchy-bar-overflow-indicator\"\n         [style.left.px]=\"nodelist.scrollLeft\"\n         [uxPopover]=\"overflow\"\n         [popoverContext]=\"{ popover: popover }\"\n         placement=\"bottom\"\n         popoverClass=\"hierarchy-bar-popover\">\n        . . .\n    </div>\n\n    <div #nodeElement class=\"hierarchy-bar-node\"\n         *ngFor=\"let node of hierarchyBar.nodes$ | async\">\n\n        <button class=\"hierarchy-bar-node-content\"\n                [attr.aria-label]=\"node.title\"\n                (click)=\"hierarchyBar.selectNode(node)\">\n\n            <!-- Show an icon if specifed -->\n            <img class=\"hierarchy-bar-node-icon\" *ngIf=\"node.icon\" [src]=\"node.icon\" alt=\"Hierarchy Bar Icon\">\n\n            <!-- Show the name of the current node -->\n            <span class=\"hierarchy-bar-node-title\">{{ node.title }}</span>\n\n        </button>\n\n        <!-- Show a dropdown arrow if there are children -->\n        <button *ngIf=\"node.children\"\n              #popover=\"ux-popover\"\n              aria-label=\"Show children\"\n              role=\"button\"\n              class=\"hierarchy-bar-node-arrow hpe-icon hpe-next\"\n              [uxPopover]=\"content\"\n              [popoverContext]=\"{ node: node, popover: popover }\"\n              placement=\"bottom\"\n              popoverClass=\"hierarchy-bar-popover\"\n              tabindex=\"0\">\n        </button>\n\n    </div>\n\n</main>\n\n<!-- Allow content to be placed on the right of the items -->\n<aside class=\"hierarchy-bar-addons\">\n    <ng-content select=\"[uxHierarchyBarRightAddon]\"></ng-content>\n</aside>\n\n<!-- Template for the popover list -->\n<ng-template #content let-node=\"node\" let-popover=\"popover\">\n\n    <!-- Loading Indicator -->\n    <ul class=\"hierarchy-bar-node-list\" *ngIf=\"(hierarchyBar.getChildren(node) | async).loading\">\n\n        <li class=\"hierarchy-bar-node-list-item\">\n            <ng-container [ngTemplateOutlet]=\"loadingIndicator || defaultLoadingIndicator\"></ng-container>\n        </li>\n    </ul>\n\n    <!-- List of children -->\n    <ul class=\"hierarchy-bar-node-list\" *ngIf=\"!(hierarchyBar.getChildren(node) | async).loading\">\n\n        <li *ngFor=\"let child of (hierarchyBar.getChildren(node) | async).children; let first = first\"\n            class=\"hierarchy-bar-node-list-item\"\n            [focusIf]=\"first\"\n            tabindex=\"0\"\n            (keydown.enter)=\"hierarchyBar.selectNode(child); popover.hide()\"\n            (click)=\"hierarchyBar.selectNode(child); popover.hide()\">\n\n            <!-- Show an icon if specifed -->\n            <img class=\"hierarchy-bar-node-icon\" *ngIf=\"child.icon\" [src]=\"child.icon\" alt=\"Hierarchy Bar Icon\">\n\n            <!-- Show the name of the current node -->\n            <span class=\"hierarchy-bar-node-title\">{{ child.title }}</span>\n\n        </li>\n\n    </ul>\n</ng-template>\n\n<!-- Template for the overflow popover list -->\n<ng-template #overflow let-popover=\"popover\">\n\n    <ul class=\"hierarchy-bar-node-list\">\n\n        <li *ngFor=\"let child of overflowNodes$ | async; let first = first\"\n            class=\"hierarchy-bar-node-list-item\"\n            tabindex=\"0\"\n            [focusIf]=\"first\"\n            (click)=\"hierarchyBar.selectNode(child); popover.hide()\"\n            (keydown.enter)=\"hierarchyBar.selectNode(child); popover.hide()\">\n\n            <!-- Show an icon if specifed -->\n            <img class=\"hierarchy-bar-node-icon\" *ngIf=\"child.icon\" [src]=\"child.icon\" alt=\"Hierarchy Bar Icon\">\n\n            <!-- Show the name of the current node -->\n            <span class=\"hierarchy-bar-node-title\">{{ child.title }}</span>\n\n        </li>\n\n    </ul>\n</ng-template>\n\n<!-- Loading Indicator Template -->\n<ng-template #defaultLoadingIndicator>\n    <div class=\"hierarchy-bar-node-icon\" alt=\"Hierarchy Bar Loading Indicator\">\n        <div class=\"spinner spinner-accent spinner-bounce-middle\"></div>\n    </div>\n\n    <!-- Show the name of the current node -->\n    <span class=\"hierarchy-bar-node-title\">Loading...</span>\n</ng-template>",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    viewProviders: [HierarchyBarService]
                },] },
    ];
    /** @nocollapse */
    HierarchyBarComponent.ctorParameters = function () { return [
        { type: HierarchyBarService, },
    ]; };
    HierarchyBarComponent.propDecorators = {
        "root": [{ type: Input },],
        "selected": [{ type: Input },],
        "loadingIndicator": [{ type: Input },],
        "selectedChange": [{ type: Output },],
        "nodelist": [{ type: ViewChild, args: ['nodelist',] },],
        "nodes": [{ type: ViewChildren, args: ['nodeElement',] },],
    };
    return HierarchyBarComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ClickOutsideDirective = (function () {
    function ClickOutsideDirective(_elementRef) {
        this._elementRef = _elementRef;
        this.uxClickOutside = new EventEmitter();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    ClickOutsideDirective.prototype.click = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this._elementRef.nativeElement !== event.target && !this._elementRef.nativeElement.contains(event.target)) {
            this.uxClickOutside.emit(event);
        }
    };
    ClickOutsideDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxClickOutside]'
                },] },
    ];
    /** @nocollapse */
    ClickOutsideDirective.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    ClickOutsideDirective.propDecorators = {
        "uxClickOutside": [{ type: Output },],
        "click": [{ type: HostListener, args: ['document:click', ['$event'],] },],
    };
    return ClickOutsideDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ClickOutsideModule = (function () {
    function ClickOutsideModule() {
    }
    ClickOutsideModule.decorators = [
        { type: NgModule, args: [{
                    exports: [ClickOutsideDirective],
                    declarations: [ClickOutsideDirective]
                },] },
    ];
    return ClickOutsideModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ uniquePopoverId = 0;
var PopoverComponent = (function (_super) {
    __extends(PopoverComponent, _super);
    function PopoverComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Define a unique id for each popover
         */
        _this.id = "ux-popover-" + ++uniquePopoverId;
        /**
         * This will emit an event any time the user clicks outside the popover
         */
        _this.clickOutside$ = new Subject();
        return _this;
    }
    /** This will update the title of the popover and trigger change detection */
    /**
     * This will update the title of the popover and trigger change detection
     * @param {?} title
     * @return {?}
     */
    PopoverComponent.prototype.setTitle = /**
     * This will update the title of the popover and trigger change detection
     * @param {?} title
     * @return {?}
     */
    function (title) {
        this.title = title;
        this._changeDetectorRef.markForCheck();
    };
    PopoverComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-popover',
                    template: "<div class=\"popover show\" [ngClass]=\"[placement, customClass]\" [id]=\"id\" [attr.role]=\"role\" (uxClickOutside)=\"clickOutside$.next($event)\">\n    <div class=\"arrow\"></div>\n    <h3 class=\"popover-title\" *ngIf=\"title\">{{ title }}</h3>\n    <div class=\"popover-content\" (cdkObserveContent)=\"reposition()\">\n        <ng-container *ngIf=\"!isTemplateRef\">{{ content }}</ng-container>\n        <ng-container *ngIf=\"isTemplateRef\" [ngTemplateOutlet]=\"content\" [ngTemplateOutletContext]=\"context\"></ng-container>\n    </div>\n</div>",
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    return PopoverComponent;
}(TooltipComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var PopoverDirective = (function (_super) {
    __extends(PopoverDirective, _super);
    function PopoverDirective() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * All the user to add a custom class to the popover
         */
        _this.customClass = '';
        /**
         * All the user to add a role to the popover - default is tooltip
         */
        _this.role = 'tooltip';
        /**
         * Provide the TemplateRef a context object
         */
        _this.context = {};
        /**
         * Delay the showing of the popover by a number of miliseconds
         */
        _this.delay = 0;
        /**
         * Specify which events should show the popover
         */
        _this.showTriggers = ['click'];
        /**
         * Specify which events should hide the popover
         */
        _this.hideTriggers = ['click', 'clickoutside', 'escape'];
        /**
         * Keep track of the tooltip visibility and update aria-expanded attribute
         */
        _this.isVisible = false;
        /**
         * Internally store the type of this component - usual for distinctions when extending the tooltip class
         */
        _this._type = 'popover';
        return _this;
    }
    /** Set up the triggers and bind to the show/hide events to keep visibility in sync */
    /**
     * Set up the triggers and bind to the show/hide events to keep visibility in sync
     * @return {?}
     */
    PopoverDirective.prototype.ngOnInit = /**
     * Set up the triggers and bind to the show/hide events to keep visibility in sync
     * @return {?}
     */
    function () {
        // set up the event triggers
        fromEvent(document, 'keydown').pipe(takeUntil(this._onDestroy)).subscribe(this.onKeyDown.bind(this));
        // check if there is an aria-described by attribute
        this._ariaDescribedBy = this._elementRef.nativeElement.hasAttribute('aria-describedby');
        // set up the default event triggers
        _super.prototype.ngOnInit.call(this);
    };
    /**
     * We need to send input changes to the popover component
     * We can't use setters as they may trigger before popover initialised and can't resend once initialised
     **/
    /**
     * We need to send input changes to the popover component
     * We can't use setters as they may trigger before popover initialised and can't resend once initialised
     *
     * @param {?} changes
     * @return {?}
     */
    PopoverDirective.prototype.ngOnChanges = /**
     * We need to send input changes to the popover component
     * We can't use setters as they may trigger before popover initialised and can't resend once initialised
     *
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        _super.prototype.ngOnChanges.call(this, changes);
        if (this._instance && changes["title"]) {
            this._instance.setTitle(changes["title"].currentValue);
        }
    };
    /**
     * @param {?} overlayRef
     * @return {?}
     */
    PopoverDirective.prototype.createInstance = /**
     * @param {?} overlayRef
     * @return {?}
     */
    function (overlayRef) {
        var /** @type {?} */ instance = /** @type {?} */ (overlayRef.attach(this._portal).instance);
        // supply the tooltip with the correct properties
        instance.setTitle(this.title);
        instance.setContent(this.content);
        instance.setPlacement(this.placement);
        instance.setClass(this.customClass);
        instance.setContext(this.context);
        instance.setRole(this.role);
        // Update the aria-describedby attribute
        this.setAriaDescribedBy(instance.id);
        // subscribe to the outside click event
        instance.clickOutside$.pipe(takeUntil(this._onDestroy)).subscribe(this.onClickOutside.bind(this));
        return instance;
    };
    /**
     * @return {?}
     */
    PopoverDirective.prototype.createPortal = /**
     * @return {?}
     */
    function () {
        return this._portal || new ComponentPortal(PopoverComponent, this._viewContainerRef);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    PopoverDirective.prototype.onKeyDown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // if visible and the escape key is pressed and it is one of the hide triggers
        if (this.isVisible && event.keyCode === ESCAPE && this.includes(this.hideTriggers, 'escape')) {
            this.hide();
        }
    };
    /**
     * @return {?}
     */
    PopoverDirective.prototype.onClickOutside = /**
     * @return {?}
     */
    function () {
        // if visible and it is one of the hide triggers
        if (this.isVisible && this.includes(this.hideTriggers, 'clickoutside')) {
            this.hide();
        }
    };
    /** Programmatically update the aria-describedby property */
    /**
     * Programmatically update the aria-describedby property
     * @param {?} id
     * @return {?}
     */
    PopoverDirective.prototype.setAriaDescribedBy = /**
     * Programmatically update the aria-describedby property
     * @param {?} id
     * @return {?}
     */
    function (id) {
        // we only want to set the aria-describedby attr when the content is a string and there was no user defined attribute already
        if (this._ariaDescribedBy === false && typeof this.content === 'string') {
            _super.prototype.setAriaDescribedBy.call(this, id);
        }
    };
    PopoverDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxPopover]',
                    exportAs: 'ux-popover'
                },] },
    ];
    /** @nocollapse */
    PopoverDirective.propDecorators = {
        "content": [{ type: Input, args: ['uxPopover',] },],
        "title": [{ type: Input, args: ['popoverTitle',] },],
        "disabled": [{ type: Input, args: ['popoverDisabled',] },],
        "customClass": [{ type: Input, args: ['popoverClass',] },],
        "role": [{ type: Input, args: ['popoverRole',] },],
        "context": [{ type: Input, args: ['popoverContext',] },],
        "delay": [{ type: Input, args: ['popoverDelay',] },],
        "showTriggers": [{ type: Input },],
        "hideTriggers": [{ type: Input },],
        "isVisible": [{ type: HostBinding, args: ['attr.aria-expanded',] },],
    };
    return PopoverDirective;
}(TooltipDirective$1));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var PopoverModule = (function () {
    function PopoverModule() {
    }
    PopoverModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        OverlayModule,
                        ObserversModule,
                        ClickOutsideModule,
                        TooltipModule
                    ],
                    exports: [PopoverDirective],
                    declarations: [PopoverComponent, PopoverDirective],
                    entryComponents: [PopoverComponent]
                },] },
    ];
    return PopoverModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var HierarchyBarModule = (function () {
    function HierarchyBarModule() {
    }
    HierarchyBarModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        ResizeModule,
                        FocusIfModule,
                        PopoverModule
                    ],
                    exports: [HierarchyBarComponent],
                    declarations: [HierarchyBarComponent],
                },] },
    ];
    return HierarchyBarModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var SidePanelService = (function () {
    function SidePanelService() {
        this.open$ = new BehaviorSubject(false);
    }
    /**
     * @return {?}
     */
    SidePanelService.prototype.open = /**
     * @return {?}
     */
    function () {
        this.open$.next(true);
    };
    /**
     * @return {?}
     */
    SidePanelService.prototype.close = /**
     * @return {?}
     */
    function () {
        this.open$.next(false);
    };
    SidePanelService.decorators = [
        { type: Injectable },
    ];
    return SidePanelService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var SidePanelComponent = (function () {
    function SidePanelComponent(service, _elementRef) {
        this.service = service;
        this._elementRef = _elementRef;
        this.inline = false;
        this.attachTo = 'window';
        this.width = '50%';
        this.top = '0';
        this.modal = false;
        this.animate = false;
        this.closeOnExternalClick = false;
        this.openChange = new EventEmitter();
    }
    Object.defineProperty(SidePanelComponent.prototype, "open", {
        get: /**
         * @return {?}
         */
        function () {
            return this.service.open$.value;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.service.open$.next(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SidePanelComponent.prototype, "position", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.inline) {
                return 'static';
            }
            if (this.attachTo === 'container') {
                return 'absolute';
            }
            return 'fixed';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SidePanelComponent.prototype, "cssWidth", {
        get: /**
         * @return {?}
         */
        function () {
            if (typeof this.width === 'number') {
                return this.width === 0 ? '0' : this.width + 'px';
            }
            return this.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SidePanelComponent.prototype, "cssTop", {
        get: /**
         * @return {?}
         */
        function () {
            if (typeof this.top === 'number') {
                return this.top === 0 ? '0' : this.top + 'px';
            }
            return this.top;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SidePanelComponent.prototype, "componentWidth", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.inline) {
                return this.open ? this.cssWidth : '0';
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SidePanelComponent.prototype, "hostWidth", {
        get: /**
         * @return {?}
         */
        function () {
            return this.inline ? '100%' : this.cssWidth;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    SidePanelComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._subscription = this.service.open$.subscribe(function (next) {
            _this.openChange.emit(next);
        });
    };
    /**
     * @return {?}
     */
    SidePanelComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._subscription.unsubscribe();
    };
    /**
     * @return {?}
     */
    SidePanelComponent.prototype.openPanel = /**
     * @return {?}
     */
    function () {
        this.service.open();
    };
    /**
     * @return {?}
     */
    SidePanelComponent.prototype.closePanel = /**
     * @return {?}
     */
    function () {
        this.service.close();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SidePanelComponent.prototype.clickHandler = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (!this.open || !this.closeOnExternalClick) {
            return;
        }
        var /** @type {?} */ target = /** @type {?} */ (event.target);
        if (!this._elementRef.nativeElement.contains(target) ||
            (target && target.classList.contains('modal-backdrop'))) {
            this.closePanel();
        }
    };
    SidePanelComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-side-panel',
                    exportAs: 'ux-side-panel',
                    template: "<div *ngIf=\"modal && open\" class=\"modal-backdrop\"\n    [style.position]=\"position\"\n    [style.top]=\"cssTop\"></div>\n\n<div class=\"ux-side-panel-host\"\n    [class.modal-panel]=\"modal\"\n    [style.position]=\"position\"\n    [style.width]=\"hostWidth\"\n    [style.top]=\"cssTop\">\n    <ng-content></ng-content>\n</div>\n",
                    providers: [SidePanelService],
                    host: {
                        'class': 'ux-side-panel'
                    }
                },] },
    ];
    /** @nocollapse */
    SidePanelComponent.ctorParameters = function () { return [
        { type: SidePanelService, },
        { type: ElementRef, },
    ]; };
    SidePanelComponent.propDecorators = {
        "open": [{ type: Input }, { type: HostBinding, args: ['class.open',] },],
        "inline": [{ type: Input }, { type: HostBinding, args: ['class.inline',] },],
        "attachTo": [{ type: Input },],
        "width": [{ type: Input },],
        "top": [{ type: Input },],
        "modal": [{ type: Input }, { type: HostBinding, args: ['attr.aria-modal',] },],
        "animate": [{ type: Input }, { type: HostBinding, args: ['class.animate',] },],
        "closeOnExternalClick": [{ type: Input },],
        "openChange": [{ type: Output },],
        "componentWidth": [{ type: HostBinding, args: ['style.width',] },],
        "closePanel": [{ type: HostListener, args: ['document:keyup.escape',] },],
        "clickHandler": [{ type: HostListener, args: ['document:click', ['$event'],] },],
    };
    return SidePanelComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ItemDisplayPanelContentDirective = (function () {
    function ItemDisplayPanelContentDirective() {
    }
    ItemDisplayPanelContentDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxItemDisplayPanelContent]'
                },] },
    ];
    return ItemDisplayPanelContentDirective;
}());
var ItemDisplayPanelFooterDirective = (function () {
    function ItemDisplayPanelFooterDirective() {
    }
    ItemDisplayPanelFooterDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxItemDisplayPanelFooter]'
                },] },
    ];
    return ItemDisplayPanelFooterDirective;
}());
var ItemDisplayPanelComponent = (function (_super) {
    __extends(ItemDisplayPanelComponent, _super);
    function ItemDisplayPanelComponent(service, elementRef) {
        var _this = _super.call(this, service, elementRef) || this;
        _this.boxShadow = true;
        _this.closeVisible = true;
        _this.shadow = false;
        _this.visibleChange = new EventEmitter();
        _this.animate = false;
        _this.closeOnExternalClick = true;
        return _this;
    }
    Object.defineProperty(ItemDisplayPanelComponent.prototype, "preventClose", {
        get: /**
         * @return {?}
         */
        function () {
            return !this.closeOnExternalClick;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.closeOnExternalClick = !value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemDisplayPanelComponent.prototype, "title", {
        get: /**
         * @return {?}
         */
        function () {
            return this.header;
        },
        set: /**
         * @deprecated
         * Title used for adding tooltips and shouldn't be used as an input
         * instead header will be used. This is here to support backward compatibility only
         * this property should not be used.
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.header = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemDisplayPanelComponent.prototype, "visible", {
        get: /**
         * @return {?}
         */
        function () {
            return this.open;
        },
        set: /**
         * @param {?} visible
         * @return {?}
         */
        function (visible) {
            this.open = visible;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ItemDisplayPanelComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._itemDisplayPanelSubscription = this.service.open$.subscribe(function (next) {
            _this.visibleChange.emit(next);
        });
    };
    /**
     * @return {?}
     */
    ItemDisplayPanelComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._itemDisplayPanelSubscription.unsubscribe();
    };
    ItemDisplayPanelComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-item-display-panel',
                    template: "<div class=\"ux-side-panel-host ux-item-display-panel\"\n    [class.box-shadow]=\"boxShadow\"\n    [style.position]=\"position\"\n    [style.width]=\"hostWidth\"\n    [style.top]=\"cssTop\">\n\n    <div class=\"ux-side-panel-header\" [class.item-display-panel-shadow]=\"shadow\">\n        <h3>{{ header }}</h3>\n        <button *ngIf=\"closeVisible\" type=\"button\" class=\"btn btn-lg btn-link btn-icon button-secondary\" (click)=\"visible = false\">\n            <i class=\"hpe-icon hpe-close\"></i>\n        </button>\n    </div>\n\n    <div class=\"ux-side-panel-content\">\n        <ng-content select=\"[uxItemDisplayPanelContent]\"></ng-content>\n    </div>\n\n    <div class=\"ux-side-panel-footer\" *ngIf=\"footer\">\n        <ng-content select=\"[uxItemDisplayPanelFooter]\"></ng-content>\n    </div>\n\n</div>\n",
                    providers: [SidePanelService],
                    host: {
                        'class': 'ux-side-panel ux-item-display-panel'
                    }
                },] },
    ];
    /** @nocollapse */
    ItemDisplayPanelComponent.ctorParameters = function () { return [
        { type: SidePanelService, },
        { type: ElementRef, },
    ]; };
    ItemDisplayPanelComponent.propDecorators = {
        "header": [{ type: Input },],
        "boxShadow": [{ type: Input },],
        "closeVisible": [{ type: Input },],
        "preventClose": [{ type: Input },],
        "shadow": [{ type: Input },],
        "footer": [{ type: ContentChild, args: [ItemDisplayPanelFooterDirective,] },],
        "visibleChange": [{ type: Output },],
        "title": [{ type: Input },],
        "visible": [{ type: Input },],
    };
    return ItemDisplayPanelComponent;
}(SidePanelComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ DECLARATIONS$3 = [
    ItemDisplayPanelComponent,
    ItemDisplayPanelContentDirective,
    ItemDisplayPanelFooterDirective
];
var ItemDisplayPanelModule = (function () {
    function ItemDisplayPanelModule() {
    }
    ItemDisplayPanelModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule
                    ],
                    exports: DECLARATIONS$3,
                    declarations: DECLARATIONS$3
                },] },
    ];
    return ItemDisplayPanelModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var WizardStepComponent = (function () {
    function WizardStepComponent() {
        this.valid = true;
        this.visitedChange = new EventEmitter();
        this._active = false;
        this._visited = false;
    }
    Object.defineProperty(WizardStepComponent.prototype, "visited", {
        get: /**
         * @return {?}
         */
        function () {
            return this._visited;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._visited = value;
            this.visitedChange.next(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardStepComponent.prototype, "active", {
        get: /**
         * @return {?}
         */
        function () {
            return this._active;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            // store the active state of the step
            this._active = value;
            // if the value is true then the step should also be marked as visited
            if (value === true) {
                this.visited = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    WizardStepComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-wizard-step',
                    template: "<ng-container *ngIf=\"active\">\n    <ng-content></ng-content>\n</ng-container>"
                },] },
    ];
    /** @nocollapse */
    WizardStepComponent.propDecorators = {
        "header": [{ type: Input },],
        "valid": [{ type: Input },],
        "visitedChange": [{ type: Input },],
        "visited": [{ type: Input },],
    };
    return WizardStepComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var WizardComponent = (function () {
    function WizardComponent() {
        this._step = 0;
        this.steps = new QueryList();
        this.orientation = 'horizontal';
        this.nextText = 'Next';
        this.previousText = 'Previous';
        this.cancelText = 'Cancel';
        this.finishText = 'Finish';
        this.nextTooltip = 'Go to the next step';
        this.previousTooltip = 'Go to the previous step';
        this.cancelTooltip = 'Cancel the wizard';
        this.finishTooltip = 'Finish the wizard';
        this.nextDisabled = false;
        this.previousDisabled = false;
        this.cancelDisabled = false;
        this.finishDisabled = false;
        this.nextVisible = true;
        this.previousVisible = true;
        this.cancelVisible = true;
        this.finishVisible = true;
        this.cancelAlwaysVisible = false;
        this.finishAlwaysVisible = false;
        this.onNext = new EventEmitter();
        this.onPrevious = new EventEmitter();
        this.onCancel = new EventEmitter();
        this.onFinishing = new EventEmitter();
        this.onFinish = new EventEmitter();
        this.stepChanging = new EventEmitter();
        this.stepChange = new EventEmitter();
        this.invalidIndicator = false;
    }
    Object.defineProperty(WizardComponent.prototype, "step", {
        get: /**
         * @return {?}
         */
        function () {
            return this._step;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            // only accept numbers as valid options
            if (typeof value === 'number') {
                // store the active step
                this._step = value;
                // update which steps should be active
                this.update();
                // emit the change event
                this.stepChange.next(this.step);
                // reset the invalid state
                this.invalidIndicator = false;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    WizardComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        // initially set the correct visibility of the steps
        setTimeout(this.update.bind(this));
    };
    /**
     * Navigate to the next step
     */
    /**
     * Navigate to the next step
     * @return {?}
     */
    WizardComponent.prototype.next = /**
     * Navigate to the next step
     * @return {?}
     */
    function () {
        this.stepChanging.next(new StepChangingEvent(this.step, this.step + 1));
        // check if current step is invalid
        if (!this.getCurrentStep().valid) {
            this.invalidIndicator = true;
            return;
        }
        // check if we are currently on the last step
        if ((this.step + 1) < this.steps.length) {
            this.step++;
            // emit the current step
            this.onNext.next(this.step);
        }
    };
    /**
     * Navigate to the previous step
     */
    /**
     * Navigate to the previous step
     * @return {?}
     */
    WizardComponent.prototype.previous = /**
     * Navigate to the previous step
     * @return {?}
     */
    function () {
        this.stepChanging.next(new StepChangingEvent(this.step, this.step - 1));
        // check if we are currently on the last step
        if (this.step > 0) {
            this.step--;
            // emit the current step
            this.onPrevious.next(this.step);
        }
    };
    /**
     * Perform actions when the finish button is clicked
     */
    /**
     * Perform actions when the finish button is clicked
     * @return {?}
     */
    WizardComponent.prototype.finish = /**
     * Perform actions when the finish button is clicked
     * @return {?}
     */
    function () {
        var _this = this;
        // fires when the finish button is clicked always
        this.onFinishing.next();
        /**
                 * This is required because we need to ensure change detection has run
                 * to determine whether or not we have the latest value for the 'valid' input
                 * on the current step. Unfortunately we can't use ChangeDetectorRef as we are looking to run
                 * on content children, and we cant use ApplicationRef.tick() as this does not work in a hybrid app, eg. our docs
                 */
        return new Promise(function (resolve) {
            setTimeout(function () {
                // only fires when the finish button is clicked and the step is valid
                if (_this.getCurrentStep().valid) {
                    _this.onFinish.next();
                }
                resolve();
            });
        });
    };
    /**
     * Perform actions when the cancel button is clicked
     */
    /**
     * Perform actions when the cancel button is clicked
     * @return {?}
     */
    WizardComponent.prototype.cancel = /**
     * Perform actions when the cancel button is clicked
     * @return {?}
     */
    function () {
        this.onCancel.next();
    };
    /**
     * Update the active state of each step
     */
    /**
     * Update the active state of each step
     * @return {?}
     */
    WizardComponent.prototype.update = /**
     * Update the active state of each step
     * @return {?}
     */
    function () {
        var _this = this;
        // update which steps should be active
        this.steps.forEach(function (step, idx) { return step.active = idx === _this.step; });
    };
    /**
     * Jump to a specific step only if the step has previously been visited
     */
    /**
     * Jump to a specific step only if the step has previously been visited
     * @param {?} step
     * @return {?}
     */
    WizardComponent.prototype.gotoStep = /**
     * Jump to a specific step only if the step has previously been visited
     * @param {?} step
     * @return {?}
     */
    function (step) {
        if (step.visited) {
            var /** @type {?} */ stepIndex = this.steps.toArray().findIndex(function (stp) { return stp === step; });
            this.stepChanging.next(new StepChangingEvent(this.step, stepIndex));
            this.step = stepIndex;
        }
    };
    /**
     * Determine if the current step is the last step
     */
    /**
     * Determine if the current step is the last step
     * @return {?}
     */
    WizardComponent.prototype.isLastStep = /**
     * Determine if the current step is the last step
     * @return {?}
     */
    function () {
        return this.step === (this.steps.length - 1);
    };
    /**
     * Reset the wizard - goes to first step and resets visited state
     */
    /**
     * Reset the wizard - goes to first step and resets visited state
     * @return {?}
     */
    WizardComponent.prototype.reset = /**
     * Reset the wizard - goes to first step and resets visited state
     * @return {?}
     */
    function () {
        // mark all steps as not visited
        this.steps.forEach(function (step) { return step.visited = false; });
        // go to the first step
        this.step = 0;
    };
    /**
     * Get the step at the current index
     */
    /**
     * Get the step at the current index
     * @return {?}
     */
    WizardComponent.prototype.getCurrentStep = /**
     * Get the step at the current index
     * @return {?}
     */
    function () {
        return this.getStepAtIndex(this.step);
    };
    /**
     * Return a step at a specific index
     */
    /**
     * Return a step at a specific index
     * @param {?} index
     * @return {?}
     */
    WizardComponent.prototype.getStepAtIndex = /**
     * Return a step at a specific index
     * @param {?} index
     * @return {?}
     */
    function (index) {
        return this.steps.toArray()[index];
    };
    WizardComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-wizard',
                    template: "<div class=\"wizard-body\">\n\n    <div class=\"wizard-steps\">\n\n        <div class=\"wizard-step\" [class.active]=\"stp.active\" [class.visited]=\"stp.visited\" [class.invalid]=\"stp.active && !stp.valid && invalidIndicator\" (click)=\"gotoStep(stp)\" *ngFor=\"let stp of steps\">\n            {{ stp.header }}\n        </div>\n\n    </div>\n\n    <div class=\"wizard-content\">\n        <ng-content></ng-content>\n    </div>\n\n</div>\n\n<div class=\"wizard-footer\">\n    <button #tip=\"ux-tooltip\" class=\"btn button-secondary\" *ngIf=\"previousVisible\" [uxTooltip]=\"previousTooltip\" [disabled]=\"previousDisabled || step === 0\"\n        (click)=\"previous(); tip.hide()\">{{ previousText }}</button>\n\n    <button #tip=\"ux-tooltip\" class=\"btn button-primary\" *ngIf=\"nextVisible && !isLastStep()\" [uxTooltip]=\"nextTooltip\" [disabled]=\"nextDisabled\"\n        (click)=\"next(); tip.hide()\">{{ nextText }}</button>\n\n    <button #tip=\"ux-tooltip\" class=\"btn button-primary\" *ngIf=\"finishVisible && isLastStep() || finishAlwaysVisible\" [uxTooltip]=\"finishTooltip\"\n        [disabled]=\"finishDisabled\" (click)=\"finish(); tip.hide()\">{{ finishText }}</button>\n\n    <button #tip=\"ux-tooltip\" class=\"btn button-secondary\" *ngIf=\"cancelVisible && !isLastStep() || cancelAlwaysVisible\" [uxTooltip]=\"cancelTooltip\"\n        [disabled]=\"cancelDisabled\" (click)=\"cancel(); tip.hide()\">{{ cancelText }}</button>\n</div>",
                    host: {
                        '[class]': 'orientation'
                    }
                },] },
    ];
    /** @nocollapse */
    WizardComponent.propDecorators = {
        "steps": [{ type: ContentChildren, args: [WizardStepComponent,] },],
        "orientation": [{ type: Input },],
        "nextText": [{ type: Input },],
        "previousText": [{ type: Input },],
        "cancelText": [{ type: Input },],
        "finishText": [{ type: Input },],
        "nextTooltip": [{ type: Input },],
        "previousTooltip": [{ type: Input },],
        "cancelTooltip": [{ type: Input },],
        "finishTooltip": [{ type: Input },],
        "nextDisabled": [{ type: Input },],
        "previousDisabled": [{ type: Input },],
        "cancelDisabled": [{ type: Input },],
        "finishDisabled": [{ type: Input },],
        "nextVisible": [{ type: Input },],
        "previousVisible": [{ type: Input },],
        "cancelVisible": [{ type: Input },],
        "finishVisible": [{ type: Input },],
        "cancelAlwaysVisible": [{ type: Input },],
        "finishAlwaysVisible": [{ type: Input },],
        "onNext": [{ type: Output },],
        "onPrevious": [{ type: Output },],
        "onCancel": [{ type: Output },],
        "onFinishing": [{ type: Output },],
        "onFinish": [{ type: Output },],
        "stepChanging": [{ type: Output },],
        "stepChange": [{ type: Output },],
        "step": [{ type: Input },],
    };
    return WizardComponent;
}());
var StepChangingEvent = (function () {
    function StepChangingEvent(from$$1, to) {
        this.from = from$$1;
        this.to = to;
    }
    return StepChangingEvent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ DECLARATIONS$4 = [
    WizardComponent,
    WizardStepComponent
];
var WizardModule = (function () {
    function WizardModule() {
    }
    WizardModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        TooltipModule
                    ],
                    exports: DECLARATIONS$4,
                    declarations: DECLARATIONS$4
                },] },
    ];
    return WizardModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * This service is required to provide a form of communication
 * between the marquee wizard steps and the containing marquee wizard.
 * We cannot inject the Host due to the steps being content children
 * rather than view children.
 */
var MarqueeWizardService = (function () {
    function MarqueeWizardService() {
        this.valid$ = new Subject();
    }
    MarqueeWizardService.decorators = [
        { type: Injectable },
    ];
    return MarqueeWizardService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var MarqueeWizardStepComponent = (function (_super) {
    __extends(MarqueeWizardStepComponent, _super);
    function MarqueeWizardStepComponent(_marqueeWizardService) {
        var _this = _super.call(this) || this;
        _this._marqueeWizardService = _marqueeWizardService;
        _this.completed = false;
        _this.completedChange = new EventEmitter();
        _this._valid = true;
        return _this;
    }
    Object.defineProperty(MarqueeWizardStepComponent.prototype, "valid", {
        get: /**
         * @return {?}
         */
        function () {
            return this._valid;
        },
        set: /**
         * @param {?} valid
         * @return {?}
         */
        function (valid) {
            this._valid = valid;
            if (this._marqueeWizardService) {
                this._marqueeWizardService.valid$.next({ step: this, valid: valid });
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Update the completed state and emit the latest value
     * @param completed whether or not the step is completed
     */
    /**
     * Update the completed state and emit the latest value
     * @param {?} completed whether or not the step is completed
     * @return {?}
     */
    MarqueeWizardStepComponent.prototype.setCompleted = /**
     * Update the completed state and emit the latest value
     * @param {?} completed whether or not the step is completed
     * @return {?}
     */
    function (completed) {
        this.completed = completed;
        this.completedChange.emit(completed);
    };
    MarqueeWizardStepComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-marquee-wizard-step',
                    template: "<ng-container *ngIf=\"active\">\n    <ng-content></ng-content>\n</ng-container>"
                },] },
    ];
    /** @nocollapse */
    MarqueeWizardStepComponent.ctorParameters = function () { return [
        { type: MarqueeWizardService, },
    ]; };
    MarqueeWizardStepComponent.propDecorators = {
        "icon": [{ type: Input },],
        "completed": [{ type: Input },],
        "completedChange": [{ type: Output },],
    };
    return MarqueeWizardStepComponent;
}(WizardStepComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var MarqueeWizardComponent = (function (_super) {
    __extends(MarqueeWizardComponent, _super);
    function MarqueeWizardComponent(marqueeWizardService) {
        var _this = _super.call(this) || this;
        _this.steps = new QueryList();
        marqueeWizardService.valid$.pipe(filter(function (event) { return !event.valid; })).subscribe(_this.validChange.bind(_this));
        return _this;
    }
    Object.defineProperty(MarqueeWizardComponent.prototype, "isTemplate", {
        get: /**
         * @return {?}
         */
        function () {
            return this.description && this.description instanceof TemplateRef;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * If the current step is valid, mark it as
     * complete and go to the next step
     */
    /**
     * If the current step is valid, mark it as
     * complete and go to the next step
     * @return {?}
     */
    MarqueeWizardComponent.prototype.next = /**
     * If the current step is valid, mark it as
     * complete and go to the next step
     * @return {?}
     */
    function () {
        // get the current step
        var /** @type {?} */ step = /** @type {?} */ (this.getCurrentStep());
        if (step.valid) {
            _super.prototype.next.call(this);
            // mark this step as completed
            step.setCompleted(true);
        }
    };
    /**
     * Emit the onFinishing event and if valid the onFinish event.
     * Also mark the final step as completed if it is valid
     */
    /**
     * Emit the onFinishing event and if valid the onFinish event.
     * Also mark the final step as completed if it is valid
     * @return {?}
     */
    MarqueeWizardComponent.prototype.finish = /**
     * Emit the onFinishing event and if valid the onFinish event.
     * Also mark the final step as completed if it is valid
     * @return {?}
     */
    function () {
        // get the current step
        var /** @type {?} */ step = /** @type {?} */ (this.getCurrentStep());
        // call the original finish function
        return _super.prototype.finish.call(this).then(function () {
            // if the step is valid indicate that it is now complete
            if (step.valid) {
                step.setCompleted(true);
            }
        });
    };
    /**
     * If a step in the wizard becomes invalid, all steps sequentially after
     * it, should become unvisited and incomplete
     */
    /**
     * If a step in the wizard becomes invalid, all steps sequentially after
     * it, should become unvisited and incomplete
     * @param {?} state
     * @return {?}
     */
    MarqueeWizardComponent.prototype.validChange = /**
     * If a step in the wizard becomes invalid, all steps sequentially after
     * it, should become unvisited and incomplete
     * @param {?} state
     * @return {?}
     */
    function (state$$1) {
        var /** @type {?} */ steps = this.steps.toArray();
        var /** @type {?} */ current = steps.findIndex(function (step) { return step === state$$1.step; });
        var /** @type {?} */ affected = steps.slice(current);
        affected.forEach(function (step) {
            // the step should no longer be completed
            step.completed = false;
            // if the step is not the current step then also mark it as unvisited
            if (step !== state$$1.step) {
                step.visited = false;
            }
        });
    };
    MarqueeWizardComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-marquee-wizard',
                    template: "<div class=\"marquee-wizard-side-panel\">\n\n    <div class=\"marquee-wizard-description-container\" *ngIf=\"description\">\n        <!-- If a template was provided display it -->\n        <ng-container *ngIf=\"isTemplate\" [ngTemplateOutlet]=\"description\"></ng-container>\n\n        <!-- Otherwise wimply display the string -->\n        <ng-container *ngIf=\"!isTemplate\">\n            <p>{{ description }}</p>\n        </ng-container>\n    </div>\n\n    <ul class=\"marquee-wizard-steps\">\n\n        <li class=\"marquee-wizard-step\" *ngFor=\"let step of steps\" (click)=\"gotoStep(step)\" [class.active]=\"step.active\" [class.visited]=\"step.visited\" [class.invalid]=\"!step.valid\">\n            <i class=\"marquee-wizard-step-icon\" [ngClass]=\"step.icon\"></i>\n            <span class=\"marquee-wizard-step-title\">{{ step.header }}</span>\n            <span class=\"marquee-wizard-step-status hpe-icon hpe-checkmark\" *ngIf=\"step.completed\"></span>\n        </li>\n\n    </ul>\n</div>\n\n<div class=\"marquee-wizard-content-panel\">\n    <div class=\"marquee-wizard-content\">\n        <ng-content></ng-content>\n    </div>\n\n    <div class=\"modal-footer\">\n\n        <button #tip=\"ux-tooltip\" class=\"btn button-secondary\" *ngIf=\"previousVisible\" [uxTooltip]=\"previousTooltip\" container=\"body\"\n            [disabled]=\"previousDisabled || step === 0\" (click)=\"previous(); tip.hide()\">{{ previousText }}</button>\n\n        <button #tip=\"ux-tooltip\" class=\"btn button-primary\" *ngIf=\"nextVisible && !isLastStep()\" [uxTooltip]=\"nextTooltip\" container=\"body\"\n            [disabled]=\"nextDisabled\" (click)=\"next(); tip.hide()\">{{ nextText }}</button>\n\n        <button #tip=\"ux-tooltip\" class=\"btn button-primary\" *ngIf=\"finishVisible && isLastStep() || finishAlwaysVisible\" [uxTooltip]=\"finishTooltip\"\n            container=\"body\" [disabled]=\"finishDisabled\" (click)=\"finish(); tip.hide()\">{{ finishText }}</button>\n\n        <button #tip=\"ux-tooltip\" class=\"btn button-secondary\" *ngIf=\"cancelVisible && !isLastStep() || cancelAlwaysVisible\" [uxTooltip]=\"cancelTooltip\"\n            container=\"body\" [disabled]=\"cancelDisabled\" (click)=\"cancel(); tip.hide()\">{{ cancelText }}</button>\n    </div>\n</div>",
                    providers: [MarqueeWizardService]
                },] },
    ];
    /** @nocollapse */
    MarqueeWizardComponent.ctorParameters = function () { return [
        { type: MarqueeWizardService, },
    ]; };
    MarqueeWizardComponent.propDecorators = {
        "description": [{ type: Input },],
        "steps": [{ type: ContentChildren, args: [MarqueeWizardStepComponent,] },],
    };
    return MarqueeWizardComponent;
}(WizardComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var MarqueeWizardModule = (function () {
    function MarqueeWizardModule() {
    }
    MarqueeWizardModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        WizardModule,
                        TooltipModule
                    ],
                    exports: [
                        MarqueeWizardComponent,
                        MarqueeWizardStepComponent
                    ],
                    declarations: [
                        MarqueeWizardComponent,
                        MarqueeWizardStepComponent
                    ]
                },] },
    ];
    return MarqueeWizardModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NavigationComponent = (function () {
    function NavigationComponent() {
    }
    NavigationComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-navigation',
                    template: "<nav class=\"tree\" role=\"navigation\">\n    <ol class=\"nav\">\n        <ng-content></ng-content>\n    </ol>\n</nav>\n"
                },] },
    ];
    return NavigationComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NavigationItemComponent = (function () {
    function NavigationItemComponent(_elementRef, _renderer, _parent, _router, _activatedRoute) {
        var _this = this;
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._parent = _parent;
        this._router = _router;
        this._activatedRoute = _activatedRoute;
        this.expanded = false;
        this.level = 1;
        this.indentWithoutArrow = true;
        this.level = _parent ? _parent.level + 1 : 1;
        this._navigationEnd = _router.events.pipe(filter(function (event) { return event instanceof NavigationEnd; }))
            .subscribe(function () { return _this.expanded = _this.hasActiveLink(_this.link); });
    }
    Object.defineProperty(NavigationItemComponent.prototype, "active", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.link) {
                return this._router.isActive(this.link, true);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavigationItemComponent.prototype, "children", {
        get: /**
         * @return {?}
         */
        function () {
            var _this = this;
            return this._children.filter(function (item) { return item !== _this; });
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NavigationItemComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        // Add classes to parent for styling
        var /** @type {?} */ parentListElement = this._elementRef.nativeElement.parentElement;
        if (parentListElement) {
            var /** @type {?} */ levelClass = this.getLevelClass();
            if (levelClass.length > 0) {
                this._renderer.addClass(parentListElement, 'nav');
                this._renderer.addClass(parentListElement, levelClass);
            }
        }
    };
    /**
     * @return {?}
     */
    NavigationItemComponent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // Set 'indentWithoutArrow'
        this.setIndentWithoutArrow();
        // Update 'indentWithoutArrow' in response to changes to children
        this._childrenChanges = this._children.changes.subscribe(function () { return _this.setIndentWithoutArrow(); });
    };
    /**
     * @return {?}
     */
    NavigationItemComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._navigationEnd.unsubscribe();
        this._childrenChanges.unsubscribe();
    };
    /**
     * @param {?} link
     * @return {?}
     */
    NavigationItemComponent.prototype.hasActiveLink = /**
     * @param {?} link
     * @return {?}
     */
    function (link) {
        var /** @type {?} */ tree = this._router.createUrlTree([link], {
            relativeTo: this._activatedRoute,
            queryParams: this._activatedRoute.snapshot.queryParams,
            fragment: this._activatedRoute.snapshot.fragment
        });
        if (link && this._router.isActive(tree, true)) {
            return true;
        }
        // If this component has children, check if any of them, or their descendants, are active.
        return this.children.some(function (item) { return item.hasActiveLink(item.link); });
    };
    /**
     * @return {?}
     */
    NavigationItemComponent.prototype.getLevelClass = /**
     * @return {?}
     */
    function () {
        switch (this.level) {
            case 2:
                return 'nav-second-level';
            case 3:
                return 'nav-third-level';
            case 4:
                return 'nav-fourth-level';
            case 5:
                return 'nav-fifth-level';
        }
        return '';
    };
    /**
     * @return {?}
     */
    NavigationItemComponent.prototype.setIndentWithoutArrow = /**
     * @return {?}
     */
    function () {
        if (this.children.length > 0) {
            // If this element has children it will be indented and will have an arrow
            this.indentWithoutArrow = false;
        }
        else if (this._parent) {
            // If this element has a parent, indent it if any of its siblings have children
            this.indentWithoutArrow = !this._parent.children.every(function (item) { return item.children.length === 0; });
        }
        else {
            // Top-level elements should be indented
            this.indentWithoutArrow = true;
        }
    };
    NavigationItemComponent.decorators = [
        { type: Component, args: [{
                    selector: '[ux-navigation-item]',
                    template: "<a *ngIf=\"link\" [class.has-arrow]=\"children.length > 0\" [class.no-arrow]=\"indentWithoutArrow\" [routerLink]=\"link\">\n    <span>{{header}}</span>\n</a>\n<a *ngIf=\"!link\" (click)=\"expanded = !expanded\" [class.has-arrow]=\"children.length > 0\" [class.no-arrow]=\"indentWithoutArrow\">\n    <span>{{header}}</span>\n</a>\n<ng-content></ng-content>\n",
                },] },
    ];
    /** @nocollapse */
    NavigationItemComponent.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Renderer2, },
        { type: NavigationItemComponent, decorators: [{ type: Optional }, { type: SkipSelf },] },
        { type: Router, },
        { type: ActivatedRoute, },
    ]; };
    NavigationItemComponent.propDecorators = {
        "header": [{ type: Input },],
        "icon": [{ type: Input },],
        "link": [{ type: Input },],
        "expanded": [{ type: Input }, { type: HostBinding, args: ['class.selected',] },],
        "active": [{ type: HostBinding, args: ['class.active',] },],
        "_children": [{ type: ContentChildren, args: [NavigationItemComponent, { descendants: true },] },],
    };
    return NavigationItemComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NavigationModule = (function () {
    function NavigationModule() {
    }
    NavigationModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        RouterModule
                    ],
                    exports: [
                        NavigationComponent,
                        NavigationItemComponent
                    ],
                    declarations: [
                        NavigationComponent,
                        NavigationItemComponent
                    ]
                },] },
    ];
    return NavigationModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ColorService = (function () {
    function ColorService() {
        this._colorSet = colorSets.keppel;
        if (this._colorSet.colorClassSet) {
            this.setColors();
        }
        else {
            for (var /** @type {?} */ key in this._colorSet.colorValueSet) {
                this._colors[key] = this.getColorValueByHex(this._colorSet.colorValueSet[key]);
            }
        }
    }
    /**
     * @return {?}
     */
    ColorService.prototype.setColors = /**
     * @return {?}
     */
    function () {
        this._html = '';
        for (var /** @type {?} */ key in this._colorSet.colorClassSet) {
            this._html += '<div class="' + this._colorSet.colorClassSet[key] + '-color"></div>';
        }
        this._element = document.createElement('div');
        this._element.className = 'color-chart';
        this._element.innerHTML = this._html;
        document.body.appendChild(this._element);
        this._colors = {};
        for (var /** @type {?} */ key in this._colorSet.colorClassSet) {
            this._colors[key] = this.getColorValue(this._colorSet.colorClassSet[key]);
        }
        this._element.parentNode.removeChild(this._element);
    };
    /**
     * @param {?} color
     * @return {?}
     */
    ColorService.prototype.getColorValueByHex = /**
     * @param {?} color
     * @return {?}
     */
    function (color) {
        var /** @type {?} */ hex = color.replace('#', '');
        var /** @type {?} */ r = parseInt(hex.substring(0, 2), 16).toString();
        var /** @type {?} */ g = parseInt(hex.substring(2, 4), 16).toString();
        var /** @type {?} */ b = parseInt(hex.substring(4, 6), 16).toString();
        return new ThemeColor(r, g, b, '1');
    };
    /**
     * @param {?} color
     * @return {?}
     */
    ColorService.prototype.getColorValue = /**
     * @param {?} color
     * @return {?}
     */
    function (color) {
        var /** @type {?} */ target = this._element.querySelector('.' + this._colorSet.colorClassSet[color] + '-color');
        if (!target) {
            throw new Error('Invalid color');
        }
        var /** @type {?} */ colorValue = window.getComputedStyle(target).backgroundColor;
        var /** @type {?} */ rgba = colorValue.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
        return new ThemeColor(rgba[1], rgba[2], rgba[3], rgba[4]);
    };
    /**
     * @param {?} color
     * @return {?}
     */
    ColorService.prototype.getColor = /**
     * @param {?} color
     * @return {?}
     */
    function (color) {
        var /** @type {?} */ themeColor = this._colors[this.resolveColorName(color)];
        if (!themeColor) {
            throw new Error('Color not found: ' + color);
        }
        return new ThemeColor(themeColor.getRed(), themeColor.getGreen(), themeColor.getBlue(), themeColor.getAlpha());
    };
    /**
     * @return {?}
     */
    ColorService.prototype.getColorSet = /**
     * @return {?}
     */
    function () {
        return this._colorSet;
    };
    /**
     * @param {?} colorSet
     * @return {?}
     */
    ColorService.prototype.setColorSet = /**
     * @param {?} colorSet
     * @return {?}
     */
    function (colorSet) {
        this._colorSet = colorSet;
        this._colors = {};
        if (this._colorSet.colorClassSet) {
            this.setColors();
        }
        else {
            for (var /** @type {?} */ key in this._colorSet.colorValueSet) {
                this._colors[key] = this.getColorValueByHex(this._colorSet.colorValueSet[key]);
            }
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    ColorService.prototype.resolve = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (!value) {
            return;
        }
        var /** @type {?} */ colorName = this.resolveColorName(value);
        for (var /** @type {?} */ color in this._colors) {
            if (colorName === color.toLowerCase()) {
                return this.getColor(colorName).toRgba();
            }
        }
        return value;
    };
    /**
     * @param {?=} value
     * @return {?}
     */
    ColorService.prototype.resolveColorName = /**
     * @param {?=} value
     * @return {?}
     */
    function (value) {
        if (value === void 0) { value = ''; }
        return value.replace(/\s+/g, '-').toLowerCase();
    };
    ColorService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ColorService.ctorParameters = function () { return []; };
    return ColorService;
}());
var ThemeColor = (function () {
    function ThemeColor(r, g, b, a) {
        this._r = r;
        this._g = g;
        this._b = b;
        this._a = a === undefined ? '1' : a;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    ThemeColor.parse = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        var /** @type {?} */ r, /** @type {?} */ g, /** @type {?} */ b, /** @type {?} */ a = '1';
        var /** @type {?} */ rgbaPattern = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/;
        var /** @type {?} */ shortHexPattern = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        var /** @type {?} */ longHexPattern = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/;
        var /** @type {?} */ rgbaMatch = value.match(rgbaPattern);
        var /** @type {?} */ shortHexMatch = value.match(shortHexPattern);
        var /** @type {?} */ longHexMatch = value.match(longHexPattern);
        if (rgbaMatch) {
            r = rgbaMatch[1];
            g = rgbaMatch[2];
            b = rgbaMatch[3];
            a = rgbaMatch[4] ? rgbaMatch[4] : '1';
        }
        else if (longHexMatch) {
            r = parseInt(longHexMatch[1], 16).toString();
            g = parseInt(longHexMatch[2], 16).toString();
            b = parseInt(longHexMatch[3], 16).toString();
        }
        else if (shortHexMatch) {
            r = parseInt(shortHexMatch[1] + shortHexMatch[1], 16).toString();
            g = parseInt(shortHexMatch[2] + shortHexMatch[2], 16).toString();
            b = parseInt(shortHexMatch[3] + shortHexMatch[3], 16).toString();
        }
        else {
            throw new Error("Cannot parse color - " + value + " is not a valid color.");
        }
        return new ThemeColor(r, g, b, a);
    };
    /**
     * @return {?}
     */
    ThemeColor.prototype.toHex = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ red = parseInt(this._r).toString(16);
        var /** @type {?} */ green = parseInt(this._g).toString(16);
        var /** @type {?} */ blue = parseInt(this._b).toString(16);
        if (red.length < 2) {
            red = '0' + red;
        }
        if (green.length < 2) {
            green = '0' + green;
        }
        if (blue.length < 2) {
            blue = '0' + blue;
        }
        return '#' + red + green + blue;
    };
    /**
     * @return {?}
     */
    ThemeColor.prototype.toRgb = /**
     * @return {?}
     */
    function () {
        return 'rgb(' + this._r + ', ' + this._g + ', ' + this._b + ')';
    };
    /**
     * @return {?}
     */
    ThemeColor.prototype.toRgba = /**
     * @return {?}
     */
    function () {
        return 'rgba(' + this._r + ', ' + this._g + ', ' + this._b + ', ' + this._a + ')';
    };
    /**
     * @return {?}
     */
    ThemeColor.prototype.getRed = /**
     * @return {?}
     */
    function () {
        return this._r;
    };
    /**
     * @return {?}
     */
    ThemeColor.prototype.getGreen = /**
     * @return {?}
     */
    function () {
        return this._g;
    };
    /**
     * @return {?}
     */
    ThemeColor.prototype.getBlue = /**
     * @return {?}
     */
    function () {
        return this._b;
    };
    /**
     * @return {?}
     */
    ThemeColor.prototype.getAlpha = /**
     * @return {?}
     */
    function () {
        return this._a;
    };
    /**
     * @param {?} red
     * @return {?}
     */
    ThemeColor.prototype.setRed = /**
     * @param {?} red
     * @return {?}
     */
    function (red) {
        this._r = red;
        return this;
    };
    /**
     * @param {?} green
     * @return {?}
     */
    ThemeColor.prototype.setGreen = /**
     * @param {?} green
     * @return {?}
     */
    function (green) {
        this._g = green;
        return this;
    };
    /**
     * @param {?} blue
     * @return {?}
     */
    ThemeColor.prototype.setBlue = /**
     * @param {?} blue
     * @return {?}
     */
    function (blue) {
        this._b = blue;
        return this;
    };
    /**
     * @param {?} alpha
     * @return {?}
     */
    ThemeColor.prototype.setAlpha = /**
     * @param {?} alpha
     * @return {?}
     */
    function (alpha) {
        this._a = alpha.toString();
        return this;
    };
    return ThemeColor;
}());
var /** @type {?} */ colorSets = {
    keppel: {
        colorClassSet: {
            'primary': 'primary',
            'accent': 'accent',
            'secondary': 'secondary',
            'alternate1': 'alternate1',
            'alternate2': 'alternate2',
            'alternate3': 'alternate3',
            'vibrant1': 'vibrant1',
            'vibrant2': 'vibrant2',
            'grey1': 'grey1',
            'grey2': 'grey2',
            'grey3': 'grey3',
            'grey4': 'grey4',
            'grey5': 'grey5',
            'grey6': 'grey6',
            'grey7': 'grey7',
            'grey8': 'grey8',
            'chart1': 'chart1',
            'chart2': 'chart2',
            'chart3': 'chart3',
            'chart4': 'chart4',
            'chart5': 'chart5',
            'chart6': 'chart6',
            'ok': 'ok',
            'warning': 'warning',
            'critical': 'critical',
            'partition1': 'partition1',
            'partition9': 'partition9',
            'partition10': 'partition10',
            'partition11': 'partition11',
            'partition12': 'partition12',
            'partition13': 'partition13',
            'partition14': 'partition14',
            'social-chart-node': 'social-chart-node',
            'social-chart-edge': 'social-chart-edge'
        }
    },
    microFocus: {
        'colorValueSet': {
            'cerulean': '#1668c1',
            'aqua': '#29ceff',
            'aquamarine': '#2fd6c3',
            'fuchsia': '#c6179d',
            'indigo': '#7425ad',
            'dark-blue': '#231ca5',
            'white': '#ffffff',
            'slightly-gray': '#f5f7f8',
            'bright-gray': '#f1f2f3',
            'gray': '#dcdedf',
            'silver': '#bdbec0',
            'dim-gray': '#656668',
            'dark-gray': '#323435',
            'black': '#000000',
            'crimson-negative': '#e5004c',
            'apricot': '#f48b34',
            'yellow': '#fcdb1f',
            'green-positive': '#1aac60',
            'ultramarine': '#3939c6',
            'skyblue': '#00abf3',
            'pale-aqua': '#43e4ff',
            'pale-green': '#1ffbba',
            'lime': '#75da4d',
            'orange': '#ffce00',
            'magenta': '#eb23c2',
            'pale-purple': '#ba47e2',
            'dark-ultramarine': '#271782',
            'steelblue': '#014272',
            'arctic-blue': '#0b8eac',
            'emerald': '#00a989',
            'olive': '#5bba36',
            'goldenrod': '#ffb000',
            'purple': '#9b1e83',
            'pale-eggplant': '#5216ac',
            'red': '#ff454f',
            'pale-amber': '#ffb24d',
            'pale-lemon': '#fde159',
            'pale-emerald': '#33c180',
            'plum': '#b21646',
            'copper': '#e57828',
            'amber': '#ffc002',
            'leaf-green': '#118c4f',
            'forest-green': '#00645a',
            'primary': '#0073e7',
            'accent': '#7425ad',
            'secondary': '#ffffff',
            'alternate1': '#29ceff',
            'alternate2': '#2fd6c3',
            'alternate3': '#c6179d',
            'vibrant1': '#43e4ff',
            'vibrant2': '#ffce00',
            'grey1': '#000000',
            'grey2': '#323435',
            'grey3': '#656668',
            'grey4': '#bdbec0',
            'grey5': '#dcdedf',
            'grey6': '#f1f2f3',
            'grey7': '#f5f7f8',
            'grey8': '#ffffff',
            'chart1': '#3939c6',
            'chart2': '#00abf3',
            'chart3': '#75da4d',
            'chart4': '#ffce00',
            'chart5': '#eb23c2',
            'chart6': '#ba47e2',
            'ok': '#1aac60',
            'warning': '#f48b34',
            'critical': 'e5004c',
            'partition1': '#7425ad',
            'partition9': '#5216ac',
            'partition10': '#5bba36',
            'partition11': '#014272',
            'partition12': '#ffb000',
            'partition13': '#bdbec0',
            'partition14': '#271782',
            'social-chart-node': '#ff00ff',
            'social-chart-edge': '#ff00ff'
        }
    }
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ColorServiceModule = (function () {
    function ColorServiceModule() {
    }
    ColorServiceModule.decorators = [
        { type: NgModule, args: [{
                    providers: [ColorService],
                },] },
    ];
    return ColorServiceModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NotificationService = (function () {
    function NotificationService(_colorService) {
        this._colorService = _colorService;
        // provide default options
        this.options = {
            duration: 4,
            height: 100,
            spacing: 10,
            backgroundColor: this._colorService.getColor('accent').toHex(),
            iconColor: this._colorService.getColor('accent').toHex()
        };
        this.direction = 'above';
        this.notifications$ = new BehaviorSubject([]);
    }
    /**
     * @param {?} templateRef
     * @param {?=} options
     * @param {?=} data
     * @return {?}
     */
    NotificationService.prototype.show = /**
     * @param {?} templateRef
     * @param {?=} options
     * @param {?=} data
     * @return {?}
     */
    function (templateRef, options, data) {
        var _this = this;
        if (options === void 0) { options = this.options; }
        if (data === void 0) { data = {}; }
        options = __assign({}, this.options, options);
        var /** @type {?} */ notificationRef = {
            templateRef: templateRef,
            duration: options.duration,
            date: new Date(),
            visible: true,
            height: options.height,
            spacing: options.spacing,
            backgroundColor: options.backgroundColor,
            iconColor: options.iconColor,
            data: data
        };
        var /** @type {?} */ notifications = this.notifications$.getValue();
        if (this.direction === 'above') {
            notifications.unshift(notificationRef);
        }
        else {
            notifications.push(notificationRef);
        }
        this.notifications$.next(notifications);
        // remove notification after delay
        if (options.duration !== 0) {
            setTimeout(function () { return _this.dismiss(notificationRef); }, options.duration * 1000);
        }
        return notificationRef;
    };
    /**
     * @return {?}
     */
    NotificationService.prototype.getHistory = /**
     * @return {?}
     */
    function () {
        return this.notifications$.getValue();
    };
    /**
     * @param {?} notificationRef
     * @return {?}
     */
    NotificationService.prototype.dismiss = /**
     * @param {?} notificationRef
     * @return {?}
     */
    function (notificationRef) {
        notificationRef.visible = false;
        this.notifications$.next(this.notifications$.getValue());
    };
    /**
     * @return {?}
     */
    NotificationService.prototype.dismissAll = /**
     * @return {?}
     */
    function () {
        this.notifications$.getValue().forEach(function (notificationRef) { return notificationRef.visible = false; });
        this.notifications$.next(this.notifications$.getValue());
    };
    NotificationService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    NotificationService.ctorParameters = function () { return [
        { type: ColorService, },
    ]; };
    return NotificationService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NotificationListComponent = (function () {
    function NotificationListComponent(_notificationService) {
        this._notificationService = _notificationService;
        this.position = 'top-right';
        this.notifications$ = this._notificationService.notifications$.pipe(map$1(function (notificationRefs) { return notificationRefs.filter(function (notificationRef) { return notificationRef.visible; }); }));
    }
    Object.defineProperty(NotificationListComponent.prototype, "direction", {
        set: /**
         * @param {?} direction
         * @return {?}
         */
        function (direction) {
            this._notificationService.direction = direction;
        },
        enumerable: true,
        configurable: true
    });
    NotificationListComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-notification-list',
                    template: "<div class=\"notification\" *ngFor=\"let notificationRef of notifications$ | async; let idx = index\"\n    [style.top.px]=\"(notificationRef.height + notificationRef.spacing) * idx\"\n    [style.height.px]=\"notificationRef.height\"\n    [style.background-color]=\"notificationRef.backgroundColor\"\n    [@notificationState]>\n    <ng-container *ngTemplateOutlet=\"notificationRef.templateRef; context: { $implicit: notificationRef, data: notificationRef.data }\"></ng-container>\n</div>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    animations: [
                        trigger('notificationState', [
                            state('in', style({ transform: 'translateY(0)', opacity: 0.9 })),
                            transition(':enter', [
                                style({ transform: 'translateY(-50px)', opacity: 0 }),
                                animate(500)
                            ]),
                            transition(':leave', [
                                animate(500, style({ transform: 'translateY(50px)', opacity: 0 }))
                            ])
                        ])
                    ]
                },] },
    ];
    /** @nocollapse */
    NotificationListComponent.ctorParameters = function () { return [
        { type: NotificationService, },
    ]; };
    NotificationListComponent.propDecorators = {
        "direction": [{ type: Input },],
        "position": [{ type: Input }, { type: HostBinding, args: ['class',] },],
    };
    return NotificationListComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NotificationModule = (function () {
    function NotificationModule() {
    }
    NotificationModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        ColorServiceModule
                    ],
                    exports: [
                        NotificationListComponent
                    ],
                    declarations: [
                        NotificationListComponent
                    ],
                    providers: [
                        NotificationService
                    ]
                },] },
    ];
    return NotificationModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ NUMBER_PICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return NumberPickerComponent; }),
    multi: true
};
var NumberPickerComponent = (function () {
    function NumberPickerComponent() {
        this._min = -Infinity;
        this._max = Infinity;
        this._step = 1;
        this._disabled = false;
        this._value = 0;
        this._propagateChange = function (_) { };
        this.valid = true;
        this.valueChange = new EventEmitter();
    }
    Object.defineProperty(NumberPickerComponent.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () {
            return this._value;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._value = value;
            this.valueChange.emit(value);
            this._propagateChange(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumberPickerComponent.prototype, "min", {
        get: /**
         * @return {?}
         */
        function () {
            return this._min;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._min = typeof value === 'string' ? parseFloat(value) : value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumberPickerComponent.prototype, "max", {
        get: /**
         * @return {?}
         */
        function () {
            return this._max;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._max = typeof value === 'string' ? parseFloat(value) : value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumberPickerComponent.prototype, "step", {
        get: /**
         * @return {?}
         */
        function () {
            return this._step;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._step = typeof value === 'string' ? parseFloat(value) : value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumberPickerComponent.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () {
            return this._disabled;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._disabled = typeof value === 'string' && (value === '' || value === 'true' || value === 'disabled') || value === true;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} event
     * @return {?}
     */
    NumberPickerComponent.prototype.increment = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.preventDefault();
        if (!this.disabled) {
            this.value = Math.max(Math.min(this.value + this.step, this.max), this.min);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NumberPickerComponent.prototype.decrement = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.preventDefault();
        if (!this.disabled) {
            this.value = Math.min(Math.max(this.value - this.step, this.min), this.max);
        }
    };
    /**
     * @return {?}
     */
    NumberPickerComponent.prototype.isValid = /**
     * @return {?}
     */
    function () {
        if (this.value < this.min || this.value > this.max) {
            return false;
        }
        return this.valid;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NumberPickerComponent.prototype.onScroll = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var /** @type {?} */ scrollValue = event.deltaY || event.wheelDelta;
        if (scrollValue < 0) {
            this.increment(event);
        }
        else {
            this.decrement(event);
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    NumberPickerComponent.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (value !== undefined) {
            this._value = value;
        }
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    NumberPickerComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this._propagateChange = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    NumberPickerComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    NumberPickerComponent.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
    };
    NumberPickerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-number-picker',
                    template: "<input type=\"number\"\n       role=\"spinbutton\"\n       class=\"form-control number-picker-input\"\n       [(ngModel)]=\"value\"\n       [min]=\"min\"\n       [max]=\"max\"\n       (keydown.ArrowDown)=\"decrement($event)\"\n       (keydown.ArrowUp)=\"increment($event)\"\n       (wheel)=\"onScroll($event)\"\n       step=\"any\"\n       [disabled]=\"disabled\"\n       [attr.aria-valuemin]=\"min\"\n       [attr.aria-valuenow]=\"value\"\n       [attr.aria-valuemax]=\"max\">\n\n<div class=\"number-picker-controls\">\n\n    <div class=\"number-picker-control-up\"\n         (click)=\"increment($event)\"\n         [class.disabled]=\"disabled || value >= max\">\n\n        <span class=\"hpe-icon hpe-up\"></span>\n    </div>\n\n    <div class=\"number-picker-control-down\"\n         (click)=\"decrement($event)\"\n         [class.disabled]=\"disabled || value <= min\">\n\n        <span class=\"hpe-icon hpe-down\"></span>\n    </div>\n\n</div>",
                    providers: [NUMBER_PICKER_VALUE_ACCESSOR],
                    host: {
                        '[class.has-error]': '!isValid()'
                    }
                },] },
    ];
    /** @nocollapse */
    NumberPickerComponent.propDecorators = {
        "valid": [{ type: Input },],
        "valueChange": [{ type: Output },],
        "value": [{ type: Input, args: ['value',] },],
        "min": [{ type: Input },],
        "max": [{ type: Input },],
        "step": [{ type: Input },],
        "disabled": [{ type: Input },],
    };
    return NumberPickerComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NumberPickerModule = (function () {
    function NumberPickerModule() {
    }
    NumberPickerModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule
                    ],
                    exports: [NumberPickerComponent],
                    declarations: [NumberPickerComponent]
                },] },
    ];
    return NumberPickerModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var PageHeaderCustomMenuDirective = (function () {
    function PageHeaderCustomMenuDirective() {
    }
    PageHeaderCustomMenuDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxPageHeaderCustomMenu]'
                },] },
    ];
    return PageHeaderCustomMenuDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var PageHeaderService = (function () {
    function PageHeaderService() {
        var _this = this;
        this.items$ = new BehaviorSubject([]);
        this.selected$ = new BehaviorSubject(null);
        this.selectedRoot$ = new BehaviorSubject(null);
        this.secondary$ = new BehaviorSubject(false);
        this.activeIconMenu$ = new BehaviorSubject(null);
        this._subscription = this.selected$.pipe(map(function (selected) { return _this.getRoot(selected); })).subscribe(function (root) { return _this.selectedRoot$.next(root); });
    }
    /**
     * @return {?}
     */
    PageHeaderService.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._subscription.unsubscribe();
    };
    /**
     * @param {?} item
     * @return {?}
     */
    PageHeaderService.prototype.select = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        // do nothing if this item is already selected
        if (item === this.selected$.getValue()) {
            return;
        }
        // if we are in secondary navigation mode and we click a parent - dont deselect the child
        if (this.secondary$.getValue() === true && this.isParentOf(this.selected$.getValue(), item)) {
            return;
        }
        // deselect all current items
        this.deselectAll();
        // call the select function if present
        if (item.select) {
            item.select.call(item, item);
        }
        // store the selected state
        item.selected = true;
        // select all parent items too
        this.selectParents(item);
        // emit the new selected item
        this.selected$.next(item);
    };
    /**
     * @param {?} item
     * @return {?}
     */
    PageHeaderService.prototype.deselect = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        var _this = this;
        // deselect the current item
        item.selected = false;
        // iterate any children and deselect them
        if (item.children) {
            item.children.forEach(function (_item) { return _this.deselect(_item); });
        }
    };
    /**
     * @return {?}
     */
    PageHeaderService.prototype.deselectAll = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.items$.getValue().forEach(function (item) { return _this.deselect(item); });
    };
    /**
     * @param {?=} items
     * @return {?}
     */
    PageHeaderService.prototype.setItems = /**
     * @param {?=} items
     * @return {?}
     */
    function (items) {
        var _this = this;
        if (items === void 0) { items = []; }
        // identify all parent elements
        items.forEach(function (item) { return _this.setParent(item); });
        this.items$.next(items);
    };
    /**
     * @param {?} enabled
     * @return {?}
     */
    PageHeaderService.prototype.setSecondaryNavigation = /**
     * @param {?} enabled
     * @return {?}
     */
    function (enabled) {
        this.secondary$.next(enabled);
    };
    /**
     * @param {?} item
     * @return {?}
     */
    PageHeaderService.prototype.getRoot = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        return item && item.parent ? this.getRoot(item.parent) : item;
    };
    /**
     * @param {?} item
     * @param {?=} parent
     * @return {?}
     */
    PageHeaderService.prototype.setParent = /**
     * @param {?} item
     * @param {?=} parent
     * @return {?}
     */
    function (item, parent) {
        var _this = this;
        // set the parent field
        item.parent = parent;
        // call this function recursively on all children
        if (item.children) {
            item.children.forEach(function (child) { return _this.setParent(child, item); });
        }
    };
    /**
     * @param {?} item
     * @return {?}
     */
    PageHeaderService.prototype.selectParents = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        // if there is a parent then we want to set it to selected
        if (item.parent) {
            item.parent.selected = true;
            // check if it has any parents
            this.selectParents(item.parent);
        }
    };
    /**
     * @param {?} node
     * @param {?} parent
     * @return {?}
     */
    PageHeaderService.prototype.isParentOf = /**
     * @param {?} node
     * @param {?} parent
     * @return {?}
     */
    function (node, parent) {
        // if there are no parents return false
        if (!node || !node.parent) {
            return false;
        }
        // if the parent is the match we are looking for return true
        if (node.parent === parent) {
            return true;
        }
        // if there are potentially grandparents then check them too
        return this.isParentOf(node.parent, parent);
    };
    PageHeaderService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    PageHeaderService.ctorParameters = function () { return []; };
    return PageHeaderService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var PageHeaderComponent = (function () {
    function PageHeaderComponent(_colorService, _pageHeaderService) {
        this._colorService = _colorService;
        this._pageHeaderService = _pageHeaderService;
        this.alignment = 'center';
        this.condensed = false;
        this.backVisible = true;
        this.secondaryNavigationAlignment = 'center';
        this.secondaryNavigationAutoselect = false;
        this.backClick = new EventEmitter();
        this.selected$ = this._pageHeaderService.selected$;
        this.selectedRoot$ = this._pageHeaderService.selectedRoot$;
        this._crumbs = [];
    }
    Object.defineProperty(PageHeaderComponent.prototype, "items", {
        set: /**
         * @param {?} items
         * @return {?}
         */
        function (items) {
            this._pageHeaderService.setItems(items);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageHeaderComponent.prototype, "secondaryNavigation", {
        get: /**
         * @return {?}
         */
        function () {
            return this._pageHeaderService.secondary$.getValue();
        },
        set: /**
         * @param {?} enabled
         * @return {?}
         */
        function (enabled) {
            this._pageHeaderService.setSecondaryNavigation(enabled);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageHeaderComponent.prototype, "crumbs", {
        get: /**
         * @return {?}
         */
        function () {
            return this.condensed ? __spread(this._crumbs, [{ title: this.header }]) : this._crumbs;
        },
        set: /**
         * @param {?} crumbs
         * @return {?}
         */
        function (crumbs) {
            this._crumbs = crumbs;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageHeaderComponent.prototype, "familyBackground", {
        get: /**
         * @return {?}
         */
        function () {
            return this._familyBackground;
        },
        set: /**
         * @param {?} color
         * @return {?}
         */
        function (color) {
            this._familyBackground = this._colorService.resolve(color);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageHeaderComponent.prototype, "familyForeground", {
        get: /**
         * @return {?}
         */
        function () {
            return this._familyForeground;
        },
        set: /**
         * @param {?} color
         * @return {?}
         */
        function (color) {
            this._familyForeground = this._colorService.resolve(color);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    PageHeaderComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._subscription = this.selectedRoot$.pipe(distinctUntilChanged(), filter(function () { return _this.secondaryNavigation && _this.secondaryNavigationAutoselect; }), filter(function (item) { return item && item.children && item.children.length > 0; }), map(function (item) { return item.children[0]; })).subscribe(function (item) { return _this.select(item); });
    };
    /**
     * @return {?}
     */
    PageHeaderComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._subscription.unsubscribe();
    };
    /**
     * @return {?}
     */
    PageHeaderComponent.prototype.goBack = /**
     * @return {?}
     */
    function () {
        this.backClick.emit();
    };
    /**
     * @param {?} item
     * @return {?}
     */
    PageHeaderComponent.prototype.select = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        this._pageHeaderService.select(item);
    };
    PageHeaderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-page-header',
                    exportAs: 'ux-page-header',
                    template: "<div class=\"ux-page-header\" [class.page-header-condensed]=\"condensed\" role=\"banner\">\n\n    <!-- Display Upper Section when not condensed -->\n    <div class=\"page-header-actions\" *ngIf=\"!condensed\">\n\n        <div class=\"page-header-logo-container\" role=\"presentation\" [hidden]=\"!logo\">\n            <img [attr.src]=\"logo\" class=\"page-header-logo\">\n        </div>\n\n        <div class=\"page-header-navigation\" [ngClass]=\"alignment\" role=\"navigation\" aria-label=\"Primary Navigation\">\n\n            <!-- The Top Navigation Options -->\n            <ux-page-header-horizontal-navigation></ux-page-header-horizontal-navigation>\n        </div>\n\n        <div class=\"page-header-icon-menus\" role=\"toolbar\">\n            <ng-container *ngFor=\"let menu of customMenus\" [ngTemplateOutlet]=\"menu\"></ng-container>\n\n            <ux-page-header-icon-menu *ngFor=\"let menu of iconMenus\" [menu]=\"menu\"></ux-page-header-icon-menu>\n        </div>\n    </div>\n\n    <!-- Display Lower Section When Not Condensed -->\n    <div class=\"page-header-details\" *ngIf=\"!condensed\">\n\n        <div class=\"page-header-state-container\" role=\"navigation\">\n\n            <button *ngIf=\"backVisible === true\" class=\"page-header-back-button\" (click)=\"goBack()\" aria-label=\"Go Back\">\n                <span class=\"hpe-icon hpe-previous text-primary\"></span>\n            </button>\n\n            <div class=\"page-header-title-container\">\n\n                <ux-breadcrumbs [crumbs]=\"crumbs\"></ux-breadcrumbs>\n\n                <h1 class=\"page-header-title\" [style.backgroundColor]=\"familyBackground\" [style.color]=\"familyForeground\">{{ header }}</h1>\n            </div>\n\n        </div>\n\n    </div>\n\n    <!-- Display This Section Optimized for Condensed Mode -->\n    <div class=\"page-header-condensed-content\" *ngIf=\"condensed\">\n\n        <div class=\"page-header-breadcrumbs\" role=\"navigation\">\n            <ux-breadcrumbs [crumbs]=\"crumbs\"></ux-breadcrumbs>\n        </div>\n\n        <div class=\"page-header-navigation\" [ngClass]=\"alignment\" role=\"navigation\" aria-label=\"Primary Navigation\">\n\n            <!-- The Top Navigation Options -->\n            <ux-page-header-horizontal-navigation></ux-page-header-horizontal-navigation>\n        </div>\n\n        <div class=\"page-header-icon-menus\" role=\"toolbar\">\n            <ng-container *ngFor=\"let menu of customMenus\" [ngTemplateOutlet]=\"menu\"></ng-container>\n            <ux-page-header-icon-menu *ngFor=\"let menu of iconMenus\" [menu]=\"menu\"></ux-page-header-icon-menu>\n        </div>\n\n    </div>\n\n</div>\n\n<div class=\"page-header-secondary\" [ngClass]=\"secondaryNavigationAlignment\" role=\"navigation\" *ngIf=\"secondaryNavigation && (selectedRoot$ | async)\">\n    <ul class=\"nav nav-tabs\" role=\"tablist\" aria-label=\"Secondary Navigation\" *ngIf=\"(selectedRoot$ | async)?.children; let children\">\n        <li *ngFor=\"let child of children\" [class.active]=\"child === (selected$ | async)\" role=\"none\">\n            <a role=\"tab\"\n                [attr.aria-selected]=\"child === (selected$ | async)\"\n                tabindex=\"0\"\n                (click)=\"select(child)\"\n                (keydown.enter)=\"select(child)\">{{ child.title }}</a>\n        </li>\n    </ul>\n</div>",
                    providers: [PageHeaderService]
                },] },
    ];
    /** @nocollapse */
    PageHeaderComponent.ctorParameters = function () { return [
        { type: ColorService, },
        { type: PageHeaderService, },
    ]; };
    PageHeaderComponent.propDecorators = {
        "logo": [{ type: Input },],
        "header": [{ type: Input },],
        "alignment": [{ type: Input },],
        "condensed": [{ type: Input },],
        "iconMenus": [{ type: Input },],
        "backVisible": [{ type: Input },],
        "secondaryNavigationAlignment": [{ type: Input },],
        "secondaryNavigationAutoselect": [{ type: Input },],
        "items": [{ type: Input },],
        "secondaryNavigation": [{ type: Input },],
        "crumbs": [{ type: Input },],
        "familyBackground": [{ type: Input },],
        "familyForeground": [{ type: Input },],
        "backClick": [{ type: Output },],
        "customMenus": [{ type: ContentChildren, args: [PageHeaderCustomMenuDirective, { read: TemplateRef },] },],
    };
    return PageHeaderComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var MenuNavigationToggleDirective = (function () {
    function MenuNavigationToggleDirective(_elementRef) {
        this._elementRef = _elementRef;
        this.menuPosition = 'bottom';
        this.menuOpenChange = new EventEmitter();
        this.keyEnter = new EventEmitter();
    }
    Object.defineProperty(MenuNavigationToggleDirective.prototype, "menuOpen", {
        get: /**
         * @return {?}
         */
        function () {
            return this._menuOpen;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._menuOpen = value;
            this.menuOpenChange.emit(value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MenuNavigationToggleDirective.prototype.focus = /**
     * @return {?}
     */
    function () {
        this._elementRef.nativeElement.focus();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MenuNavigationToggleDirective.prototype.keydownHandler = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        if (this.isKeyMatch(event.key)) {
            // Open the menu
            this.menuOpen = true;
            // Allow the menu to init, then send the event to give it focus
            setTimeout(function () {
                _this.keyEnter.emit();
            });
            event.preventDefault();
            event.stopPropagation();
        }
    };
    /**
     * @param {?} key
     * @return {?}
     */
    MenuNavigationToggleDirective.prototype.isKeyMatch = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        switch (key) {
            case 'Enter':
            case ' ':
                return true;
            case 'ArrowUp':
            case 'Up':
                return this.menuPosition === 'top';
            case 'ArrowDown':
            case 'Down':
                return this.menuPosition === 'bottom';
            case 'ArrowLeft':
            case 'Left':
                return this.menuPosition === 'left';
            case 'ArrowRight':
            case 'Right':
                return this.menuPosition === 'right';
        }
        return false;
    };
    MenuNavigationToggleDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxMenuNavigationToggle]',
                    exportAs: 'uxMenuNavigationToggle'
                },] },
    ];
    /** @nocollapse */
    MenuNavigationToggleDirective.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    MenuNavigationToggleDirective.propDecorators = {
        "menuOpen": [{ type: Input },],
        "menuPosition": [{ type: Input },],
        "menuOpenChange": [{ type: Output },],
        "keydownHandler": [{ type: HostListener, args: ['keydown', ['$event'],] },],
    };
    return MenuNavigationToggleDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var PageHeaderIconMenuComponent = (function () {
    function PageHeaderIconMenuComponent(_service) {
        var _this = this;
        this._service = _service;
        this._subscription = _service.activeIconMenu$.subscribe(function (next) {
            // Close all but the most recently opened menu
            if (next !== _this.menu) {
                _this._isOpen = false;
            }
        });
    }
    Object.defineProperty(PageHeaderIconMenuComponent.prototype, "isOpen", {
        get: /**
         * @return {?}
         */
        function () {
            return this._isOpen;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._isOpen = value;
            if (value) {
                this._service.activeIconMenu$.next(this.menu);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    PageHeaderIconMenuComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._subscription.unsubscribe();
    };
    /**
     * @param {?} item
     * @return {?}
     */
    PageHeaderIconMenuComponent.prototype.select = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        if (item.select) {
            item.select.call(item, item);
        }
    };
    /**
     * @param {?} item
     * @param {?} event
     * @return {?}
     */
    PageHeaderIconMenuComponent.prototype.keydownHandler = /**
     * @param {?} item
     * @param {?} event
     * @return {?}
     */
    function (item, event) {
        switch (event.key) {
            case 'Enter':
            case ' ':
                this.select(item);
                this.isOpen = false;
                this.menuNavigationToggle.focus();
                event.preventDefault();
                event.stopPropagation();
                break;
        }
    };
    PageHeaderIconMenuComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-page-header-icon-menu',
                    template: "<div class=\"page-header-icon-menu\"\n    dropdown\n    placement=\"bottom right\"\n    [(isOpen)]=\"isOpen\">\n\n    <a role=\"button\"\n        class=\"page-header-icon-menu-button\"\n        [attr.aria-label]=\"menu.label\"\n        aria-haspopup=\"true\"\n        tabindex=\"0\"\n        (click)=\"select(menu)\"\n        dropdownToggle\n        uxMenuNavigationToggle\n        #menuNavigationToggle=\"uxMenuNavigationToggle\"\n        [(menuOpen)]=\"isOpen\">\n\n        <i class=\"hpe-icon\" [ngClass]=\"menu.icon\"></i>\n        <span class=\"label label-primary\" *ngIf=\"menu?.badge\" aria-hidden=\"true\">{{ menu.badge }}</span>\n\n    </a>\n\n    <ul *dropdownMenu\n        class=\"dropdown-menu\"\n        role=\"menu\"\n        uxMenuNavigation\n        [toggleButton]=\"menuNavigationToggle\">\n\n        <li *ngFor=\"let dropdown of menu?.dropdown\"\n            role=\"none\"\n            [class.dropdown-header]=\"dropdown.header\"\n            [class.dropdown-divider]=\"dropdown.divider\">\n\n            <span class=\"font-bold\" *ngIf=\"dropdown.header\">{{ dropdown.title }}</span>\n\n            <a *ngIf=\"!dropdown.header\"\n                role=\"menuitem\"\n                class=\"dropdown-item\"\n                tabindex=\"-1\"\n                (click)=\"select(dropdown)\"\n                (keydown)=\"keydownHandler(dropdown, $event)\"\n                uxMenuNavigationItem>\n\n\n                <span class=\"dropdown-item-title\">\n                    <i class=\"hpe-icon hpe-fw\" [ngClass]=\"dropdown.icon\"></i>\n                    {{ dropdown.title }}\n                </span>\n                <span *ngIf=\"dropdown.subtitle\" class=\"dropdown-item-subtitle\">{{ dropdown.subtitle }}</span>\n\n            </a>\n        </li>\n\n    </ul>\n</div>"
                },] },
    ];
    /** @nocollapse */
    PageHeaderIconMenuComponent.ctorParameters = function () { return [
        { type: PageHeaderService, },
    ]; };
    PageHeaderIconMenuComponent.propDecorators = {
        "menu": [{ type: Input },],
        "menuNavigationToggle": [{ type: ViewChild, args: ['menuNavigationToggle',] },],
    };
    return PageHeaderIconMenuComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var PageHeaderNavigationDropdownItemComponent = (function () {
    function PageHeaderNavigationDropdownItemComponent(_pageHeaderService) {
        var _this = this;
        this._pageHeaderService = _pageHeaderService;
        this.dropdownOpen = false;
        this._hover$ = new Subject();
        // subscribe to stream with a debounce (a small debounce is all that is required)
        this._subscription = this._hover$.pipe(debounceTime(1)).subscribe(function (visible) { return _this.dropdownOpen = visible; });
        // Close submenus when selected item changes
        this._subscription.add(_pageHeaderService.selected$.subscribe(function () {
            _this.dropdownOpen = false;
        }));
    }
    /**
     * @return {?}
     */
    PageHeaderNavigationDropdownItemComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._subscription.unsubscribe();
    };
    /**
     * @param {?} item
     * @return {?}
     */
    PageHeaderNavigationDropdownItemComponent.prototype.select = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        // clicking on an item with children then return
        if (item.children) {
            return;
        }
        // emit the selected item in an event
        this._pageHeaderService.select(item);
    };
    /**
     * @return {?}
     */
    PageHeaderNavigationDropdownItemComponent.prototype.focus = /**
     * @return {?}
     */
    function () {
        this.button.nativeElement.focus();
    };
    /**
     * @return {?}
     */
    PageHeaderNavigationDropdownItemComponent.prototype.hoverStart = /**
     * @return {?}
     */
    function () {
        this._hover$.next(true);
    };
    /**
     * @return {?}
     */
    PageHeaderNavigationDropdownItemComponent.prototype.hoverLeave = /**
     * @return {?}
     */
    function () {
        this._hover$.next(false);
    };
    /**
     * @return {?}
     */
    PageHeaderNavigationDropdownItemComponent.prototype.close = /**
     * @return {?}
     */
    function () {
        this.dropdownOpen = false;
    };
    /**
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    PageHeaderNavigationDropdownItemComponent.prototype.keydownHandler = /**
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    function (event, item) {
        switch (event.key) {
            case 'Enter':
            case ' ':
                this.select(item);
                event.preventDefault();
                event.stopPropagation();
                break;
        }
    };
    PageHeaderNavigationDropdownItemComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-page-header-horizontal-navigation-dropdown-item',
                    exportAs: 'ux-page-header-horizontal-navigation-dropdown-item',
                    template: "<div *ngIf=\"item.children && item.children.length > 0\"\n    dropdown\n    #subMenu=\"bs-dropdown\"\n    [isOpen]=\"dropdownOpen\"\n    container=\"body\"\n    placement=\"right\"\n    (mouseenter)=\"hoverStart()\"\n    (mouseleave)=\"hoverLeave()\">\n\n    <a role=\"menuitem\"\n        class=\"dropdown-item\"\n        [class.selected]=\"item.selected\"\n        aria-haspopup=\"true\"\n        [attr.aria-expanded]=\"dropdownOpen\"\n        [attr.aria-selected]=\"item.selected\"\n        tabindex=\"-1\"\n        #button\n        dropdownToggle\n        uxMenuNavigationToggle\n        #menuNavigationToggle=\"uxMenuNavigationToggle\"\n        [(menuOpen)]=\"dropdownOpen\"\n        menuPosition=\"right\">\n\n        <span class=\"dropdown-item-title\">{{ item.title }}</span>\n        <span class=\"dropdown-item-icon hpe-icon hpe-next\"></span>\n\n    </a>\n\n    <ul *dropdownMenu\n        role=\"menu\"\n        class=\"dropdown-menu horizontal-navigation-dropdown-submenu\"\n        (mouseenter)=\"hoverStart()\"\n        (mouseleave)=\"hoverLeave()\"\n        uxMenuNavigation\n        #menuNavigation=\"uxMenuNavigation\"\n        [toggleButton]=\"menuNavigationToggle\"\n        toggleButtonPosition=\"left\">\n\n        <li *ngFor=\"let subItem of item.children\" role=\"none\">\n\n            <a role=\"menuitem\"\n                class=\"dropdown-item\"\n                [class.selected]=\"subItem.selected\"\n                [attr.aria-selected]=\"subItem.selected\"\n                tabindex=\"-1\"\n                (click)=\"select(subItem)\"\n                (keydown)=\"keydownHandler($event, subItem)\"\n                uxMenuNavigationItem>\n\n                <span class=\"dropdown-item-title\">{{ subItem.title }}</span>\n\n            </a>\n\n        </li>\n    </ul>\n\n</div>\n\n<div *ngIf=\"!item.children || item.children.length === 0\"\n    (mouseenter)=\"hoverStart()\"\n    (mouseleave)=\"hoverLeave()\">\n\n    <a role=\"menuitem\"\n        #button\n        class=\"dropdown-item\"\n        [class.selected]=\"item.selected\"\n        [attr.aria-selected]=\"item.selected\"\n        tabindex=\"-1\"\n        (click)=\"select(item)\"\n        (keydown)=\"keydownHandler($event, item)\">\n\n        <span class=\"dropdown-item-title\">{{ item.title }}</span>\n\n    </a>\n\n</div>"
                },] },
    ];
    /** @nocollapse */
    PageHeaderNavigationDropdownItemComponent.ctorParameters = function () { return [
        { type: PageHeaderService, },
    ]; };
    PageHeaderNavigationDropdownItemComponent.propDecorators = {
        "item": [{ type: Input },],
        "button": [{ type: ViewChild, args: ['button',] },],
    };
    return PageHeaderNavigationDropdownItemComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var PageHeaderNavigationItemComponent = (function () {
    function PageHeaderNavigationItemComponent(elementRef, _pageHeaderService) {
        this.elementRef = elementRef;
        this._pageHeaderService = _pageHeaderService;
        this.secondary$ = this._pageHeaderService.secondary$;
    }
    /**
     * @return {?}
     */
    PageHeaderNavigationItemComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // Close submenus when selected item changes
        this._subscription = this._pageHeaderService.selected$.subscribe(function (next) {
            if (next && _this.isOpen) {
                _this.isOpen = false;
                // If menu was closed, keep focus on the toggle button
                // If menu was closed, keep focus on the toggle button
                _this.button.focus();
            }
        });
        if (this.menu) {
            this._subscription.add(this.menu.onHidden.subscribe(function () { return _this.dropdowns.forEach(function (dropdown) { return dropdown.close(); }); }));
        }
    };
    /**
     * @return {?}
     */
    PageHeaderNavigationItemComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._subscription.unsubscribe();
    };
    /**
     * @return {?}
     */
    PageHeaderNavigationItemComponent.prototype.select = /**
     * @return {?}
     */
    function () {
        // if the item has children then do nothing at this stage
        if (this.item.children && this._pageHeaderService.secondary$.getValue() === false) {
            return;
        }
        // otherwise select the current item
        this._pageHeaderService.select(this.item);
    };
    PageHeaderNavigationItemComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-page-header-horizontal-navigation-item',
                    template: "<div *ngIf=\"item.children && item.children.length > 0 && !(secondary$ | async)\"\n    dropdown\n    #menu=\"bs-dropdown\"\n    [(isOpen)]=\"isOpen\"\n    container=\"body\"\n    placement=\"bottom left\">\n\n    <button role=\"menuitem\"\n        class=\"horizontal-navigation-button\"\n        [class.selected]=\"item.selected\"\n        [class.open]=\"isOpen\"\n        aria-haspopup=\"true\"\n        [attr.aria-expanded]=\"isOpen\"\n        [attr.aria-selected]=\"item.selected\"\n        dropdownToggle\n        uxMenuNavigationToggle\n        #button=\"uxMenuNavigationToggle\"\n        [(menuOpen)]=\"isOpen\">\n\n        <span class=\"hpe-icon navigation-item-icon\" *ngIf=\"item.icon\" [ngClass]=\"item?.icon\"></span>\n        <span class=\"navigation-item-label\">{{ item?.title }}</span>\n        <span class=\"hpe-icon hpe-down\"></span>\n\n    </button>\n\n    <div *dropdownMenu\n        role=\"menu\"\n        class=\"dropdown-menu horizontal-navigation-dropdown-menu\"\n        uxMenuNavigation\n        [toggleButton]=\"button\"\n        toggleButtonPosition=\"top\">\n\n        <div *ngFor=\"let item of item?.children\" uxMenuNavigationItem (activated)=\"dropdownItem.focus()\">\n            <ux-page-header-horizontal-navigation-dropdown-item\n                #dropdownItem=\"ux-page-header-horizontal-navigation-dropdown-item\"\n                [item]=\"item\">\n            </ux-page-header-horizontal-navigation-dropdown-item>\n        </div>\n\n    </div>\n\n</div>\n\n<button *ngIf=\"!item.children || item.children.length === 0 || (secondary$ | async)\"\n    role=\"menuitem\"\n    class=\"horizontal-navigation-button\"\n    [class.selected]=\"item.selected\"\n    [attr.aria-selected]=\"item.selected\"\n    (click)=\"select()\">\n\n    <span class=\"hpe-icon navigation-item-icon\" *ngIf=\"item.icon\" [ngClass]=\"item?.icon\"></span>\n    <span class=\"navigation-item-label\">{{ item?.title }}</span>\n\n</button>"
                },] },
    ];
    /** @nocollapse */
    PageHeaderNavigationItemComponent.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: PageHeaderService, },
    ]; };
    PageHeaderNavigationItemComponent.propDecorators = {
        "button": [{ type: ViewChild, args: ['button',] },],
        "menu": [{ type: ViewChild, args: ['menu',] },],
        "dropdowns": [{ type: ViewChildren, args: [PageHeaderNavigationDropdownItemComponent,] },],
        "item": [{ type: Input },],
    };
    return PageHeaderNavigationItemComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var PageHeaderNavigationComponent = (function () {
    function PageHeaderNavigationComponent(elementRef, resizeService, _pageHeaderService) {
        this._pageHeaderService = _pageHeaderService;
        this.items$ = this._pageHeaderService.items$;
        this.indicatorVisible = false;
        this.indicatorX = 0;
        this.indicatorWidth = 0;
        this._subscription = new Subscription();
        this._subscription.add(resizeService.addResizeListener(elementRef.nativeElement).subscribe(this.updateSelectedIndicator.bind(this)));
        this._subscription.add(_pageHeaderService.selected$.pipe(distinctUntilChanged()).subscribe(this.updateSelectedIndicator.bind(this)));
        this._subscription.add(_pageHeaderService.secondary$.pipe(distinctUntilChanged()).subscribe(this.updateSelectedIndicator.bind(this)));
    }
    /**
     * @return {?}
     */
    PageHeaderNavigationComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.updateSelectedIndicator();
    };
    /**
     * @return {?}
     */
    PageHeaderNavigationComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._subscription.unsubscribe();
    };
    /**
     * @return {?}
     */
    PageHeaderNavigationComponent.prototype.updateSelectedIndicator = /**
     * @return {?}
     */
    function () {
        var _this = this;
        setTimeout(function () {
            // find the selected item
            var /** @type {?} */ selected = _this.menuItems.find(function (item) { return item.item.selected; });
            // determine whether or not to show the indicator
            // determine whether or not to show the indicator
            _this.indicatorVisible = !!selected;
            // set the width of the indicator to match the width of the navigation item
            if (selected) {
                var /** @type {?} */ styles = getComputedStyle(selected.elementRef.nativeElement);
                _this.indicatorX = selected.elementRef.nativeElement.offsetLeft;
                _this.indicatorWidth = parseInt(styles.getPropertyValue('width'));
            }
        });
    };
    PageHeaderNavigationComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-page-header-horizontal-navigation',
                    template: "<ux-page-header-horizontal-navigation-item\n    *ngFor=\"let item of items$ | async\"\n    [item]=\"item\">\n</ux-page-header-horizontal-navigation-item>\n\n<div class=\"selected-indicator\"\n    [style.opacity]=\"indicatorVisible ? 1 : 0\"\n    [style.margin-left.px]=\"indicatorX\"\n    [style.width.px]=\"indicatorWidth\">\n</div>",
                    host: {
                        'role': 'menubar'
                    }
                },] },
    ];
    /** @nocollapse */
    PageHeaderNavigationComponent.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: ResizeService, },
        { type: PageHeaderService, },
    ]; };
    PageHeaderNavigationComponent.propDecorators = {
        "menuItems": [{ type: ViewChildren, args: [PageHeaderNavigationItemComponent,] },],
    };
    return PageHeaderNavigationComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var MenuNavigationService = (function () {
    function MenuNavigationService() {
        this.active$ = new BehaviorSubject(null);
    }
    MenuNavigationService.decorators = [
        { type: Injectable },
    ];
    return MenuNavigationService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var MenuNavigationItemDirective = (function () {
    function MenuNavigationItemDirective(service, _elementRef) {
        var _this = this;
        this._elementRef = _elementRef;
        this.activated = new EventEmitter();
        this._subscription = service.active$.subscribe(function (next) {
            if (next === _this) {
                _this.setActive();
            }
        });
    }
    /**
     * @return {?}
     */
    MenuNavigationItemDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._subscription.unsubscribe();
    };
    /**
     * @return {?}
     */
    MenuNavigationItemDirective.prototype.setActive = /**
     * @return {?}
     */
    function () {
        this._elementRef.nativeElement.focus();
        this.activated.emit();
    };
    MenuNavigationItemDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxMenuNavigationItem]'
                },] },
    ];
    /** @nocollapse */
    MenuNavigationItemDirective.ctorParameters = function () { return [
        { type: MenuNavigationService, },
        { type: ElementRef, },
    ]; };
    MenuNavigationItemDirective.propDecorators = {
        "activated": [{ type: Output },],
    };
    return MenuNavigationItemDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var MenuNavigationDirective = (function () {
    function MenuNavigationDirective(_service, _elementRef, document) {
        this._service = _service;
        this._elementRef = _elementRef;
        this.toggleButtonPosition = 'top';
        this.navigatedOut = new EventEmitter();
        this._subscription = new Subscription();
        this._document = document;
    }
    Object.defineProperty(MenuNavigationDirective.prototype, "activeIndex", {
        get: /**
         * @return {?}
         */
        function () {
            return this._itemsOrdered.indexOf(this._service.active$.value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MenuNavigationDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (this.toggleButton) {
            this._subscription.add(this.toggleButton.keyEnter.subscribe(this.focusFirst.bind(this)));
        }
    };
    /**
     * @return {?}
     */
    MenuNavigationDirective.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._subscription.add(this.items.changes.subscribe(function () {
            _this._itemsOrdered = _this.items.toArray();
        }));
        this._itemsOrdered = this.items.toArray();
    };
    /**
     * @return {?}
     */
    MenuNavigationDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._subscription.unsubscribe();
    };
    /**
     * @return {?}
     */
    MenuNavigationDirective.prototype.focusFirst = /**
     * @return {?}
     */
    function () {
        this.moveFirst();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MenuNavigationDirective.prototype.keydownHandler = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // Only handle events when focus in within the list of menu items
        if (!this._elementRef.nativeElement.contains(this._document.activeElement)) {
            return;
        }
        var /** @type {?} */ handled = false;
        switch (event.key) {
            case 'ArrowUp':
            case 'Up':
                this.movePrevious(event);
                handled = true;
                break;
            case 'ArrowDown':
            case 'Down':
                this.moveNext(event);
                handled = true;
                break;
            case 'ArrowLeft':
            case 'Left':
                if (this.toggleButtonPosition === 'left') {
                    this.moveToToggleButton(event);
                    handled = true;
                }
                break;
            case 'ArrowRight':
            case 'Right':
                if (this.toggleButtonPosition === 'right') {
                    this.moveToToggleButton(event);
                    handled = true;
                }
                break;
            case 'Home':
                this.moveFirst();
                handled = true;
                break;
            case 'End':
                this.moveLast();
                handled = true;
                break;
            case 'Escape':
                this.navigatedOut.emit(event);
                handled = true;
                break;
        }
        if (handled) {
            event.preventDefault();
            event.stopPropagation();
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MenuNavigationDirective.prototype.moveNext = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // Do nothing if there's no active menu item registered
        if (this.activeIndex < 0) {
            return;
        }
        var /** @type {?} */ nextIndex = this.activeIndex + 1;
        if (nextIndex < this._itemsOrdered.length) {
            // Activate the next menu item
            // (uxMenuNavigationItem subscribes to this and applies focus if it matches)
            this._service.active$.next(this._itemsOrdered[nextIndex]);
        }
        else {
            // Check if focus went out of bounds in the direction of the origin toggle button
            if (this.toggleButtonPosition === 'bottom') {
                this.moveToToggleButton(event);
            }
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MenuNavigationDirective.prototype.movePrevious = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // Do nothing if there's no active menu item registered
        if (this.activeIndex < 0) {
            return;
        }
        var /** @type {?} */ nextIndex = this.activeIndex - 1;
        if (nextIndex >= 0) {
            // Activate the previous menu item
            // (uxMenuNavigationItem subscribes to this and applies focus if it matches)
            this._service.active$.next(this._itemsOrdered[nextIndex]);
        }
        else {
            // Check if focus went out of bounds in the direction of the origin toggle button
            if (this.toggleButtonPosition === 'top') {
                this.moveToToggleButton(event);
            }
        }
    };
    /**
     * @return {?}
     */
    MenuNavigationDirective.prototype.moveFirst = /**
     * @return {?}
     */
    function () {
        if (this._itemsOrdered.length > 0) {
            this._service.active$.next(this._itemsOrdered[0]);
        }
    };
    /**
     * @return {?}
     */
    MenuNavigationDirective.prototype.moveLast = /**
     * @return {?}
     */
    function () {
        if (this._itemsOrdered.length > 0) {
            this._service.active$.next(this._itemsOrdered[this._itemsOrdered.length - 1]);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MenuNavigationDirective.prototype.moveToToggleButton = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.toggleButton) {
            this.toggleButton.focus();
            this.toggleButton.menuOpen = false;
        }
        this.navigatedOut.emit(event);
    };
    MenuNavigationDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxMenuNavigation]',
                    exportAs: 'uxMenuNavigation',
                    providers: [MenuNavigationService]
                },] },
    ];
    /** @nocollapse */
    MenuNavigationDirective.ctorParameters = function () { return [
        { type: MenuNavigationService, },
        { type: ElementRef, },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
    ]; };
    MenuNavigationDirective.propDecorators = {
        "toggleButton": [{ type: Input },],
        "toggleButtonPosition": [{ type: Input },],
        "navigatedOut": [{ type: Output },],
        "items": [{ type: ContentChildren, args: [MenuNavigationItemDirective, { descendants: true },] },],
        "keydownHandler": [{ type: HostListener, args: ['document:keydown', ['$event'],] },],
    };
    return MenuNavigationDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ EXPORTS = [
    MenuNavigationDirective,
    MenuNavigationItemDirective,
    MenuNavigationToggleDirective
];
var MenuNavigationModule = (function () {
    function MenuNavigationModule() {
    }
    MenuNavigationModule.decorators = [
        { type: NgModule, args: [{
                    imports: [],
                    exports: EXPORTS,
                    declarations: EXPORTS,
                },] },
    ];
    return MenuNavigationModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var PageHeaderModule = (function () {
    function PageHeaderModule() {
    }
    PageHeaderModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        BreadcrumbsModule,
                        ColorServiceModule,
                        ResizeModule,
                        MenuNavigationModule,
                        BsDropdownModule.forRoot()
                    ],
                    exports: [
                        PageHeaderComponent,
                        PageHeaderCustomMenuDirective
                    ],
                    declarations: [
                        PageHeaderComponent,
                        PageHeaderIconMenuComponent,
                        PageHeaderCustomMenuDirective,
                        PageHeaderNavigationComponent,
                        PageHeaderNavigationItemComponent,
                        PageHeaderNavigationDropdownItemComponent
                    ]
                },] },
    ];
    return PageHeaderModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ProgressBarComponent = (function () {
    function ProgressBarComponent() {
        this.value = 0;
        this.max = 100;
        this.indeterminate = false;
    }
    ProgressBarComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-progress-bar',
                    template: "<div *ngIf=\"!indeterminate\" class=\"progressbar-track\" [style.width.%]=\"(value / max) * 100\" [style.backgroundColor]=\"barColor\">\n    <ng-content></ng-content>\n</div>\n<div *ngIf=\"indeterminate\" class=\"progressbar-track indeterminate\" [style.backgroundColor]=\"barColor\">\n    <ng-content></ng-content>\n</div>",
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    ProgressBarComponent.propDecorators = {
        "value": [{ type: Input },],
        "max": [{ type: Input },],
        "indeterminate": [{ type: Input },],
        "trackColor": [{ type: Input },],
        "barColor": [{ type: Input },],
    };
    return ProgressBarComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ProgressBarModule = (function () {
    function ProgressBarModule() {
    }
    ProgressBarModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule
                    ],
                    exports: [ProgressBarComponent],
                    declarations: [ProgressBarComponent]
                },] },
    ];
    return ProgressBarModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ RADIOBUTTON_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return RadioButtonComponent; }),
    multi: true
};
var /** @type {?} */ uniqueRadioId = 0;
var RadioButtonComponent = (function () {
    function RadioButtonComponent() {
        this._radioButtonId = "ux-radio-button-" + ++uniqueRadioId;
        this.id = this._radioButtonId;
        this.tabindex = 0;
        this.clickable = true;
        this.disabled = false;
        this.simplified = false;
        this.ariaLabel = '';
        this.ariaLabelledby = null;
        this.ariaDescribedby = null;
        this.valueChange = new EventEmitter();
        this._value = false;
        this.focused = false;
        this.onTouchedCallback = function () { };
        this.onChangeCallback = function () { };
    }
    Object.defineProperty(RadioButtonComponent.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () {
            return this._value;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._value = value;
            // invoke change event
            this.valueChange.emit(this._value);
            // call callback
            this.onChangeCallback(this._value);
            this.onTouchedCallback();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadioButtonComponent.prototype, "inputId", {
        get: /**
         * @return {?}
         */
        function () {
            return (this.id || this._radioButtonId) + "-input";
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    RadioButtonComponent.prototype.toggle = /**
     * @return {?}
     */
    function () {
        if (this.disabled || !this.clickable) {
            return;
        }
        // toggle the checked state
        this.value = this.option;
        // call callback
        this.onChangeCallback(this.value);
    };
    // Functions required to update ng-model
    /**
     * @param {?} value
     * @return {?}
     */
    RadioButtonComponent.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (value !== this._value) {
            this._value = value;
        }
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    RadioButtonComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChangeCallback = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    RadioButtonComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouchedCallback = fn;
    };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    RadioButtonComponent.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
    };
    RadioButtonComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-radio-button',
                    template: "<label [attr.for]=\"inputId\" class=\"ux-radio-button\"\n       [class.ux-radio-button-checked]=\"value === option\"\n       [class.ux-radio-button-simplified]=\"simplified\"\n       [class.ux-radio-button-disabled]=\"disabled\"\n       [class.ux-radio-button-focused]=\"focused\">\n\n    <div class=\"ux-radio-button-container\">\n        <input class=\"ux-radio-button-input\"\n            type=\"radio\"\n            [id]=\"inputId\"\n            [checked]=\"value === option\"\n            [disabled]=\"disabled\"\n            [tabindex]=\"tabindex || value === option ? 0 : -1\"\n            [attr.name]=\"name\"\n            [required]=\"required\"\n            [attr.aria-label]=\"ariaLabel\"\n            [attr.aria-labelledby]=\"ariaLabelledby\"\n            [attr.aria-describedby]=\"ariaDescribedby\"\n            [attr.aria-checked]=\"value === option\"\n            (focus)=\"focused = true\"\n            (blur)=\"focused = false\"\n            (change)=\"toggle()\"\n            (click)=\"$event.stopPropagation()\">\n    </div>\n\n    <span class=\"ux-radio-button-label\">\n        <ng-content></ng-content>\n    </span>\n\n</label>",
                    providers: [RADIOBUTTON_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    RadioButtonComponent.propDecorators = {
        "id": [{ type: Input },],
        "name": [{ type: Input },],
        "required": [{ type: Input },],
        "tabindex": [{ type: Input },],
        "clickable": [{ type: Input },],
        "disabled": [{ type: Input },],
        "simplified": [{ type: Input },],
        "option": [{ type: Input },],
        "ariaLabel": [{ type: Input, args: ['aria-label',] },],
        "ariaLabelledby": [{ type: Input, args: ['aria-labelledby',] },],
        "ariaDescribedby": [{ type: Input, args: ['aria-describedby',] },],
        "valueChange": [{ type: Output },],
        "value": [{ type: Input },],
    };
    return RadioButtonComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var RadioButtonModule = (function () {
    function RadioButtonModule() {
    }
    RadioButtonModule.decorators = [
        { type: NgModule, args: [{
                    imports: [FormsModule],
                    exports: [RadioButtonComponent],
                    declarations: [RadioButtonComponent]
                },] },
    ];
    return RadioButtonModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var SearchBuilderService = (function () {
    function SearchBuilderService() {
        this.query = {};
        this.queryChange = new Subject();
        this.validationChange = new BehaviorSubject(true);
        this._componentId = 0;
        this._components = [];
        this._validation = {};
    }
    /**
     * Add a component to the internal list of components
     */
    /**
     * Add a component to the internal list of components
     * @param {?} component
     * @return {?}
     */
    SearchBuilderService.prototype.registerComponent = /**
     * Add a component to the internal list of components
     * @param {?} component
     * @return {?}
     */
    function (component) {
        // ensure there are no components with a matching name
        if (this._components.find(function (cmp) { return cmp.name === component.name; })) {
            throw new Error("Search builder components must have a unique name. The name " + component.name + " has already been used.");
        }
        // if unique then add the component to the list
        this._components.push(component);
    };
    /**
     * Bulk registration of components
     * (Just a helper method)
     */
    /**
     * Bulk registration of components
     * (Just a helper method)
     * @param {?} components
     * @return {?}
     */
    SearchBuilderService.prototype.registerComponents = /**
     * Bulk registration of components
     * (Just a helper method)
     * @param {?} components
     * @return {?}
     */
    function (components) {
        var _this = this;
        components.forEach(function (component) { return _this.registerComponent(component); });
    };
    /**
     * Get a registered component class
     */
    /**
     * Get a registered component class
     * @param {?} name
     * @return {?}
     */
    SearchBuilderService.prototype.getComponent = /**
     * Get a registered component class
     * @param {?} name
     * @return {?}
     */
    function (name) {
        // find the component
        var /** @type {?} */ component = this._components.find(function (cmp) { return cmp.name === name; });
        // if there is no match throw an exception
        if (!component) {
            throw new Error("No search build component with the name " + name + " exists");
        }
        // ensure config is defined - at least to an empty object
        component.config = component.config || {};
        return component;
    };
    /**
     * Update the internal search query state
     * note that the query will be immutable
     */
    /**
     * Update the internal search query state
     * note that the query will be immutable
     * @param {?} query
     * @return {?}
     */
    SearchBuilderService.prototype.setQuery = /**
     * Update the internal search query state
     * note that the query will be immutable
     * @param {?} query
     * @return {?}
     */
    function (query$$1) {
        this.query = Object.assign({}, query$$1);
    };
    /**
     * Return the current query state
     */
    /**
     * Return the current query state
     * @return {?}
     */
    SearchBuilderService.prototype.getQuery = /**
     * Return the current query state
     * @return {?}
     */
    function () {
        return this.query;
    };
    /**
     * Trigger the observable to indicate the query has been updated
     */
    /**
     * Trigger the observable to indicate the query has been updated
     * @return {?}
     */
    SearchBuilderService.prototype.queryHasChanged = /**
     * Trigger the observable to indicate the query has been updated
     * @return {?}
     */
    function () {
        this.queryChange.next(this.query);
    };
    /**
     * Store the validation state of the query
     */
    /**
     * Store the validation state of the query
     * @param {?} id
     * @param {?} valid
     * @return {?}
     */
    SearchBuilderService.prototype.setValid = /**
     * Store the validation state of the query
     * @param {?} id
     * @param {?} valid
     * @return {?}
     */
    function (id, valid) {
        var _this = this;
        // store the state for this specific component
        this._validation[id] = valid;
        // evaluate the entire validation state
        this.validationChange.next(!Object.keys(this._validation).some(function (key) { return !_this._validation[key]; }));
    };
    /**
     * Generate a unique id for each component
     */
    /**
     * Generate a unique id for each component
     * @return {?}
     */
    SearchBuilderService.prototype.generateComponentId = /**
     * Generate a unique id for each component
     * @return {?}
     */
    function () {
        return this._componentId++;
    };
    SearchBuilderService.decorators = [
        { type: Injectable },
    ];
    return SearchBuilderService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var SearchBuilderGroupService = (function () {
    function SearchBuilderGroupService(_searchBuilderService) {
        this._searchBuilderService = _searchBuilderService;
    }
    /**
     * Initialise the group by defining an id
     */
    /**
     * Initialise the group by defining an id
     * @param {?} id
     * @return {?}
     */
    SearchBuilderGroupService.prototype.init = /**
     * Initialise the group by defining an id
     * @param {?} id
     * @return {?}
     */
    function (id) {
        var _this = this;
        // store the name of the group
        this._id = id;
        // create the entry in the query object if it doesn't exist
        if (!this._searchBuilderService.query[this._id]) {
            // create the section
            this._searchBuilderService.query[this._id] = [];
            // emit the changes after the initial setup
            setTimeout(function () { return _this._searchBuilderService.queryHasChanged(); });
        }
    };
    /**
     * Remove a field from the search builder query
     */
    /**
     * Remove a field from the search builder query
     * @param {?} field
     * @return {?}
     */
    SearchBuilderGroupService.prototype.remove = /**
     * Remove a field from the search builder query
     * @param {?} field
     * @return {?}
     */
    function (field) {
        // get the query for this group
        var /** @type {?} */ query$$1 = this.getQuery();
        // remove the field from the array
        query$$1.splice(query$$1.indexOf(field), 1);
    };
    /**
     * Get the query for this specific search group
     */
    /**
     * Get the query for this specific search group
     * @return {?}
     */
    SearchBuilderGroupService.prototype.getQuery = /**
     * Get the query for this specific search group
     * @return {?}
     */
    function () {
        return this._searchBuilderService.query[this._id] ? this._searchBuilderService.query[this._id] : [];
    };
    SearchBuilderGroupService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    SearchBuilderGroupService.ctorParameters = function () { return [
        { type: SearchBuilderService, },
    ]; };
    return SearchBuilderGroupService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var SearchBuilderGroupComponent = (function () {
    function SearchBuilderGroupComponent(searchBuilderGroupService, _searchBuilderService) {
        this.searchBuilderGroupService = searchBuilderGroupService;
        this._searchBuilderService = _searchBuilderService;
        this.operator = 'and';
        this.addText = 'Add a field';
        this.showPlaceholder = false;
        this.add = new EventEmitter();
        this.remove = new EventEmitter();
    }
    /**
     * @return {?}
     */
    SearchBuilderGroupComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        // ensure we have a name otherwise throw an error
        if (!this.id) {
            throw new Error('Search builder group must have a name attribute.');
        }
        // otherwise register the group
        this.searchBuilderGroupService.init(this.id);
    };
    /**
     * @param {?} field
     * @return {?}
     */
    SearchBuilderGroupComponent.prototype.removeField = /**
     * @param {?} field
     * @return {?}
     */
    function (field) {
        this.searchBuilderGroupService.remove(field);
        this.remove.emit(field);
    };
    SearchBuilderGroupComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-search-builder-group',
                    template: "<h4 class=\"search-group-title\">{{ header }}</h4>\n\n<main class=\"search-group-content\">\n\n  <section class=\"search-group-operator search-group-operator-{{ operator }}\" [class.hidden-operator]=\"searchBuilderGroupService.getQuery().length < 2\">{{ operator }}</section>\n\n  <section class=\"search-group-items\">\n\n    <div class=\"search-group-item-container\" *ngFor=\"let field of searchBuilderGroupService.getQuery()\">\n\n      <div class=\"search-group-item\">\n        <ng-container *uxSearchBuilderOutlet=\"field.type; context: field\"></ng-container>\n      </div>\n\n      <div class=\"search-group-item-remove\" (click)=\"removeField(field)\">\n        <span class=\"hpe-icon hpe-close\"></span>\n      </div>\n    </div>\n\n    <!-- Placeholder Item -->\n    <ng-container *ngIf=\"showPlaceholder\">\n\n      <!-- The Default Placeholder -->\n      <div class=\"search-group-item-container placeholder-item\" *ngIf=\"!placeholder\">\n        \n        <div class=\"search-group-item\">\n          <label class=\"form-label\">New field</label>\n          <div class=\"form-control\"></div>\n        </div>\n  \n      </div>\n\n      <!-- Allow a custom placeholder -->\n    <ng-container *ngTemplateOutlet=\"placeholder\"></ng-container>\n\n    </ng-container>\n\n  </section>\n\n  <section class=\"search-builder-group-add-field\" (click)=\"add.emit($event)\">\n\n    <button type=\"button\" class=\"btn btn-icon btn-circular button-accent\" aria-label=\"Add Field\">\n      <span class=\"hpe-icon hpe-add\" aria-hidden=\"true\"></span>\n    </button>\n\n    <span class=\"search-builder-group-add-field-label\">{{ addText }}</span>\n\n  </section>\n\n</main>\n\n<hr class=\"search-builder-group-divider\">\n",
                    providers: [SearchBuilderGroupService]
                },] },
    ];
    /** @nocollapse */
    SearchBuilderGroupComponent.ctorParameters = function () { return [
        { type: SearchBuilderGroupService, },
        { type: SearchBuilderService, },
    ]; };
    SearchBuilderGroupComponent.propDecorators = {
        "id": [{ type: Input },],
        "header": [{ type: Input },],
        "operator": [{ type: Input },],
        "addText": [{ type: Input },],
        "placeholder": [{ type: Input },],
        "showPlaceholder": [{ type: Input },],
        "add": [{ type: Output },],
        "remove": [{ type: Output },],
    };
    return SearchBuilderGroupComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var SearchBuilderOutletDirective = (function () {
    function SearchBuilderOutletDirective(_viewContainerRef, _componentFactoryResolver, _searchBuilderService) {
        this._viewContainerRef = _viewContainerRef;
        this._componentFactoryResolver = _componentFactoryResolver;
        this._searchBuilderService = _searchBuilderService;
    }
    /**
     * @return {?}
     */
    SearchBuilderOutletDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        // get the class from the type
        var /** @type {?} */ componentDefinition = this._searchBuilderService.getComponent(this.uxSearchBuilderOutlet);
        // create the component factory
        var /** @type {?} */ componentFactory = this._componentFactoryResolver.resolveComponentFactory(componentDefinition.component);
        // create the component instance
        this._componentRef = this._viewContainerRef.createComponent(componentFactory);
        // combine the predefined config with any dynmaic config
        var /** @type {?} */ config = Object.assign({}, componentDefinition.config, this.uxSearchBuilderOutletContext.config || {});
        // set the context and config property on the component instance
        this._componentRef.instance.context = this.uxSearchBuilderOutletContext;
        this._componentRef.instance.config = config;
    };
    SearchBuilderOutletDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxSearchBuilderOutlet]'
                },] },
    ];
    /** @nocollapse */
    SearchBuilderOutletDirective.ctorParameters = function () { return [
        { type: ViewContainerRef, },
        { type: ComponentFactoryResolver, },
        { type: SearchBuilderService, },
    ]; };
    SearchBuilderOutletDirective.propDecorators = {
        "uxSearchBuilderOutlet": [{ type: Input },],
        "uxSearchBuilderOutletContext": [{ type: Input },],
    };
    return SearchBuilderOutletDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var BaseSearchComponent = (function () {
    function BaseSearchComponent(_searchBuilderService, _searchBuilderGroupService) {
        this._searchBuilderService = _searchBuilderService;
        this._searchBuilderGroupService = _searchBuilderGroupService;
        this._id = this._searchBuilderService.generateComponentId();
        this._valid = true;
    }
    Object.defineProperty(BaseSearchComponent.prototype, "value", {
        /**
         * Get the current value of the component
         */
        get: /**
         * Get the current value of the component
         * @return {?}
         */
        function () {
            return this.context.value;
        },
        /**
         * Set the current value of the component
         */
        set: /**
         * Set the current value of the component
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.context.value = value;
            this._searchBuilderService.queryHasChanged();
            // if value has been set perform validation
            this.validate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseSearchComponent.prototype, "valid", {
        get: /**
         * @return {?}
         */
        function () {
            return this._valid;
        },
        set: /**
         * @param {?} valid
         * @return {?}
         */
        function (valid) {
            this._valid = valid;
            this._searchBuilderService.setValid(this._id, valid);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Make sure we clean up after ourselves
     */
    /**
     * Make sure we clean up after ourselves
     * @return {?}
     */
    BaseSearchComponent.prototype.ngOnDestroy = /**
     * Make sure we clean up after ourselves
     * @return {?}
     */
    function () {
        this.valid = true;
    };
    /**
     * Perform any required validation on the value
     */
    /**
     * Perform any required validation on the value
     * @return {?}
     */
    BaseSearchComponent.prototype.validate = /**
     * Perform any required validation on the value
     * @return {?}
     */
    function () {
        // if a custom validation function has been provided then use it
        this.valid = this.config.validation ? this.config.validation(this, this.value) : true;
    };
    BaseSearchComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-base-search',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    BaseSearchComponent.ctorParameters = function () { return [
        { type: SearchBuilderService, },
        { type: SearchBuilderGroupService, },
    ]; };
    return BaseSearchComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var SearchTextComponent = (function (_super) {
    __extends(SearchTextComponent, _super);
    function SearchTextComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = 'text';
        return _this;
    }
    Object.defineProperty(SearchTextComponent.prototype, "label", {
        get: /**
         * @return {?}
         */
        function () {
            return this.config.label;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchTextComponent.prototype, "placeholder", {
        get: /**
         * @return {?}
         */
        function () {
            return this.config.placeholder || 'Enter text';
        },
        enumerable: true,
        configurable: true
    });
    SearchTextComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-search-text',
                    template: "<label class=\"form-label\" *ngIf=\"label\">{{ label }}</label>\n<input [placeholder]=\"placeholder\" [(ngModel)]=\"value\" class=\"form-control\">"
                },] },
    ];
    return SearchTextComponent;
}(BaseSearchComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var SearchDateComponent = (function (_super) {
    __extends(SearchDateComponent, _super);
    function SearchDateComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = 'date';
        return _this;
    }
    Object.defineProperty(SearchDateComponent.prototype, "label", {
        get: /**
         * @return {?}
         */
        function () {
            return this.config.label;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchDateComponent.prototype, "placeholder", {
        get: /**
         * @return {?}
         */
        function () {
            return this.config.placeholder || 'Enter date';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    SearchDateComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        // by default set to the current date if not specified
        if (!this.value) {
            this.value = new Date();
        }
    };
    SearchDateComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-search-date',
                    template: "<label class=\"form-label\" *ngIf=\"label\">{{ label }}</label>\n\n<div class=\"input-group date m-nil\">\n    <span class=\"input-group-addon\" tabindex=\"1\" (click)=\"popover.show()\">\n        <i class=\"hpe-icon hpe-calendar\" aria-hidden=\"true\"></i>\n    </span>\n    <input type=\"text\" #popover=\"ux-popover\" [ngModel]=\"value | date:'dd MMMM yyyy'\" [uxPopover]=\"popoverTemplate\"\n        placement=\"bottom\" popoverClass=\"date-time-picker-popover\" class=\"form-control\" aria-label=\"Selected date\" [placeholder]=\"placeholder\">\n</div>\n\n<ng-template #popoverTemplate>\n    <ux-date-time-picker [(date)]=\"value\" [showTime]=\"false\"></ux-date-time-picker>\n</ng-template>"
                },] },
    ];
    return SearchDateComponent;
}(BaseSearchComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var SearchDateRangeComponent = (function (_super) {
    __extends(SearchDateRangeComponent, _super);
    function SearchDateRangeComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = 'date-range';
        return _this;
    }
    Object.defineProperty(SearchDateRangeComponent.prototype, "label", {
        get: /**
         * @return {?}
         */
        function () {
            return this.config.label;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchDateRangeComponent.prototype, "from", {
        get: /**
         * @return {?}
         */
        function () {
            // if value does not exist the set it
            if (!this.value || !this.value.from) {
                this.from = new Date();
            }
            // ensure that the from value is a date object
            if (this.value.from instanceof Date === false) {
                this.value.from = new Date(this.value.from);
            }
            return this.value.from;
        },
        set: /**
         * @param {?} fromValue
         * @return {?}
         */
        function (fromValue) {
            // create new object based on the current value
            var /** @type {?} */ value = Object.assign({}, this.value);
            // ensure that the from value is a date
            if (fromValue instanceof Date === false) {
                fromValue = new Date(fromValue);
            }
            // set the latest value
            value.from = fromValue;
            // update the value object while ensuring immutability
            this.value = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchDateRangeComponent.prototype, "to", {
        get: /**
         * @return {?}
         */
        function () {
            // if value does not exist the set it
            if (!this.value || !this.value.to) {
                this.to = new Date();
            }
            // ensure that the to value is a date object
            if (this.value.to instanceof Date === false) {
                this.value.to = new Date(this.value.to);
            }
            return this.value.to;
        },
        set: /**
         * @param {?} toValue
         * @return {?}
         */
        function (toValue) {
            // create new object based on the current value
            var /** @type {?} */ value = Object.assign({}, this.value);
            // ensure that the to value is a date
            if (toValue instanceof Date === false) {
                toValue = new Date(toValue);
            }
            // set the latest value
            value.to = toValue;
            // update the value object while ensuring immutability
            this.value = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchDateRangeComponent.prototype, "fromLabel", {
        get: /**
         * @return {?}
         */
        function () {
            return this.config.fromLabel || 'From';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchDateRangeComponent.prototype, "toLabel", {
        get: /**
         * @return {?}
         */
        function () {
            return this.config.toLabel || 'To';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchDateRangeComponent.prototype, "fromPlaceholder", {
        get: /**
         * @return {?}
         */
        function () {
            return this.config.fromPlaceholder;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchDateRangeComponent.prototype, "toPlaceholder", {
        get: /**
         * @return {?}
         */
        function () {
            return this.config.toPlaceholder;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Override the default validation
     */
    /**
     * Override the default validation
     * @return {?}
     */
    SearchDateRangeComponent.prototype.validate = /**
     * Override the default validation
     * @return {?}
     */
    function () {
        // check if there is a config validation function
        if (this.config.validation) {
            return _super.prototype.validate.call(this);
        }
        // create copies of the dates so we can modify time value (to ignore it)
        var /** @type {?} */ from$$1 = new Date(this.value.from);
        var /** @type {?} */ to = new Date(this.value.to);
        // set the time to the same so we dont compare it
        from$$1.setHours(0, 0, 0, 0);
        to.setHours(0, 0, 0, 0);
        // valid if the from date is less than or equal to the to date
        this.valid = from$$1 <= to;
    };
    SearchDateRangeComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-search-date-range',
                    template: "<label class=\"form-label\" *ngIf=\"label\">{{ label }}</label>\n\n<div class=\"row\">\n    <div class=\"col-sm-12\">\n        <div class=\"form-inline\" [class.has-error]=\"!valid\">\n\n            <div class=\"form-group p-r-md\">\n                <label class=\"form-label m-r-xs\">{{ fromLabel }}</label>\n\n                <div class=\"input-group date m-nil\">\n                    <span class=\"input-group-addon p-r-xs\" tabindex=\"1\" (click)=\"fromPopover.show()\">\n                        <i class=\"hpe-icon hpe-calendar\" aria-hidden=\"true\"></i>\n                    </span>\n                    <input type=\"text\" #fromPopover=\"ux-popover\" [ngModel]=\"from | date:'dd MMMM yyyy'\" [uxPopover]=\"fromPopoverTemplate\" placement=\"bottom\"\n                        popoverClass=\"date-time-picker-popover\" class=\"form-control\" aria-label=\"Selected date\" [placeholder]=\"fromPlaceholder\">\n                </div>\n            </div>\n\n            <div class=\"form-group p-r-xs\">\n                <label class=\"form-label m-r-xs\">{{ toLabel }}</label>\n\n                <div class=\"input-group date m-nil\">\n                    <span class=\"input-group-addon\" tabindex=\"1\" (click)=\"toPopover.show()\">\n                        <i class=\"hpe-icon hpe-calendar\" aria-hidden=\"true\"></i>\n                    </span>\n                    <input type=\"text\" #toPopover=\"ux-popover\" [ngModel]=\"to | date:'dd MMMM yyyy'\" [uxPopover]=\"toPopoverTemplate\" placement=\"bottom\"\n                        popoverClass=\"date-time-picker-popover\" class=\"form-control\" aria-label=\"Selected date\" [placeholder]=\"toPlaceholder\">\n                </div>\n            </div>\n\n        </div>\n    </div>\n</div>\n\n<ng-template #fromPopoverTemplate>\n    <ux-date-time-picker [(date)]=\"from\" [showTime]=\"false\"></ux-date-time-picker>\n</ng-template>\n\n<ng-template #toPopoverTemplate>\n    <ux-date-time-picker [(date)]=\"to\" [showTime]=\"false\"></ux-date-time-picker>\n</ng-template>"
                },] },
    ];
    return SearchDateRangeComponent;
}(BaseSearchComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var SearchSelectComponent = (function (_super) {
    __extends(SearchSelectComponent, _super);
    function SearchSelectComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = 'select';
        return _this;
    }
    Object.defineProperty(SearchSelectComponent.prototype, "label", {
        /**
         * Provide defaults for undefined properties
         */
        get: /**
         * Provide defaults for undefined properties
         * @return {?}
         */
        function () {
            return this.config.label;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchSelectComponent.prototype, "options", {
        get: /**
         * @return {?}
         */
        function () {
            return this.config.options || [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchSelectComponent.prototype, "multiple", {
        get: /**
         * @return {?}
         */
        function () {
            return this.config.multiple || false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchSelectComponent.prototype, "placeholder", {
        get: /**
         * @return {?}
         */
        function () {
            return this.config.placeholder || 'Select item';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchSelectComponent.prototype, "dropDirection", {
        get: /**
         * @return {?}
         */
        function () {
            return this.config.dropDirection || 'down';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchSelectComponent.prototype, "allowNull", {
        get: /**
         * @return {?}
         */
        function () {
            return this.config.allowNull || false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchSelectComponent.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () {
            return this.config.disabled || false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchSelectComponent.prototype, "maxHeight", {
        get: /**
         * @return {?}
         */
        function () {
            return this.config.maxHeight || '250px';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchSelectComponent.prototype, "pageSize", {
        get: /**
         * @return {?}
         */
        function () {
            return this.config.pageSize || 20;
        },
        enumerable: true,
        configurable: true
    });
    SearchSelectComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-search-select',
                    template: "<label class=\"form-label\" *ngIf=\"label\">{{ label }}</label>\n\n<ux-select [(value)]=\"value\" \n           [options]=\"options\" \n           [multiple]=\"multiple\" \n           [placeholder]=\"placeholder\" \n           [dropDirection]=\"dropDirection\"\n           [pageSize]=\"pageSize\"\n           [allowNull]=\"allowNull\"\n           [disabled]=\"disabled\"\n           [maxHeight]=\"maxHeight\"\n           [key]=\"config.key\"\n           [display]=\"config.display\"\n           [loadingTemplate]=\"config.loadingTemplate\"\n           [optionTemplate]=\"config.optionTemplate\"\n           [noOptionsTemplate]=\"config.noOptionsTemplate\">\n</ux-select>"
                },] },
    ];
    return SearchSelectComponent;
}(BaseSearchComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var SearchBuilderComponent = (function () {
    /**
     * Register the default search builder components
     */
    function SearchBuilderComponent(_searchBuilderService) {
        var _this = this;
        this._searchBuilderService = _searchBuilderService;
        this.queryChange = new EventEmitter();
        this.valid = new EventEmitter(true);
        // watch for any query changes
        this._querySubscription = _searchBuilderService.queryChange.subscribe(function (query$$1) { return _this.queryChange.emit(query$$1); });
        // watch for any changes to the validation
        this._validSubscription = _searchBuilderService.validationChange.pipe(distinctUntilChanged()).subscribe(function (valid) { return _this.valid.emit(valid); });
    }
    Object.defineProperty(SearchBuilderComponent.prototype, "components", {
        set: /**
         * @param {?} components
         * @return {?}
         */
        function (components) {
            this._searchBuilderService.registerComponents(components);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchBuilderComponent.prototype, "query", {
        get: /**
         * @return {?}
         */
        function () {
            return this._searchBuilderService.getQuery();
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._searchBuilderService.setQuery(value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Remove any subscriptions and cleanup
     */
    /**
     * Remove any subscriptions and cleanup
     * @return {?}
     */
    SearchBuilderComponent.prototype.ngOnDestroy = /**
     * Remove any subscriptions and cleanup
     * @return {?}
     */
    function () {
        this._querySubscription.unsubscribe();
        this._validSubscription.unsubscribe();
    };
    SearchBuilderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-search-builder',
                    template: "<ng-content></ng-content>",
                    providers: [SearchBuilderService]
                },] },
    ];
    /** @nocollapse */
    SearchBuilderComponent.ctorParameters = function () { return [
        { type: SearchBuilderService, },
    ]; };
    SearchBuilderComponent.propDecorators = {
        "components": [{ type: Input },],
        "query": [{ type: Input },],
        "queryChange": [{ type: Output },],
        "valid": [{ type: Output },],
    };
    return SearchBuilderComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var TypeaheadOptionEvent = (function () {
    function TypeaheadOptionEvent(option) {
        this.option = option;
    }
    return TypeaheadOptionEvent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var TypeaheadKeyService = (function () {
    function TypeaheadKeyService() {
    }
    /**
     * @param {?} event
     * @param {?} typeahead
     * @return {?}
     */
    TypeaheadKeyService.prototype.handleKey = /**
     * @param {?} event
     * @param {?} typeahead
     * @return {?}
     */
    function (event, typeahead) {
        if (typeahead) {
            switch (event.key) {
                case 'ArrowUp':
                case 'Up':
                    if (!typeahead.open) {
                        typeahead.open = true;
                    }
                    else {
                        typeahead.moveHighlight(-1);
                    }
                    event.preventDefault();
                    break;
                case 'ArrowDown':
                case 'Down':
                    if (!typeahead.open) {
                        typeahead.open = true;
                    }
                    else {
                        typeahead.moveHighlight(1);
                    }
                    event.preventDefault();
                    break;
                case 'Escape':
                case 'Esc':
                    typeahead.open = false;
                    break;
            }
        }
    };
    TypeaheadKeyService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    TypeaheadKeyService.ctorParameters = function () { return []; };
    return TypeaheadKeyService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var TypeaheadService = (function () {
    function TypeaheadService() {
        this.open$ = new BehaviorSubject(false);
        this.highlightedElement$ = new BehaviorSubject(null);
    }
    TypeaheadService.decorators = [
        { type: Injectable },
    ];
    return TypeaheadService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ uniqueId = 0;
var TypeaheadComponent = (function () {
    function TypeaheadComponent(typeaheadElement, _cdRef, _service) {
        var _this = this;
        this.typeaheadElement = typeaheadElement;
        this._cdRef = _cdRef;
        this._service = _service;
        this.id = "ux-typeahead-" + ++uniqueId;
        this.openChange = new EventEmitter();
        this.dropDirection = 'down';
        this.maxHeight = '250px';
        this.multiselectable = false;
        this.openOnFilterChange = true;
        this.pageSize = 20;
        this.selectFirst = true;
        this.optionSelected = new EventEmitter();
        this.highlightedChange = new EventEmitter();
        this.highlightedElementChange = new EventEmitter();
        this.visibleOptions$ = new BehaviorSubject([]);
        this.loading = false;
        this.clicking = false;
        this.highlighted$ = new BehaviorSubject(null);
        this._open = false;
        this._subscription = new Subscription();
        this.optionApi = {
            getKey: this.getKey.bind(this),
            getDisplay: this.getDisplay.bind(this),
            getDisplayHtml: this.getDisplayHtml.bind(this)
        };
        this.loadOptionsCallback = function (pageNum, pageSize, filter$$1) {
            if (typeof _this.options === 'function') {
                return _this.options(pageNum, pageSize, filter$$1);
            }
            return null;
        };
        this._subscription.add(this._service.open$.pipe(distinctUntilChanged()).subscribe(function (next) {
            _this.openChange.emit(next);
            if (next) {
                _this.initOptions();
            }
        }));
        this._subscription.add(this.highlighted$.subscribe(function (next) {
            _this.highlightedChange.emit(next ? next.value : null);
        }));
        this._subscription.add(combineLatest(this._service.open$, this._service.highlightedElement$, this.visibleOptions$)
            .subscribe(function (_a) {
            var _b = __read(_a, 3), open = _b[0], highlightedElement = _b[1], visibleOptions = _b[2];
            _this.highlightedElementChange.emit(open && visibleOptions.length > 0 ? highlightedElement : null);
        }));
    }
    Object.defineProperty(TypeaheadComponent.prototype, "open", {
        get: /**
         * @return {?}
         */
        function () {
            return this._service.open$.getValue();
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._service.open$.next(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TypeaheadComponent.prototype, "highlighted", {
        get: /**
         * @return {?}
         */
        function () {
            var /** @type {?} */ value = this.highlighted$.getValue();
            return value ? value.value : null;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    TypeaheadComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        // Attach default loading template
        if (!this.loadingTemplate) {
            this.loadingTemplate = this._defaultLoadingTemplate;
        }
        // Attach default option template
        if (!this.optionTemplate) {
            this.optionTemplate = this._defaultOptionTemplate;
        }
        // Attach default "no results" template
        if (!this.noOptionsTemplate) {
            this.noOptionsTemplate = this._defaultNoOptionsTemplate;
        }
        this._cdRef.detectChanges();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    TypeaheadComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        // Open the dropdown if the filter value updates
        if (changes["filter"]) {
            if (this.openOnFilterChange && changes["filter"].currentValue && changes["filter"].currentValue.length > 0) {
                this.open = true;
            }
        }
        // Re-filter visibleOptions
        this.updateOptions();
    };
    /**
     * @return {?}
     */
    TypeaheadComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._subscription.unsubscribe();
    };
    /**
     * @return {?}
     */
    TypeaheadComponent.prototype.mousedownHandler = /**
     * @return {?}
     */
    function () {
        this.clicking = true;
    };
    /**
     * @return {?}
     */
    TypeaheadComponent.prototype.mouseupHandler = /**
     * @return {?}
     */
    function () {
        this.clicking = false;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    TypeaheadComponent.prototype.optionMousedownHandler = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // Workaround to prevent focus changing when an option is clicked
        event.preventDefault();
    };
    /**
     * @param {?} event
     * @param {?} option
     * @return {?}
     */
    TypeaheadComponent.prototype.optionClickHandler = /**
     * @param {?} event
     * @param {?} option
     * @return {?}
     */
    function (event, option) {
        this.select(option);
    };
    /**
     * Returns the unique key value of the given option.
     */
    /**
     * Returns the unique key value of the given option.
     * @param {?} option
     * @return {?}
     */
    TypeaheadComponent.prototype.getKey = /**
     * Returns the unique key value of the given option.
     * @param {?} option
     * @return {?}
     */
    function (option) {
        if (typeof this.key === 'function') {
            return this.key(option);
        }
        if (typeof this.key === 'string' && option && option.hasOwnProperty(this.key)) {
            return option[/** @type {?} */ (this.key)];
        }
        return this.getDisplay(option);
    };
    /**
     * Returns the display value of the given option.
     */
    /**
     * Returns the display value of the given option.
     * @param {?} option
     * @return {?}
     */
    TypeaheadComponent.prototype.getDisplay = /**
     * Returns the display value of the given option.
     * @param {?} option
     * @return {?}
     */
    function (option) {
        if (typeof this.display === 'function') {
            return this.display(option);
        }
        if (typeof this.display === 'string' && option && option.hasOwnProperty(this.display)) {
            return option[/** @type {?} */ (this.display)];
        }
        return option;
    };
    /**
     * Returns the display value of the given option with HTML markup added to highlight the part which matches the current filter value.
     * @param option
     */
    /**
     * Returns the display value of the given option with HTML markup added to highlight the part which matches the current filter value.
     * @param {?} option
     * @return {?}
     */
    TypeaheadComponent.prototype.getDisplayHtml = /**
     * Returns the display value of the given option with HTML markup added to highlight the part which matches the current filter value.
     * @param {?} option
     * @return {?}
     */
    function (option) {
        var /** @type {?} */ displayText;
        if (typeof option === 'string') {
            displayText = this.getDisplay(option).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        }
        else {
            displayText = this.getDisplay(option.name).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        }
        var /** @type {?} */ displayHtml = displayText;
        if (this.filter) {
            var /** @type {?} */ length_1 = this.filter.length;
            var /** @type {?} */ matchIndex = displayText.toLowerCase().indexOf(this.filter.toLowerCase());
            if (matchIndex >= 0) {
                var /** @type {?} */ highlight = "<span class=\"ux-filter-match\">" + displayText.substr(matchIndex, length_1) + "</span>";
                displayHtml = displayText.substr(0, matchIndex) + highlight + displayText.substr(matchIndex + length_1);
            }
        }
        return displayHtml;
    };
    /**
     * Returns true if the infinite scroll component should load
     */
    /**
     * Returns true if the infinite scroll component should load
     * @return {?}
     */
    TypeaheadComponent.prototype.isInfiniteScroll = /**
     * Returns true if the infinite scroll component should load
     * @return {?}
     */
    function () {
        return typeof this.options === 'function';
    };
    /**
     * Selects the given option, emitting the optionSelected event and closing the dropdown.
     */
    /**
     * Selects the given option, emitting the optionSelected event and closing the dropdown.
     * @param {?} option
     * @return {?}
     */
    TypeaheadComponent.prototype.select = /**
     * Selects the given option, emitting the optionSelected event and closing the dropdown.
     * @param {?} option
     * @return {?}
     */
    function (option) {
        if (!this.isDisabled(option)) {
            this.optionSelected.emit(new TypeaheadOptionEvent(option.value));
            this.highlighted$.next(null);
            this.open = false;
        }
    };
    /**
     * Returns true if the given option is part of the disabledOptions array.
     */
    /**
     * Returns true if the given option is part of the disabledOptions array.
     * @param {?} option
     * @return {?}
     */
    TypeaheadComponent.prototype.isDisabled = /**
     * Returns true if the given option is part of the disabledOptions array.
     * @param {?} option
     * @return {?}
     */
    function (option) {
        var _this = this;
        if (this.disabledOptions) {
            var /** @type {?} */ result = this.disabledOptions.find(function (selectedOption) {
                return _this.getKey(selectedOption) === option.key;
            });
            return result !== undefined;
        }
        return false;
    };
    /**
     * Set the given option as the current highlighted option, available in the highlightedOption parameter.
     */
    /**
     * Set the given option as the current highlighted option, available in the highlightedOption parameter.
     * @param {?} option
     * @return {?}
     */
    TypeaheadComponent.prototype.highlight = /**
     * Set the given option as the current highlighted option, available in the highlightedOption parameter.
     * @param {?} option
     * @return {?}
     */
    function (option) {
        if (!this.isDisabled(option)) {
            this.highlighted$.next(option);
        }
    };
    /**
     * Increment or decrement the highlighted option in the list. Disabled options are skipped.
     * @param d Value to be added to the index of the highlighted option, i.e. -1 to move backwards, +1 to move forwards.
     */
    /**
     * Increment or decrement the highlighted option in the list. Disabled options are skipped.
     * @param {?} d Value to be added to the index of the highlighted option, i.e. -1 to move backwards, +1 to move forwards.
     * @return {?}
     */
    TypeaheadComponent.prototype.moveHighlight = /**
     * Increment or decrement the highlighted option in the list. Disabled options are skipped.
     * @param {?} d Value to be added to the index of the highlighted option, i.e. -1 to move backwards, +1 to move forwards.
     * @return {?}
     */
    function (d) {
        var /** @type {?} */ visibleOptions = this.visibleOptions$.getValue();
        var /** @type {?} */ highlightIndex = this.indexOfVisibleOption(this.highlighted);
        var /** @type {?} */ newIndex = highlightIndex;
        var /** @type {?} */ disabled = true;
        var /** @type {?} */ inBounds = true;
        do {
            newIndex = newIndex + d;
            inBounds = (newIndex >= 0 && newIndex < visibleOptions.length);
            disabled = inBounds && this.isDisabled(visibleOptions[newIndex]);
        } while (inBounds && disabled);
        if (!disabled && inBounds) {
            this.highlighted$.next(visibleOptions[newIndex]);
        }
        return this.highlighted;
    };
    /**
     * Set up the options before the dropdown is displayed.
     */
    /**
     * Set up the options before the dropdown is displayed.
     * @return {?}
     */
    TypeaheadComponent.prototype.initOptions = /**
     * Set up the options before the dropdown is displayed.
     * @return {?}
     */
    function () {
        // Clear previous highlight
        this.highlighted$.next(null);
        if (this.selectFirst) {
            // This will highlight the first non-disabled option.
            this.moveHighlight(1);
        }
    };
    /**
     * Update the visibleOptions array with the current filter.
     */
    /**
     * Update the visibleOptions array with the current filter.
     * @return {?}
     */
    TypeaheadComponent.prototype.updateOptions = /**
     * Update the visibleOptions array with the current filter.
     * @return {?}
     */
    function () {
        var _this = this;
        if (typeof this.options === 'object') {
            var /** @type {?} */ normalisedInput_1 = (this.filter || '').toLowerCase();
            var /** @type {?} */ visibleOptions = this.options
                .filter(function (option) {
                return _this.getDisplay(option).toLowerCase().indexOf(normalisedInput_1) >= 0;
            })
                .map(function (value) {
                return {
                    value: value,
                    key: _this.getKey(value)
                };
            });
            this.visibleOptions$.next(visibleOptions);
        }
        this.initOptions();
    };
    /**
     * Return the index of the given option in the visibleOptions array. Returns -1 if the option is not currently visible.
     * @param {?} option
     * @return {?}
     */
    TypeaheadComponent.prototype.indexOfVisibleOption = /**
     * Return the index of the given option in the visibleOptions array. Returns -1 if the option is not currently visible.
     * @param {?} option
     * @return {?}
     */
    function (option) {
        if (option) {
            var /** @type {?} */ optionKey_1 = this.getKey(option);
            return this.visibleOptions$.getValue().findIndex(function (el) {
                return el.key === optionKey_1;
            });
        }
        return -1;
    };
    TypeaheadComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-typeahead',
                    template: "<div class=\"ux-typeahead-options\"\n    [uxInfiniteScroll]=\"loadOptionsCallback\"\n    [collection]=\"visibleOptions$ | async\"\n    (collectionChange)=\"visibleOptions$.next($event)\"\n    [enabled]=\"isInfiniteScroll()\"\n    [filter]=\"filter\"\n    [loadOnScroll]=\"true\"\n    [pageSize]=\"pageSize\"\n    [scrollElement]=\"typeaheadElement\"\n    (loading)=\"loading = true\"\n    (loaded)=\"loading = false\">\n\n    <ol *ngIf=\"(visibleOptions$ | async).length > 0\">\n        <li *ngFor=\"let option of (visibleOptions$ | async); let i = index\"\n            [attr.id]=\"id + '-option-' + i\"\n            [class.disabled]=\"isDisabled(option)\"\n            [class.highlighted]=\"(highlighted$ | async).key === option.key\"\n            [attr.aria-selected]=\"multiselectable ? isDisabled(option) : null\"\n            [uxTypeaheadHighlight]=\"(highlighted$ | async).key === option.key\"\n            [uxScrollIntoViewIf]=\"(highlighted$ | async).key === option.key\"\n            [scrollParent]=\"typeaheadElement.nativeElement\"\n            (mousedown)=\"optionMousedownHandler($event)\"\n            (click)=\"optionClickHandler($event, option)\"\n            (mouseover)=\"highlight(option)\">\n\n            <ng-container [ngTemplateOutlet]=\"optionTemplate\"\n                [ngTemplateOutletContext]=\"{option: option.value, api: optionApi}\">\n            </ng-container>\n\n        </li>\n    </ol>\n\n    <div *uxInfiniteScrollLoading>\n        <ng-container [ngTemplateOutlet]=\"loadingTemplate\">\n        </ng-container>\n    </div>\n\n</div>\n<div *ngIf=\"(visibleOptions$ | async).length === 0 && !loading\">\n    <ng-container [ngTemplateOutlet]=\"noOptionsTemplate\">\n    </ng-container>\n</div>\n\n<ng-template #defaultLoadingTemplate>\n    <div class=\"ux-typeahead-loading\">\n        <div class=\"spinner spinner-accent spinner-bounce-middle\"></div>\n        <div>Loading...</div>\n    </div>\n</ng-template>\n\n<ng-template #defaultOptionTemplate let-option=\"option\" let-api=\"api\">\n    <span class=\"ux-typeahead-option\" [innerHtml]=\"api.getDisplayHtml(option)\"></span>\n</ng-template>\n\n<ng-template #defaultNoOptionsTemplate>\n    <span class=\"ux-typeahead-no-options\">No results</span>\n</ng-template>",
                    providers: [TypeaheadService],
                    host: {
                        'role': 'listbox',
                        '[class.open]': 'open',
                        '[class.drop-up]': 'dropDirection === "up"',
                        '[style.maxHeight]': 'maxHeight'
                    }
                },] },
    ];
    /** @nocollapse */
    TypeaheadComponent.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: ChangeDetectorRef, },
        { type: TypeaheadService, },
    ]; };
    TypeaheadComponent.propDecorators = {
        "id": [{ type: Input }, { type: HostBinding, args: ['attr.id',] },],
        "options": [{ type: Input },],
        "filter": [{ type: Input },],
        "open": [{ type: Input, args: ['open',] },],
        "openChange": [{ type: Output },],
        "display": [{ type: Input },],
        "key": [{ type: Input },],
        "disabledOptions": [{ type: Input },],
        "dropDirection": [{ type: Input },],
        "maxHeight": [{ type: Input },],
        "multiselectable": [{ type: Input }, { type: HostBinding, args: ['attr.aria-multiselectable',] },],
        "openOnFilterChange": [{ type: Input },],
        "pageSize": [{ type: Input },],
        "selectFirst": [{ type: Input },],
        "loadingTemplate": [{ type: Input },],
        "optionTemplate": [{ type: Input },],
        "noOptionsTemplate": [{ type: Input },],
        "optionSelected": [{ type: Output },],
        "highlightedChange": [{ type: Output },],
        "highlightedElementChange": [{ type: Output },],
        "_defaultLoadingTemplate": [{ type: ViewChild, args: ['defaultLoadingTemplate',] },],
        "_defaultOptionTemplate": [{ type: ViewChild, args: ['defaultOptionTemplate',] },],
        "_defaultNoOptionsTemplate": [{ type: ViewChild, args: ['defaultNoOptionsTemplate',] },],
        "mousedownHandler": [{ type: HostListener, args: ['mousedown',] },],
        "mouseupHandler": [{ type: HostListener, args: ['mouseup',] },],
    };
    return TypeaheadComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var InfiniteScrollLoadButtonDirective = (function () {
    function InfiniteScrollLoadButtonDirective(_element, _template, _viewContainer, _renderer) {
        this._element = _element;
        this._template = _template;
        this._viewContainer = _viewContainer;
        this._renderer = _renderer;
        this._visible = false;
        this._load = new Subject();
        this.load = /** @type {?} */ (this._load.asObservable());
    }
    Object.defineProperty(InfiniteScrollLoadButtonDirective.prototype, "visible", {
        get: /**
         * @return {?}
         */
        function () {
            return this._visible;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value !== this._visible) {
                if (value) {
                    this._viewContainer.createEmbeddedView(this._template);
                    // Template content follows the elementRef, which is a comment.
                    var /** @type {?} */ clickTarget = this.getNextElementSibling(this._template.elementRef.nativeElement);
                    this._renderer.listen(clickTarget, 'click', this.onClick.bind(this));
                }
                else {
                    this._viewContainer.clear();
                }
            }
            this._visible = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} event
     * @return {?}
     */
    InfiniteScrollLoadButtonDirective.prototype.onClick = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this._load.next(event);
    };
    /**
     * @param {?} element
     * @return {?}
     */
    InfiniteScrollLoadButtonDirective.prototype.getNextElementSibling = /**
     * @param {?} element
     * @return {?}
     */
    function (element) {
        var /** @type {?} */ next = element;
        while (next = next.nextSibling) {
            if (next.nodeType === 1) {
                return next;
            }
        }
        return null;
    };
    InfiniteScrollLoadButtonDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxInfiniteScrollLoadButton]'
                },] },
    ];
    /** @nocollapse */
    InfiniteScrollLoadButtonDirective.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: TemplateRef, },
        { type: ViewContainerRef, },
        { type: Renderer2, },
    ]; };
    InfiniteScrollLoadButtonDirective.propDecorators = {
        "visible": [{ type: Input, args: ['uxInfiniteScrollLoadButton',] },],
        "load": [{ type: Output },],
    };
    return InfiniteScrollLoadButtonDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var InfiniteScrollLoadingDirective = (function () {
    function InfiniteScrollLoadingDirective(_templateRef, _viewContainer) {
        this._templateRef = _templateRef;
        this._viewContainer = _viewContainer;
        this._visible = false;
    }
    Object.defineProperty(InfiniteScrollLoadingDirective.prototype, "visible", {
        get: /**
         * @return {?}
         */
        function () {
            return this._visible;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value !== this._visible) {
                if (value) {
                    this._viewContainer.createEmbeddedView(this._templateRef);
                }
                else {
                    this._viewContainer.clear();
                }
            }
            this._visible = value;
        },
        enumerable: true,
        configurable: true
    });
    InfiniteScrollLoadingDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxInfiniteScrollLoading]'
                },] },
    ];
    /** @nocollapse */
    InfiniteScrollLoadingDirective.ctorParameters = function () { return [
        { type: TemplateRef, },
        { type: ViewContainerRef, },
    ]; };
    InfiniteScrollLoadingDirective.propDecorators = {
        "visible": [{ type: Input, args: ['uxInfiniteScrollLoading',] },],
    };
    return InfiniteScrollLoadingDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var InfiniteScrollDirective = (function () {
    function InfiniteScrollDirective(_element) {
        this._element = _element;
        this._collection = [];
        this.enabled = true;
        this.loadOnInit = true;
        this.loadOnScroll = true;
        this.pageSize = 20;
        this.collectionChange = new EventEmitter();
        this.loadingEvent = new EventEmitter();
        this.loadedEvent = new EventEmitter();
        this.loadErrorEvent = new EventEmitter();
        this._nextPageNum = 0;
        this._updateRequests = new Subject();
        this._isLoading = new BehaviorSubject(false);
        this._isExhausted = new BehaviorSubject(false);
        this._loadButtonEnabled = new BehaviorSubject(false);
        this._subscriptions = [];
        this._loadButtonSubscriptions = [];
        this._onDestroy = new Subject();
        this._canLoadManually = this._isLoading.pipe(combineLatest$1(this._isExhausted, this._loadButtonEnabled, function (isLoading, isExhausted, loadButtonEnabled) {
            return !isLoading && !isExhausted && loadButtonEnabled;
        }));
    }
    Object.defineProperty(InfiniteScrollDirective.prototype, "collection", {
        get: /**
         * @return {?}
         */
        function () {
            return this._collection;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.collectionChange.emit(value);
            this._collection = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InfiniteScrollDirective.prototype, "scrollElement", {
        set: /**
         * @param {?} element
         * @return {?}
         */
        function (element) {
            this._scrollElement = element instanceof ElementRef ? element : new ElementRef(element);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    InfiniteScrollDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (!this._scrollElement) {
            this._scrollElement = this._element;
        }
        this._loadButtonEnabled.next(!this.loadOnScroll);
    };
    /**
     * @return {?}
     */
    InfiniteScrollDirective.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // There are two kinds of update requests: check and load.
        // Check requests are throttled and will only cause an update if more data is required
        // to fill the scrolling view, and it isn't already loading some.
        // Load requests are not throttled and always request a page of data.
        this._updateRequests.pipe(filter(function (request) { return request.check; }), auditTime(200), takeUntil(this._onDestroy)).subscribe(this.doRequest.bind(this));
        this._updateRequests.pipe(filter(function (request) { return !request.check; }), takeUntil(this._onDestroy)).subscribe(this.doRequest.bind(this));
        if (this.enabled) {
            // Subscribe to scroll events and DOM changes.
            this.attachEventHandlers();
        }
        // Connect the Load More button visible state.
        this._canLoadManually.pipe(takeUntil(this._onDestroy)).subscribe(function (canLoad) {
            _this._loadButtonQuery.forEach(function (loadButton) {
                loadButton.visible = canLoad;
            });
        });
        // Connect the loading indicator visible state.
        this._isLoading.pipe(takeUntil(this._onDestroy)).subscribe(function (isLoading) {
            _this._loadingIndicatorQuery.forEach(function (loading) {
                loading.visible = isLoading;
            });
        });
        // Link the Load More button click event to trigger an update.
        this.attachLoadButtonEvents();
        this._loadButtonQuery.changes.pipe(takeUntil(this._onDestroy)).subscribe(function () {
            _this.attachLoadButtonEvents();
        });
        // Initial update.
        if (this.loadOnInit) {
            this.loadNextPage();
        }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    InfiniteScrollDirective.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var /** @type {?} */ check = true;
        if (changes["enabled"] && changes["enabled"].currentValue !== changes["enabled"].previousValue) {
            if (changes["enabled"].currentValue) {
                this.attachEventHandlers();
                this.reset();
                check = false;
            }
            else {
                this.detachEventHandlers();
            }
        }
        if (this.enabled) {
            if (changes["filter"] && changes["filter"].currentValue !== changes["filter"].previousValue) {
                this.reset();
                check = false;
            }
            if (changes["loadOnScroll"]) {
                this._loadButtonEnabled.next(!changes["loadOnScroll"].currentValue);
            }
            if (changes["pageSize"] && changes["pageSize"].currentValue !== changes["pageSize"].previousValue) {
                this.reset();
                check = false;
            }
            this._updateRequests.next({
                check: check,
                pageNumber: this._nextPageNum,
                pageSize: this.pageSize,
                filter: this.filter
            });
        }
    };
    /**
     * @return {?}
     */
    InfiniteScrollDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.detachEventHandlers();
        this._onDestroy.next();
        this._onDestroy.complete();
    };
    /**
     * Request an additional page of data.
     */
    /**
     * Request an additional page of data.
     * @return {?}
     */
    InfiniteScrollDirective.prototype.loadNextPage = /**
     * Request an additional page of data.
     * @return {?}
     */
    function () {
        if (!this.enabled) {
            return;
        }
        this._updateRequests.next({
            check: false,
            pageNumber: this._nextPageNum,
            pageSize: this.pageSize,
            filter: this.filter
        });
    };
    /**
     * Request a check for whether an additional page of data is required. This is throttled.
     */
    /**
     * Request a check for whether an additional page of data is required. This is throttled.
     * @return {?}
     */
    InfiniteScrollDirective.prototype.check = /**
     * Request a check for whether an additional page of data is required. This is throttled.
     * @return {?}
     */
    function () {
        if (!this.enabled) {
            return;
        }
        this._updateRequests.next({
            check: true,
            pageNumber: this._nextPageNum,
            pageSize: this.pageSize,
            filter: this.filter
        });
    };
    /**
     * Clear the collection. Future requests will load from page 0.
     */
    /**
     * Clear the collection. Future requests will load from page 0.
     * @return {?}
     */
    InfiniteScrollDirective.prototype.reset = /**
     * Clear the collection. Future requests will load from page 0.
     * @return {?}
     */
    function () {
        if (!this.enabled) {
            return;
        }
        // Reset the page counter.
        this._nextPageNum = 0;
        this._pages = [];
        // Clear the collection (without changing the reference).
        if (this.collection) {
            this.collection.length = 0;
        }
        // Reset the exhausted flag, allowing the Load More button to appear.
        this._isExhausted.next(false);
        // Cancel any pending requests
        if (this._subscriptions) {
            this._subscriptions.forEach(function (request) { return request.unsubscribe(); });
        }
    };
    /**
     * Reload the data without clearing the view.
     */
    /**
     * Reload the data without clearing the view.
     * @return {?}
     */
    InfiniteScrollDirective.prototype.reload = /**
     * Reload the data without clearing the view.
     * @return {?}
     */
    function () {
        var _this = this;
        this._pages.forEach(function (page, i) { return _this.reloadPage(i); });
    };
    /**
     * Reload the data in a specific page without clearing the view.
     * @param pageNum Page number
     */
    /**
     * Reload the data in a specific page without clearing the view.
     * @param {?} pageNum Page number
     * @return {?}
     */
    InfiniteScrollDirective.prototype.reloadPage = /**
     * Reload the data in a specific page without clearing the view.
     * @param {?} pageNum Page number
     * @return {?}
     */
    function (pageNum) {
        if (!this.enabled) {
            return;
        }
        this._updateRequests.next({
            check: false,
            pageNumber: pageNum,
            pageSize: this.pageSize,
            filter: this.filter,
            reload: true
        });
    };
    /**
     * Attach scroll event handler and DOM observer.
     * @return {?}
     */
    InfiniteScrollDirective.prototype.attachEventHandlers = /**
     * Attach scroll event handler and DOM observer.
     * @return {?}
     */
    function () {
        // if the scrollElement is documentElement we must watch for a scroll event on the document
        var /** @type {?} */ target = this._scrollElement.nativeElement instanceof HTMLHtmlElement ? document : this._scrollElement.nativeElement;
        // Subscribe to the scroll event on the target element.
        this._scrollEventSub = fromEvent(target, 'scroll').subscribe(this.check.bind(this));
        // Subscribe to child DOM changes. The main effect of this is to check whether even more data is
        // required after the initial load.
        this._domObserver = new MutationObserver(this.check.bind(this));
        this._domObserver.observe(this._scrollElement.nativeElement, {
            childList: true,
            subtree: true
        });
    };
    /**
     * Detach scroll event handler and DOM observer.
     * @return {?}
     */
    InfiniteScrollDirective.prototype.detachEventHandlers = /**
     * Detach scroll event handler and DOM observer.
     * @return {?}
     */
    function () {
        if (this._scrollEventSub) {
            this._scrollEventSub.unsubscribe();
            this._scrollEventSub = null;
        }
        if (this._domObserver) {
            this._domObserver.disconnect();
            this._domObserver = null;
        }
    };
    /**
     * Remove any existing event subscriptions for the load button `load` event, then attach subscriptions
     * for any in the query.
     * @return {?}
     */
    InfiniteScrollDirective.prototype.attachLoadButtonEvents = /**
     * Remove any existing event subscriptions for the load button `load` event, then attach subscriptions
     * for any in the query.
     * @return {?}
     */
    function () {
        var _this = this;
        this._loadButtonSubscriptions.forEach(function (s) { return s.unsubscribe(); });
        this._loadButtonSubscriptions = this._loadButtonQuery.map(function (loadButton) { return loadButton.load.subscribe(_this.loadNextPage.bind(_this)); });
    };
    /**
     * Conditionally loads a page into the collection based on directive state and request parameters.
     * @param {?} request
     * @return {?}
     */
    InfiniteScrollDirective.prototype.doRequest = /**
     * Conditionally loads a page into the collection based on directive state and request parameters.
     * @param {?} request
     * @return {?}
     */
    function (request) {
        var _this = this;
        // Load a new page if the scroll position is beyond the threshhold and if the client code did not
        // cancel.
        if (this.needsData(request) && this.beginLoading(request)) {
            // Invoke the callback load function, which returns a promose or plain data.
            var /** @type {?} */ loadResult = this.load(request.pageNumber, request.pageSize, request.filter);
            var /** @type {?} */ observable = Array.isArray(loadResult) ? of(loadResult) : from(loadResult);
            var /** @type {?} */ subscription_1 = observable.pipe(first()).subscribe(function (items) {
                // Make sure that the parameters have not changed since the load started;
                // otherwise discard the results.
                if (request.filter === _this.filter && request.pageSize === _this.pageSize) {
                    if (items && items.length) {
                        _this.setPageItems(request.pageNumber, items);
                    }
                    // Emit the loaded event
                    // Emit the loaded event
                    _this.endLoading(request, items);
                }
            }, function (reason) {
                // Emit the loadError event
                // Emit the loadError event
                _this.endLoadingWithError(request, reason);
            }, function () {
                // remove this request from the list
                // remove this request from the list
                _this._subscriptions = _this._subscriptions.filter(function (s) { return s !== subscription_1; });
            });
            // add the subscription to the list of requests
            this._subscriptions.push(subscription_1);
        }
    };
    /**
     * Returns true if the request should be fulfilled.
     * @param {?} request
     * @return {?}
     */
    InfiniteScrollDirective.prototype.needsData = /**
     * Returns true if the request should be fulfilled.
     * @param {?} request
     * @return {?}
     */
    function (request) {
        if (!this.enabled) {
            return false;
        }
        // Always load for a load request
        if (!request.check) {
            return true;
        }
        // Ignore a check request when the end of data has been detected, or if data is currently loading.
        if (this._isExhausted.getValue() || this._isLoading.getValue()) {
            return false;
        }
        // Load if the remaining scroll area is <= the element height.
        if (this._scrollElement && this.loadOnScroll) {
            var /** @type {?} */ element = /** @type {?} */ (this._scrollElement.nativeElement);
            var /** @type {?} */ remainingScroll = element.scrollHeight -
                (element.scrollTop + element.clientHeight);
            return remainingScroll <= element.clientHeight;
        }
        return false;
    };
    /**
     * Updates state for the beginning of a load. Returns false if the `loading` event was cancelled.
     * @param {?} request
     * @return {?}
     */
    InfiniteScrollDirective.prototype.beginLoading = /**
     * Updates state for the beginning of a load. Returns false if the `loading` event was cancelled.
     * @param {?} request
     * @return {?}
     */
    function (request) {
        var /** @type {?} */ event = new InfiniteScrollLoadingEvent(request.pageNumber, request.pageSize, request.filter);
        this.loadingEvent.emit(event);
        this._isLoading.next(!event.defaultPrevented());
        return !event.defaultPrevented();
    };
    /**
     * @param {?} pageNum
     * @param {?} items
     * @return {?}
     */
    InfiniteScrollDirective.prototype.setPageItems = /**
     * @param {?} pageNum
     * @param {?} items
     * @return {?}
     */
    function (pageNum, items) {
        this._pages[pageNum] = items;
        this.collection = this._pages.reduce(function (previous, current) { return previous.concat(current); }, []);
    };
    /**
     * Updates state from a successful load. Raises the `loaded` event.
     * @param {?} request
     * @param {?=} data
     * @return {?}
     */
    InfiniteScrollDirective.prototype.endLoading = /**
     * Updates state from a successful load. Raises the `loaded` event.
     * @param {?} request
     * @param {?=} data
     * @return {?}
     */
    function (request, data) {
        this._isLoading.next(false);
        var /** @type {?} */ isExhausted = !!(data && data.length < this.pageSize);
        this._isExhausted.next(isExhausted);
        this.loadedEvent.emit(new InfiniteScrollLoadedEvent(request.pageNumber, request.pageSize, request.filter, data, isExhausted));
        if (!request.reload) {
            this._nextPageNum += 1;
        }
    };
    /**
     * Updates state from a failed load. Raises the `loadError` event.
     * @param {?} request
     * @param {?} error
     * @return {?}
     */
    InfiniteScrollDirective.prototype.endLoadingWithError = /**
     * Updates state from a failed load. Raises the `loadError` event.
     * @param {?} request
     * @param {?} error
     * @return {?}
     */
    function (request, error) {
        this._isLoading.next(false);
        this.loadErrorEvent.emit(new InfiniteScrollLoadErrorEvent(request.pageNumber, request.pageSize, request.filter, error));
    };
    InfiniteScrollDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxInfiniteScroll]',
                    exportAs: 'uxInfiniteScroll'
                },] },
    ];
    /** @nocollapse */
    InfiniteScrollDirective.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    InfiniteScrollDirective.propDecorators = {
        "load": [{ type: Input, args: ['uxInfiniteScroll',] },],
        "_collection": [{ type: Input, args: ['collection',] },],
        "scrollElement": [{ type: Input },],
        "enabled": [{ type: Input },],
        "filter": [{ type: Input },],
        "loadOnInit": [{ type: Input },],
        "loadOnScroll": [{ type: Input },],
        "pageSize": [{ type: Input },],
        "collectionChange": [{ type: Output },],
        "loadingEvent": [{ type: Output, args: ['loading',] },],
        "loadedEvent": [{ type: Output, args: ['loaded',] },],
        "loadErrorEvent": [{ type: Output, args: ['loadError',] },],
        "_loadButtonQuery": [{ type: ContentChildren, args: [InfiniteScrollLoadButtonDirective,] },],
        "_loadingIndicatorQuery": [{ type: ContentChildren, args: [InfiniteScrollLoadingDirective,] },],
    };
    return InfiniteScrollDirective;
}());
/**
 * Event raised before the `loading` function is called.
 */
var  /**
 * Event raised before the `loading` function is called.
 */
InfiniteScrollLoadingEvent = (function () {
    function InfiniteScrollLoadingEvent(pageNumber, pageSize, filter$$1) {
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
        this.filter = filter$$1;
        this._defaultPrevented = false;
    }
    /**
     * Prevents the default behaviour of the `loading` event (loading function will not be called).
     */
    /**
     * Prevents the default behaviour of the `loading` event (loading function will not be called).
     * @return {?}
     */
    InfiniteScrollLoadingEvent.prototype.preventDefault = /**
     * Prevents the default behaviour of the `loading` event (loading function will not be called).
     * @return {?}
     */
    function () {
        this._defaultPrevented = true;
    };
    /**
     * @return {?}
     */
    InfiniteScrollLoadingEvent.prototype.defaultPrevented = /**
     * @return {?}
     */
    function () {
        return this._defaultPrevented;
    };
    return InfiniteScrollLoadingEvent;
}());
/**
 * Event raised when the loading function result has been resolved and added to the collection.
 */
var  /**
 * Event raised when the loading function result has been resolved and added to the collection.
 */
InfiniteScrollLoadedEvent = (function () {
    function InfiniteScrollLoadedEvent(pageNumber, pageSize, filter$$1, data, exhausted) {
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
        this.filter = filter$$1;
        this.data = data;
        this.exhausted = exhausted;
    }
    return InfiniteScrollLoadedEvent;
}());
/**
 * Event raised if the loading function returns a rejected promise.
 */
var  /**
 * Event raised if the loading function returns a rejected promise.
 */
InfiniteScrollLoadErrorEvent = (function () {
    function InfiniteScrollLoadErrorEvent(pageNumber, pageSize, filter$$1, error) {
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
        this.filter = filter$$1;
        this.error = error;
    }
    return InfiniteScrollLoadErrorEvent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var InfiniteScrollModule = (function () {
    function InfiniteScrollModule() {
    }
    InfiniteScrollModule.decorators = [
        { type: NgModule, args: [{
                    imports: [],
                    exports: [
                        InfiniteScrollDirective,
                        InfiniteScrollLoadButtonDirective,
                        InfiniteScrollLoadingDirective
                    ],
                    declarations: [
                        InfiniteScrollDirective,
                        InfiniteScrollLoadButtonDirective,
                        InfiniteScrollLoadingDirective
                    ],
                    providers: [],
                },] },
    ];
    return InfiniteScrollModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ScrollIntoViewService = (function () {
    function ScrollIntoViewService() {
    }
    /**
     * @param {?} elem
     * @param {?} scrollParent
     * @return {?}
     */
    ScrollIntoViewService.prototype.scrollIntoView = /**
     * @param {?} elem
     * @param {?} scrollParent
     * @return {?}
     */
    function (elem, scrollParent) {
        var /** @type {?} */ offsetTop = (elem.getBoundingClientRect().top + scrollParent.scrollTop) - scrollParent.getBoundingClientRect().top;
        if (offsetTop < scrollParent.scrollTop) {
            scrollParent.scrollTop = offsetTop;
        }
        else {
            var /** @type {?} */ offsetBottom = offsetTop + elem.offsetHeight;
            if (offsetBottom > (scrollParent.scrollTop + scrollParent.clientHeight)) {
                scrollParent.scrollTop = offsetBottom - scrollParent.clientHeight;
            }
        }
    };
    ScrollIntoViewService.decorators = [
        { type: Injectable },
    ];
    return ScrollIntoViewService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ScrollIntoViewIfDirective = (function () {
    function ScrollIntoViewIfDirective(_element, _scrollIntoViewService) {
        this._element = _element;
        this._scrollIntoViewService = _scrollIntoViewService;
        this.condition = false;
    }
    /**
     * @return {?}
     */
    ScrollIntoViewIfDirective.prototype.ngOnChanges = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.condition) {
            setTimeout(function () { return _this._scrollIntoViewService.scrollIntoView(_this._element.nativeElement, _this.scrollParent); });
        }
    };
    ScrollIntoViewIfDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxScrollIntoViewIf]',
                    providers: [ScrollIntoViewService]
                },] },
    ];
    /** @nocollapse */
    ScrollIntoViewIfDirective.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: ScrollIntoViewService, },
    ]; };
    ScrollIntoViewIfDirective.propDecorators = {
        "condition": [{ type: Input, args: ['uxScrollIntoViewIf',] },],
        "scrollParent": [{ type: Input },],
    };
    return ScrollIntoViewIfDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ScrollIntoViewDirective = (function () {
    function ScrollIntoViewDirective(_elementRef) {
        this._elementRef = _elementRef;
        /**
         * Allow a condition around whether or not this should scroll into view
         */
        this.uxScrollIntoView = true;
        /**
         * Allow user to provide the browser supported options
         */
        this.scrollIntoViewOptions = true;
    }
    /**
     * @return {?}
     */
    ScrollIntoViewDirective.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        if (this.uxScrollIntoView) {
            this._elementRef.nativeElement.scrollIntoView(this.scrollIntoViewOptions);
        }
    };
    ScrollIntoViewDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxScrollIntoView]'
                },] },
    ];
    /** @nocollapse */
    ScrollIntoViewDirective.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    ScrollIntoViewDirective.propDecorators = {
        "uxScrollIntoView": [{ type: Input },],
        "scrollIntoViewOptions": [{ type: Input },],
    };
    return ScrollIntoViewDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ScrollModule = (function () {
    function ScrollModule() {
    }
    ScrollModule.decorators = [
        { type: NgModule, args: [{
                    exports: [ScrollIntoViewIfDirective, ScrollIntoViewDirective],
                    declarations: [ScrollIntoViewIfDirective, ScrollIntoViewDirective]
                },] },
    ];
    return ScrollModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var TypeaheadHighlightDirective = (function () {
    function TypeaheadHighlightDirective(_service, _elementRef) {
        this._service = _service;
        this._elementRef = _elementRef;
    }
    Object.defineProperty(TypeaheadHighlightDirective.prototype, "highlight", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value) {
                this._service.highlightedElement$.next(this._elementRef.nativeElement);
            }
        },
        enumerable: true,
        configurable: true
    });
    TypeaheadHighlightDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxTypeaheadHighlight]'
                },] },
    ];
    /** @nocollapse */
    TypeaheadHighlightDirective.ctorParameters = function () { return [
        { type: TypeaheadService, },
        { type: ElementRef, },
    ]; };
    TypeaheadHighlightDirective.propDecorators = {
        "highlight": [{ type: Input, args: ['uxTypeaheadHighlight',] },],
    };
    return TypeaheadHighlightDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var TypeaheadModule$1 = (function () {
    function TypeaheadModule$$1() {
    }
    TypeaheadModule$$1.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        InfiniteScrollModule,
                        ScrollModule
                    ],
                    exports: [TypeaheadComponent],
                    declarations: [TypeaheadComponent, TypeaheadHighlightDirective],
                    providers: [TypeaheadKeyService],
                },] },
    ];
    return TypeaheadModule$$1;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ uniqueId$1 = 0;
var /** @type {?} */ SELECT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return SelectComponent; }),
    multi: true
};
var SelectComponent = (function () {
    function SelectComponent(_element, _document, _typeaheadKeyService) {
        this._element = _element;
        this._document = _document;
        this._typeaheadKeyService = _typeaheadKeyService;
        this.id = "ux-select-" + ++uniqueId$1;
        this.allowNull = false;
        this.disabled = false;
        this.dropDirection = 'down';
        this.maxHeight = '250px';
        this.multiple = false;
        this.pageSize = 20;
        this.valueChange = new EventEmitter();
        this.inputChange = new EventEmitter();
        this.dropdownOpenChange = new EventEmitter();
        this.propagateChange = function (_) { };
        this._input$ = new BehaviorSubject('');
        this._dropdownOpen = false;
        this._subscription = new Subscription();
    }
    Object.defineProperty(SelectComponent.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () {
            return this._value;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._value = value;
            this.valueChange.emit(value);
            this.propagateChange(value);
            // if we are not allow multiple selection update the input value (supporting ngModel)
            if (!this.multiple && value !== null) {
                this.input = this.getDisplay(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectComponent.prototype, "input", {
        get: /**
         * @return {?}
         */
        function () {
            return this._input$.value;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._input$.next(value);
            this.inputChange.emit(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectComponent.prototype, "dropdownOpen", {
        get: /**
         * @return {?}
         */
        function () {
            return this._dropdownOpen;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._dropdownOpen = value;
            this.dropdownOpenChange.emit(value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    SelectComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // Changes to the input field
        var /** @type {?} */ onInput = this._input$.pipe(filter(function (value) { return _this.allowNull; }), filter(function (value) { return !_this.multiple && value !== _this.getDisplay(_this.value); })).subscribe(function (value) { return _this.value = null; });
        // Set up filter from input
        this.filter$ = this._input$.pipe(map(function (input) { return !_this.multiple && input === _this.getDisplay(_this.value) ? '' : input; }), debounceTime(200));
        // Open the dropdown when filter is nonempty.
        var /** @type {?} */ onFilter = this.filter$.pipe(filter(function (value) { return value && value.length > 0; })).subscribe(function () { return _this.dropdownOpen = true; });
        // store the subscriptions
        this._subscription.add(onInput);
        this._subscription.add(onFilter);
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    SelectComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes["multiple"] && !changes["multiple"].firstChange && changes["multiple"].currentValue !== changes["multiple"].previousValue) {
            this.input = '';
        }
    };
    /**
     * @return {?}
     */
    SelectComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._subscription.unsubscribe();
    };
    /**
     * @param {?} obj
     * @return {?}
     */
    SelectComponent.prototype.writeValue = /**
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        if (obj !== undefined && obj !== this._value) {
            this.value = obj;
        }
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    SelectComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.propagateChange = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    SelectComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    SelectComponent.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SelectComponent.prototype.inputClickHandler = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.selectInputText();
        this.dropdownOpen = true;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SelectComponent.prototype.inputBlurHandler = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        // If a click on the typeahead is in progress, just refocus the input.
        // This works around an issue in IE where clicking a scrollbar drops focus.
        if (this.singleTypeahead && this.singleTypeahead.clicking) {
            this.singleInput.nativeElement.focus();
            return;
        }
        // Close dropdown and reset text input if focus is lost
        setTimeout(function () {
            if (!_this._element.nativeElement.contains(_this._document.activeElement)) {
                _this.dropdownOpen = false;
                if (!_this.multiple) {
                    _this.input = _this.getDisplay(_this.value);
                }
            }
        }, 200);
    };
    /**
     * Key handler for single select only. Multiple select key handling is in TagInputComponent.
     */
    /**
     * Key handler for single select only. Multiple select key handling is in TagInputComponent.
     * @param {?} event
     * @return {?}
     */
    SelectComponent.prototype.inputKeyHandler = /**
     * Key handler for single select only. Multiple select key handling is in TagInputComponent.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // Standard keys for typeahead (up/down/esc)
        this._typeaheadKeyService.handleKey(event, this.singleTypeahead);
        switch (event.key) {
            case 'Enter':
                if (this._dropdownOpen) {
                    // Set the highlighted option as the value and close
                    this.value = this.singleTypeahead.highlighted;
                    this.dropdownOpen = false;
                }
                // Update the input field. If dropdown isn't open then reset it to the previous value.
                this.input = this.getDisplay(this.value);
                event.preventDefault();
                break;
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SelectComponent.prototype.singleOptionSelected = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event.option) {
            this.value = event.option;
            this.dropdownOpen = false;
        }
    };
    /**
     * Returns the display value of the given option.
     */
    /**
     * Returns the display value of the given option.
     * @param {?} option
     * @return {?}
     */
    SelectComponent.prototype.getDisplay = /**
     * Returns the display value of the given option.
     * @param {?} option
     * @return {?}
     */
    function (option) {
        if (option === null || option === undefined) {
            return '';
        }
        if (typeof this.display === 'function') {
            return this.display(option);
        }
        if (typeof this.display === 'string' && option.hasOwnProperty(this.display)) {
            return option[/** @type {?} */ (this.display)];
        }
        return option;
    };
    /**
     * @return {?}
     */
    SelectComponent.prototype.selectInputText = /**
     * @return {?}
     */
    function () {
        this.singleInput.nativeElement.select();
    };
    SelectComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-select',
                    template: "<ux-tag-input *ngIf=\"multiple\"\n    [id]=\"id + '-input'\"\n    [(tags)]=\"value\"\n    [(input)]=\"input\"\n    [addOnPaste]=\"false\"\n    [disabled]=\"disabled\"\n    [display]=\"display\"\n    [freeInput]=\"false\"\n    [placeholder]=\"placeholder\"\n    [showTypeaheadOnClick]=\"true\">\n\n    <ux-typeahead #multipleTypeahead\n        [id]=\"id + '-typeahead'\"\n        [options]=\"options\"\n        [filter]=\"filter$ | async\"\n        [(open)]=\"dropdownOpen\"\n        [display]=\"display\"\n        [key]=\"key\"\n        [disabledOptions]=\"value\"\n        [dropDirection]=\"dropDirection\"\n        [maxHeight]=\"maxHeight\"\n        [multiselectable]=\"true\"\n        [pageSize]=\"pageSize\"\n        [selectFirst]=\"true\"\n        [loadingTemplate]=\"loadingTemplate\"\n        [optionTemplate]=\"optionTemplate\"\n        [noOptionsTemplate]=\"noOptionsTemplate\">\n    </ux-typeahead>\n\n</ux-tag-input>\n\n<div *ngIf=\"!multiple\"\n    class=\"inner-addon right-addon\"\n    [class.disabled]=\"disabled\"\n    role=\"combobox\"\n    [attr.aria-expanded]=\"dropdownOpen\"\n    aria-haspopup=\"listbox\">\n\n    <i class=\"hpe-icon\"\n        [class.hpe-down]=\"dropDirection === 'down'\"\n        [class.hpe-up]=\"dropDirection === 'up'\"></i>\n\n    <input #singleInput type=\"text\" [attr.id]=\"id + '-input'\" class=\"form-control\"\n        [attr.aria-activedescendant]=\"highlightedElement?.id\"\n        aria-autocomplete=\"list\"\n        [attr.aria-controls]=\"singleTypeahead.id\"\n        aria-multiline=\"false\"\n        [(ngModel)]=\"input\"\n        [placeholder]=\"placeholder\"\n        [disabled]=\"disabled\"\n        (click)=\"inputClickHandler($event)\"\n        (blur)=\"inputBlurHandler($event)\"\n        (keydown)=\"inputKeyHandler($event)\">\n\n    <ux-typeahead #singleTypeahead\n        [id]=\"id + '-typeahead'\"\n        [options]=\"options\"\n        [filter]=\"filter$ | async\"\n        [(open)]=\"dropdownOpen\"\n        [display]=\"display\"\n        [key]=\"key\"\n        [dropDirection]=\"dropDirection\"\n        [maxHeight]=\"maxHeight\"\n        [multiselectable]=\"false\"\n        [openOnFilterChange]=\"false\"\n        [pageSize]=\"pageSize\"\n        [selectFirst]=\"true\"\n        [loadingTemplate]=\"loadingTemplate\"\n        [optionTemplate]=\"optionTemplate\"\n        [noOptionsTemplate]=\"noOptionsTemplate\"\n        (optionSelected)=\"singleOptionSelected($event)\"\n        (highlightedElementChange)=\"highlightedElement = $event\">\n    </ux-typeahead>\n\n</div>\n",
                    providers: [SELECT_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    SelectComponent.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
        { type: TypeaheadKeyService, },
    ]; };
    SelectComponent.propDecorators = {
        "id": [{ type: Input }, { type: HostBinding, args: ['attr.id',] },],
        "value": [{ type: Input },],
        "input": [{ type: Input },],
        "dropdownOpen": [{ type: Input },],
        "options": [{ type: Input },],
        "display": [{ type: Input },],
        "key": [{ type: Input },],
        "allowNull": [{ type: Input },],
        "disabled": [{ type: Input },],
        "dropDirection": [{ type: Input },],
        "maxHeight": [{ type: Input },],
        "multiple": [{ type: Input },],
        "pageSize": [{ type: Input },],
        "placeholder": [{ type: Input },],
        "loadingTemplate": [{ type: Input },],
        "noOptionsTemplate": [{ type: Input },],
        "optionTemplate": [{ type: Input },],
        "valueChange": [{ type: Output },],
        "inputChange": [{ type: Output },],
        "dropdownOpenChange": [{ type: Output },],
        "singleInput": [{ type: ViewChild, args: ['singleInput',] },],
        "multipleTypeahead": [{ type: ViewChild, args: ['multipleTypeahead',] },],
        "singleTypeahead": [{ type: ViewChild, args: ['singleTypeahead',] },],
    };
    return SelectComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var TagInputEvent = (function () {
    function TagInputEvent(tag) {
        this.tag = tag;
        this._defaultPrevented = false;
    }
    /**
     * @return {?}
     */
    TagInputEvent.prototype.preventDefault = /**
     * @return {?}
     */
    function () {
        this._defaultPrevented = true;
    };
    /**
     * @return {?}
     */
    TagInputEvent.prototype.defaultPrevented = /**
     * @return {?}
     */
    function () {
        return this._defaultPrevented;
    };
    return TagInputEvent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ uniqueId$2 = 0;
var /** @type {?} */ TAGINPUT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return TagInputComponent; }),
    multi: true
};
var /** @type {?} */ TAGINPUT_VALIDATOR = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(function () { return TagInputComponent; }),
    multi: true
};
var TagInputComponent = (function () {
    function TagInputComponent(_element, _document, _typeaheadKeyService) {
        this._element = _element;
        this._document = _document;
        this._typeaheadKeyService = _typeaheadKeyService;
        this.id = "ux-tag-input-" + ++uniqueId$2;
        this.tagsChange = new EventEmitter();
        this.inputChange = new EventEmitter();
        this.addOnPaste = true;
        this.disabled = false;
        this.enforceTagLimits = false;
        this.freeInput = true;
        this.maxTags = Number.MAX_VALUE;
        this.minTags = 0;
        this.placeholder = '';
        this.showTypeaheadOnClick = false;
        this.tagDelimiters = '';
        this.tagClass = function () { return undefined; };
        this.validationErrors = {};
        this.tagAdding = new EventEmitter();
        this.tagAdded = new EventEmitter();
        this.tagInvalidated = new EventEmitter();
        this.tagRemoving = new EventEmitter();
        this.tagRemoved = new EventEmitter();
        this.tagClick = new EventEmitter();
        this.selectedIndex = -1;
        this.tagApi = {
            getTagDisplay: this.getTagDisplay.bind(this),
            removeTagAt: this.removeTagAt.bind(this),
            canRemoveTagAt: this.canRemoveTagAt.bind(this)
        };
        this.valid = true;
        this.inputValid = true;
        this._input = '';
        this._tags = [];
        this._onChangeHandler = function () { };
        this._onTouchedHandler = function () { };
    }
    Object.defineProperty(TagInputComponent.prototype, "tags", {
        get: /**
         * @return {?}
         */
        function () {
            if (!this._tags) {
                this._tags = [];
            }
            return this._tags;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._tags = value;
            this._onChangeHandler(this._tags);
            this.tagsChange.emit(this._tags);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TagInputComponent.prototype, "input", {
        get: /**
         * @return {?}
         */
        function () {
            return this._input;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._input = value;
            this.inputChange.emit(value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    TagInputComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (!this.tagTemplate) {
            this.tagTemplate = this._defaultTagTemplate;
        }
    };
    /**
     * @return {?}
     */
    TagInputComponent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // Watch for optional child typeahead control
        this.connectTypeahead(this.typeaheadQuery.first);
        this.typeaheadQuery.changes.subscribe(function (query$$1) {
            _this.connectTypeahead(query$$1.first);
        });
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    TagInputComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes["disabled"]) {
            if (changes["disabled"].currentValue) {
                // Clear selection and close dropdown
                this.selectedIndex = -1;
                if (this.typeahead) {
                    this.typeahead.open = false;
                }
            }
        }
        // Update validation status
        this.validate();
    };
    /**
     * @param {?} value
     * @return {?}
     */
    TagInputComponent.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (value) {
            this.tags = value;
        }
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    TagInputComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this._onChangeHandler = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    TagInputComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this._onTouchedHandler = fn;
    };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    TagInputComponent.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
    };
    /**
     * @return {?}
     */
    TagInputComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this._typeaheadSubscription) {
            this._typeaheadSubscription.unsubscribe();
        }
    };
    /**
     * Validate the value of the control (tags property).
     */
    /**
     * Validate the value of the control (tags property).
     * @return {?}
     */
    TagInputComponent.prototype.validate = /**
     * Validate the value of the control (tags property).
     * @return {?}
     */
    function () {
        this.valid = true;
        var /** @type {?} */ tagRangeError = null;
        if (this.tags && (this.tags.length < this.minTags || this.tags.length > this.maxTags)) {
            tagRangeError = {
                given: this.tags.length,
                min: this.minTags,
                max: this.maxTags
            };
            this.valid = false;
        }
        this.validationErrors['tagRangeError'] = tagRangeError;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    TagInputComponent.prototype.keyHandler = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.disabled) {
            return;
        }
        // Get the input field cursor location
        var /** @type {?} */ inputCursorPos = this.tagInput.nativeElement.selectionStart;
        // Determine if the input field has any text selected
        var /** @type {?} */ hasSelection = this.tagInput.nativeElement.selectionStart !== this.tagInput.nativeElement.selectionEnd;
        // Determine if a tag has focus
        var /** @type {?} */ tagSelected = this.isValidTagIndex(this.selectedIndex);
        var /** @type {?} */ inputLength = this.input ? this.input.length : 0;
        // Check whether the arrow keys can move the selection. Otherwise the input field takes the event.
        var /** @type {?} */ canNavigateLeft = tagSelected || (inputCursorPos <= 0 && !hasSelection);
        var /** @type {?} */ canNavigateRight = tagSelected || (inputCursorPos >= inputLength && !hasSelection);
        // Forward key events to the typeahead component.
        this._typeaheadKeyService.handleKey(event, this.typeahead);
        switch (event.key) {
            case 'Enter':
                // Check if a typeahead option is highlighted
                if (this.typeahead && this.typeahead.open && this.typeahead.highlighted) {
                    // Add the typeahead option as a tag, clear the input, and close the dropdown
                    this.commitTypeahead(this.typeahead.highlighted);
                    this.typeahead.open = false;
                }
                else {
                    // Validate and add the input text as a tag, if possible
                    this.commitInput();
                }
                event.preventDefault();
                break;
            case 'Backspace':
                if (canNavigateLeft) {
                    this.backspace();
                    event.stopPropagation();
                    event.preventDefault();
                }
                break;
            case 'Delete':
            case 'Del':
                if (tagSelected) {
                    this.removeTagAt(this.selectedIndex);
                }
                break;
            case 'ArrowLeft':
            case 'Left':
                if (canNavigateLeft) {
                    this.moveSelection(-1);
                    event.preventDefault();
                }
                break;
            case 'ArrowRight':
            case 'Right':
                if (canNavigateRight) {
                    this.moveSelection(1);
                    event.preventDefault();
                }
                break;
        }
        // Check for keys in the tagDelimiters
        if (this.tagDelimiters && this.tagDelimiters.indexOf(this.getKeyChar(event)) >= 0) {
            // Commit previous text
            this.commitInput();
            event.stopPropagation();
            event.preventDefault();
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    TagInputComponent.prototype.focusOutHandler = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        // If a click on the typeahead is in progress, don't do anything.
        // This works around an issue in IE where clicking a scrollbar drops focus.
        if (this.typeahead && this.typeahead.clicking) {
            return;
        }
        // Close the dropdown on blur
        setTimeout(function () {
            if (!_this._element.nativeElement.contains(_this._document.activeElement)) {
                _this.selectedIndex = -1;
                if (_this.typeahead) {
                    _this.typeahead.open = false;
                }
            }
        }, 200);
    };
    /**
     * @param {?} event
     * @param {?} tag
     * @param {?} index
     * @return {?}
     */
    TagInputComponent.prototype.tagClickHandler = /**
     * @param {?} event
     * @param {?} tag
     * @param {?} index
     * @return {?}
     */
    function (event, tag, index) {
        if (this.disabled) {
            return;
        }
        // Send tagClick event
        var /** @type {?} */ tagClickEvent = new TagInputEvent(tag);
        this.tagClick.emit(tagClickEvent);
        // Prevent focus if preventDefault() was called
        if (tagClickEvent.defaultPrevented()) {
            event.preventDefault();
            return;
        }
        // Select the tag (for IE that doesn't propagate focus)
        this.selectTagAt(index);
    };
    /**
     * @return {?}
     */
    TagInputComponent.prototype.inputClickHandler = /**
     * @return {?}
     */
    function () {
        if (this.disabled) {
            return;
        }
        if (this.typeahead && this.showTypeaheadOnClick) {
            this.typeahead.open = true;
        }
    };
    /**
     * @return {?}
     */
    TagInputComponent.prototype.inputFocusHandler = /**
     * @return {?}
     */
    function () {
        if (this.disabled) {
            return;
        }
        this.selectInput();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    TagInputComponent.prototype.inputPasteHandler = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.disabled) {
            return;
        }
        if (this.addOnPaste) {
            // Get text from the clipboard
            var /** @type {?} */ input = null;
            if (event.clipboardData) {
                input = event.clipboardData.getData('text/plain');
            }
            else if ((/** @type {?} */ (window)).clipboardData) {
                // Internet Explorer only
                input = (/** @type {?} */ (window)).clipboardData.getData('Text');
            }
            // Commit the clipboard text directly
            if (this.commit(input)) {
                this.selectInput();
                event.stopPropagation();
                event.preventDefault();
            }
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    TagInputComponent.prototype.typeaheadOptionSelectedHandler = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.disabled) {
            return;
        }
        // When the typeahead sends the optionSelected event, commit the object directly
        this.commitTypeahead(event.option);
    };
    /**
     * Commit the current input value and clear the input field if successful.
     */
    /**
     * Commit the current input value and clear the input field if successful.
     * @return {?}
     */
    TagInputComponent.prototype.commitInput = /**
     * Commit the current input value and clear the input field if successful.
     * @return {?}
     */
    function () {
        if (this.commit(this.input)) {
            this.selectInput();
            this.input = '';
        }
    };
    /**
     * Commit the given tag object and clear the input if successful.
     */
    /**
     * Commit the given tag object and clear the input if successful.
     * @param {?} tag
     * @return {?}
     */
    TagInputComponent.prototype.commitTypeahead = /**
     * Commit the given tag object and clear the input if successful.
     * @param {?} tag
     * @return {?}
     */
    function (tag) {
        if (this.addTag(tag)) {
            this.selectInput();
            this.input = '';
        }
    };
    /**
     * Commit the given string value as one or more tags, if validation passes. Returns true if the tag(s) were created.
     */
    /**
     * Commit the given string value as one or more tags, if validation passes. Returns true if the tag(s) were created.
     * @param {?} input
     * @return {?}
     */
    TagInputComponent.prototype.commit = /**
     * Commit the given string value as one or more tags, if validation passes. Returns true if the tag(s) were created.
     * @param {?} input
     * @return {?}
     */
    function (input) {
        if (input && this.freeInput) {
            // Split the tags by the tagDelimiters if configured
            var /** @type {?} */ newTags = this.splitTagInput(input);
            // Check tag validation for all of the individual values
            var /** @type {?} */ allValid = true;
            try {
                for (var newTags_1 = __values(newTags), newTags_1_1 = newTags_1.next(); !newTags_1_1.done; newTags_1_1 = newTags_1.next()) {
                    var newTag = newTags_1_1.value;
                    var /** @type {?} */ valid = this.validateTag(newTag);
                    if (!valid) {
                        allValid = false;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (newTags_1_1 && !newTags_1_1.done && (_a = newTags_1.return)) _a.call(newTags_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            // Add the tags if all are valid
            if (allValid) {
                try {
                    for (var newTags_2 = __values(newTags), newTags_2_1 = newTags_2.next(); !newTags_2_1.done; newTags_2_1 = newTags_2.next()) {
                        var newTag = newTags_2_1.value;
                        this.addTag(this.createTag(newTag));
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (newTags_2_1 && !newTags_2_1.done && (_b = newTags_2.return)) _b.call(newTags_2);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                return true;
            }
        }
        return false;
        var e_1, _a, e_2, _b;
    };
    /**
     * If no tag is selected, select the rightmost tag. If a tag is selected, remove it.
     */
    /**
     * If no tag is selected, select the rightmost tag. If a tag is selected, remove it.
     * @return {?}
     */
    TagInputComponent.prototype.backspace = /**
     * If no tag is selected, select the rightmost tag. If a tag is selected, remove it.
     * @return {?}
     */
    function () {
        if (this.disabled) {
            return;
        }
        if (!this.isValidTagIndex(this.selectedIndex)) {
            this.selectTagAt(this.tags.length - 1);
        }
        else {
            this.removeTagAt(this.selectedIndex);
        }
    };
    /**
     * Move the highlighted option forwards or backwards in the list. Wraps at the limits.
     * @param d Value to be added to the selected index, i.e. -1 to move backwards, +1 to move forwards.
     */
    /**
     * Move the highlighted option forwards or backwards in the list. Wraps at the limits.
     * @param {?} d Value to be added to the selected index, i.e. -1 to move backwards, +1 to move forwards.
     * @return {?}
     */
    TagInputComponent.prototype.moveSelection = /**
     * Move the highlighted option forwards or backwards in the list. Wraps at the limits.
     * @param {?} d Value to be added to the selected index, i.e. -1 to move backwards, +1 to move forwards.
     * @return {?}
     */
    function (d) {
        if (this.disabled) {
            return;
        }
        if (this.isValidSelectIndex(this.selectedIndex)) {
            this.selectedIndex += d;
            // Do wrapping of selection when out of bounds
            if (this.selectedIndex < 0) {
                this.selectedIndex = this.tags.length;
            }
            else if (this.selectedIndex > this.tags.length) {
                this.selectedIndex = 0;
            }
        }
    };
    /**
     * Returns a value to display for the given tag. Uses display function/property name if set, otherwise assumes that the tag is a simple string.
     */
    /**
     * Returns a value to display for the given tag. Uses display function/property name if set, otherwise assumes that the tag is a simple string.
     * @param {?} tag
     * @return {?}
     */
    TagInputComponent.prototype.getTagDisplay = /**
     * Returns a value to display for the given tag. Uses display function/property name if set, otherwise assumes that the tag is a simple string.
     * @param {?} tag
     * @return {?}
     */
    function (tag) {
        if (typeof this.display === 'function') {
            return this.display(tag);
        }
        if (typeof this.display === 'string') {
            return tag[/** @type {?} */ (this.display)];
        }
        return tag;
    };
    /**
     * Returns true if the given index is selected (tag index or input field).
     */
    /**
     * Returns true if the given index is selected (tag index or input field).
     * @param {?} index
     * @return {?}
     */
    TagInputComponent.prototype.isSelected = /**
     * Returns true if the given index is selected (tag index or input field).
     * @param {?} index
     * @return {?}
     */
    function (index) {
        return index === this.selectedIndex;
    };
    /**
     * Select the tag at the given index. Does nothing if disabled is true.
     */
    /**
     * Select the tag at the given index. Does nothing if disabled is true.
     * @param {?} tagIndex
     * @return {?}
     */
    TagInputComponent.prototype.selectTagAt = /**
     * Select the tag at the given index. Does nothing if disabled is true.
     * @param {?} tagIndex
     * @return {?}
     */
    function (tagIndex) {
        if (this.disabled) {
            return;
        }
        if (this.isValidTagIndex(tagIndex)) {
            this.selectedIndex = tagIndex;
        }
    };
    /**
     * Select the input field, giving it focus. Does nothing if disabled is true.
     */
    /**
     * Select the input field, giving it focus. Does nothing if disabled is true.
     * @return {?}
     */
    TagInputComponent.prototype.selectInput = /**
     * Select the input field, giving it focus. Does nothing if disabled is true.
     * @return {?}
     */
    function () {
        if (this.disabled) {
            return;
        }
        this.selectedIndex = this.tags.length;
    };
    /**
     * Remove the tag at the given index. Does nothing if disabled is true or the minTags property prevents removal.
     */
    /**
     * Remove the tag at the given index. Does nothing if disabled is true or the minTags property prevents removal.
     * @param {?} tagIndex
     * @return {?}
     */
    TagInputComponent.prototype.removeTagAt = /**
     * Remove the tag at the given index. Does nothing if disabled is true or the minTags property prevents removal.
     * @param {?} tagIndex
     * @return {?}
     */
    function (tagIndex) {
        if (this.disabled || !this.canRemoveTagAt(tagIndex)) {
            return;
        }
        // Check that the tagIndex is in range
        if (this.isValidTagIndex(tagIndex)) {
            var /** @type {?} */ tag = this.tags[tagIndex];
            var /** @type {?} */ tagRemovingEvent = new TagInputEvent(tag);
            this.tagRemoving.emit(tagRemovingEvent);
            if (!tagRemovingEvent.defaultPrevented()) {
                // Select input first to avoid issues with dropping focus
                this.selectInput();
                // Remove the tag
                this.tags.splice(tagIndex, 1);
                // Set focus again since indices have changed
                this.selectInput();
                this.tagRemoved.emit(new TagInputEvent(tag));
                this.validate();
            }
        }
    };
    /**
     * Returns true if the tag at the given index can be removed.
     */
    /**
     * Returns true if the tag at the given index can be removed.
     * @param {?} tagIndex
     * @return {?}
     */
    TagInputComponent.prototype.canRemoveTagAt = /**
     * Returns true if the tag at the given index can be removed.
     * @param {?} tagIndex
     * @return {?}
     */
    function (tagIndex) {
        return this.tags.length > this.minTags || !this.enforceTagLimits;
    };
    /**
     * Returns true if the input field should be available.
     */
    /**
     * Returns true if the input field should be available.
     * @return {?}
     */
    TagInputComponent.prototype.isInputVisible = /**
     * Returns true if the input field should be available.
     * @return {?}
     */
    function () {
        return this.tags.length < this.maxTags || !this.enforceTagLimits;
    };
    /**
     * Returns true if any part of the control has focus.
     */
    /**
     * Returns true if any part of the control has focus.
     * @return {?}
     */
    TagInputComponent.prototype.hasFocus = /**
     * Returns true if any part of the control has focus.
     * @return {?}
     */
    function () {
        return this.isValidSelectIndex(this.selectedIndex);
    };
    /**
     * @param {?} typeahead
     * @return {?}
     */
    TagInputComponent.prototype.connectTypeahead = /**
     * @param {?} typeahead
     * @return {?}
     */
    function (typeahead) {
        var _this = this;
        if (this._typeaheadSubscription) {
            this._typeaheadSubscription.unsubscribe();
            this._typeaheadSubscription = null;
        }
        this.typeahead = typeahead;
        if (this.typeahead) {
            // Set up event handler for selected options
            this._typeaheadSubscription = this.typeahead.optionSelected.subscribe(this.typeaheadOptionSelectedHandler.bind(this));
            this._typeaheadSubscription.add(this.typeahead.highlightedElementChange.subscribe(function (element) {
                _this.highlightedElement = element;
            }));
        }
    };
    /**
     * Validate the given tagValue with the tagPattern, if set. Update validationErrors on validation failure.
     * @param {?} tagValue
     * @return {?}
     */
    TagInputComponent.prototype.validateTag = /**
     * Validate the given tagValue with the tagPattern, if set. Update validationErrors on validation failure.
     * @param {?} tagValue
     * @return {?}
     */
    function (tagValue) {
        var /** @type {?} */ inputPattern = null;
        this.inputValid = true;
        if (this.tagPattern && !this.tagPattern.test(tagValue)) {
            inputPattern = {
                given: tagValue,
                pattern: this.tagPattern
            };
            this.inputValid = false;
        }
        this.validationErrors['inputPattern'] = inputPattern;
        return this.inputValid;
    };
    /**
     * Create a tag object for the given tagValue. If createTagHandler is specified, use it; otherwise if displayProperty is specified, create an object with the tagValue as the single named property; otherwise return the tagValue itself.
     * @param {?} tagValue
     * @return {?}
     */
    TagInputComponent.prototype.createTag = /**
     * Create a tag object for the given tagValue. If createTagHandler is specified, use it; otherwise if displayProperty is specified, create an object with the tagValue as the single named property; otherwise return the tagValue itself.
     * @param {?} tagValue
     * @return {?}
     */
    function (tagValue) {
        var /** @type {?} */ tag = null;
        if (this.createTagHandler && typeof this.createTagHandler === 'function') {
            tag = this.createTagHandler(tagValue);
        }
        else if (typeof this.display === 'string') {
            tag = {};
            tag[/** @type {?} */ (this.display)] = tagValue;
        }
        else {
            tag = tagValue;
        }
        return tag;
    };
    /**
     * Add a tag object, calling the tagAdding and tagAdded events. Returns true if the tag was added to the tags array.
     * @param {?} tag
     * @return {?}
     */
    TagInputComponent.prototype.addTag = /**
     * Add a tag object, calling the tagAdding and tagAdded events. Returns true if the tag was added to the tags array.
     * @param {?} tag
     * @return {?}
     */
    function (tag) {
        if (tag) {
            // Verify that the new tag can be displayed
            var /** @type {?} */ displayValue = this.getTagDisplay(tag);
            if (displayValue && typeof displayValue === 'string' && displayValue.length > 0) {
                var /** @type {?} */ tagAddingEvent = new TagInputEvent(tag);
                this.tagAdding.emit(tagAddingEvent);
                if (!tagAddingEvent.defaultPrevented()) {
                    this.tags = this.tags || [];
                    this.tags.push(tag);
                    this.tagAdded.emit(new TagInputEvent(tag));
                    this.validate();
                    return true;
                }
            }
        }
        return false;
    };
    /**
     * Returns true if the given tagIndex is a valid tag index.
     * @param {?} tagIndex
     * @return {?}
     */
    TagInputComponent.prototype.isValidTagIndex = /**
     * Returns true if the given tagIndex is a valid tag index.
     * @param {?} tagIndex
     * @return {?}
     */
    function (tagIndex) {
        return tagIndex >= 0 && tagIndex < this.tags.length;
    };
    /**
     * Returns true if the given index is a valid selection index (tags or input field).
     * @param {?} index
     * @return {?}
     */
    TagInputComponent.prototype.isValidSelectIndex = /**
     * Returns true if the given index is a valid selection index (tags or input field).
     * @param {?} index
     * @return {?}
     */
    function (index) {
        return index >= 0 && index <= this.tags.length;
    };
    /**
     * Returns the character corresponding to the given key event, mainly for IE compatibility.
     * @param {?} event
     * @return {?}
     */
    TagInputComponent.prototype.getKeyChar = /**
     * Returns the character corresponding to the given key event, mainly for IE compatibility.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        switch (event.key) {
            case 'Spacebar':
                return ' ';
        }
        return event.key;
    };
    /**
     * Returns an array of strings corresponding to the input string split by the tagDelimiters characters.
     * @param {?} input
     * @return {?}
     */
    TagInputComponent.prototype.splitTagInput = /**
     * Returns an array of strings corresponding to the input string split by the tagDelimiters characters.
     * @param {?} input
     * @return {?}
     */
    function (input) {
        var /** @type {?} */ tagValues = [input];
        if (this.tagDelimiters && typeof this.tagDelimiters === 'string') {
            var /** @type {?} */ escapedDelimiters = this.tagDelimiters.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
            var /** @type {?} */ delimiterRegex = new RegExp("[" + escapedDelimiters + "]", 'g');
            tagValues = input.split(delimiterRegex).filter(function (s) { return s.length > 0; });
        }
        return tagValues;
    };
    TagInputComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-tag-input',
                    template: "<ol [attr.role]=\"typeahead ? 'combobox' : 'none'\" [attr.aria-haspopup]=\"typeahead ? 'listbox' : null\">\n    <li *ngFor=\"let tag of tags; let i = index\" class=\"ux-tag\"\n        [class.disabled]=\"disabled\"\n        [ngClass]=\"tagClass(tag, i, isSelected(i))\"\n        [attr.tabindex]=\"disabled ? null : 0\"\n        [focusIf]=\"isSelected(i)\"\n        (click)=\"tagClickHandler($event, tag, i)\"\n        (focus)=\"selectTagAt(i)\">\n\n        <ng-container [ngTemplateOutlet]=\"tagTemplate\"\n            [ngTemplateOutletContext]=\"{tag: tag, index: i, disabled: disabled, api: tagApi}\">\n        </ng-container>\n\n    </li>\n    <li *ngIf=\"isInputVisible()\" class=\"ux-tag-input\" role=\"none\">\n        <input #tagInput type=\"text\" [attr.id]=\"id\" class=\"ux-tag-input\"\n            [(ngModel)]=\"input\"\n            [class.invalid]=\"!inputValid\"\n            [attr.aria-activedescendant]=\"highlightedElement?.id\"\n            [attr.aria-autocomplete]=\"typeahead ? 'list' : 'none'\"\n            [attr.aria-controls]=\"typeahead?.id\"\n            aria-multiline=\"false\"\n            [placeholder]=\"disabled ? '' : (placeholder || '')\"\n            [disabled]=\"disabled\"\n            [focusIf]=\"isSelected(tags.length)\"\n            (click)=\"inputClickHandler()\"\n            (focus)=\"inputFocusHandler()\"\n            (paste)=\"inputPasteHandler($event)\">\n    </li>\n</ol>\n\n<ng-content #typeahead></ng-content>\n\n<ng-template #defaultTagTemplate let-tag=\"tag\" let-index=\"index\" let-disabled=\"disabled\" let-api=\"api\">\n    <span class=\"ux-tag-text\">{{api.getTagDisplay(tag)}}</span>\n    <button *ngIf=\"api.canRemoveTagAt(index)\"\n        type=\"button\"\n        class=\"ux-tag-remove\"\n        aria-label=\"Remove Item\"\n        [disabled]=\"disabled\"\n        (click)=\"api.removeTagAt(index); $event.stopPropagation();\">\n        <span class=\"hpe-icon hpe-close\"></span>\n    </button>\n</ng-template>",
                    providers: [TAGINPUT_VALUE_ACCESSOR, TAGINPUT_VALIDATOR],
                    host: {
                        '[class.disabled]': 'disabled',
                        '[class.focus]': 'hasFocus()',
                        '[class.invalid]': '!valid || !inputValid'
                    }
                },] },
    ];
    /** @nocollapse */
    TagInputComponent.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
        { type: TypeaheadKeyService, },
    ]; };
    TagInputComponent.propDecorators = {
        "id": [{ type: Input }, { type: HostBinding, args: ['attr.id',] },],
        "tags": [{ type: Input, args: ['tags',] },],
        "tagsChange": [{ type: Output },],
        "input": [{ type: Input, args: ['input',] },],
        "inputChange": [{ type: Output },],
        "display": [{ type: Input },],
        "addOnPaste": [{ type: Input },],
        "disabled": [{ type: Input },],
        "enforceTagLimits": [{ type: Input },],
        "freeInput": [{ type: Input },],
        "maxTags": [{ type: Input },],
        "minTags": [{ type: Input },],
        "placeholder": [{ type: Input },],
        "showTypeaheadOnClick": [{ type: Input },],
        "tagDelimiters": [{ type: Input },],
        "tagPattern": [{ type: Input },],
        "tagTemplate": [{ type: Input },],
        "tagClass": [{ type: Input },],
        "validationErrors": [{ type: Input },],
        "createTagHandler": [{ type: Input, args: ['createTag',] },],
        "tagAdding": [{ type: Output },],
        "tagAdded": [{ type: Output },],
        "tagInvalidated": [{ type: Output },],
        "tagRemoving": [{ type: Output },],
        "tagRemoved": [{ type: Output },],
        "tagClick": [{ type: Output },],
        "typeaheadQuery": [{ type: ContentChildren, args: [TypeaheadComponent,] },],
        "tagInput": [{ type: ViewChild, args: ['tagInput',] },],
        "_defaultTagTemplate": [{ type: ViewChild, args: ['defaultTagTemplate',] },],
        "keyHandler": [{ type: HostListener, args: ['keydown', ['$event'],] },],
        "focusOutHandler": [{ type: HostListener, args: ['focusout', ['$event'],] },],
    };
    return TagInputComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var TagInputModule = (function () {
    function TagInputModule() {
    }
    TagInputModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        FocusIfModule,
                        TypeaheadModule$1
                    ],
                    exports: [TagInputComponent],
                    declarations: [TagInputComponent],
                    providers: [],
                },] },
    ];
    return TagInputModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var SelectModule = (function () {
    function SelectModule() {
    }
    SelectModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        InfiniteScrollModule,
                        TagInputModule,
                        TypeaheadModule$1
                    ],
                    exports: [SelectComponent],
                    declarations: [SelectComponent]
                },] },
    ];
    return SelectModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var SearchBuilderModule = (function () {
    function SearchBuilderModule() {
    }
    SearchBuilderModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        DateTimePickerModule,
                        PopoverModule,
                        SelectModule
                    ],
                    exports: [
                        SearchBuilderComponent,
                        SearchBuilderGroupComponent,
                        BaseSearchComponent
                    ],
                    declarations: [
                        SearchBuilderComponent,
                        SearchBuilderGroupComponent,
                        SearchTextComponent,
                        SearchDateComponent,
                        SearchDateRangeComponent,
                        SearchBuilderOutletDirective,
                        SearchSelectComponent,
                        BaseSearchComponent
                    ],
                    entryComponents: [
                        SearchTextComponent,
                        SearchDateComponent,
                        SearchDateRangeComponent,
                        SearchSelectComponent
                    ]
                },] },
    ];
    return SearchBuilderModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var SidePanelCloseDirective = (function () {
    function SidePanelCloseDirective(_service) {
        this._service = _service;
    }
    /**
     * @return {?}
     */
    SidePanelCloseDirective.prototype.clickHandler = /**
     * @return {?}
     */
    function () {
        this._service.close();
    };
    SidePanelCloseDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxSidePanelClose]'
                },] },
    ];
    /** @nocollapse */
    SidePanelCloseDirective.ctorParameters = function () { return [
        { type: SidePanelService, },
    ]; };
    SidePanelCloseDirective.propDecorators = {
        "clickHandler": [{ type: HostListener, args: ['click',] },],
    };
    return SidePanelCloseDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ EXPORTS$1 = [
    SidePanelComponent,
    SidePanelCloseDirective
];
var SidePanelModule = (function () {
    function SidePanelModule() {
    }
    SidePanelModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule
                    ],
                    exports: EXPORTS$1,
                    declarations: EXPORTS$1
                },] },
    ];
    return SidePanelModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var SliderComponent = (function () {
    function SliderComponent(colorService, _changeDetectorRef) {
        this._changeDetectorRef = _changeDetectorRef;
        this.value = 0;
        this.valueChange = new EventEmitter();
        // expose enums to Angular view
        this.sliderType = SliderType;
        this.sliderStyle = SliderStyle;
        this.sliderSize = SliderSize;
        this.sliderSnap = SliderSnap;
        this.sliderThumb = SliderThumb;
        this.sliderTickType = SliderTickType;
        this.sliderThumbEvent = SliderThumbEvent;
        this.sliderCalloutTrigger = SliderCalloutTrigger;
        this.tracks = {
            lower: {
                size: 0,
                color: ''
            },
            middle: {
                size: 0,
                color: ''
            },
            upper: {
                size: 0,
                color: ''
            }
        };
        this.tooltips = {
            lower: {
                visible: false,
                position: 0,
                label: ''
            },
            upper: {
                visible: false,
                position: 0,
                label: ''
            }
        };
        this.thumbs = {
            lower: {
                hover: false,
                drag: false,
                position: 0,
                order: 100,
                value: /** @type {?} */ (null)
            },
            upper: {
                hover: false,
                drag: false,
                position: 0,
                order: 101,
                value: /** @type {?} */ (null)
            }
        };
        // store all the ticks to display
        this.ticks = [];
        // setup default options
        this.defaultOptions = {
            type: SliderType.Value,
            handles: {
                style: SliderStyle.Button,
                callout: {
                    trigger: SliderCalloutTrigger.None,
                    background: colorService.getColor('grey2').toHex(),
                    color: '#fff',
                    formatter: function (value) { return value; }
                },
                keyboard: {
                    major: 5,
                    minor: 1
                },
                aria: {
                    thumb: 'Slider value',
                    lowerThumb: 'Slider lower value',
                    upperThumb: 'Slider upper value'
                }
            },
            track: {
                height: SliderSize.Wide,
                min: 0,
                max: 100,
                ticks: {
                    snap: SliderSnap.None,
                    major: {
                        show: true,
                        steps: 10,
                        labels: true,
                        formatter: function (value) { return value; }
                    },
                    minor: {
                        show: true,
                        steps: 5,
                        labels: false,
                        formatter: function (value) { return value; }
                    }
                },
                colors: {
                    lower: colorService.getColor('grey6').toHex(),
                    range: colorService.getColor('accent').setAlpha(0.75).toRgba(),
                    higher: colorService.getColor('grey6').toHex()
                }
            }
        };
    }
    /**
     * @return {?}
     */
    SliderComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.updateOptions();
        this.updateValues();
        this.setThumbState(SliderThumb.Lower, false, false);
        this.setThumbState(SliderThumb.Upper, false, false);
        // emit the initial value
        this.valueChange.next(this.clone(this.value));
    };
    /**
     * @return {?}
     */
    SliderComponent.prototype.ngDoCheck = /**
     * @return {?}
     */
    function () {
        if (this.detectValueChange(this.value, this._value)) {
            this.updateValues();
            this._value = this.clone(this.value);
        }
    };
    /**
     * @return {?}
     */
    SliderComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // persistent tooltips will need positioned correctly at this stage
        setTimeout(function () {
            _this.updateTooltipPosition(SliderThumb.Lower);
            _this.updateTooltipPosition(SliderThumb.Upper);
            // mark as dirty
            // mark as dirty
            _this._changeDetectorRef.markForCheck();
        });
    };
    /**
     * @param {?} thumb
     * @param {?} snapTarget
     * @param {?} forwards
     * @return {?}
     */
    SliderComponent.prototype.snapToNearestTick = /**
     * @param {?} thumb
     * @param {?} snapTarget
     * @param {?} forwards
     * @return {?}
     */
    function (thumb, snapTarget, forwards) {
        // get the value for the thumb
        var value = this.getThumbState(thumb).value;
        // get the closest ticks - remove any tick if we are currently on it
        var /** @type {?} */ closest = this.getTickDistances(value, thumb, snapTarget)
            .filter(function (tick) { return tick.value !== value; })
            .find(function (tick) { return forwards ? tick.value > value : tick.value < value; });
        // If we have no ticks then move by a predefined amount
        if (closest) {
            return this.setThumbValue(thumb, this.validateValue(thumb, closest.value));
        }
        var /** @type {?} */ step = snapTarget === SliderSnap.Major ? this.options.handles.keyboard.major : this.options.handles.keyboard.minor;
        this.setThumbValue(thumb, this.validateValue(thumb, value + (forwards ? step : -step)));
    };
    /**
     * @param {?} thumb
     * @param {?} forwards
     * @return {?}
     */
    SliderComponent.prototype.snapToEnd = /**
     * @param {?} thumb
     * @param {?} forwards
     * @return {?}
     */
    function (thumb, forwards) {
        this.setThumbValue(thumb, this.validateValue(thumb, forwards ? this.options.track.max : this.options.track.min));
    };
    /**
     * @param {?} thumb
     * @return {?}
     */
    SliderComponent.prototype.getThumbValue = /**
     * @param {?} thumb
     * @return {?}
     */
    function (thumb) {
        return this.getThumbState(thumb).value;
    };
    /**
     * @param {?} thumb
     * @return {?}
     */
    SliderComponent.prototype.getFormattedValue = /**
     * @param {?} thumb
     * @return {?}
     */
    function (thumb) {
        return this.options.handles.callout.formatter(this.getThumbState(thumb).value);
    };
    /**
     * @param {?} thumb
     * @return {?}
     */
    SliderComponent.prototype.getThumbState = /**
     * @param {?} thumb
     * @return {?}
     */
    function (thumb) {
        return thumb === SliderThumb.Lower ? this.thumbs.lower : this.thumbs.upper;
    };
    /**
     * @param {?} thumb
     * @param {?} hover
     * @param {?} drag
     * @return {?}
     */
    SliderComponent.prototype.setThumbState = /**
     * @param {?} thumb
     * @param {?} hover
     * @param {?} drag
     * @return {?}
     */
    function (thumb, hover, drag) {
        if (thumb === SliderThumb.Lower) {
            this.thumbs.lower.hover = hover;
            this.thumbs.lower.drag = drag;
        }
        else {
            this.thumbs.upper.hover = hover;
            this.thumbs.upper.drag = drag;
        }
        // update the visibility of the tooltips
        this.updateTooltips(thumb);
    };
    /**
     * @param {?} thumb
     * @param {?} event
     * @return {?}
     */
    SliderComponent.prototype.thumbEvent = /**
     * @param {?} thumb
     * @param {?} event
     * @return {?}
     */
    function (thumb, event) {
        // get the current thumb state
        var /** @type {?} */ state$$1 = this.getThumbState(thumb);
        // update based upon event
        switch (event) {
            case SliderThumbEvent.DragStart:
                state$$1.drag = true;
                break;
            case SliderThumbEvent.DragEnd:
                state$$1.drag = false;
                break;
            case SliderThumbEvent.MouseOver:
                state$$1.hover = true;
                break;
            case SliderThumbEvent.MouseLeave:
                state$$1.hover = false;
                break;
            case SliderThumbEvent.None:
                state$$1.drag = false;
                state$$1.hover = false;
                break;
        }
        // update the thumb state
        this.setThumbState(thumb, state$$1.hover, state$$1.drag);
    };
    /**
     * @param {?} thumb
     * @return {?}
     */
    SliderComponent.prototype.getAriaValueText = /**
     * @param {?} thumb
     * @return {?}
     */
    function (thumb) {
        // get the current thumb value
        var /** @type {?} */ value = this.getThumbValue(thumb);
        // get all the ticks
        var /** @type {?} */ tick = this.ticks.find(function (_tick) { return _tick.value === value; });
        if (tick && tick.label) {
            return tick.label;
        }
        // otherwise simply display the formatted value
        return this.getFormattedValue(thumb);
    };
    /**
     * @param {?} thumb
     * @return {?}
     */
    SliderComponent.prototype.updateTooltips = /**
     * @param {?} thumb
     * @return {?}
     */
    function (thumb) {
        var /** @type {?} */ visible = false;
        var /** @type {?} */ state$$1 = this.getThumbState(thumb);
        switch (this.options.handles.callout.trigger) {
            case SliderCalloutTrigger.Persistent:
                visible = true;
                break;
            case SliderCalloutTrigger.Drag:
                visible = state$$1.drag;
                break;
            case SliderCalloutTrigger.Hover:
                visible = state$$1.hover || state$$1.drag;
                break;
            case SliderCalloutTrigger.Dynamic:
                visible = true;
                break;
        }
        // update the state for the corresponding thumb
        this.getTooltip(thumb).visible = visible;
        // update the tooltip text
        this.updateTooltipText(thumb);
        // update the tooltip positions
        this.updateTooltipPosition(thumb);
    };
    /**
     * @param {?} thumb
     * @return {?}
     */
    SliderComponent.prototype.updateTooltipText = /**
     * @param {?} thumb
     * @return {?}
     */
    function (thumb) {
        // get the thumb value
        var /** @type {?} */ state$$1 = this.getThumbState(thumb);
        var /** @type {?} */ tooltip = this.getTooltip(thumb);
        // store the formatted label
        tooltip.label = this.getFormattedValue(thumb).toString();
    };
    /**
     * @param {?} thumb
     * @return {?}
     */
    SliderComponent.prototype.getTooltipElement = /**
     * @param {?} thumb
     * @return {?}
     */
    function (thumb) {
        return thumb === SliderThumb.Lower ? this.lowerTooltip : this.upperTooltip;
    };
    /**
     * @param {?} thumb
     * @return {?}
     */
    SliderComponent.prototype.getTooltip = /**
     * @param {?} thumb
     * @return {?}
     */
    function (thumb) {
        return thumb === SliderThumb.Lower ? this.tooltips.lower : this.tooltips.upper;
    };
    /**
     * @param {?} thumb
     * @return {?}
     */
    SliderComponent.prototype.updateTooltipPosition = /**
     * @param {?} thumb
     * @return {?}
     */
    function (thumb) {
        var /** @type {?} */ tooltip = this.getTooltip(thumb);
        // if tooltip is not visible then stop here
        if (tooltip.visible === false) {
            return;
        }
        var /** @type {?} */ tooltipElement = this.getTooltipElement(thumb);
        // get the element widths
        var /** @type {?} */ thumbWidth;
        if (this.options.handles.style === SliderStyle.Button) {
            thumbWidth = this.options.track.height === SliderSize.Narrow ? 16 : 24;
        }
        else {
            thumbWidth = 2;
        }
        var /** @type {?} */ tooltipWidth = tooltipElement.nativeElement.offsetWidth;
        // calculate the tooltips new position
        var /** @type {?} */ tooltipPosition = Math.ceil((tooltipWidth - thumbWidth) / 2);
        // update tooltip position
        tooltip.position = -tooltipPosition;
        if (this.options.type === SliderType.Range && this.options.handles.callout.trigger === SliderCalloutTrigger.Dynamic) {
            this.preventTooltipOverlap(tooltip);
        }
    };
    /**
     * @param {?} tooltip
     * @return {?}
     */
    SliderComponent.prototype.preventTooltipOverlap = /**
     * @param {?} tooltip
     * @return {?}
     */
    function (tooltip) {
        var /** @type {?} */ trackWidth = this.track.nativeElement.offsetWidth;
        var /** @type {?} */ lower = (trackWidth / 100) * this.thumbs.lower.position;
        var /** @type {?} */ upper = (trackWidth / 100) * this.thumbs.upper.position;
        var /** @type {?} */ lowerWidth = this.lowerTooltip.nativeElement.offsetWidth / 2;
        var /** @type {?} */ upperWidth = this.upperTooltip.nativeElement.offsetWidth / 2;
        var /** @type {?} */ diff = (lower + lowerWidth) - (upper - upperWidth);
        // if the tooltips are closer than 16px then adjust so the dont move any close
        if (diff > 0) {
            if (tooltip === this.tooltips.lower && this.thumbs.lower.drag === false) {
                tooltip.position -= (diff / 2);
            }
            else if (tooltip === this.tooltips.upper && this.thumbs.upper.drag === false) {
                tooltip.position += (diff / 2);
            }
        }
    };
    /**
     * @param {?} value
     * @param {?} min
     * @param {?} max
     * @return {?}
     */
    SliderComponent.prototype.clamp = /**
     * @param {?} value
     * @param {?} min
     * @param {?} max
     * @return {?}
     */
    function (value, min, max) {
        return Math.min(Math.max(value, min), max);
    };
    /**
     * @param {?} event
     * @param {?} thumb
     * @return {?}
     */
    SliderComponent.prototype.updateThumbPosition = /**
     * @param {?} event
     * @param {?} thumb
     * @return {?}
     */
    function (event, thumb) {
        // get event position - either mouse or touch
        var /** @type {?} */ eventPosition = event instanceof MouseEvent ? event.clientX : event.touches && event.touches.length > 0 ? event.touches[0].clientX : null;
        // if event position is null do nothing
        if (eventPosition === null) {
            return;
        }
        // get mouse position
        var /** @type {?} */ mouseX = window.pageXOffset + eventPosition;
        // get track size and position
        var /** @type {?} */ trackBounds = this.track.nativeElement.getBoundingClientRect();
        // restrict the value within the range size
        var /** @type {?} */ position = this.clamp(mouseX - trackBounds.left, 0, trackBounds.width);
        // get fraction representation of location within the track
        var /** @type {?} */ fraction = (position / trackBounds.width);
        // convert to value within the range
        var /** @type {?} */ value = ((this.options.track.max - this.options.track.min) * fraction) + this.options.track.min;
        // ensure value is valid
        value = this.validateValue(thumb, value);
        // snap to a tick if required
        value = this.snapToTick(value, thumb);
        // update the value accordingly
        this.setThumbValue(thumb, value);
        this.updateOrder(thumb);
        this.updateValues();
        // update tooltip text & position
        this.updateTooltipText(thumb);
        // update the position of all visible tooltips
        this.updateTooltipPosition(SliderThumb.Lower);
        this.updateTooltipPosition(SliderThumb.Upper);
        // mark as dirty for change detection
        this._changeDetectorRef.markForCheck();
    };
    /**
     * @param {?} thumb
     * @return {?}
     */
    SliderComponent.prototype.updateOrder = /**
     * @param {?} thumb
     * @return {?}
     */
    function (thumb) {
        var /** @type {?} */ lower = thumb === SliderThumb.Lower ? 101 : 100;
        var /** @type {?} */ upper = thumb === SliderThumb.Lower ? 100 : 101;
        // The most recently used thumb should be above
        this.thumbs.lower.order = lower;
        this.thumbs.upper.order = upper;
    };
    /**
     * @param {?} value
     * @param {?} thumb
     * @param {?} snapTarget
     * @return {?}
     */
    SliderComponent.prototype.getTickDistances = /**
     * @param {?} value
     * @param {?} thumb
     * @param {?} snapTarget
     * @return {?}
     */
    function (value, thumb, snapTarget) {
        // if snap target is none then return original value
        if (snapTarget === SliderSnap.None) {
            return [];
        }
        // get filtered ticks
        var /** @type {?} */ ticks;
        switch (snapTarget) {
            case SliderSnap.Minor:
                ticks = this.ticks.filter(function (tick) { return tick.type === SliderTickType.Minor; });
                break;
            case SliderSnap.Major:
                ticks = this.ticks.filter(function (tick) { return tick.type === SliderTickType.Major; });
                break;
            default:
                ticks = this.ticks.slice(0);
        }
        // get the track limit
        var /** @type {?} */ lowerLimit = this.options.track.min;
        var /** @type {?} */ upperLimit = this.options.track.max;
        if (this.options.type === SliderType.Range && thumb === SliderThumb.Lower) {
            upperLimit = this.thumbs.upper.value;
        }
        if (this.options.type === SliderType.Range && thumb === SliderThumb.Upper) {
            lowerLimit = this.thumbs.lower.value;
        }
        // Find the closest tick to the current position
        var /** @type {?} */ range = ticks.filter(function (tick) { return tick.value >= lowerLimit && tick.value <= upperLimit; });
        // If there are no close ticks in the valid range then dont snap
        if (range.length === 0) {
            return [];
        }
        return range.sort(function (tickOne, tickTwo) {
            var /** @type {?} */ tickOneDelta = Math.max(tickOne.value, value) - Math.min(tickOne.value, value);
            var /** @type {?} */ tickTwoDelta = Math.max(tickTwo.value, value) - Math.min(tickTwo.value, value);
            return tickOneDelta - tickTwoDelta;
        });
    };
    /**
     * @param {?} value
     * @param {?} thumb
     * @return {?}
     */
    SliderComponent.prototype.snapToTick = /**
     * @param {?} value
     * @param {?} thumb
     * @return {?}
     */
    function (value, thumb) {
        var /** @type {?} */ tickDistances = this.getTickDistances(value, thumb, this.options.track.ticks.snap);
        // if there are no ticks return the current value
        if (tickDistances.length === 0) {
            return value;
        }
        // get the closest tick
        return tickDistances[0].value;
    };
    /**
     * @param {?} thumb
     * @param {?} value
     * @return {?}
     */
    SliderComponent.prototype.validateValue = /**
     * @param {?} thumb
     * @param {?} value
     * @return {?}
     */
    function (thumb, value) {
        // if slider is not a range value is always valid providing it is within the chart min and max values
        if (this.options.type === SliderType.Value) {
            return Math.max(Math.min(value, this.options.track.max), this.options.track.min);
        }
        // check if value is with chart ranges
        if (value > this.options.track.max) {
            return thumb === SliderThumb.Lower ? Math.min(this.options.track.max, this.thumbs.upper.value) : this.options.track.max;
        }
        if (value < this.options.track.min) {
            return thumb === SliderThumb.Upper ? Math.max(this.options.track.min, this.thumbs.lower.value) : this.options.track.min;
        }
        // otherwise we need to check to make sure lower thumb cannot go above higher and vice versa
        if (thumb === SliderThumb.Lower) {
            if (this.thumbs.upper.value === null) {
                return value;
            }
            return value <= this.thumbs.upper.value ? value : this.thumbs.upper.value;
        }
        if (thumb === SliderThumb.Upper) {
            if (this.thumbs.lower.value === null) {
                return value;
            }
            return value >= this.thumbs.lower.value ? value : this.thumbs.lower.value;
        }
    };
    /**
     * @return {?}
     */
    SliderComponent.prototype.updateOptions = /**
     * @return {?}
     */
    function () {
        // add in the default options that user hasn't specified
        this.options = this.deepMerge(this.options || {}, this.defaultOptions);
        this.updateTrackColors();
        this.updateTicks();
        this.updateValues();
    };
    /**
     * @return {?}
     */
    SliderComponent.prototype.updateValues = /**
     * @return {?}
     */
    function () {
        if (this.value === undefined || this.value === null) {
            this.value = 0;
        }
        var /** @type {?} */ lowerValue = typeof this.value === 'number' ? this.value : this.value.low;
        var /** @type {?} */ upperValue = typeof this.value === 'number' ? this.value : this.value.high;
        // validate values
        lowerValue = this.validateValue(SliderThumb.Lower, Number(lowerValue.toFixed(4)));
        upperValue = this.validateValue(SliderThumb.Upper, Number(upperValue.toFixed(4)));
        // calculate the positions as percentages
        var /** @type {?} */ lowerPosition = (((lowerValue - this.options.track.min) / (this.options.track.max - this.options.track.min)) * 100);
        var /** @type {?} */ upperPosition = (((upperValue - this.options.track.min) / (this.options.track.max - this.options.track.min)) * 100);
        // update thumb positions
        this.thumbs.lower.position = lowerPosition;
        this.thumbs.upper.position = upperPosition;
        // calculate the track sizes
        this.tracks.lower.size = lowerPosition;
        this.tracks.middle.size = upperPosition - lowerPosition;
        this.tracks.upper.size = this.options.type === SliderType.Value ? 100 - lowerPosition : 100 - upperPosition;
        // update the value input
        this.setValue(lowerValue, upperValue);
    };
    /**
     * @param {?} low
     * @param {?=} high
     * @return {?}
     */
    SliderComponent.prototype.setValue = /**
     * @param {?} low
     * @param {?=} high
     * @return {?}
     */
    function (low, high) {
        this.thumbs.lower.value = low;
        this.thumbs.upper.value = high;
        var /** @type {?} */ previousValue = this.clone(this._value);
        this.value = this.options.type === SliderType.Value ? low : { low: low, high: high };
        // call the event emitter if changes occured
        if (this.detectValueChange(this.value, previousValue)) {
            this.valueChange.emit(this.clone(this.value));
            this.updateTooltipText(SliderThumb.Lower);
            this.updateTooltipText(SliderThumb.Upper);
        }
        else {
            this.valueChange.emit(this.clone(this.value));
        }
    };
    /**
     * @param {?} thumb
     * @param {?} value
     * @return {?}
     */
    SliderComponent.prototype.setThumbValue = /**
     * @param {?} thumb
     * @param {?} value
     * @return {?}
     */
    function (thumb, value) {
        // update the thumb value
        this.getThumbState(thumb).value = value;
        // forward these changes to the value
        this.setValue(this.thumbs.lower.value, this.thumbs.upper.value);
    };
    /**
     * @return {?}
     */
    SliderComponent.prototype.updateTicks = /**
     * @return {?}
     */
    function () {
        // get tick options
        var /** @type {?} */ majorOptions = this.options.track.ticks.major;
        var /** @type {?} */ minorOptions = this.options.track.ticks.minor;
        // check if we should show ticks
        if (majorOptions.show === false && minorOptions.show === false) {
            this.ticks = [];
        }
        // create ticks for both major and minor - only get the ones to be shown
        var /** @type {?} */ majorTicks = this.getTicks(majorOptions, SliderTickType.Major).filter(function (tick) { return tick.showTicks; });
        var /** @type {?} */ minorTicks = this.getTicks(minorOptions, SliderTickType.Minor).filter(function (tick) { return tick.showTicks; });
        // remove any minor ticks that are on a major interval
        this.ticks = this.unionTicks(majorTicks, minorTicks);
    };
    /**
     * @return {?}
     */
    SliderComponent.prototype.updateTrackColors = /**
     * @return {?}
     */
    function () {
        // get colors for each part of the track
        var _a = this.options.track.colors, lower = _a.lower, range = _a.range, higher = _a.higher;
        // update the controller value
        this.tracks.lower.color = typeof lower === 'string' ? lower : "linear-gradient(to right, " + lower.join(', ') + ")";
        this.tracks.middle.color = typeof range === 'string' ? range : "linear-gradient(to right, " + range.join(', ') + ")";
        this.tracks.upper.color = typeof higher === 'string' ? higher : "linear-gradient(to right, " + higher.join(', ') + ")";
    };
    /**
     * @param {?} steps
     * @return {?}
     */
    SliderComponent.prototype.getSteps = /**
     * @param {?} steps
     * @return {?}
     */
    function (steps) {
        // if they are already an array just return it
        if (steps instanceof Array) {
            return steps;
        }
        var /** @type {?} */ output = [];
        // otherwise calculate the steps
        for (var /** @type {?} */ idx = this.options.track.min; idx <= this.options.track.max; idx += steps) {
            output.push(idx);
        }
        return output;
    };
    /**
     * @param {?} options
     * @param {?} type
     * @return {?}
     */
    SliderComponent.prototype.getTicks = /**
     * @param {?} options
     * @param {?} type
     * @return {?}
     */
    function (options, type) {
        // create an array to store the ticks and step points
        var /** @type {?} */ steps = this.getSteps(options.steps);
        // get some chart options
        var /** @type {?} */ min = this.options.track.min;
        var /** @type {?} */ max = this.options.track.max;
        // convert each step to a slider tick and remove invalid ticks
        return steps.map(function (step) {
            return {
                showTicks: options.show,
                showLabels: options.labels,
                type: type,
                position: ((step - min) / (max - min)) * 100,
                value: step,
                label: options.formatter(step)
            };
        }).filter(function (tick) { return tick.position >= 0 && tick.position <= 100; });
    };
    /**
     * @param {?} majorTicks
     * @param {?} minorTicks
     * @return {?}
     */
    SliderComponent.prototype.unionTicks = /**
     * @param {?} majorTicks
     * @param {?} minorTicks
     * @return {?}
     */
    function (majorTicks, minorTicks) {
        // get all ticks combined removing any minor ticks with the same value as major ticks
        return majorTicks.concat(minorTicks)
            .filter(function (tick, index, array) { return tick.type === SliderTickType.Major || !array.find(function (tk) { return tk.type === SliderTickType.Major && tk.position === tick.position; }); })
            .sort(function (t1, t2) { return t1.value - t2.value; });
    };
    /**
     * @template T
     * @param {?} destination
     * @param {?} source
     * @return {?}
     */
    SliderComponent.prototype.deepMerge = /**
     * @template T
     * @param {?} destination
     * @param {?} source
     * @return {?}
     */
    function (destination, source) {
        // loop though all of the properties in the source object
        for (var /** @type {?} */ prop in source) {
            // check if the destination object has the property
            if (!destination.hasOwnProperty(prop)) {
                // copy the property across
                destination[prop] = source[prop];
                continue;
            }
            // if the property exists and is not an object then skip
            if (typeof destination[prop] !== 'object') {
                continue;
            }
            // check if property is an array
            if (destination[prop] instanceof Array) {
                continue;
            }
            // if it is an object then perform a recursive check
            destination[prop] = this.deepMerge(destination[prop], source[prop]);
        }
        return destination;
    };
    /**
     * @param {?} value1
     * @param {?} value2
     * @return {?}
     */
    SliderComponent.prototype.detectValueChange = /**
     * @param {?} value1
     * @param {?} value2
     * @return {?}
     */
    function (value1, value2) {
        // compare two slider values
        if (this.isSliderValue(value1) && this.isSliderValue(value2)) {
            // references to the objects in the correct types
            var /** @type {?} */ obj1 = /** @type {?} */ (value1);
            var /** @type {?} */ obj2 = /** @type {?} */ (value2);
            return obj1.low !== obj2.low || obj1.high !== obj2.high;
        }
        // if not a slider value - should be number of nullable type - compare normally
        return value1 !== value2;
    };
    /**
     * Determines whether or not an object conforms to the
     * SliderValue interface.
     * @param {?} value - The object to check - this must be type any
     * @return {?}
     */
    SliderComponent.prototype.isSliderValue = /**
     * Determines whether or not an object conforms to the
     * SliderValue interface.
     * @param {?} value - The object to check - this must be type any
     * @return {?}
     */
    function (value) {
        // check if is an object
        if (typeof value !== 'object') {
            return false;
        }
        // next check if it contains the necessary properties
        return 'low' in value && 'high' in value;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    SliderComponent.prototype.clone = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        // if it is not an object simply return the value
        if (typeof value !== 'object') {
            return value;
        }
        // create a new object from the existing one
        var /** @type {?} */ instance = __assign({}, value);
        // delete remove the value from the old object
        value = undefined;
        // return the new instance of the object
        return instance;
    };
    SliderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-slider',
                    template: "<div class=\"track\" #track [class.narrow]=\"options.track.height === sliderSize.Narrow\" [class.wide]=\"options.track.height === sliderSize.Wide\" [class.range]=\"options.type === sliderType.Range\">\n\n    <!-- Section Beneath Lower Thumb -->\n    <div class=\"track-section track-lower\" [style.flex-grow]=\"tracks.lower.size\" [style.background]=\"tracks.lower.color\"></div>\n\n    <!-- Lower Thumb Button / Line -->\n    <div class=\"thumb lower\"\n        uxDrag\n        role=\"slider\"\n        tabindex=\"0\"\n        #lowerthumb\n        [attr.aria-label]=\"options.type === sliderType.Range ? options.handles.aria.lowerThumb : options.handles.aria.thumb\"\n        [attr.aria-valuemin]=\"options?.track?.min\"\n        [attr.aria-valuemax]=\"options.type === sliderType.Range ? getThumbValue(sliderThumb.Upper) : options?.track?.max\"\n        [attr.aria-valuenow]=\"getThumbValue(sliderThumb.Lower)\"\n        [attr.aria-valuetext]=\"getAriaValueText(sliderThumb.Lower)\"\n        [style.left.%]=\"thumbs.lower.position\"\n        [class.active]=\"thumbs.lower.drag\"\n        [style.z-index]=\"thumbs.lower.order\"\n        [class.button]=\"options.handles.style === sliderStyle.Button\"\n        [class.line]=\"options.handles.style === sliderStyle.Line\"\n        [class.narrow]=\"options.track.height === sliderSize.Narrow\"\n        [class.wide]=\"options.track.height === sliderSize.Wide\"\n        (dragstart)=\"thumbEvent(sliderThumb.Lower, sliderThumbEvent.DragStart); lowerthumb.focus()\"\n        (drag)=\"updateThumbPosition($event, sliderThumb.Lower)\"\n        (dragend)=\"thumbEvent(sliderThumb.Lower, sliderThumbEvent.DragEnd)\"\n        (mouseenter)=\"thumbEvent(sliderThumb.Lower, sliderThumbEvent.MouseOver)\"\n        (mouseleave)=\"thumbEvent(sliderThumb.Lower, sliderThumbEvent.MouseLeave)\"\n        (focus)=\"thumbEvent(sliderThumb.Lower, sliderThumbEvent.MouseOver)\"\n        (blur)=\"thumbEvent(sliderThumb.Lower, sliderThumbEvent.MouseLeave)\"\n        (keydown.ArrowLeft)=\"snapToNearestTick(sliderThumb.Lower, sliderSnap.All, false); $event.preventDefault()\"\n        (keydown.ArrowRight)=\"snapToNearestTick(sliderThumb.Lower, sliderSnap.All, true); $event.preventDefault()\"\n        (keydown.ArrowUp)=\"snapToNearestTick(sliderThumb.Lower, sliderSnap.All, false); $event.preventDefault()\"\n        (keydown.ArrowDown)=\"snapToNearestTick(sliderThumb.Lower, sliderSnap.All, true); $event.preventDefault()\"\n        (keydown.PageDown)=\"snapToNearestTick(sliderThumb.Lower, sliderSnap.Major, false); $event.preventDefault()\"\n        (keydown.PageUp)=\"snapToNearestTick(sliderThumb.Lower, sliderSnap.Major, true); $event.preventDefault()\"\n        (keydown.Home)=\"snapToEnd(sliderThumb.Lower, false); $event.preventDefault()\"\n        (keydown.End)=\"snapToEnd(sliderThumb.Lower, true); $event.preventDefault()\">\n\n        <!-- Lower Thumb Callout -->\n        <div class=\"tooltip top tooltip-lower\" #lowerTooltip\n            [class.tooltip-dynamic]=\"options.handles.callout.trigger === sliderCalloutTrigger.Dynamic && thumbs.lower.drag === false\"\n            [style.opacity]=\"tooltips.lower.visible ? 1 : 0\"\n            [style.left.px]=\"tooltips.lower.position\">\n\n            <div class=\"tooltip-arrow\" [style.border-top-color]=\"options.handles.callout.background\"></div>\n\n            <div class=\"tooltip-inner\"\n                [style.background-color]=\"options.handles.callout.background\"\n                [style.color]=\"options.handles.callout.color\">\n                {{ tooltips.lower.label }}\n            </div>\n        </div>\n\n    </div>\n\n    <!-- Section of Track Between Lower and Upper Thumbs -->\n    <div class=\"track-section track-range\" *ngIf=\"options.type === sliderType.Range\" [style.flex-grow]=\"tracks.middle.size\" [style.background]=\"tracks.middle.color\">\n    </div>\n\n    <!-- Upper Thumb Button / Line -->\n    <div class=\"thumb upper\"\n        uxDrag\n        role=\"slider\"\n        tabindex=\"0\"\n        #upperthumb\n        [attr.aria-label]=\"options.handles.aria.upperThumb\"\n        [attr.aria-valuemin]=\"getThumbValue(sliderThumb.Lower) || options?.track?.min\"\n        [attr.aria-valuemax]=\"options?.track?.max\"\n        [attr.aria-valuenow]=\"getThumbValue(sliderThumb.Upper)\"\n        [attr.aria-valuetext]=\"getAriaValueText(sliderThumb.Upper)\"\n        [hidden]=\"options.type !== sliderType.Range\"\n        [class.active]=\"thumbs.upper.drag\"\n        [style.left.%]=\"thumbs.upper.position\"\n        [style.z-index]=\"thumbs.upper.order\"\n        [class.button]=\"options.handles.style === sliderStyle.Button\"\n        [class.line]=\"options.handles.style === sliderStyle.Line\"\n        [class.narrow]=\"options.track.height === sliderSize.Narrow\"\n        [class.wide]=\"options.track.height === sliderSize.Wide\"\n        (dragstart)=\"thumbEvent(sliderThumb.Upper, sliderThumbEvent.DragStart); upperthumb.focus()\"\n        (drag)=\"updateThumbPosition($event, sliderThumb.Upper)\"\n        (dragend)=\"thumbEvent(sliderThumb.Upper, sliderThumbEvent.DragEnd)\"\n        (mouseenter)=\"thumbEvent(sliderThumb.Upper, sliderThumbEvent.MouseOver)\"\n        (mouseleave)=\"thumbEvent(sliderThumb.Upper, sliderThumbEvent.MouseLeave)\"\n        (focus)=\"thumbEvent(sliderThumb.Upper, sliderThumbEvent.MouseOver)\"\n        (blur)=\"thumbEvent(sliderThumb.Upper, sliderThumbEvent.MouseLeave)\"\n        (keydown.ArrowLeft)=\"snapToNearestTick(sliderThumb.Upper, sliderSnap.All, false); $event.preventDefault()\"\n        (keydown.ArrowRight)=\"snapToNearestTick(sliderThumb.Upper, sliderSnap.All, true); $event.preventDefault()\"\n        (keydown.ArrowUp)=\"snapToNearestTick(sliderThumb.Upper, sliderSnap.All, false); $event.preventDefault()\"\n        (keydown.ArrowDown)=\"snapToNearestTick(sliderThumb.Upper, sliderSnap.All, true); $event.preventDefault()\"\n        (keydown.PageDown)=\"snapToNearestTick(sliderThumb.Upper, sliderSnap.Major, false); $event.preventDefault()\"\n        (keydown.PageUp)=\"snapToNearestTick(sliderThumb.Upper, sliderSnap.Major, true); $event.preventDefault()\"\n        (keydown.Home)=\"snapToEnd(sliderThumb.Upper, false); $event.preventDefault()\"\n        (keydown.End)=\"snapToEnd(sliderThumb.Upper, true); $event.preventDefault()\">\n\n        <!-- Upper Thumb Callout -->\n        <div class=\"tooltip top tooltip-upper\" #upperTooltip\n            [class.tooltip-dynamic]=\"options.handles.callout.trigger === sliderCalloutTrigger.Dynamic && thumbs.upper.drag === false\"\n            [style.opacity]=\"tooltips.upper.visible ? 1 : 0\"\n            [style.left.px]=\"tooltips.upper.position\">\n\n            <div class=\"tooltip-arrow\" [style.border-top-color]=\"options.handles.callout.background\"></div>\n\n            <div class=\"tooltip-inner\"\n                *ngIf=\"options.type === sliderType.Range\"\n                [style.background-color]=\"options.handles.callout.background\"\n                [style.color]=\"options.handles.callout.color\">\n                {{ tooltips.upper.label }}\n            </div>\n        </div>\n    </div>\n\n    <!-- Section of Track Abover Upper Thumb -->\n    <div class=\"track-section track-higher\" [style.flex-grow]=\"tracks.upper.size\" [style.background]=\"tracks.upper.color\"></div>\n\n</div>\n\n<!-- Chart Ticks and Tick Labels -->\n<div class=\"tick-container\"\n    role=\"presentation\"\n    *ngIf=\"(options.track.ticks.major.show || options.track.ticks.minor.show) && options.handles.callout.trigger !== sliderCalloutTrigger.Dynamic\"\n    [class.show-labels]=\"options.track.ticks.major.labels || options.track.ticks.minor.labels\">\n\n    <div class=\"tick\"\n        *ngFor=\"let tick of ticks\"\n        [class.major]=\"tick.type === sliderTickType.Major\"\n        [class.minor]=\"tick.type === sliderTickType.Minor\"\n        [style.left.%]=\"tick.position\"\n        [hidden]=\"!tick.showTicks\">\n\n        <div class=\"tick-indicator\"></div>\n        <div class=\"tick-label\" aria-hidden=\"true\" [hidden]=\"!tick.showLabels\">{{ tick.label }}</div>\n    </div>\n</div>",
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    SliderComponent.ctorParameters = function () { return [
        { type: ColorService, },
        { type: ChangeDetectorRef, },
    ]; };
    SliderComponent.propDecorators = {
        "value": [{ type: Input },],
        "options": [{ type: Input },],
        "valueChange": [{ type: Output },],
        "lowerTooltip": [{ type: ViewChild, args: ['lowerTooltip',] },],
        "upperTooltip": [{ type: ViewChild, args: ['upperTooltip',] },],
        "track": [{ type: ViewChild, args: ['track',] },],
    };
    return SliderComponent;
}());
/** @enum {number} */
var SliderType = {
    Value: 0,
    Range: 1,
};
SliderType[SliderType.Value] = "Value";
SliderType[SliderType.Range] = "Range";
/** @enum {number} */
var SliderStyle = {
    Button: 0,
    Line: 1,
};
SliderStyle[SliderStyle.Button] = "Button";
SliderStyle[SliderStyle.Line] = "Line";
/** @enum {number} */
var SliderSize = {
    Narrow: 0,
    Wide: 1,
};
SliderSize[SliderSize.Narrow] = "Narrow";
SliderSize[SliderSize.Wide] = "Wide";
/** @enum {number} */
var SliderCalloutTrigger = {
    None: 0,
    Hover: 1,
    Drag: 2,
    Persistent: 3,
    Dynamic: 4,
};
SliderCalloutTrigger[SliderCalloutTrigger.None] = "None";
SliderCalloutTrigger[SliderCalloutTrigger.Hover] = "Hover";
SliderCalloutTrigger[SliderCalloutTrigger.Drag] = "Drag";
SliderCalloutTrigger[SliderCalloutTrigger.Persistent] = "Persistent";
SliderCalloutTrigger[SliderCalloutTrigger.Dynamic] = "Dynamic";
/** @enum {number} */
var SliderSnap = {
    None: 0,
    Minor: 1,
    Major: 2,
    All: 3,
};
SliderSnap[SliderSnap.None] = "None";
SliderSnap[SliderSnap.Minor] = "Minor";
SliderSnap[SliderSnap.Major] = "Major";
SliderSnap[SliderSnap.All] = "All";
/** @enum {number} */
var SliderTickType = {
    Minor: 0,
    Major: 1,
};
SliderTickType[SliderTickType.Minor] = "Minor";
SliderTickType[SliderTickType.Major] = "Major";
/** @enum {number} */
var SliderThumbEvent = {
    None: 0,
    MouseOver: 1,
    MouseLeave: 2,
    DragStart: 3,
    DragEnd: 4,
};
SliderThumbEvent[SliderThumbEvent.None] = "None";
SliderThumbEvent[SliderThumbEvent.MouseOver] = "MouseOver";
SliderThumbEvent[SliderThumbEvent.MouseLeave] = "MouseLeave";
SliderThumbEvent[SliderThumbEvent.DragStart] = "DragStart";
SliderThumbEvent[SliderThumbEvent.DragEnd] = "DragEnd";
/** @enum {number} */
var SliderThumb = {
    Lower: 0,
    Upper: 1,
};
SliderThumb[SliderThumb.Lower] = "Lower";
SliderThumb[SliderThumb.Upper] = "Upper";

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var SliderModule = (function () {
    function SliderModule() {
    }
    SliderModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        ColorServiceModule,
                        DragModule
                    ],
                    exports: [SliderComponent],
                    declarations: [SliderComponent]
                },] },
    ];
    return SliderModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var SparkComponent = (function () {
    function SparkComponent(_colorService) {
        this._colorService = _colorService;
        this.values = [];
        this.barHeight = 10;
        this._theme = 'primary';
        this._barColor = [];
    }
    Object.defineProperty(SparkComponent.prototype, "theme", {
        get: /**
         * @return {?}
         */
        function () {
            return this._theme;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._theme = this._colorService.resolveColorName(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SparkComponent.prototype, "trackColor", {
        get: /**
         * @return {?}
         */
        function () {
            return this._trackColor;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._trackColor = this._colorService.resolve(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SparkComponent.prototype, "barColor", {
        get: /**
         * @return {?}
         */
        function () {
            return this._barColor;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var _this = this;
            if (Array.isArray(value)) {
                this._barColor = value.map(function (color) { return _this._colorService.resolve(color); });
            }
            else {
                this._barColor = [this._colorService.resolve(value)];
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SparkComponent.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () {
            return this.values;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            // ensure 'value' is an array at this point
            var /** @type {?} */ values = Array.isArray(value) ? value : [value];
            // get the total value of all lines
            var /** @type {?} */ total = Math.max(values.reduce(function (previous, current) { return previous + current; }, 0), 100);
            // figure out the percentages for each spark line
            this.values = values.map(function (val) { return (val / total) * 100; });
        },
        enumerable: true,
        configurable: true
    });
    SparkComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-spark',
                    template: "<!-- Inline Spark Chart -->\n<div *ngIf=\"inlineLabel\" class=\"ux-spark-inline-label-container\">\n\n    <div class=\"ux-spark-inline-label-left\" [innerHtml]=\"inlineLabel\"></div>\n\n    <div class=\"ux-spark-line\">\n\n        <div class=\"ux-spark-top-container\" *ngIf=\"topLeftLabel || topRightLabel\">\n            <div class=\"ux-spark-label-top-left\" *ngIf=\"topLeftLabel\" [innerHtml]=\"topLeftLabel\"></div>\n            <div class=\"ux-spark-label-top-right\" *ngIf=\"topRightLabel\" [innerHtml]=\"topRightLabel\"></div>\n        </div>\n\n        <div class=\"ux-spark ux-inline ux-spark-theme-{{theme}}\" [style.height.px]=\"barHeight\" [style.backgroundColor]=\"trackColor\" [uxTooltip]=\"tooltip\">\n            <div class=\"ux-spark-bar\" *ngFor=\"let line of values; let idx = index;\" [style.width.%]=\"line\" [style.backgroundColor]=\"barColor[idx]\"></div>\n        </div>\n\n        <div class=\"ux-spark-bottom-container\" *ngIf=\"bottomLeftLabel || bottomRightLabel\">\n            <div class=\"ux-spark-label-bottom-left\" *ngIf=\"bottomLeftLabel\" [innerHtml]=\"bottomLeftLabel\"></div>\n            <div class=\"ux-spark-label-bottom-right\" *ngIf=\"bottomRightLabel\" [innerHtml]=\"bottomRightLabel\"></div>\n        </div>\n\n    </div>\n</div>\n\n<!-- End Inline Spark Chart -->\n\n\n<!-- Non Inline Spark Chart -->\n<div *ngIf=\"!inlineLabel\">\n\n    <div class=\"ux-spark-top-container\" *ngIf=\"topLeftLabel || topRightLabel\">\n        <div class=\"ux-spark-label-top-left\" *ngIf=\"topLeftLabel\" [innerHtml]=\"topLeftLabel\"></div>\n        <div class=\"ux-spark-label-top-right\" *ngIf=\"topRightLabel\" [innerHtml]=\"topRightLabel\"></div>\n    </div>\n\n    <div class=\"ux-spark ux-spark-theme-{{theme}}\" [class.ux-spark-multi-value]=\"values.length > 1\" [style.height.px]=\"barHeight\" [style.backgroundColor]=\"trackColor\"\n        [uxTooltip]=\"tooltip\">\n        <div class=\"ux-spark-bar\" *ngFor=\"let line of value; let idx = index;\" [style.width.%]=\"line\" [style.backgroundColor]=\"barColor[idx]\"></div>\n    </div>\n\n    <div class=\"ux-spark-bottom-container\" *ngIf=\"bottomLeftLabel || bottomRightLabel\">\n        <div class=\"ux-spark-label-bottom-left\" *ngIf=\"bottomLeftLabel\" [innerHtml]=\"bottomLeftLabel\"></div>\n        <div class=\"ux-spark-label-bottom-right\" *ngIf=\"bottomRightLabel\" [innerHtml]=\"bottomRightLabel\"></div>\n    </div>\n</div>\n\n<!-- End Non Inline Spark Chart -->",
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    SparkComponent.ctorParameters = function () { return [
        { type: ColorService, },
    ]; };
    SparkComponent.propDecorators = {
        "barHeight": [{ type: Input },],
        "inlineLabel": [{ type: Input },],
        "topLeftLabel": [{ type: Input },],
        "topRightLabel": [{ type: Input },],
        "bottomLeftLabel": [{ type: Input },],
        "bottomRightLabel": [{ type: Input },],
        "tooltip": [{ type: Input },],
        "theme": [{ type: Input },],
        "trackColor": [{ type: Input },],
        "barColor": [{ type: Input },],
        "value": [{ type: Input },],
    };
    return SparkComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var SparkModule = (function () {
    function SparkModule() {
    }
    SparkModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        ColorServiceModule,
                        TooltipModule
                    ],
                    exports: [SparkComponent],
                    declarations: [SparkComponent]
                },] },
    ];
    return SparkModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var TabsetService = (function () {
    function TabsetService() {
        this.tabs$ = new BehaviorSubject([]);
        this.active$ = new BehaviorSubject(null);
        this.focused$ = new BehaviorSubject(false);
        this.highlighted$ = new BehaviorSubject(null);
    }
    /**
     * @param {?} tab
     * @return {?}
     */
    TabsetService.prototype.add = /**
     * @param {?} tab
     * @return {?}
     */
    function (tab) {
        this.tabs$.next(__spread(this.tabs$.value, [tab]));
        // check if this is the only tab. If so select this by default
        if (!this.active$.value) {
            this.select(tab);
        }
    };
    /**
     * @param {?} tab
     * @return {?}
     */
    TabsetService.prototype.remove = /**
     * @param {?} tab
     * @return {?}
     */
    function (tab) {
        // remove the tab
        this.tabs$.next(this.tabs$.value.filter(function (_tab) { return _tab !== tab; }));
    };
    /**
     * @param {?} tab
     * @return {?}
     */
    TabsetService.prototype.select = /**
     * @param {?} tab
     * @return {?}
     */
    function (tab) {
        if (!tab.disabled) {
            this.active$.next(tab);
            this.highlighted$.next(tab);
        }
    };
    /**
     * @param {?} index
     * @return {?}
     */
    TabsetService.prototype.selectAtIndex = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        // if there are no tabs then do nothing
        if (this.tabs$.value.length === 0) {
            return;
        }
        // check if the index is within the bounds
        if (index < 0) {
            return this.selectAtIndex(this.tabs$.value.length - 1);
        }
        else if (index >= this.tabs$.value.length) {
            return this.selectAtIndex(0);
        }
        var /** @type {?} */ target = this.tabs$.value[index];
        if (target) {
            this.select(target);
        }
    };
    /**
     * @return {?}
     */
    TabsetService.prototype.selectNextTab = /**
     * @return {?}
     */
    function () {
        // find the currently selected index
        var /** @type {?} */ index = this.tabs$.value.indexOf(this.active$.value);
        // check the tabs after the active one to see if there are any selectable tabs
        var /** @type {?} */ tabs = this.tabs$.value.slice(index + 1);
        try {
            // check if any of the tabs are not disabled
            for (var tabs_1 = __values(tabs), tabs_1_1 = tabs_1.next(); !tabs_1_1.done; tabs_1_1 = tabs_1.next()) {
                var tab = tabs_1_1.value;
                if (!tab.disabled) {
                    return this.select(tab);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (tabs_1_1 && !tabs_1_1.done && (_a = tabs_1.return)) _a.call(tabs_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        // if we reach here then no tab could be selected - select the first tab
        this.selectFirstTab();
        var e_1, _a;
    };
    /**
     * @return {?}
     */
    TabsetService.prototype.selectPreviousTab = /**
     * @return {?}
     */
    function () {
        // find the currently selected index
        var /** @type {?} */ index = this.tabs$.value.indexOf(this.active$.value);
        // check the tabs before the active one to see if there are any selectable tabs
        var /** @type {?} */ tabs = this.tabs$.value.slice(0, index);
        try {
            // check if any of the tabs are not disabled
            for (var _a = __values(tabs.reverse()), _b = _a.next(); !_b.done; _b = _a.next()) {
                var tab = _b.value;
                if (!tab.disabled) {
                    return this.select(tab);
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_2) throw e_2.error; }
        }
        // if we reach here then no previous tab could be selected - select the last tab
        this.selectLastTab();
        var e_2, _c;
    };
    /**
     * @return {?}
     */
    TabsetService.prototype.selectFirstTab = /**
     * @return {?}
     */
    function () {
        // find the index of the first non-disabled tab
        var /** @type {?} */ tabIndex = this.tabs$.value.findIndex(function (tab) { return !tab.disabled; });
        if (tabIndex !== -1) {
            this.selectAtIndex(tabIndex);
        }
    };
    /**
     * @return {?}
     */
    TabsetService.prototype.selectLastTab = /**
     * @return {?}
     */
    function () {
        // find the index of the first non-disabled tab
        var /** @type {?} */ tabIndex = this.tabs$.value.slice().reverse().findIndex(function (tab) { return !tab.disabled; });
        if (tabIndex !== -1) {
            this.selectAtIndex((this.tabs$.value.length - 1) - tabIndex);
        }
    };
    TabsetService.decorators = [
        { type: Injectable },
    ];
    return TabsetService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var TabsetComponent = (function () {
    function TabsetComponent(tabset) {
        this.tabset = tabset;
        this.minimal = true;
        this.stacked = 'none';
    }
    /**
     * Allow manual tab selected
     */
    /**
     * Allow manual tab selected
     * @param {?} tab
     * @return {?}
     */
    TabsetComponent.prototype.select = /**
     * Allow manual tab selected
     * @param {?} tab
     * @return {?}
     */
    function (tab) {
        this.tabset.select(tab);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    TabsetComponent.prototype.selectPreviousTab = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // determine which arrow key is pressed
        var /** @type {?} */ arrowLeft = event.key === 'ArrowLeft' || event.keyCode === 37;
        var /** @type {?} */ arrowUp = event.key === 'ArrowUp' || event.keyCode === 38;
        // only perform action if the arrow key matches the orientation
        if (arrowLeft && this.stacked !== 'none' || arrowUp && this.stacked === 'none') {
            return;
        }
        // perform selection
        this.tabset.selectPreviousTab();
        // prevent the browser from scrolling when arrow keys are pressed
        event.preventDefault();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    TabsetComponent.prototype.selectNextTab = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // determine which arrow key is pressed
        var /** @type {?} */ arrowRight = event.key === 'ArrowRight' || event.keyCode === 39;
        var /** @type {?} */ arrowDown = event.key === 'ArrowDown' || event.keyCode === 40;
        // only perform action if the arrow key matches the orientation
        if (arrowRight && this.stacked !== 'none' || arrowDown && this.stacked === 'none') {
            return;
        }
        // perform selection
        this.tabset.selectNextTab();
        // prevent the browser from scrolling when arrow keys are pressed
        event.preventDefault();
    };
    TabsetComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-tabset',
                    template: "<!-- Nav tabs -->\n<ul role=\"tablist\"\n    class=\"nav nav-tabs\"\n    [class.minimal-tab]=\"minimal\"\n    [attr.aria-label]=\"ariaLabel\"\n    [attr.aria-orientation]=\"stacked === 'none' ? 'horizontal' : 'vertical'\">\n\n\t<li role=\"presentation\" \n        class=\"nav-item\"\n        *ngFor=\"let tab of tabset.tabs$ | async; let index = index\"\n        [class.active]=\"tab.active$ | async\"\n        [class.disabled]=\"tab.disabled\"\n        [ngClass]=\"tab.customClass\">\n\n        <a class=\"nav-link\"\n            [id]=\"tab.id\"\n            role=\"tab\"\n            [uxTabFocus]=\"tab\"\n            [tabindex]=\"(tab.active$ | async) ? 0 : -1\"\n            [class.highlighted]=\"(tabset.focused$ | async) && (tabset.highlighted$ | async) === tab\"            \n            (mousedown)=\"tabset.select(tab)\"\n            (focus)=\"tabset.focused$.next(true)\"\n            (blur)=\"tabset.focused$.next(false)\"\n            (mousedown)=\"tabset.focused$.next(true)\"\n            (keydown.ArrowUp)=\"selectPreviousTab($event)\"\n            (keydown.ArrowLeft)=\"selectPreviousTab($event)\"\n            (keydown.ArrowRight)=\"selectNextTab($event)\"\n            (keydown.ArrowDown)=\"selectNextTab($event)\"\n            (keydown.Home)=\"tabset.selectFirstTab(); $event.preventDefault()\"\n            (keydown.End)=\"tabset.selectLastTab(); $event.preventDefault()\"\n            [attr.aria-controls]=\"tab.id\"\n            [attr.aria-selected]=\"tab.active$ | async\"\n            [attr.aria-disabled]=\"tab.disabled\">\n\n            <span *ngIf=\"!tab.headingRef\">{{ tab.heading }}</span>\n\n            <ng-container *ngIf=\"tab.headingRef\" [ngTemplateOutlet]=\"tab.headingRef\"></ng-container>\n        </a>\n\n\t</li>\n\n</ul>\n\n<!-- Tab panes -->\n<div class=\"tab-content\">\n\t<ng-content></ng-content>\n</div>",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [TabsetService],
                    host: {
                        '[class.tabs-left]': 'stacked === "left"',
                        '[class.tabs-right]': 'stacked === "right"',
                    }
                },] },
    ];
    /** @nocollapse */
    TabsetComponent.ctorParameters = function () { return [
        { type: TabsetService, },
    ]; };
    TabsetComponent.propDecorators = {
        "minimal": [{ type: Input },],
        "stacked": [{ type: Input },],
        "ariaLabel": [{ type: Input, args: ['aria-label',] },],
    };
    return TabsetComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ uniqueTabId = 0;
var TabComponent = (function () {
    function TabComponent(_tabset) {
        var _this = this;
        this._tabset = _tabset;
        this.id = "ux-tab-" + ++uniqueTabId;
        this.disabled = false;
        this.select = new EventEmitter();
        this.deselect = new EventEmitter();
        this.active$ = this._tabset.active$.pipe(map(function (active) { return active === _this; }));
        _tabset.add(this);
        this._subscription = this.active$.subscribe(function (active) { return active ? _this.select.emit() : _this.deselect.emit(); });
    }
    Object.defineProperty(TabComponent.prototype, "active", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value) {
                this._tabset.select(this);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    TabComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._tabset.remove(this);
        this._subscription.unsubscribe();
    };
    TabComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-tab',
                    template: "<div role=\"tabpanel\"\n     class=\"tab-pane\"\n     [class.active]=\"active$ | async\"\n     [id]=\"id + '-panel'\"\n     [attr.aria-labelledby]=\"id\"\n     [attr.aria-hidden]=\"!(active$ | async)\">\n  <ng-content></ng-content>\n</div>",
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    TabComponent.ctorParameters = function () { return [
        { type: TabsetService, },
    ]; };
    TabComponent.propDecorators = {
        "id": [{ type: Input },],
        "disabled": [{ type: Input },],
        "heading": [{ type: Input },],
        "customClass": [{ type: Input },],
        "select": [{ type: Output },],
        "deselect": [{ type: Output },],
        "active": [{ type: Input },],
    };
    return TabComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var TabHeadingDirective = (function () {
    function TabHeadingDirective(templateRef, tab) {
        tab.headingRef = templateRef;
    }
    TabHeadingDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxTabHeading]'
                },] },
    ];
    /** @nocollapse */
    TabHeadingDirective.ctorParameters = function () { return [
        { type: TemplateRef, },
        { type: TabComponent, },
    ]; };
    return TabHeadingDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var TabFocusDirective = (function () {
    function TabFocusDirective(_tabset, _elementRef) {
        this._tabset = _tabset;
        this._elementRef = _elementRef;
    }
    /**
     * @return {?}
     */
    TabFocusDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._subscription = this._tabset.highlighted$.pipe(filter(function () { return _this._tabset.focused$.value === true; }), filter(function () { return _this._tabset.highlighted$.value === _this.uxTabFocus; })).subscribe(function () { return _this._elementRef.nativeElement.focus(); });
    };
    /**
     * @return {?}
     */
    TabFocusDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._subscription.unsubscribe();
    };
    TabFocusDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxTabFocus]'
                },] },
    ];
    /** @nocollapse */
    TabFocusDirective.ctorParameters = function () { return [
        { type: TabsetService, },
        { type: ElementRef, },
    ]; };
    TabFocusDirective.propDecorators = {
        "uxTabFocus": [{ type: Input },],
    };
    return TabFocusDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var TabsetModule = (function () {
    function TabsetModule() {
    }
    TabsetModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule
                    ],
                    exports: [TabsetComponent, TabComponent, TabHeadingDirective],
                    declarations: [TabsetComponent, TabComponent, TabHeadingDirective, TabFocusDirective],
                },] },
    ];
    return TabsetModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var TimelineComponent = (function () {
    function TimelineComponent() {
    }
    TimelineComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-timeline',
                    template: "<div class=\"timeline\">\n    <ng-content></ng-content>\n</div>\n"
                },] },
    ];
    return TimelineComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var TimelineEventComponent = (function () {
    function TimelineEventComponent() {
    }
    TimelineEventComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-timeline-event',
                    template: "<div class=\"timeline-badge\" [ngClass]=\"badgeColor\">\n    <span>{{badgeTitle}}</span>\n</div>\n<div class=\"timeline-panel\">\n    <ng-content></ng-content>\n</div>\n"
                },] },
    ];
    /** @nocollapse */
    TimelineEventComponent.propDecorators = {
        "badgeColor": [{ type: Input },],
        "badgeTitle": [{ type: Input },],
    };
    return TimelineEventComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var TimelineModule = (function () {
    function TimelineModule() {
    }
    TimelineModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule
                    ],
                    exports: [
                        TimelineComponent,
                        TimelineEventComponent
                    ],
                    declarations: [
                        TimelineComponent,
                        TimelineEventComponent
                    ]
                },] },
    ];
    return TimelineModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ TOGGLESWITCH_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return ToggleSwitchComponent; }),
    multi: true
};
var /** @type {?} */ uniqueToggleSwitchId = 0;
var ToggleSwitchComponent = (function () {
    function ToggleSwitchComponent() {
        this._toggleSwitchId = "ux-toggleswitch-" + ++uniqueToggleSwitchId;
        this.id = this._toggleSwitchId;
        this.tabindex = 0;
        this.clickable = true;
        this.disabled = false;
        this.ariaLabel = '';
        this.ariaLabelledby = null;
        this.valueChange = new EventEmitter();
        this._value = false;
        this.focused = false;
        this.onTouchedCallback = function () { };
        this.onChangeCallback = function () { };
    }
    Object.defineProperty(ToggleSwitchComponent.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () {
            return this._value;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._value = value;
            // Update value output
            this.valueChange.emit(value);
            // Notify ngModel
            this.onChangeCallback(value);
            this.onTouchedCallback();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToggleSwitchComponent.prototype, "inputId", {
        get: /**
         * @return {?}
         */
        function () {
            return (this.id || this._toggleSwitchId) + "-input";
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ToggleSwitchComponent.prototype.toggle = /**
     * @return {?}
     */
    function () {
        if (!this.disabled && this.clickable) {
            this.value = !this.value;
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    ToggleSwitchComponent.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.value = !!value;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    ToggleSwitchComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChangeCallback = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    ToggleSwitchComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouchedCallback = fn;
    };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    ToggleSwitchComponent.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
    };
    ToggleSwitchComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-toggleswitch',
                    template: "<label [attr.for]=\"inputId\"\n       class=\"ux-toggleswitch\"\n       [class.ux-toggleswitch-checked]=\"value\"\n       [class.ux-toggleswitch-disabled]=\"disabled\"\n       [class.ux-toggleswitch-focused]=\"focused\">\n\n    <input class=\"ux-toggleswitch-input\"\n           type=\"checkbox\"\n           role=\"switch\"\n           [id]=\"inputId\"\n           [checked]=\"value\"\n           [disabled]=\"disabled\"\n           [attr.name]=\"name\"\n           [tabindex]=\"tabindex\"\n           [attr.aria-label]=\"ariaLabel\"\n           [attr.aria-labelledby]=\"ariaLabelledby\"\n           [attr.aria-checked]=\"value\"\n           (focus)=\"focused = true\"\n           (blur)=\"focused = false\"\n           (change)=\"toggle()\"\n           (click)=\"$event.stopPropagation()\">\n\n    <div class=\"ux-toggleswitch-container\">\n        <div class=\"ux-toggleswitch-bg\"></div>\n        <div class=\"ux-toggleswitch-nub\"></div>\n    </div>\n\n    <span class=\"ux-toggleswitch-label\">\n        <ng-content></ng-content>\n    </span>\n</label>",
                    providers: [TOGGLESWITCH_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    ToggleSwitchComponent.propDecorators = {
        "id": [{ type: Input },],
        "name": [{ type: Input },],
        "tabindex": [{ type: Input },],
        "clickable": [{ type: Input },],
        "disabled": [{ type: Input },],
        "ariaLabel": [{ type: Input, args: ['aria-label',] },],
        "ariaLabelledby": [{ type: Input, args: ['aria-labelledby',] },],
        "valueChange": [{ type: Output },],
        "value": [{ type: Input },],
    };
    return ToggleSwitchComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ToggleSwitchModule = (function () {
    function ToggleSwitchModule() {
    }
    ToggleSwitchModule.decorators = [
        { type: NgModule, args: [{
                    imports: [FormsModule],
                    exports: [ToggleSwitchComponent],
                    declarations: [ToggleSwitchComponent]
                },] },
    ];
    return ToggleSwitchModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ToolbarSearchButtonDirective = (function () {
    function ToolbarSearchButtonDirective(_elementRef) {
        this._elementRef = _elementRef;
        this.clicked = new EventEmitter();
    }
    Object.defineProperty(ToolbarSearchButtonDirective.prototype, "width", {
        get: /**
         * @return {?}
         */
        function () {
            return this._elementRef.nativeElement.offsetWidth;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ToolbarSearchButtonDirective.prototype.clickHandler = /**
     * @return {?}
     */
    function () {
        this.clicked.emit();
    };
    ToolbarSearchButtonDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxToolbarSearchButton]'
                },] },
    ];
    /** @nocollapse */
    ToolbarSearchButtonDirective.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    ToolbarSearchButtonDirective.propDecorators = {
        "clicked": [{ type: Output },],
        "clickHandler": [{ type: HostListener, args: ['click',] },],
    };
    return ToolbarSearchButtonDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ KEYS = {
    ENTER: 13,
    ESCAPE: 27
};
var ToolbarSearchFieldDirective = (function () {
    function ToolbarSearchFieldDirective(_elementRef, _ngModel) {
        this._elementRef = _elementRef;
        this._ngModel = _ngModel;
        this.cancel = new EventEmitter();
        this.submit = new EventEmitter();
    }
    Object.defineProperty(ToolbarSearchFieldDirective.prototype, "text", {
        get: /**
         * @return {?}
         */
        function () {
            // Use ngModel if specified on the host; otherwise read the DOM
            if (this._ngModel) {
                return this._ngModel.value;
            }
            return this._elementRef.nativeElement.value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ToolbarSearchFieldDirective.prototype.focus = /**
     * @return {?}
     */
    function () {
        var _this = this;
        setTimeout(function () {
            _this._elementRef.nativeElement.focus();
        });
    };
    /**
     * @return {?}
     */
    ToolbarSearchFieldDirective.prototype.blur = /**
     * @return {?}
     */
    function () {
        var _this = this;
        setTimeout(function () {
            _this._elementRef.nativeElement.blur();
        });
    };
    /**
     * @return {?}
     */
    ToolbarSearchFieldDirective.prototype.clear = /**
     * @return {?}
     */
    function () {
        // Use ngModel if specified on the host; otherwise use the DOM
        if (this._ngModel) {
            this._ngModel.reset();
        }
        else {
            this._elementRef.nativeElement.value = '';
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    ToolbarSearchFieldDirective.prototype.keydownHandler = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        setTimeout(function () {
            if (event.keyCode === KEYS.ENTER) {
                _this.submit.emit(_this.text);
            }
            else if (event.keyCode === KEYS.ESCAPE) {
                _this._elementRef.nativeElement.blur();
                _this.cancel.emit();
            }
        });
    };
    ToolbarSearchFieldDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxToolbarSearchField]'
                },] },
    ];
    /** @nocollapse */
    ToolbarSearchFieldDirective.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: NgModel, decorators: [{ type: Optional },] },
    ]; };
    ToolbarSearchFieldDirective.propDecorators = {
        "cancel": [{ type: Output },],
        "submit": [{ type: Output },],
        "keydownHandler": [{ type: HostListener, args: ['keydown', ['$event'],] },],
    };
    return ToolbarSearchFieldDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ToolbarSearchComponent = (function () {
    function ToolbarSearchComponent(_elementRef, _colorService, _document) {
        this._elementRef = _elementRef;
        this._colorService = _colorService;
        this._document = _document;
        this.direction = 'right';
        this.inverse = false;
        this.expandedChange = new EventEmitter();
        this.search = new EventEmitter();
        this._expanded = false;
        this.position = 'relative';
        this.backgroundColor = 'transparent';
    }
    Object.defineProperty(ToolbarSearchComponent.prototype, "expanded", {
        get: /**
         * @return {?}
         */
        function () {
            return this._expanded;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._expanded = value;
            this.expandedChange.emit(value);
            if (value) {
                // Set focus on the input when expanded
                this.field.focus();
            }
            else {
                // Clear text when contracted
                this.field.clear();
                // Remove focus (works around an IE issue where the caret remains visible)
                this.field.blur();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToolbarSearchComponent.prototype, "background", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.backgroundColor = this._colorService.resolve(value) || 'transparent';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToolbarSearchComponent.prototype, "expandedAnimation", {
        get: /**
         * @return {?}
         */
        function () {
            return {
                value: this.expanded ? 'expanded' : 'collapsed',
                params: {
                    initialWidth: this.button.width + 'px'
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ToolbarSearchComponent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // Subscribe to the submit event on the input field, triggering the search event
        this.field.submit.subscribe(function (text) { return _this.search.emit(text); });
        // Subscribe to cancel events coming from the input field
        this.field.cancel.subscribe(function () { return _this.expanded = false; });
        // Subscribe to the button click event
        this.button.clicked.subscribe(function () {
            if (_this.expanded && _this.field.text) {
                _this.search.emit(_this.field.text);
            }
            else {
                _this.expanded = !_this.expanded;
            }
        });
        // Create placeholder element to avoid changing layout when switching to position: absolute
        this.createPlaceholder();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    ToolbarSearchComponent.prototype.animationStart = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event.toState === 'expanded') {
            this.position = 'absolute';
            this.enablePlaceholder(true);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    ToolbarSearchComponent.prototype.animationDone = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event.toState === 'collapsed') {
            this.position = 'relative';
            this.enablePlaceholder(false);
        }
    };
    /**
     * @return {?}
     */
    ToolbarSearchComponent.prototype.createPlaceholder = /**
     * @return {?}
     */
    function () {
        // Get width and height of the component
        var /** @type {?} */ styles = getComputedStyle(this._elementRef.nativeElement);
        // Create invisible div with the same dimensions
        this._placeholder = this._document.createElement('div');
        this._placeholder.style.display = 'none';
        this._placeholder.style.width = this.button.width + 'px';
        this._placeholder.style.height = styles.height;
        this._placeholder.style.visibility = 'hidden';
        // Add as a sibling
        this._elementRef.nativeElement.parentNode.insertBefore(this._placeholder, this._elementRef.nativeElement);
    };
    /**
     * @param {?} enabled
     * @return {?}
     */
    ToolbarSearchComponent.prototype.enablePlaceholder = /**
     * @param {?} enabled
     * @return {?}
     */
    function (enabled) {
        this._placeholder.style.display = (enabled ? 'inline-block' : 'none');
    };
    ToolbarSearchComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-toolbar-search',
                    template: "<ng-content></ng-content>",
                    animations: [
                        trigger('expanded', [
                            state('collapsed', style({
                                width: '{{initialWidth}}'
                            }), {
                                params: { initialWidth: '30px' }
                            }),
                            state('expanded', style({
                                width: '100%'
                            })),
                            transition('collapsed <=> expanded', [animate('0.3s ease-out')])
                        ])
                    ]
                },] },
    ];
    /** @nocollapse */
    ToolbarSearchComponent.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: ColorService, },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT$1,] },] },
    ]; };
    ToolbarSearchComponent.propDecorators = {
        "expanded": [{ type: HostBinding, args: ['class.expanded',] }, { type: Input },],
        "direction": [{ type: Input }, { type: HostBinding, args: ['class',] },],
        "inverse": [{ type: Input }, { type: HostBinding, args: ['class.inverse',] },],
        "background": [{ type: Input },],
        "expandedChange": [{ type: Output },],
        "search": [{ type: Output },],
        "expandedAnimation": [{ type: HostBinding, args: ['@expanded',] },],
        "position": [{ type: HostBinding, args: ['style.position',] },],
        "backgroundColor": [{ type: HostBinding, args: ['style.background-color',] },],
        "field": [{ type: ContentChild, args: [ToolbarSearchFieldDirective,] },],
        "button": [{ type: ContentChild, args: [ToolbarSearchButtonDirective,] },],
        "animationStart": [{ type: HostListener, args: ['@expanded.start', ['$event'],] },],
        "animationDone": [{ type: HostListener, args: ['@expanded.done', ['$event'],] },],
    };
    return ToolbarSearchComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ DECLARATIONS$5 = [
    ToolbarSearchComponent,
    ToolbarSearchFieldDirective,
    ToolbarSearchButtonDirective
];
var ToolbarSearchModule = (function () {
    function ToolbarSearchModule() {
    }
    ToolbarSearchModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule
                    ],
                    exports: DECLARATIONS$5,
                    declarations: DECLARATIONS$5,
                    providers: [],
                },] },
    ];
    return ToolbarSearchModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var AudioService = (function () {
    function AudioService(_http) {
        this._http = _http;
    }
    /**
     * @param {?} mediaElement
     * @return {?}
     */
    AudioService.prototype.getAudioFileMetadata = /**
     * @param {?} mediaElement
     * @return {?}
     */
    function (mediaElement) {
        var _this = this;
        return Observable.create(function (observer) {
            _this._http.request(mediaElement.src, { responseType: ResponseContentType.Blob }).subscribe(function (response) {
                var /** @type {?} */ filename = mediaElement.src.substring(mediaElement.src.lastIndexOf('/') + 1);
                var /** @type {?} */ extension = mediaElement.src.substring(mediaElement.src.lastIndexOf('.') + 1).toLowerCase();
                var /** @type {?} */ blob = response.blob();
                var /** @type {?} */ description;
                switch (extension) {
                    case 'mp3':
                        description = 'MPEG audio layer 3 file';
                        break;
                    case 'wma':
                        description = 'Windows media audio file';
                        break;
                    case 'wav':
                        description = 'WAVE audio file';
                        break;
                    case 'ogg':
                        description = 'Ogg Vorbis file';
                        break;
                    case 'aac':
                        description = 'Advanced audio coding file';
                        break;
                    case 'midi':
                        description = 'Musical instrument digital interface file';
                        break;
                    default:
                        description = 'Audio file';
                        break;
                }
                observer.next({
                    filename: filename,
                    extension: extension,
                    description: description,
                    size: blob.size
                });
            });
        });
    };
    /**
     * @param {?} url
     * @return {?}
     */
    AudioService.prototype.getWaveformFromUrl = /**
     * @param {?} url
     * @return {?}
     */
    function (url) {
        var _this = this;
        // if audio context is not support return a stream of empty data
        if (!(/** @type {?} */ (window)).AudioContext) {
            return of([new Float32Array(0)]);
        }
        this._audioContext = new AudioContext();
        this.createVolumeNode();
        this.createAnalyserNode();
        return Observable.create(function (observer) {
            // load the media from the URL provided
            // load the media from the URL provided
            _this._http.request(url, { responseType: ResponseContentType.ArrayBuffer }).subscribe(function (response) {
                _this.getAudioBuffer(response.arrayBuffer()).subscribe(function (audioBuffer) {
                    // create the buffer source
                    // create the buffer source
                    _this.createBufferSource(audioBuffer);
                    var /** @type {?} */ dataPoints = [];
                    var /** @type {?} */ channels = _this._audioBuffer.numberOfChannels;
                    // extract the data from each channel
                    for (var /** @type {?} */ channelIdx = 0; channelIdx < channels; channelIdx++) {
                        dataPoints[channelIdx] = _this._audioBuffer.getChannelData(channelIdx);
                    }
                    observer.next(dataPoints);
                    observer.complete();
                    // cleanup after ourselves
                    dataPoints = null;
                }, function (error) { return observer.error(error); });
            }, function (error) { return observer.error(error); });
        });
    };
    /**
     * @param {?=} channels
     * @param {?=} skip
     * @return {?}
     */
    AudioService.prototype.getWaveformPoints = /**
     * @param {?=} channels
     * @param {?=} skip
     * @return {?}
     */
    function (channels, skip) {
        if (channels === void 0) { channels = []; }
        if (skip === void 0) { skip = 1000; }
        var /** @type {?} */ waveform = [];
        var /** @type {?} */ duration = channels.length > 0 ? channels[0].length : 0;
        var _loop_1 = function (idx) {
            // get all the channel data for a specific point
            var /** @type {?} */ points = channels.map(function (channel) { return channel[idx]; });
            // find the minimum point and maximum points at each position across all channels
            waveform.push({
                min: points.reduce(function (previous, current) { return current < previous ? current : previous; }),
                max: points.reduce(function (previous, current) { return current > previous ? current : previous; })
            });
        };
        // convert each channel data to a series of waveform points
        for (var /** @type {?} */ idx = 0; idx < duration; idx += skip) {
            _loop_1(idx);
        }
        return waveform;
    };
    /**
     * @param {?} arrayBuffer
     * @return {?}
     */
    AudioService.prototype.getAudioBuffer = /**
     * @param {?} arrayBuffer
     * @return {?}
     */
    function (arrayBuffer) {
        var _this = this;
        return Observable.create(function (observer) {
            _this.getOfflineAudioContext().decodeAudioData(arrayBuffer, function (audioBuffer) {
                observer.next(audioBuffer);
                observer.complete();
            }, function (error) { return observer.error(error); });
        });
    };
    /**
     * @return {?}
     */
    AudioService.prototype.getOfflineAudioContext = /**
     * @return {?}
     */
    function () {
        return new OfflineAudioContext(1, 2, this._audioContext.sampleRate || 44100);
    };
    /**
     * @param {?} audioBuffer
     * @return {?}
     */
    AudioService.prototype.createBufferSource = /**
     * @param {?} audioBuffer
     * @return {?}
     */
    function (audioBuffer) {
        this.disconnectSource();
        this._audioBuffer = audioBuffer;
        this._audioBufferSource = this._audioContext.createBufferSource();
        this._audioBufferSource.buffer = this._audioBuffer;
        this._audioBufferSource.connect(this._analyserNode);
    };
    /**
     * @return {?}
     */
    AudioService.prototype.createVolumeNode = /**
     * @return {?}
     */
    function () {
        this._gainNode = this._audioContext.createGain();
        this._gainNode.connect(this._audioContext.destination);
    };
    /**
     * @return {?}
     */
    AudioService.prototype.createAnalyserNode = /**
     * @return {?}
     */
    function () {
        this._analyserNode = this._audioContext.createAnalyser();
        this._analyserNode.connect(this._gainNode);
    };
    /**
     * @return {?}
     */
    AudioService.prototype.disconnectSource = /**
     * @return {?}
     */
    function () {
        if (this._audioBufferSource) {
            this._audioBufferSource.disconnect();
        }
    };
    AudioService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    AudioService.ctorParameters = function () { return [
        { type: Http, },
    ]; };
    return AudioService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var AudioServiceModule = (function () {
    function AudioServiceModule() {
    }
    AudioServiceModule.decorators = [
        { type: NgModule, args: [{
                    imports: [HttpModule],
                    providers: [AudioService]
                },] },
    ];
    return AudioServiceModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var FrameExtractionService = (function () {
    function FrameExtractionService() {
    }
    /**
     * @param {?} source
     * @return {?}
     */
    FrameExtractionService.prototype.createVideoPlayer = /**
     * @param {?} source
     * @return {?}
     */
    function (source) {
        var /** @type {?} */ videoPlayer = document.createElement('video');
        videoPlayer.preload = 'auto';
        videoPlayer.src = source;
        return videoPlayer;
    };
    /**
     * @param {?} width
     * @param {?} height
     * @return {?}
     */
    FrameExtractionService.prototype.createCanvas = /**
     * @param {?} width
     * @param {?} height
     * @return {?}
     */
    function (width, height) {
        var /** @type {?} */ canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        return canvas;
    };
    /**
     * @param {?} videoPlayer
     * @param {?} time
     * @return {?}
     */
    FrameExtractionService.prototype.goToFrame = /**
     * @param {?} videoPlayer
     * @param {?} time
     * @return {?}
     */
    function (videoPlayer, time) {
        videoPlayer.currentTime = time;
        return fromEvent(videoPlayer, time === 0 ? 'loadeddata' : 'seeked');
    };
    /**
     * @param {?} videoPlayer
     * @param {?} canvas
     * @param {?} time
     * @param {?=} width
     * @param {?=} height
     * @return {?}
     */
    FrameExtractionService.prototype.getThumbnail = /**
     * @param {?} videoPlayer
     * @param {?} canvas
     * @param {?} time
     * @param {?=} width
     * @param {?=} height
     * @return {?}
     */
    function (videoPlayer, canvas, time, width, height) {
        var _this = this;
        if (width === void 0) { width = 160; }
        if (height === void 0) { height = 90; }
        return Observable.create(function (observer) {
            // go to specified frame
            var /** @type {?} */ subscription = _this.goToFrame(videoPlayer, time).subscribe(function (event) {
                // create image from current frame
                canvas.getContext('2d').drawImage(videoPlayer, 0, 0, width, height);
                observer.next({ image: canvas.toDataURL(), width: width, height: height, time: time });
                observer.complete();
                subscription.unsubscribe();
            });
        });
    };
    /**
     * @param {?} source
     * @param {?} width
     * @param {?} height
     * @param {?} time
     * @return {?}
     */
    FrameExtractionService.prototype.getFrameThumbnail = /**
     * @param {?} source
     * @param {?} width
     * @param {?} height
     * @param {?} time
     * @return {?}
     */
    function (source, width, height, time) {
        // create required elements
        var /** @type {?} */ videoPlayer = this.createVideoPlayer(source);
        var /** @type {?} */ canvas = this.createCanvas(width, height);
        var /** @type {?} */ frameSubscription = this.getThumbnail(videoPlayer, canvas, time, width, height);
        // ensure we release memory after we are finished
        frameSubscription.subscribe(null, null, function () {
            videoPlayer = null;
            canvas = null;
        });
        return frameSubscription;
    };
    /**
     * @param {?} source
     * @param {?} width
     * @param {?} height
     * @param {?} start
     * @param {?} end
     * @param {?=} skip
     * @return {?}
     */
    FrameExtractionService.prototype.getFrameThumbnails = /**
     * @param {?} source
     * @param {?} width
     * @param {?} height
     * @param {?} start
     * @param {?} end
     * @param {?=} skip
     * @return {?}
     */
    function (source, width, height, start, end, skip) {
        var _this = this;
        if (skip === void 0) { skip = 5; }
        // create required elements
        var /** @type {?} */ videoPlayer = this.createVideoPlayer(source);
        var /** @type {?} */ canvas = this.createCanvas(width, height);
        return Observable.create(function (observer) {
            fromEvent(videoPlayer, 'loadedmetadata').subscribe(function () {
                // calculate the frames required
                var /** @type {?} */ frames = [];
                for (var /** @type {?} */ idx = start; idx < end; idx += skip) {
                    frames.push(_this.getThumbnail(videoPlayer, canvas, idx, width, height));
                }
                concat.apply(void 0, __spread(frames)).subscribe(function (frame) { return observer.next(frame); }, null, function () {
                    videoPlayer = null;
                    canvas = null;
                    observer.complete();
                });
            });
        });
    };
    FrameExtractionService.decorators = [
        { type: Injectable },
    ];
    return FrameExtractionService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var FrameExtractionModule = (function () {
    function FrameExtractionModule() {
    }
    FrameExtractionModule.decorators = [
        { type: NgModule, args: [{
                    providers: [FrameExtractionService],
                },] },
    ];
    return FrameExtractionModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var MediaPlayerService = (function () {
    function MediaPlayerService(_frameExtractionService) {
        var _this = this;
        this._frameExtractionService = _frameExtractionService;
        this.type = 'video';
        this.loaded = false;
        /*
                Create observables for media player events
            */
        this.playing = new BehaviorSubject(false);
        this.initEvent = new BehaviorSubject(false);
        this.abortEvent = new Subject();
        this.canPlayEvent = new BehaviorSubject(false);
        this.canPlayThroughEvent = new BehaviorSubject(false);
        this.durationChangeEvent = new Subject();
        this.endedEvent = new Subject();
        this.errorEvent = new Subject();
        this.loadedDataEvent = new Subject();
        this.loadedMetadataEvent = new Subject();
        this.loadStartEvent = new Subject();
        this.pauseEvent = new Subject();
        this.playEvent = new Subject();
        this.playingEvent = new Subject();
        this.rateChangeEvent = new Subject();
        this.seekedEvent = new Subject();
        this.seekingEvent = new Subject();
        this.stalledEvent = new Subject();
        this.suspendEvent = new Subject();
        this.timeUpdateEvent = new Subject();
        this.volumeChangeEvent = new Subject();
        this.waitingEvent = new Subject();
        this.mediaClickEvent = new Subject();
        this.fullscreenEvent = new BehaviorSubject(false);
        this.quietModeEvent = new BehaviorSubject(false);
        this.progressEvent = Observable.create(function (observer) {
            // repeat until the whole video has fully loaded
            var /** @type {?} */ interval = setInterval(function () {
                var /** @type {?} */ buffered = /** @type {?} */ (_this._mediaPlayer.buffered);
                observer.next(buffered);
                if (buffered.length === 1 && buffered.start(0) === 0 && buffered.end(0) === _this.duration) {
                    observer.complete();
                    clearInterval(interval);
                }
            }, 1000);
        });
        this._fullscreen = false;
    }
    Object.defineProperty(MediaPlayerService.prototype, "mediaPlayer", {
        /*
            Create all the getters and setters the can be used by media player extensions
        */
        get: /**
         * @return {?}
         */
        function () {
            return this._mediaPlayer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "quietMode", {
        get: /**
         * @return {?}
         */
        function () {
            return this._quietMode;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            // quiet mode cannot be enabled on audio player
            if (this.type === 'audio') {
                value = false;
            }
            this._quietMode = value;
            this.quietModeEvent.next(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "mediaPlayerWidth", {
        get: /**
         * @return {?}
         */
        function () {
            return this._mediaPlayer ? this._mediaPlayer.offsetWidth : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "mediaPlayerHeight", {
        get: /**
         * @return {?}
         */
        function () {
            return this._mediaPlayer ? this._mediaPlayer.offsetHeight : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "audioTracks", {
        get: /**
         * @return {?}
         */
        function () {
            return this._mediaPlayer ? this._mediaPlayer.audioTracks : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "autoplay", {
        get: /**
         * @return {?}
         */
        function () {
            return this._mediaPlayer ? this._mediaPlayer.autoplay : false;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._mediaPlayer.autoplay = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "buffered", {
        get: /**
         * @return {?}
         */
        function () {
            return this._mediaPlayer ? this._mediaPlayer.buffered : new TimeRanges();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "crossOrigin", {
        get: /**
         * @return {?}
         */
        function () {
            return this._mediaPlayer ? this._mediaPlayer.crossOrigin : null;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._mediaPlayer.crossOrigin = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "currentSrc", {
        get: /**
         * @return {?}
         */
        function () {
            return this._mediaPlayer ? this._mediaPlayer.currentSrc : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "currentTime", {
        get: /**
         * @return {?}
         */
        function () {
            return this._mediaPlayer ? this._mediaPlayer.currentTime : 0;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._mediaPlayer.currentTime = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "defaultMuted", {
        get: /**
         * @return {?}
         */
        function () {
            return this._mediaPlayer ? this._mediaPlayer.defaultMuted : false;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._mediaPlayer.defaultMuted = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "defaultPlaybackRate", {
        get: /**
         * @return {?}
         */
        function () {
            return this._mediaPlayer ? this._mediaPlayer.defaultPlaybackRate : 1;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._mediaPlayer.defaultPlaybackRate = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "duration", {
        get: /**
         * @return {?}
         */
        function () {
            return this._mediaPlayer ? this._mediaPlayer.duration : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "ended", {
        get: /**
         * @return {?}
         */
        function () {
            return this._mediaPlayer ? this._mediaPlayer.ended : false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "loop", {
        get: /**
         * @return {?}
         */
        function () {
            return this._mediaPlayer ? this._mediaPlayer.loop : false;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._mediaPlayer.loop = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "muted", {
        get: /**
         * @return {?}
         */
        function () {
            return this._mediaPlayer ? this._mediaPlayer.muted : false;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._mediaPlayer.muted = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "networkState", {
        get: /**
         * @return {?}
         */
        function () {
            return this._mediaPlayer.networkState;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "paused", {
        get: /**
         * @return {?}
         */
        function () {
            return this._mediaPlayer ? this._mediaPlayer.paused : true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "playbackRate", {
        get: /**
         * @return {?}
         */
        function () {
            return this._mediaPlayer ? this._mediaPlayer.playbackRate : 1;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._mediaPlayer.playbackRate = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "played", {
        get: /**
         * @return {?}
         */
        function () {
            return this._mediaPlayer ? this._mediaPlayer.played : new TimeRanges();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "preload", {
        get: /**
         * @return {?}
         */
        function () {
            return this._mediaPlayer ? this._mediaPlayer.preload : 'auto';
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._mediaPlayer.preload = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "readyState", {
        get: /**
         * @return {?}
         */
        function () {
            return this._mediaPlayer ? this._mediaPlayer.readyState : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "seekable", {
        get: /**
         * @return {?}
         */
        function () {
            return this._mediaPlayer ? this._mediaPlayer.seekable : new TimeRanges();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "seeking", {
        get: /**
         * @return {?}
         */
        function () {
            return this._mediaPlayer ? this._mediaPlayer.seeking : false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "src", {
        get: /**
         * @return {?}
         */
        function () {
            return this._mediaPlayer ? this._mediaPlayer.src : '';
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._mediaPlayer.src = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "textTracks", {
        get: /**
         * @return {?}
         */
        function () {
            return this._mediaPlayer ? this._mediaPlayer.textTracks : new TextTrackList();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "videoTracks", {
        get: /**
         * @return {?}
         */
        function () {
            return this._mediaPlayer ? this._mediaPlayer.videoTracks : new VideoTrackList();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "volume", {
        get: /**
         * @return {?}
         */
        function () {
            return this._mediaPlayer ? this._mediaPlayer.volume : 1;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._mediaPlayer.volume = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "fullscreen", {
        get: /**
         * @return {?}
         */
        function () {
            return this._mediaPlayer ? this._fullscreen : false;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._fullscreen = value;
            this.fullscreenEvent.next(value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} hostElement
     * @param {?} mediaPlayer
     * @return {?}
     */
    MediaPlayerService.prototype.setMediaPlayer = /**
     * @param {?} hostElement
     * @param {?} mediaPlayer
     * @return {?}
     */
    function (hostElement, mediaPlayer) {
        this._hostElement = hostElement;
        this._mediaPlayer = mediaPlayer;
        this.initEvent.next(true);
    };
    /**
     * Toggle playing state
     */
    /**
     * Toggle playing state
     * @return {?}
     */
    MediaPlayerService.prototype.togglePlay = /**
     * Toggle playing state
     * @return {?}
     */
    function () {
        // prevent any action is not loaded
        if (this.loaded === false) {
            return;
        }
        if (this.paused) {
            this.play();
        }
        else {
            this.pause();
        }
    };
    /**
     * Starts playing the audio/video
     */
    /**
     * Starts playing the audio/video
     * @return {?}
     */
    MediaPlayerService.prototype.play = /**
     * Starts playing the audio/video
     * @return {?}
     */
    function () {
        this._mediaPlayer.play();
    };
    /**
     * Pauses the currently playing audio/video
     */
    /**
     * Pauses the currently playing audio/video
     * @return {?}
     */
    MediaPlayerService.prototype.pause = /**
     * Pauses the currently playing audio/video
     * @return {?}
     */
    function () {
        this._mediaPlayer.pause();
    };
    /**
     * Re-loads the audio/video element
     */
    /**
     * Re-loads the audio/video element
     * @return {?}
     */
    MediaPlayerService.prototype.load = /**
     * Re-loads the audio/video element
     * @return {?}
     */
    function () {
        this._mediaPlayer.load();
    };
    /**
     * Checks if the browser can play the specified audio/video type
     */
    /**
     * Checks if the browser can play the specified audio/video type
     * @param {?} type
     * @return {?}
     */
    MediaPlayerService.prototype.canPlayType = /**
     * Checks if the browser can play the specified audio/video type
     * @param {?} type
     * @return {?}
     */
    function (type) {
        return this._mediaPlayer.canPlayType(type);
    };
    /**
     * Adds a new text track to the audio/video
     */
    /**
     * Adds a new text track to the audio/video
     * @param {?} kind
     * @param {?} label
     * @param {?} language
     * @return {?}
     */
    MediaPlayerService.prototype.addTextTrack = /**
     * Adds a new text track to the audio/video
     * @param {?} kind
     * @param {?} label
     * @param {?} language
     * @return {?}
     */
    function (kind, label, language) {
        return this._mediaPlayer.addTextTrack(kind, label, language);
    };
    /**
     * Attempt to display media in fullscreen mode
     */
    /**
     * Attempt to display media in fullscreen mode
     * @return {?}
     */
    MediaPlayerService.prototype.requestFullscreen = /**
     * Attempt to display media in fullscreen mode
     * @return {?}
     */
    function () {
        if (this._hostElement.requestFullscreen) {
            this._hostElement.requestFullscreen();
        }
        else if (this._hostElement.webkitRequestFullscreen) {
            this._hostElement.webkitRequestFullscreen();
        }
        else if ((/** @type {?} */ (this._hostElement)).msRequestFullscreen) {
            (/** @type {?} */ (this._hostElement)).msRequestFullscreen();
        }
        else if ((/** @type {?} */ (this._hostElement)).mozRequestFullScreen) {
            (/** @type {?} */ (this._hostElement)).mozRequestFullScreen();
        }
    };
    /**
     * Exit full screen mode
     */
    /**
     * Exit full screen mode
     * @return {?}
     */
    MediaPlayerService.prototype.exitFullscreen = /**
     * Exit full screen mode
     * @return {?}
     */
    function () {
        if ((/** @type {?} */ (this._hostElement)).exitFullscreen) {
            document.exitFullscreen();
        }
        else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
        else if ((/** @type {?} */ (document)).msExitFullscreen) {
            (/** @type {?} */ (document)).msExitFullscreen();
        }
        else if ((/** @type {?} */ (document)).mozCancelFullScreen) {
            (/** @type {?} */ (document)).mozCancelFullScreen();
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MediaPlayerService.prototype.fullscreenChange = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.fullscreen = (/** @type {?} */ (document)).fullscreen || document.webkitIsFullScreen || (/** @type {?} */ (document)).mozFullScreen || (/** @type {?} */ (document)).msFullscreenElement !== null && (/** @type {?} */ (document)).msFullscreenElement !== undefined;
        this.fullscreenEvent.next(this.fullscreen);
    };
    /**
     * Toggle Fullscreen State
     */
    /**
     * Toggle Fullscreen State
     * @return {?}
     */
    MediaPlayerService.prototype.toggleFullscreen = /**
     * Toggle Fullscreen State
     * @return {?}
     */
    function () {
        if (this.fullscreen) {
            this.exitFullscreen();
        }
        else {
            this.requestFullscreen();
        }
    };
    /**
     * Extract the frames from the video
     */
    /**
     * Extract the frames from the video
     * @param {?} width
     * @param {?} height
     * @param {?} skip
     * @return {?}
     */
    MediaPlayerService.prototype.getFrames = /**
     * Extract the frames from the video
     * @param {?} width
     * @param {?} height
     * @param {?} skip
     * @return {?}
     */
    function (width, height, skip) {
        if (this.type === 'video') {
            return this._frameExtractionService.getFrameThumbnails(this.source, width, height, 0, this.duration, 10);
        }
        return from([]);
    };
    MediaPlayerService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    MediaPlayerService.ctorParameters = function () { return [
        { type: FrameExtractionService, },
    ]; };
    return MediaPlayerService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var MediaPlayerComponent = (function () {
    function MediaPlayerComponent(mediaPlayerService, _audioService, _elementRef) {
        var _this = this;
        this.mediaPlayerService = mediaPlayerService;
        this._audioService = _audioService;
        this._elementRef = _elementRef;
        this.hovering = false;
        this._onDestroy = new Subject();
        // show controls when hovering and in quiet mode
        fromEvent(this._elementRef.nativeElement, 'mousemove').pipe(switchMap(function (event) {
            _this.hovering = true;
            return of(event);
        }), debounceTime(2000), takeUntil(this._onDestroy)).subscribe(function () { return _this.hovering = false; });
    }
    Object.defineProperty(MediaPlayerComponent.prototype, "source", {
        get: /**
         * @return {?}
         */
        function () {
            return this.mediaPlayerService.source;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.mediaPlayerService.source = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerComponent.prototype, "type", {
        get: /**
         * @return {?}
         */
        function () {
            return this.mediaPlayerService.type;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.mediaPlayerService.type = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerComponent.prototype, "quietMode", {
        get: /**
         * @return {?}
         */
        function () {
            return this.mediaPlayerService.quietMode;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.mediaPlayerService.quietMode = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MediaPlayerComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.mediaPlayerService.setMediaPlayer(this._elementRef.nativeElement, this._playerRef.nativeElement);
        this.audioMetadata = this._audioService.getAudioFileMetadata(this._playerRef.nativeElement);
        this.mediaPlayerService.playingEvent.pipe(takeUntil(this._onDestroy)).subscribe(function () { return _this.mediaPlayerService.playing.next(true); });
        this.mediaPlayerService.pauseEvent.pipe(takeUntil(this._onDestroy)).subscribe(function () { return _this.mediaPlayerService.playing.next(false); });
        this.mediaPlayerService.mediaClickEvent.pipe(takeUntil(this._onDestroy)).subscribe(function () { return _this.mediaPlayerService.togglePlay(); });
        this.mediaPlayerService.loadedMetadataEvent.pipe(takeUntil(this._onDestroy)).subscribe(function () { return _this.mediaPlayerService.loaded = true; });
    };
    /**
     * @return {?}
     */
    MediaPlayerComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._onDestroy.next();
        this._onDestroy.complete();
    };
    MediaPlayerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-media-player',
                    template: "<div class=\"video-player-container\" *ngIf=\"type === 'video'\">\n\n    <video class=\"video-player\"\n        #player\n        [src]=\"source\"\n        (abort)=\"mediaPlayerService.abortEvent.next()\"\n        (canplay)=\"mediaPlayerService.canPlayEvent.next(true)\"\n        (canplaythrough)=\"mediaPlayerService.canPlayThroughEvent.next(true)\"\n        (durationchange)=\"mediaPlayerService.durationChangeEvent.next(player.duration)\"\n        (ended)=\"mediaPlayerService.endedEvent.next()\"\n        (error)=\"mediaPlayerService.errorEvent.next($event)\"\n        (loadeddata)=\"mediaPlayerService.loadedDataEvent.next($event)\"\n        (loadedmetadata)=\"mediaPlayerService.loadedMetadataEvent.next($event)\"\n        (loadstart)=\"mediaPlayerService.loadStartEvent.next()\"\n        (pause)=\"mediaPlayerService.pauseEvent.next()\"\n        (play)=\"mediaPlayerService.playEvent.next()\"\n        (playing)=\"mediaPlayerService.playingEvent.next(!player.paused)\"\n        (ratechange)=\"mediaPlayerService.rateChangeEvent.next(player.playbackRate)\"\n        (seeked)=\"mediaPlayerService.seekedEvent.next(player.currentTime)\"\n        (seeking)=\"mediaPlayerService.seekingEvent.next(player.currentTime)\"\n        (stalled)=\"mediaPlayerService.stalledEvent.next()\"\n        (suspend)=\"mediaPlayerService.suspendEvent.next()\"\n        (timeupdate)=\"mediaPlayerService.timeUpdateEvent.next(player.currentTime)\"\n        (volumechange)=\"mediaPlayerService.volumeChangeEvent.next(player.volume)\"\n        (waiting)=\"mediaPlayerService.waitingEvent.next()\"\n        (click)=\"mediaPlayerService.mediaClickEvent.next($event)\">\n    </video>\n\n    <div class=\"video-overlay\" [class.playing]=\"mediaPlayerService.playing | async\">\n        <svg class=\"play-graphic\" x=\"0px\" y=\"0px\" viewBox=\"0 0 64 64\">\n            <circle class=\"play-circle\" cx=\"32.2\" cy=\"31.8\" r=\"31.8\" />\n            <polygon class=\"play-triangle\" points=\"23,14.1 23,50.8 48.3,32.5\" />\n        </svg>\n    </div>\n\n</div>\n\n\n<div class=\"audio-player\" *ngIf=\"type === 'audio'\">\n\n    <svg width=\"24px\" height=\"24px\" viewBox=\"0 0 24 24\">\n        <g stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n            <g transform=\"translate(-98.000000, -458.000000)\">\n                <g transform=\"translate(98.000000, 458.000000)\">\n                    <path d=\"M4.5,0.5 L18.0435308,0.5 L23.5,6.22251502 L23.5,23.5 L4.5,23.5 L4.5,0.5 Z\" fill=\"#CCEAE2\"></path>\n                    <path d=\"M4.5,8 L4.5,0.5 L18,0.5 L23.5,6 L23.5,23.5 L18,23.5\" stroke=\"#60798D\" fill=\"#CCEAE2\"></path>\n                    <path d=\"M4,13.5 L0.5,13.5 L0.5,18.5 L4,18.5 L9.5,22.5 L9.5,9.5 L4,13.5 Z\" stroke=\"#60798D\" fill=\"#85D2BE\"></path>\n                    <path d=\"M11.5,12.5137939 C13.7576225,12.5137939 14.5,14.3709236 14.5,16 C14.5,17.6849236 13.7089152,19.5420532 11.5,19.5420532\"\n                        stroke=\"#60798D\"></path>\n                    <path d=\"M11.5,9 C15.8037643,9.04168701 18.5,11.6604805 18.5,16 C18.5,20.3395195 15.8804302,23.0079956 11.5,23\" stroke=\"#60798D\"></path>\n                    <path d=\"M17.5219116,0.761413574 L17.5219116,6 L23,6\" stroke=\"#60798D\" fill=\"#85D2BE\"></path>\n                </g>\n            </g>\n        </g>\n    </svg>\n\n    <p class=\"audio-file-name\">{{ (audioMetadata | async)?.filename }}</p>\n    <p class=\"audio-file-format\">{{ (audioMetadata | async)?.description }}</p>\n    <p class=\"audio-file-size\">{{ (audioMetadata | async)?.size | fileSize }}</p>\n\n    <audio #player\n        [src]=\"source\"\n        (abort)=\"mediaPlayerService.abortEvent.next()\"\n        (canplay)=\"mediaPlayerService.canPlayEvent.next(true)\"\n        (canplaythrough)=\"mediaPlayerService.canPlayThroughEvent.next(true)\"\n        (durationchange)=\"mediaPlayerService.durationChangeEvent.next(player.duration)\"\n        (ended)=\"mediaPlayerService.endedEvent.next()\"\n        (error)=\"mediaPlayerService.errorEvent.next($event)\"\n        (loadeddata)=\"mediaPlayerService.loadedDataEvent.next($event)\"\n        (loadedmetadata)=\"mediaPlayerService.loadedMetadataEvent.next($event)\"\n        (loadstart)=\"mediaPlayerService.loadStartEvent.next()\"\n        (pause)=\"mediaPlayerService.pauseEvent.next()\"\n        (play)=\"mediaPlayerService.playEvent.next()\"\n        (playing)=\"mediaPlayerService.playingEvent.next(!player.paused)\"\n        (ratechange)=\"mediaPlayerService.rateChangeEvent.next(player.playbackRate)\"\n        (seeked)=\"mediaPlayerService.seekedEvent.next(player.currentTime)\"\n        (seeking)=\"mediaPlayerService.seekingEvent.next(player.currentTime)\"\n        (stalled)=\"mediaPlayerService.stalledEvent.next()\"\n        (suspend)=\"mediaPlayerService.suspendEvent.next()\"\n        (timeupdate)=\"mediaPlayerService.timeUpdateEvent.next(player.currentTime)\"\n        (volumechange)=\"mediaPlayerService.volumeChangeEvent.next(player.volume)\"\n        (waiting)=\"mediaPlayerService.waitingEvent.next()\"\n        (click)=\"mediaPlayerService.mediaClickEvent.next($event)\">\n    </audio>\n</div>\n\n<div class=\"control-bar\">\n    <ux-media-player-timeline></ux-media-player-timeline>\n    <ux-media-player-controls></ux-media-player-controls>\n</div>",
                    providers: [MediaPlayerService],
                    host: {
                        'tabindex': '0',
                        '(keydown.Space)': 'mediaPlayerService.togglePlay()',
                        '[class.standard]': '!mediaPlayerService.fullscreen',
                        '[class.fullscreen]': 'mediaPlayerService.fullscreen',
                        '[class.quiet]': 'quietMode && type === "video" || mediaPlayerService.fullscreen',
                        '[class.hover]': 'hovering',
                        '[class.video]': 'type === "video"',
                        '[class.audio]': 'type === "audio"',
                        '(mouseenter)': 'hovering = true',
                        '(mouseleave)': 'hovering = false',
                        '(document:webkitfullscreenchange)': 'mediaPlayerService.fullscreenChange($event)',
                        '(document:mozfullscreenchange)': 'mediaPlayerService.fullscreenChange($event)',
                        '(document:MSFullscreenChange)': 'mediaPlayerService.fullscreenChange($event)'
                    }
                },] },
    ];
    /** @nocollapse */
    MediaPlayerComponent.ctorParameters = function () { return [
        { type: MediaPlayerService, },
        { type: AudioService, },
        { type: ElementRef, },
    ]; };
    MediaPlayerComponent.propDecorators = {
        "_playerRef": [{ type: ViewChild, args: ['player',] },],
        "source": [{ type: Input },],
        "type": [{ type: Input },],
        "quietMode": [{ type: Input },],
    };
    return MediaPlayerComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var MediaPlayerBaseExtensionDirective = (function () {
    function MediaPlayerBaseExtensionDirective(mediaPlayerService) {
        this.mediaPlayerService = mediaPlayerService;
    }
    MediaPlayerBaseExtensionDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[mediaPlayerBaseExtension]'
                },] },
    ];
    /** @nocollapse */
    MediaPlayerBaseExtensionDirective.ctorParameters = function () { return [
        { type: MediaPlayerService, },
    ]; };
    return MediaPlayerBaseExtensionDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var MediaPlayerTimelineExtensionComponent = (function (_super) {
    __extends(MediaPlayerTimelineExtensionComponent, _super);
    function MediaPlayerTimelineExtensionComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.current = 0;
        _this.position = 0;
        _this.duration = 0;
        _this.buffered = [];
        _this.mouseDown = false;
        _this.quietMode = false;
        _this.fullscreen = false;
        _this.scrub = { visible: false, position: 0, time: 0 };
        _this._onDestroy = new Subject();
        return _this;
    }
    /**
     * @return {?}
     */
    MediaPlayerTimelineExtensionComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // watch for changes to the current time
        this.mediaPlayerService.durationChangeEvent.pipe(takeUntil(this._onDestroy)).subscribe(function (duration) { return _this.duration = duration; });
        this.mediaPlayerService.quietModeEvent.pipe(takeUntil(this._onDestroy)).subscribe(function (quietMode) { return _this.quietMode = quietMode; });
        this.mediaPlayerService.fullscreenEvent.pipe(takeUntil(this._onDestroy)).subscribe(function (fullscreen) {
            _this.fullscreen = fullscreen;
            _this.scrub.position = 0;
        });
        this.mediaPlayerService.timeUpdateEvent.pipe(takeUntil(this._onDestroy)).subscribe(function (current) {
            _this.current = current;
            _this.position = (_this.current / _this.duration) * 100;
        });
        this.mediaPlayerService.progressEvent.pipe(takeUntil(this._onDestroy)).subscribe(function (buffered) {
            _this.buffered = [];
            for (var /** @type {?} */ idx = 0; idx < buffered.length; idx++) {
                _this.buffered.push({ start: (buffered.start(idx) / _this.duration) * 100, end: (buffered.end(idx) / _this.duration) * 100 });
            }
        });
    };
    /**
     * @return {?}
     */
    MediaPlayerTimelineExtensionComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ mousedown$ = fromEvent(this.thumb.nativeElement, 'mousedown');
        var /** @type {?} */ mousemove$ = fromEvent(document, 'mousemove');
        var /** @type {?} */ mouseup$ = fromEvent(document, 'mouseup');
        mousedown$.pipe(switchMap(function () { return mousemove$.pipe(takeUntil(mouseup$)); }), takeUntil(this._onDestroy)).subscribe(function () { return _this.scrub.visible = false; });
    };
    /**
     * @return {?}
     */
    MediaPlayerTimelineExtensionComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._onDestroy.next();
        this._onDestroy.complete();
    };
    /**
     * @param {?=} event
     * @return {?}
     */
    MediaPlayerTimelineExtensionComponent.prototype.updateScrub = /**
     * @param {?=} event
     * @return {?}
     */
    function (event) {
        var /** @type {?} */ target = /** @type {?} */ (event.target);
        if (target.classList.contains('media-progress-bar-thumb')) {
            return;
        }
        var /** @type {?} */ timeline = /** @type {?} */ (this.timelineRef.nativeElement);
        var /** @type {?} */ bounds = timeline.getBoundingClientRect();
        this.scrub.position = event.offsetX;
        this.scrub.time = (event.offsetX / bounds.width) * this.mediaPlayerService.duration;
        if (this.mouseDown) {
            this.mediaPlayerService.pause();
            this.mediaPlayerService.currentTime = this.scrub.time;
        }
    };
    MediaPlayerTimelineExtensionComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-media-player-timeline',
                    template: "<p class=\"current-time\">{{ current | duration }}</p>\n\n<div #timeline class=\"timeline-bar\" (mouseenter)=\"scrub.visible = true; pop.show()\" (mouseleave)=\"scrub.visible = false; pop.hide()\"\n    (mousemove)=\"updateScrub($event)\" (mouseup)=\"updateScrub($event)\" (mousedown)=\"mouseDown = true; $event.preventDefault()\">\n\n    <div class=\"buffered-bar\" *ngFor=\"let buffer of buffered\" [style.left.%]=\"buffer.start\" [style.width.%]=\"buffer.end - buffer.start\"></div>\n\n    <div class=\"media-progress-bar\" [style.width.%]=\"position\">\n        <div #progressThumb class=\"media-progress-bar-thumb\" (mouseenter)=\"scrub.visible = false; pop.hide(); $event.stopPropagation()\"\n            (mouseleave)=\"scrub.visible = true; pop.show(); $event.stopPropagation()\"></div>\n    </div>\n\n    <div class=\"scrub-handle\"\n         [class.scrub-handle-hidden]=\"!scrub.visible\"\n         [style.left.px]=\"scrub.position\"\n         [uxTooltip]=\"popTemplate\"\n         placement=\"top\"\n         [showTriggers]=\"[]\"\n         [hideTriggers]=\"[]\"\n         #pop=\"ux-tooltip\"\n         [tooltipDelay]=\"100\"\n         [tooltipDisabled]=\"duration === 0\"></div>\n</div>\n\n<p class=\"duration-time\">{{ duration | duration }}</p>\n\n<ng-template #popTemplate>\n    <span>{{ scrub.time | duration }}</span>\n</ng-template>",
                    host: {
                        '(document:mouseup)': 'mouseDown = false',
                        '[class.quiet]': 'quietMode || fullscreen'
                    }
                },] },
    ];
    /** @nocollapse */
    MediaPlayerTimelineExtensionComponent.propDecorators = {
        "thumb": [{ type: ViewChild, args: ['progressThumb',] },],
        "timelineRef": [{ type: ViewChild, args: ['timeline',] },],
    };
    return MediaPlayerTimelineExtensionComponent;
}(MediaPlayerBaseExtensionDirective));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var MediaPlayerControlsExtensionComponent = (function (_super) {
    __extends(MediaPlayerControlsExtensionComponent, _super);
    function MediaPlayerControlsExtensionComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.fullscreen = false;
        _this.volumeActive = false;
        _this.volumeDragging = false;
        _this._volume = 50;
        _this._previousVolume = 50;
        _this._onDestroy = new Subject();
        return _this;
    }
    Object.defineProperty(MediaPlayerControlsExtensionComponent.prototype, "volume", {
        get: /**
         * @return {?}
         */
        function () {
            return this._volume;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value === 0 && this._volume !== 0) {
                this._previousVolume = this._volume;
            }
            this._volume = Math.min(Math.max(value, 0), 100);
            this.mediaPlayerService.volume = this._volume / 100;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MediaPlayerControlsExtensionComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.mediaPlayerService.playEvent.pipe(takeUntil(this._onDestroy)).subscribe(function (_) { return _this.playing = true; });
        this.mediaPlayerService.pauseEvent.pipe(takeUntil(this._onDestroy)).subscribe(function (_) { return _this.playing = false; });
        this.mediaPlayerService.quietModeEvent.pipe(takeUntil(this._onDestroy)).subscribe(function (quietMode) { return _this.quietMode = quietMode; });
        this.mediaPlayerService.volumeChangeEvent.pipe(takeUntil(this._onDestroy)).subscribe(function (volume) { return _this.volume = volume * 100; });
        this.mediaPlayerService.initEvent.pipe(debounceTime(1), filter(function (init) { return init === true; }), takeUntil(this._onDestroy)).subscribe(function () { return _this.volume = _this.mediaPlayerService.volume * 100; });
        this.mediaPlayerService.fullscreenEvent.pipe(takeUntil(this._onDestroy)).subscribe(function (fullscreen) { return _this.fullscreen = fullscreen; });
        var /** @type {?} */ mouseenter$ = fromEvent(this.volumeIcon.nativeElement, 'mouseenter');
        var /** @type {?} */ mouseenterContainer$ = fromEvent(this.volumeContainer.nativeElement, 'mouseenter');
        var /** @type {?} */ mouseleaveContainer$ = fromEvent(this.volumeContainer.nativeElement, 'mouseleave');
        mouseenter$.pipe(takeUntil(this._onDestroy)).subscribe(function () { return _this.volumeActive = true; });
        mouseleaveContainer$.pipe(switchMap(function () { return timer(1500).pipe(takeUntil(mouseenterContainer$)); }), takeUntil(this._onDestroy)).subscribe(function () { return _this.volumeActive = false; });
    };
    /**
     * @return {?}
     */
    MediaPlayerControlsExtensionComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._onDestroy.next();
        this._onDestroy.complete();
    };
    /**
     * @return {?}
     */
    MediaPlayerControlsExtensionComponent.prototype.toggleMute = /**
     * @return {?}
     */
    function () {
        if (this.volume === 0) {
            this.volume = this._previousVolume;
        }
        else {
            this.volume = 0;
        }
    };
    /**
     * @return {?}
     */
    MediaPlayerControlsExtensionComponent.prototype.togglePlay = /**
     * @return {?}
     */
    function () {
        if (this.playing) {
            this.mediaPlayerService.pause();
        }
        else {
            this.mediaPlayerService.play();
        }
    };
    /**
     * @return {?}
     */
    MediaPlayerControlsExtensionComponent.prototype.setFullscreen = /**
     * @return {?}
     */
    function () {
        this.mediaPlayerService.toggleFullscreen();
    };
    /**
     * @return {?}
     */
    MediaPlayerControlsExtensionComponent.prototype.goToStart = /**
     * @return {?}
     */
    function () {
        this.mediaPlayerService.currentTime = 0;
    };
    /**
     * @return {?}
     */
    MediaPlayerControlsExtensionComponent.prototype.goToEnd = /**
     * @return {?}
     */
    function () {
        this.mediaPlayerService.currentTime = this.mediaPlayerService.duration;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MediaPlayerControlsExtensionComponent.prototype.dragStart = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.preventDefault();
        this.volumeDragging = true;
        var /** @type {?} */ thumb = /** @type {?} */ (event.target);
        thumb.focus();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MediaPlayerControlsExtensionComponent.prototype.dragMove = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (!this.volumeDragging) {
            return;
        }
        event.preventDefault();
        var /** @type {?} */ slider = /** @type {?} */ (this.volumeSlider.nativeElement);
        var /** @type {?} */ bounds = slider.getBoundingClientRect();
        var /** @type {?} */ x = Math.min(bounds.width, Math.max(0, event.pageX - bounds.left));
        // convert to a percentage
        this.volume = (x / bounds.width) * 100;
    };
    /**
     * @return {?}
     */
    MediaPlayerControlsExtensionComponent.prototype.dragEnd = /**
     * @return {?}
     */
    function () {
        this.volumeDragging = false;
    };
    MediaPlayerControlsExtensionComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-media-player-controls',
                    template: "<div class=\"volume-container\">\n\n    <div class=\"volume-slider-container\" #volumeContainer [class.active]=\"volumeActive\">\n        <div class=\"volume-slider-icon\" #volumeIcon>\n            <span class=\"hpe-icon\" [class.hpe-volume-mute]=\"volume === 0\" [class.hpe-volume-low]=\"volume > 0 && volume <= 70\" [class.hpe-volume]=\"volume > 70\" [uxTooltip]=\"muteTooltip\" (click)=\"toggleMute()\"></span>\n        </div>\n        \n        <div class=\"volume-slider-node\">\n            <div class=\"volume-slider\" #volumeSlider>\n                <div class=\"volume-track-lower\" [style.width.%]=\"volume\"></div>\n                <div class=\"volume-slider-thumb\" (mousedown)=\"dragStart($event)\" [style.left.%]=\"volume\" tabindex=\"0\" (keydown.ArrowRight)=\"volume = volume + 10\" (keydown.ArrowLeft)=\"volume = volume - 10\"></div>\n            </div>\n        </div>\n    </div>\n</div>\n\n<div class=\"spacer\"></div>\n\n<svg viewBox=\"0 0 51.5 64\" width=\"14\" height=\"17\" class=\"control-button\" (click)=\"goToStart()\">\n    <rect x=\"0\" y=\"0\" width=\"7.5\" height=\"64\" />\n    <polygon points=\"51.5,64 51.5,0 7.4,32 \" />\n</svg>\n\n<svg viewBox=\"0 0 45 64\" width=\"20\" height=\"29\" class=\"control-button\" *ngIf=\"!playing\" (click)=\"togglePlay()\">\n    <polygon points=\"0.4,0 0.4,64 44.6,32\" />\n</svg>\n\n<svg viewBox=\"0 0 43 56.9\" class=\"control-button\" width=\"20\" height=\"29\" *ngIf=\"playing\" (click)=\"togglePlay()\">\n    <rect y=\"0.1\" width=\"15.7\" height=\"56.9\" />\n    <rect x=\"27.3\" y=\"0.1\" width=\"15.7\" height=\"56.9\" />\n</svg>\n\n<svg viewBox=\"0 0 51.5 64\" width=\"14\" height=\"17\" class=\"control-button\" (click)=\"goToEnd()\">\n    <rect x=\"44.1\" y=\"0\" width=\"7.5\" height=\"64\" />\n    <polygon points=\"0,64 0,0 44.1,32 \" />\n</svg>\n\n<div class=\"spacer\"></div>\n\n<span class=\"hpe-icon\" *ngIf=\"mediaPlayerService.type !== 'audio'\" [class.hpe-expand]=\"!mediaPlayerService.fullscreen\" [class.hpe-contract]=\"mediaPlayerService.fullscreen\"\n    (click)=\"setFullscreen()\"></span>\n\n<ng-template #muteTooltip>{{ volume === 0 ? 'Unmute' : 'Mute' }}</ng-template>",
                    host: {
                        '[class.quiet]': 'quietMode || fullscreen'
                    }
                },] },
    ];
    /** @nocollapse */
    MediaPlayerControlsExtensionComponent.propDecorators = {
        "volumeIcon": [{ type: ViewChild, args: ['volumeIcon',] },],
        "volumeSlider": [{ type: ViewChild, args: ['volumeSlider',] },],
        "volumeContainer": [{ type: ViewChild, args: ['volumeContainer',] },],
        "dragMove": [{ type: HostListener, args: ['document:mousemove', ['$event'],] },],
        "dragEnd": [{ type: HostListener, args: ['document:mouseup',] },],
    };
    return MediaPlayerControlsExtensionComponent;
}(MediaPlayerBaseExtensionDirective));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DurationPipe = (function () {
    function DurationPipe() {
    }
    /**
     * @param {?} seconds
     * @return {?}
     */
    DurationPipe.prototype.transform = /**
     * @param {?} seconds
     * @return {?}
     */
    function (seconds) {
        var /** @type {?} */ minutes = Math.floor(seconds / 60);
        var /** @type {?} */ hours = Math.floor(minutes / 60);
        var /** @type {?} */ days = Math.floor(hours / 24);
        hours = hours - (days * 24);
        minutes = minutes - (days * 24 * 60) - (hours * 60);
        seconds = Math.floor(seconds - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60));
        if (hours > 0) {
            return this.pad(hours) + ":" + this.pad(minutes) + ":" + this.pad(seconds);
        }
        else {
            return this.pad(minutes) + ":" + this.pad(seconds);
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    DurationPipe.prototype.pad = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (value < 10) {
            return "0" + value;
        }
        return value.toString();
    };
    DurationPipe.decorators = [
        { type: Pipe, args: [{
                    name: 'duration'
                },] },
    ];
    return DurationPipe;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DurationPipeModule = (function () {
    function DurationPipeModule() {
    }
    DurationPipeModule.decorators = [
        { type: NgModule, args: [{
                    exports: [DurationPipe],
                    declarations: [DurationPipe]
                },] },
    ];
    return DurationPipeModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var FileSizePipe = (function () {
    function FileSizePipe() {
    }
    /**
     * @param {?} value
     * @return {?}
     */
    FileSizePipe.prototype.transform = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        // allow for async values
        if (!value) {
            return value;
        }
        var /** @type {?} */ units = ['B', 'KB', 'MB', 'GB', 'TB'];
        // calculate the which unit bracket the values should be a part of
        var /** @type {?} */ idx = Math.floor(Math.log(value) / Math.log(1024));
        var /** @type {?} */ formattedValue = value / Math.pow(1024, idx);
        return formattedValue.toFixed(2) + " " + units[idx];
    };
    FileSizePipe.decorators = [
        { type: Pipe, args: [{
                    name: 'fileSize'
                },] },
    ];
    return FileSizePipe;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var FileSizePipeModule = (function () {
    function FileSizePipeModule() {
    }
    FileSizePipeModule.decorators = [
        { type: NgModule, args: [{
                    exports: [FileSizePipe],
                    declarations: [FileSizePipe]
                },] },
    ];
    return FileSizePipeModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ DECLARATIONS$6 = [
    MediaPlayerComponent,
    MediaPlayerTimelineExtensionComponent,
    MediaPlayerBaseExtensionDirective,
    MediaPlayerControlsExtensionComponent
];
var MediaPlayerModule = (function () {
    function MediaPlayerModule() {
    }
    MediaPlayerModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FrameExtractionModule,
                        TooltipModule,
                        AudioServiceModule,
                        DurationPipeModule,
                        FileSizePipeModule
                    ],
                    exports: DECLARATIONS$6,
                    declarations: DECLARATIONS$6,
                    providers: [MediaPlayerService]
                },] },
    ];
    return MediaPlayerModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var VirtualScrollLoadingDirective = (function () {
    function VirtualScrollLoadingDirective() {
    }
    VirtualScrollLoadingDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxVirtualScrollLoading]'
                },] },
    ];
    return VirtualScrollLoadingDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var VirtualScrollLoadButtonDirective = (function () {
    function VirtualScrollLoadButtonDirective() {
    }
    VirtualScrollLoadButtonDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxVirtualScrollLoadButton]'
                },] },
    ];
    return VirtualScrollLoadButtonDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var VirtualScrollCellDirective = (function () {
    function VirtualScrollCellDirective() {
    }
    VirtualScrollCellDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxVirtualScrollCell]'
                },] },
    ];
    return VirtualScrollCellDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var VirtualScrollComponent = (function () {
    function VirtualScrollComponent(_elementRef, resizeService) {
        var _this = this;
        this._elementRef = _elementRef;
        this.collection = Observable.create();
        this.loadOnScroll = true;
        this.loading = new EventEmitter();
        this.cells = new BehaviorSubject([]);
        this.scrollTop = 0;
        this.isLoading = false;
        this.pageNumber = 0;
        this.data = [];
        this.loadingComplete = false;
        // watch for any future changes to size
        resizeService.addResizeListener(_elementRef.nativeElement).subscribe(function (event) { return _this._height = event.height; });
    }
    /**
     * @return {?}
     */
    VirtualScrollComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (!this.cellHeight) {
            throw new Error('Virtual Scroll Component requires "cellHeight" property to be defined.');
        }
        // subscribe to the collection
        this.setupObservable();
        // load the first page of data
        this.loadNextPage();
    };
    /**
     * @return {?}
     */
    VirtualScrollComponent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        // re-render cells now that we can display any loading indicator or loading button
        this.renderCells();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    VirtualScrollComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes["collection"] && changes["collection"].currentValue !== changes["collection"].previousValue && !changes["collection"].isFirstChange()) {
            this.setupObservable();
            this.reset();
        }
    };
    /**
     * @return {?}
     */
    VirtualScrollComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._subscription.unsubscribe();
    };
    /**
     * @return {?}
     */
    VirtualScrollComponent.prototype.setupObservable = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // if there is a current subscription, unsubscribe
        if (this._subscription && this._subscription.unsubscribe) {
            this._subscription.unsubscribe();
        }
        this._subscription = this.collection.subscribe(function (collection) {
            (_a = _this.data).push.apply(_a, __spread(collection));
            _this.renderCells();
            _this.isLoading = false;
            var _a;
        }, null, function () {
            _this.loadingComplete = true;
        });
    };
    /**
     * @return {?}
     */
    VirtualScrollComponent.prototype.renderCells = /**
     * @return {?}
     */
    function () {
        this.cells.next(this.getVisibleCells());
        if (this.loadOnScroll && !this.isLoading && !this.loadingComplete) {
            var /** @type {?} */ remainingScroll = this._elementRef.nativeElement.scrollHeight - (this._elementRef.nativeElement.scrollTop + this._elementRef.nativeElement.clientHeight);
            // if the current cells take up less than the height of the component then load the next page
            if (remainingScroll <= this._elementRef.nativeElement.clientHeight) {
                this.loadNextPage();
            }
        }
    };
    /**
     * @return {?}
     */
    VirtualScrollComponent.prototype.getVisibleCells = /**
     * @return {?}
     */
    function () {
        // store the initial element height
        if (!this._height) {
            this._height = this._elementRef.nativeElement.offsetHeight;
        }
        // perform some calculations
        var /** @type {?} */ scrollTop = this._elementRef.nativeElement.scrollTop;
        var /** @type {?} */ startCell = Math.floor(scrollTop / this.cellHeight);
        var /** @type {?} */ endCell = Math.ceil(this._height / this.cellHeight) + 1;
        // update the scroll position
        this.scrollTop = scrollTop - (scrollTop % this.cellHeight);
        // return a sublist of items visible on the screen
        return this.data.slice(startCell, startCell + endCell);
    };
    /**
     * @return {?}
     */
    VirtualScrollComponent.prototype.getTotalHeight = /**
     * @return {?}
     */
    function () {
        return this.cellHeight * this.data.length;
    };
    /**
     * @return {?}
     */
    VirtualScrollComponent.prototype.loadNextPage = /**
     * @return {?}
     */
    function () {
        this.isLoading = true;
        this.loading.next(this.pageNumber);
        this.pageNumber++;
    };
    /**
     * @return {?}
     */
    VirtualScrollComponent.prototype.reset = /**
     * @return {?}
     */
    function () {
        // reset all values
        this.scrollTop = 0;
        this.data = [];
        this._height = undefined;
        this.pageNumber = 0;
        this.loadingComplete = false;
        // set scroll position
        this._elementRef.nativeElement.scrollTop = 0;
        // clear the current cells
        this.renderCells();
        // reload first page
        this.loadNextPage();
    };
    VirtualScrollComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-virtual-scroll',
                    template: "<div class=\"virtual-scroll-content-height\" [style.height.px]=\"getTotalHeight()\"></div>\n<div class=\"virtual-scroll-content\" [style.transform]=\"'translateY(' + scrollTop + 'px)'\">\n\n    <!-- Virtually Render Cells -->\n    <ng-container *ngFor=\"let cell of cells | async\">\n        <ng-container *ngTemplateOutlet=\"cellTemplate; context: { cell: cell }\"></ng-container>\n    </ng-container>\n\n    <!-- Loading Indicator -->\n    <ng-container *ngIf=\"loadingIndicatorTemplate && isLoading\" [ngTemplateOutlet]=\"loadingIndicatorTemplate\"></ng-container>\n\n    <!-- Loading Button -->\n    <div class=\"virtual-scroll-load-button\" *ngIf=\"loadButtonTemplate && !loadOnScroll && !loadingComplete && !isLoading\" (click)=\"loadNextPage()\">\n        <ng-container *ngTemplateOutlet=\"loadButtonTemplate\"></ng-container>\n    </div>\n    \n</div>"
                },] },
    ];
    /** @nocollapse */
    VirtualScrollComponent.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: ResizeService, },
    ]; };
    VirtualScrollComponent.propDecorators = {
        "collection": [{ type: Input },],
        "cellHeight": [{ type: Input },],
        "loadOnScroll": [{ type: Input },],
        "loading": [{ type: Output },],
        "cellTemplate": [{ type: ContentChild, args: [VirtualScrollCellDirective, { read: TemplateRef },] },],
        "loadingIndicatorTemplate": [{ type: ContentChild, args: [VirtualScrollLoadingDirective, { read: TemplateRef },] },],
        "loadButtonTemplate": [{ type: ContentChild, args: [VirtualScrollLoadButtonDirective, { read: TemplateRef },] },],
        "renderCells": [{ type: HostListener, args: ['scroll',] },],
    };
    return VirtualScrollComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ DECLARATIONS$7 = [
    VirtualScrollComponent,
    VirtualScrollLoadingDirective,
    VirtualScrollLoadButtonDirective,
    VirtualScrollCellDirective
];
var VirtualScrollModule = (function () {
    function VirtualScrollModule() {
    }
    VirtualScrollModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        ResizeModule
                    ],
                    exports: DECLARATIONS$7,
                    declarations: DECLARATIONS$7
                },] },
    ];
    return VirtualScrollModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var AutoGrowDirective = (function () {
    function AutoGrowDirective(_elementRef, _renderer) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        // ensure this is a textarea or else throw error
        if (_elementRef.nativeElement.tagName.toLowerCase() !== 'textarea') {
            throw new Error('uxAutoGrow directive can only be used on <textarea> elements.');
        }
    }
    /**
     * @return {?}
     */
    AutoGrowDirective.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.update();
    };
    /**
     * @return {?}
     */
    AutoGrowDirective.prototype.update = /**
     * @return {?}
     */
    function () {
        // perform sizing
        this._renderer.setStyle(this._elementRef.nativeElement, 'overflowY', 'hidden');
        this._renderer.setStyle(this._elementRef.nativeElement, 'height', 'auto');
        // get the new total height and element height
        var scrollHeight = this._elementRef.nativeElement.scrollHeight;
        var maxHeight = getComputedStyle(this._elementRef.nativeElement).maxHeight;
        // determine what the maximum allowed height is
        var /** @type {?} */ maximum = !isNaN(parseFloat(maxHeight)) ? parseFloat(maxHeight) : Infinity;
        // if there is a max height specifed we want to show the scrollbars
        if (maximum < scrollHeight) {
            this._renderer.setStyle(this._elementRef.nativeElement, 'overflowY', 'auto');
            this._renderer.setStyle(this._elementRef.nativeElement, 'height', maximum + 'px');
        }
        else {
            this._renderer.setStyle(this._elementRef.nativeElement, 'height', scrollHeight + 'px');
        }
    };
    AutoGrowDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxAutoGrow]'
                },] },
    ];
    /** @nocollapse */
    AutoGrowDirective.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Renderer2, },
    ]; };
    AutoGrowDirective.propDecorators = {
        "update": [{ type: HostListener, args: ['input',] },],
    };
    return AutoGrowDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var AutoGrowModule = (function () {
    function AutoGrowModule() {
    }
    AutoGrowModule.decorators = [
        { type: NgModule, args: [{
                    exports: [AutoGrowDirective],
                    declarations: [AutoGrowDirective]
                },] },
    ];
    return AutoGrowModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var FixedHeaderTableDirective = (function () {
    function FixedHeaderTableDirective(_elementRef, _renderer) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this.tablePaging = new EventEmitter();
    }
    /**
     * @return {?}
     */
    FixedHeaderTableDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        // add class to the table
        this._renderer.addClass(this._elementRef.nativeElement, 'ux-fixed-header-table');
        // locate the important elements
        this._tableHead = this._elementRef.nativeElement.querySelector('thead');
        this._tableBody = this._elementRef.nativeElement.querySelector('tbody');
        // bind to scroll events on the table body
        this._renderer.listen(this._tableBody, 'scroll', this.onScroll.bind(this));
        // resize the table header to account for scrollbar
        this.setLayout();
        // trigger the loading of the first page
        this.tablePaging.emit();
    };
    /**
     * Get the table element
     * Primarily used by column width directive
     */
    /**
     * Get the table element
     * Primarily used by column width directive
     * @return {?}
     */
    FixedHeaderTableDirective.prototype.getTable = /**
     * Get the table element
     * Primarily used by column width directive
     * @return {?}
     */
    function () {
        return this._elementRef.nativeElement;
    };
    /**
     * Handle scroll events
     * @return {?}
     */
    FixedHeaderTableDirective.prototype.onScroll = /**
     * Handle scroll events
     * @return {?}
     */
    function () {
        // determine if we are scrolled to the bottom and if so load the next page
        if (this._tableBody.scrollTop === (this._tableBody.scrollHeight - this._tableBody.offsetHeight)) {
            this.tablePaging.emit();
        }
    };
    /**
     * Update the size of the table header to account for the scrollbar.
     * This is important to keep the columns aligned
     * @return {?}
     */
    FixedHeaderTableDirective.prototype.setLayout = /**
     * Update the size of the table header to account for the scrollbar.
     * This is important to keep the columns aligned
     * @return {?}
     */
    function () {
        // calculate the size of the scrollbar
        var /** @type {?} */ scrollbar = this._tableBody.offsetWidth - this._tableBody.clientWidth;
        // add padding to the header to account for this
        this._renderer.setStyle(this._tableHead, 'padding-right', scrollbar + 'px');
        // set the desired height of the table body
        this._renderer.setStyle(this._tableBody, 'height', typeof this.tableHeight === 'number' ? this.tableHeight + "px" : this.tableHeight);
    };
    FixedHeaderTableDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxFixedHeaderTable]'
                },] },
    ];
    /** @nocollapse */
    FixedHeaderTableDirective.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Renderer2, },
    ]; };
    FixedHeaderTableDirective.propDecorators = {
        "tableHeight": [{ type: Input },],
        "tablePaging": [{ type: Output },],
    };
    return FixedHeaderTableDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var FixedHeaderTableModule = (function () {
    function FixedHeaderTableModule() {
    }
    FixedHeaderTableModule.decorators = [
        { type: NgModule, args: [{
                    exports: [FixedHeaderTableDirective],
                    declarations: [FixedHeaderTableDirective]
                },] },
    ];
    return FixedHeaderTableModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var FloatLabelDirective = (function () {
    function FloatLabelDirective(_elementRef, _renderer) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this.mode = 'focus';
        this.raised = false;
        this._focused = false;
        this._eventHandles = [];
    }
    /**
     * @return {?}
     */
    FloatLabelDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this._eventHandles.push(this._renderer.listen(this.input, 'focus', this.inputFocus.bind(this)), this._renderer.listen(this.input, 'blur', this.inputBlur.bind(this)), this._renderer.listen(this.input, 'input', this.inputChange.bind(this)));
        // Check initial input value
        this.raised = this.hasText();
        // Ensure that the `for` attribute is set
        if (!this._elementRef.nativeElement.getAttribute('for') && this.input.getAttribute('id')) {
            this._renderer.setAttribute(this._elementRef.nativeElement, 'for', this.input.getAttribute('id'));
        }
    };
    /**
     * @return {?}
     */
    FloatLabelDirective.prototype.ngOnChanges = /**
     * @return {?}
     */
    function () {
        if (!(this.mode === 'focus' && this._focused)) {
            this.raised = this.hasText();
        }
    };
    /**
     * @return {?}
     */
    FloatLabelDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        // Unsubscribe event handles
        this._eventHandles.forEach(function (eventHandle) { return eventHandle(); });
    };
    /**
     * @return {?}
     */
    FloatLabelDirective.prototype.hasText = /**
     * @return {?}
     */
    function () {
        if (this.value === undefined) {
            return !!this.input.value;
        }
        return !!this.value;
    };
    /**
     * @return {?}
     */
    FloatLabelDirective.prototype.inputFocus = /**
     * @return {?}
     */
    function () {
        if (this.mode === 'focus') {
            this._focused = true;
            this.raised = true;
        }
    };
    /**
     * @return {?}
     */
    FloatLabelDirective.prototype.inputBlur = /**
     * @return {?}
     */
    function () {
        if (this.mode === 'focus') {
            this._focused = false;
            this.raised = this.hasText();
        }
    };
    /**
     * @return {?}
     */
    FloatLabelDirective.prototype.inputChange = /**
     * @return {?}
     */
    function () {
        if (this.mode === 'input') {
            this.raised = this.hasText();
        }
    };
    FloatLabelDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxFloatLabel]',
                    host: {
                        'class': 'ux-float-label'
                    }
                },] },
    ];
    /** @nocollapse */
    FloatLabelDirective.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Renderer2, },
    ]; };
    FloatLabelDirective.propDecorators = {
        "input": [{ type: Input, args: ['uxFloatLabel',] },],
        "value": [{ type: Input },],
        "mode": [{ type: Input },],
        "raised": [{ type: HostBinding, args: ['class.ux-float-label-raised',] },],
    };
    return FloatLabelDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var FloatLabelModule = (function () {
    function FloatLabelModule() {
    }
    FloatLabelModule.decorators = [
        { type: NgModule, args: [{
                    imports: [],
                    exports: [FloatLabelDirective],
                    declarations: [FloatLabelDirective],
                    providers: [],
                },] },
    ];
    return FloatLabelModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var HelpCenterService = (function () {
    function HelpCenterService() {
        this.items = new BehaviorSubject([]);
    }
    /**
     * @param {?} item
     * @return {?}
     */
    HelpCenterService.prototype.registerItem = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        // get the current items
        var /** @type {?} */ items = this.items.getValue();
        // add the new item to the list
        items.push(item);
        // update the observable
        this.items.next(items);
    };
    /**
     * @param {?} item
     * @return {?}
     */
    HelpCenterService.prototype.unregisterItem = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        // get the current items
        var /** @type {?} */ items = this.items.getValue();
        // remove the item being unregistered
        items = items.filter(function (itm) { return itm !== item; });
        // update the observable
        this.items.next(items);
    };
    HelpCenterService.decorators = [
        { type: Injectable },
    ];
    return HelpCenterService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var HelpCenterItemDirective = (function () {
    function HelpCenterItemDirective(_helpCenterService) {
        this._helpCenterService = _helpCenterService;
    }
    /**
     * @return {?}
     */
    HelpCenterItemDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        // register the item in the service
        this._helpCenterService.registerItem(this.uxHelpCenterItem);
    };
    /**
     * @return {?}
     */
    HelpCenterItemDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        // remove this item when it is destroyed
        this._helpCenterService.unregisterItem(this.uxHelpCenterItem);
    };
    HelpCenterItemDirective.decorators = [
        { type: Directive, args: [{ selector: '[uxHelpCenterItem]' },] },
    ];
    /** @nocollapse */
    HelpCenterItemDirective.ctorParameters = function () { return [
        { type: HelpCenterService, },
    ]; };
    HelpCenterItemDirective.propDecorators = {
        "uxHelpCenterItem": [{ type: Input },],
    };
    return HelpCenterItemDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var HelpCenterModule = (function () {
    function HelpCenterModule() {
    }
    HelpCenterModule.decorators = [
        { type: NgModule, args: [{
                    imports: [],
                    exports: [HelpCenterItemDirective],
                    declarations: [HelpCenterItemDirective],
                    providers: [HelpCenterService],
                },] },
    ];
    return HelpCenterModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var HoverActionService = (function () {
    function HoverActionService() {
        this.active = new BehaviorSubject(false);
        this._focused = false;
        this._hovered = false;
        this._actions = [];
    }
    /**
     * @param {?} action
     * @return {?}
     */
    HoverActionService.prototype.register = /**
     * @param {?} action
     * @return {?}
     */
    function (action) {
        this._actions.push(action);
    };
    /**
     * @param {?} action
     * @return {?}
     */
    HoverActionService.prototype.unregister = /**
     * @param {?} action
     * @return {?}
     */
    function (action) {
        this._actions = this._actions.filter(function (actn) { return actn !== action; });
    };
    /**
     * @param {?} container
     * @return {?}
     */
    HoverActionService.prototype.setContainer = /**
     * @param {?} container
     * @return {?}
     */
    function (container) {
        this._container = container;
    };
    /**
     * @param {?} focus
     * @return {?}
     */
    HoverActionService.prototype.setFocusState = /**
     * @param {?} focus
     * @return {?}
     */
    function (focus) {
        this._focused = focus;
        this.updateVisibility();
    };
    /**
     * @param {?} hover
     * @return {?}
     */
    HoverActionService.prototype.setHoverState = /**
     * @param {?} hover
     * @return {?}
     */
    function (hover) {
        this._hovered = hover;
        this.updateVisibility();
    };
    /**
     * @return {?}
     */
    HoverActionService.prototype.next = /**
     * @return {?}
     */
    function () {
        // if container has focus then focus the first hover action
        if (this.containerHasFocus()) {
            this.focusActionAtIndex(0);
            return this.updateVisibility();
        }
        // if a hover action has focus then focus the next action
        if (this.actionHasFocus()) {
            var /** @type {?} */ index = this.getFocusedActionIndex() + 1;
            this.focusActionAtIndex(index);
            this.updateVisibility();
        }
    };
    /**
     * @return {?}
     */
    HoverActionService.prototype.previous = /**
     * @return {?}
     */
    function () {
        // if a hover action has focus then focus the previous action
        if (this.actionHasFocus()) {
            var /** @type {?} */ index = this.getFocusedActionIndex() - 1;
            if (index >= 0) {
                this.focusActionAtIndex(index);
            }
            else {
                this._container.focus();
            }
        }
        this.updateVisibility();
    };
    /**
     * @return {?}
     */
    HoverActionService.prototype.updateVisibility = /**
     * @return {?}
     */
    function () {
        this.active.next(this._focused || this._hovered || this.actionHasFocus());
    };
    /**
     * @param {?} index
     * @return {?}
     */
    HoverActionService.prototype.focusActionAtIndex = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        if (index >= 0 && index < this._actions.length) {
            this._actions[index].focus();
        }
    };
    /**
     * @return {?}
     */
    HoverActionService.prototype.getFocusedActionIndex = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return this._actions.findIndex(function (action) { return action === _this.getFocusedAction(); });
    };
    /**
     * @return {?}
     */
    HoverActionService.prototype.containerHasFocus = /**
     * @return {?}
     */
    function () {
        return this._focused;
    };
    /**
     * @return {?}
     */
    HoverActionService.prototype.actionHasFocus = /**
     * @return {?}
     */
    function () {
        return !!this.getFocusedAction();
    };
    /**
     * @return {?}
     */
    HoverActionService.prototype.getFocusedAction = /**
     * @return {?}
     */
    function () {
        return this._actions.find(function (action) { return action.focused; });
    };
    HoverActionService.decorators = [
        { type: Injectable },
    ];
    return HoverActionService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var HoverActionContainerDirective = (function () {
    function HoverActionContainerDirective(_elementRef, _hoverActionService) {
        var _this = this;
        this._elementRef = _elementRef;
        this._hoverActionService = _hoverActionService;
        this.tabindex = 0;
        this.active = false;
        // register the container element with the service
        this._hoverActionService.setContainer(this);
        // apply a class based on the active state of the container and it's actions
        this.active$ = this._hoverActionService.active.subscribe(function (active) { return _this.active = active; });
    }
    /**
     * @return {?}
     */
    HoverActionContainerDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.active$.unsubscribe();
    };
    /**
     * @return {?}
     */
    HoverActionContainerDirective.prototype.focus = /**
     * @return {?}
     */
    function () {
        this._elementRef.nativeElement.focus();
    };
    /**
     * @return {?}
     */
    HoverActionContainerDirective.prototype.onFocus = /**
     * @return {?}
     */
    function () {
        this._hoverActionService.setFocusState(true);
    };
    /**
     * @return {?}
     */
    HoverActionContainerDirective.prototype.onBlur = /**
     * @return {?}
     */
    function () {
        this._hoverActionService.setFocusState(false);
    };
    /**
     * @return {?}
     */
    HoverActionContainerDirective.prototype.onHover = /**
     * @return {?}
     */
    function () {
        this._hoverActionService.setHoverState(true);
    };
    /**
     * @return {?}
     */
    HoverActionContainerDirective.prototype.onLeave = /**
     * @return {?}
     */
    function () {
        this._hoverActionService.setHoverState(false);
    };
    /**
     * @return {?}
     */
    HoverActionContainerDirective.prototype.next = /**
     * @return {?}
     */
    function () {
        this._hoverActionService.next();
    };
    HoverActionContainerDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxHoverActionContainer]',
                    providers: [HoverActionService],
                    host: {
                        '[class.hover-action-container-active]': 'active',
                        '[tabindex]': 'tabindex'
                    }
                },] },
    ];
    /** @nocollapse */
    HoverActionContainerDirective.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: HoverActionService, },
    ]; };
    HoverActionContainerDirective.propDecorators = {
        "tabindex": [{ type: Input },],
        "focus": [{ type: HostListener, args: ['click',] },],
        "onFocus": [{ type: HostListener, args: ['focus',] },],
        "onBlur": [{ type: HostListener, args: ['blur',] },],
        "onHover": [{ type: HostListener, args: ['mouseenter',] },],
        "onLeave": [{ type: HostListener, args: ['mouseleave',] },],
        "next": [{ type: HostListener, args: ['keydown.arrowright',] },],
    };
    return HoverActionContainerDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var HoverActionDirective = (function () {
    function HoverActionDirective(_elementRef, _hoverActionService) {
        var _this = this;
        this._elementRef = _elementRef;
        this._hoverActionService = _hoverActionService;
        this.tabindex = 1;
        this.active = false;
        this.focused = false;
        // register the action
        this._hoverActionService.register(this);
        // watch for changes to the activeness of the container
        this.active$ = this._hoverActionService.active.subscribe(function (active) { return _this.active = active; });
    }
    /**
     * @return {?}
     */
    HoverActionDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._hoverActionService.unregister(this);
        this.active$.unsubscribe();
    };
    /**
     * @return {?}
     */
    HoverActionDirective.prototype.focus = /**
     * @return {?}
     */
    function () {
        this._elementRef.nativeElement.focus();
    };
    /**
     * @return {?}
     */
    HoverActionDirective.prototype.onFocus = /**
     * @return {?}
     */
    function () {
        this.focused = true;
        this._hoverActionService.updateVisibility();
    };
    /**
     * @return {?}
     */
    HoverActionDirective.prototype.onBlur = /**
     * @return {?}
     */
    function () {
        this.focused = false;
        this._hoverActionService.updateVisibility();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    HoverActionDirective.prototype.previous = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.stopPropagation();
        this._hoverActionService.previous();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    HoverActionDirective.prototype.next = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.stopPropagation();
        this._hoverActionService.next();
    };
    HoverActionDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxHoverAction]',
                    host: {
                        '[class.hover-action-active]': 'active',
                        '[class.hover-action-focused]': 'focused',
                        '[tabindex]': 'tabindex'
                    }
                },] },
    ];
    /** @nocollapse */
    HoverActionDirective.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: HoverActionService, },
    ]; };
    HoverActionDirective.propDecorators = {
        "tabindex": [{ type: Input },],
        "onFocus": [{ type: HostListener, args: ['focus',] },],
        "onBlur": [{ type: HostListener, args: ['blur',] },],
        "previous": [{ type: HostListener, args: ['keydown.arrowleft', ['$event'],] },],
        "next": [{ type: HostListener, args: ['keydown.arrowright', ['$event'],] },],
    };
    return HoverActionDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ DECLARATIONS$8 = [
    HoverActionDirective,
    HoverActionContainerDirective
];
var HoverActionModule = (function () {
    function HoverActionModule() {
    }
    HoverActionModule.decorators = [
        { type: NgModule, args: [{
                    exports: DECLARATIONS$8,
                    declarations: DECLARATIONS$8
                },] },
    ];
    return HoverActionModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var LayoutSwitcherItemDirective = (function () {
    function LayoutSwitcherItemDirective(_templateRef, _viewContainerRef) {
        this._templateRef = _templateRef;
        this._viewContainerRef = _viewContainerRef;
    }
    /**
     * @return {?}
     */
    LayoutSwitcherItemDirective.prototype.getLayout = /**
     * @return {?}
     */
    function () {
        return this._templateRef;
    };
    /**
     * @return {?}
     */
    LayoutSwitcherItemDirective.prototype.getConfig = /**
     * @return {?}
     */
    function () {
        return this._config;
    };
    /**
     * @return {?}
     */
    LayoutSwitcherItemDirective.prototype.activate = /**
     * @return {?}
     */
    function () {
        this._embeddedView = this._viewContainerRef.createEmbeddedView(this._templateRef);
    };
    /**
     * @return {?}
     */
    LayoutSwitcherItemDirective.prototype.deactivate = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ index = this._viewContainerRef.indexOf(this._embeddedView);
        this._viewContainerRef.remove(index);
        this._embeddedView = null;
    };
    LayoutSwitcherItemDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxLayoutSwitcherItem]'
                },] },
    ];
    /** @nocollapse */
    LayoutSwitcherItemDirective.ctorParameters = function () { return [
        { type: TemplateRef, },
        { type: ViewContainerRef, },
    ]; };
    LayoutSwitcherItemDirective.propDecorators = {
        "_config": [{ type: Input, args: ['uxLayoutSwitcherItem',] },],
    };
    return LayoutSwitcherItemDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var LayoutSwitcherDirective = (function () {
    function LayoutSwitcherDirective(_elementRef, resizeService, _viewContainerRef) {
        var _this = this;
        this._elementRef = _elementRef;
        this._viewContainerRef = _viewContainerRef;
        // watch for changes to the container size
        resizeService.addResizeListener(_elementRef.nativeElement).subscribe(function (event) {
            _this._width = event.width;
            // render the appropriate layout
            // render the appropriate layout
            _this.updateActiveLayout();
        });
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    LayoutSwitcherDirective.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        // if the active group has changed then render the appropriate layout
        if (changes["group"].currentValue !== changes["group"].previousValue) {
            this.updateActiveLayout();
        }
    };
    /**
     * @return {?}
     */
    LayoutSwitcherDirective.prototype.getActiveLayout = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // if there are currently no layouts then do nothing
        if (!this._layouts) {
            return null;
        }
        // otherwise find layouts that match the active group and that meet the constraints
        return this._layouts.filter(function (layout) { return _this.group === layout.getConfig().group; }).find(function (layout) {
            var /** @type {?} */ minWidth = layout.getConfig().minWidth || 0;
            var /** @type {?} */ maxWidth = layout.getConfig().maxWidth || Infinity;
            return _this._width >= minWidth && _this._width < maxWidth;
        });
    };
    /**
     * @return {?}
     */
    LayoutSwitcherDirective.prototype.updateActiveLayout = /**
     * @return {?}
     */
    function () {
        // get the layout that should be shown
        var /** @type {?} */ layout = this.getActiveLayout();
        // check if we are currently showing the layout
        if (this._activeLayout === layout) {
            return;
        }
        // remove the current layout
        if (this._activeLayout) {
            this._activeLayout.deactivate();
        }
        // store the new active layout
        this._activeLayout = layout;
        // if there is an active layout then activate
        if (this._activeLayout) {
            this._activeLayout.activate();
        }
    };
    /**
     * @return {?}
     */
    LayoutSwitcherDirective.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        // store the initial current element width
        this._width = this._elementRef.nativeElement.offsetWidth;
        // render the appropriate layout - need a delay as Angular doesn't like changes like this in these lifecycle hooks
        requestAnimationFrame(this.updateActiveLayout.bind(this));
    };
    LayoutSwitcherDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxLayoutSwitcher]'
                },] },
    ];
    /** @nocollapse */
    LayoutSwitcherDirective.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: ResizeService, },
        { type: ViewContainerRef, },
    ]; };
    LayoutSwitcherDirective.propDecorators = {
        "group": [{ type: Input },],
        "_layouts": [{ type: ContentChildren, args: [LayoutSwitcherItemDirective,] },],
    };
    return LayoutSwitcherDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ DECLARATIONS$9 = [
    LayoutSwitcherDirective,
    LayoutSwitcherItemDirective
];
var LayoutSwitcherModule = (function () {
    function LayoutSwitcherModule() {
    }
    LayoutSwitcherModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        ResizeModule
                    ],
                    exports: DECLARATIONS$9,
                    declarations: DECLARATIONS$9,
                    providers: [],
                },] },
    ];
    return LayoutSwitcherModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var SelectionStrategy = (function () {
    function SelectionStrategy(selectionService) {
        this.selectionService = selectionService;
    }
    /**
     * @param {?} event
     * @param {?} data
     * @return {?}
     */
    SelectionStrategy.prototype.mousedown = /**
     * @param {?} event
     * @param {?} data
     * @return {?}
     */
    function (event, data) { };
    /**
     * @param {?} event
     * @param {?} data
     * @return {?}
     */
    SelectionStrategy.prototype.click = /**
     * @param {?} event
     * @param {?} data
     * @return {?}
     */
    function (event, data) { };
    /**
     * @param {?} event
     * @param {?} data
     * @return {?}
     */
    SelectionStrategy.prototype.keydown = /**
     * @param {?} event
     * @param {?} data
     * @return {?}
     */
    function (event, data) { };
    /**
     * Select the item - default behavior
     */
    /**
     * Select the item - default behavior
     * @param {...?} data
     * @return {?}
     */
    SelectionStrategy.prototype.select = /**
     * Select the item - default behavior
     * @param {...?} data
     * @return {?}
     */
    function () {
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        (_a = this.selectionService).select.apply(_a, __spread(data));
        var _a;
    };
    /**
     * Toggle the item's selected state - default behavior
     */
    /**
     * Toggle the item's selected state - default behavior
     * @param {...?} data
     * @return {?}
     */
    SelectionStrategy.prototype.toggle = /**
     * Toggle the item's selected state - default behavior
     * @param {...?} data
     * @return {?}
     */
    function () {
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        (_a = this.selectionService).toggle.apply(_a, __spread(data));
        var _a;
    };
    /**
     * Deselect the item - default behavior
     */
    /**
     * Deselect the item - default behavior
     * @param {...?} data
     * @return {?}
     */
    SelectionStrategy.prototype.deselect = /**
     * Deselect the item - default behavior
     * @param {...?} data
     * @return {?}
     */
    function () {
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        (_a = this.selectionService).deselect.apply(_a, __spread(data));
        var _a;
    };
    /**
     * Select all items - default behavior
     */
    /**
     * Select all items - default behavior
     * @return {?}
     */
    SelectionStrategy.prototype.selectAll = /**
     * Select all items - default behavior
     * @return {?}
     */
    function () {
        this.select.apply(this, __spread(this.selectionService.dataset));
    };
    /**
     * Deselect all items - default behavior
     */
    /**
     * Deselect all items - default behavior
     * @return {?}
     */
    SelectionStrategy.prototype.deselectAll = /**
     * Deselect all items - default behavior
     * @return {?}
     */
    function () {
        this.deselect.apply(this, __spread(this.selectionService.dataset));
    };
    /**
     * @return {?}
     */
    SelectionStrategy.prototype.destroy = /**
     * @return {?}
     */
    function () { };
    return SelectionStrategy;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var RowSelectionStrategy = (function (_super) {
    __extends(RowSelectionStrategy, _super);
    function RowSelectionStrategy() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._selection = { start: null, end: null };
        return _this;
    }
    /**
     * By default on shift click the browser will highlight
     * text. This looks bad and we don't want this to occur
     */
    /**
     * By default on shift click the browser will highlight
     * text. This looks bad and we don't want this to occur
     * @param {?} event
     * @return {?}
     */
    RowSelectionStrategy.prototype.mousedown = /**
     * By default on shift click the browser will highlight
     * text. This looks bad and we don't want this to occur
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.preventDefault();
    };
    /**
     * When a row is clicked we want to handle selection
     */
    /**
     * When a row is clicked we want to handle selection
     * @param {?} event
     * @param {?} data
     * @return {?}
     */
    RowSelectionStrategy.prototype.click = /**
     * When a row is clicked we want to handle selection
     * @param {?} event
     * @param {?} data
     * @return {?}
     */
    function (event, data) {
        // determine which modifier keys are pressed
        var ctrlKey = event.ctrlKey, shiftKey = event.shiftKey;
        // if the shift key is pressed we want to perform a multiple selection
        if (shiftKey) {
            return this.multipleSelect(data);
        }
        // if the control key is pressed we want to perform an additive toggle selection
        if (ctrlKey) {
            return this.toggle(data);
        }
        // perform a single selection where all other rows are deselected
        this.singleSelect(data);
    };
    /**
     * To support full keyboard control we need to support the following:
     * 1. Arrow keys to navigate up and down
     * 2. Spacebar to toggle selection
     * 3. Shift + Arrow keys to multiple select
     * 4. Ctrl + Arrow keys to allow retained selection and navigation
     */
    /**
     * To support full keyboard control we need to support the following:
     * 1. Arrow keys to navigate up and down
     * 2. Spacebar to toggle selection
     * 3. Shift + Arrow keys to multiple select
     * 4. Ctrl + Arrow keys to allow retained selection and navigation
     * @param {?} event
     * @param {?} data
     * @return {?}
     */
    RowSelectionStrategy.prototype.keydown = /**
     * To support full keyboard control we need to support the following:
     * 1. Arrow keys to navigate up and down
     * 2. Spacebar to toggle selection
     * 3. Shift + Arrow keys to multiple select
     * 4. Ctrl + Arrow keys to allow retained selection and navigation
     * @param {?} event
     * @param {?} data
     * @return {?}
     */
    function (event, data) {
        switch (event.keyCode) {
            case KeyCode.UpArrow:
            case KeyCode.DownArrow:
                event.preventDefault();
                this.navigate(event, data);
                break;
            case KeyCode.Spacebar:
                event.preventDefault();
                this.selectionService.strategy.toggle(data, true);
                break;
        }
    };
    /**
     * Override the standard toggle function to store or clear the
     * most recently selected item
     */
    /**
     * Override the standard toggle function to store or clear the
     * most recently selected item
     * @param {?} data
     * @param {?=} activate
     * @return {?}
     */
    RowSelectionStrategy.prototype.toggle = /**
     * Override the standard toggle function to store or clear the
     * most recently selected item
     * @param {?} data
     * @param {?=} activate
     * @return {?}
     */
    function (data, activate) {
        if (activate === void 0) { activate = false; }
        _super.prototype.toggle.call(this, data);
        // store or clear the selection
        this.selectionService.isSelected(data) ? this.setSelectionStart(data) : this.clearSelection();
        // if we want to keep the item activated then activate
        if (activate) {
            this.selectionService.activate(data);
        }
    };
    /**
     * Clear all other selected items and select only
     * the most recently selected item
     * @param {?} data
     * @return {?}
     */
    RowSelectionStrategy.prototype.singleSelect = /**
     * Clear all other selected items and select only
     * the most recently selected item
     * @param {?} data
     * @return {?}
     */
    function (data) {
        // deselect all other rows if neither modifier key is pressed
        this.deselectAll();
        // select the current row
        this.select(data);
        // store the current item as the selection start
        this.setSelectionStart(data);
    };
    /**
     * Handle multiple selection:
     * 1. If no start item selected - select it
     * 2. If a start item has been selected - select all in between
     * 3. If a start and end item have been selected clear the range and then select the new range
     * @param {?} data
     * @return {?}
     */
    RowSelectionStrategy.prototype.multipleSelect = /**
     * Handle multiple selection:
     * 1. If no start item selected - select it
     * 2. If a start item has been selected - select all in between
     * 3. If a start and end item have been selected clear the range and then select the new range
     * @param {?} data
     * @return {?}
     */
    function (data) {
        // if no selection currently exists then perform initial selection
        if (!this._selection.start) {
            // select the row
            this.select(data);
            // store the starting point
            return this.setSelectionStart(data);
        }
        // if a multiple selection already took place - clear the previous selection
        if (this._selection.start && this._selection.end) {
            this.deselect.apply(this, __spread(this.getSelectedItems()));
        }
        // set the new selection end point
        this.setSelectionEnd(data);
        // select all the items in the range
        this.select.apply(this, __spread(this.getSelectedItems()));
    };
    /**
     * Set the selection start point. If there was previously a
     * selection end point then clear it as this is a new selection
     * @param {?} data
     * @return {?}
     */
    RowSelectionStrategy.prototype.setSelectionStart = /**
     * Set the selection start point. If there was previously a
     * selection end point then clear it as this is a new selection
     * @param {?} data
     * @return {?}
     */
    function (data) {
        this._selection.start = data;
        this._selection.end = null;
        // activate the item
        this.selectionService.activate(data);
    };
    /**
     * Set the selection end point
     * @param {?} data
     * @return {?}
     */
    RowSelectionStrategy.prototype.setSelectionEnd = /**
     * Set the selection end point
     * @param {?} data
     * @return {?}
     */
    function (data) {
        this._selection.end = data;
        // activate the item
        this.selectionService.activate(data);
    };
    /**
     * Clear both start and end selection points
     * @param {?=} deactivate
     * @return {?}
     */
    RowSelectionStrategy.prototype.clearSelection = /**
     * Clear both start and end selection points
     * @param {?=} deactivate
     * @return {?}
     */
    function (deactivate) {
        if (deactivate === void 0) { deactivate = true; }
        // reset the selected item
        this._selection = { start: null, end: null };
        // remove the current active item
        if (deactivate) {
            this.selectionService.deactivate();
        }
    };
    /**
     * Determine all the items affected by the current selection.
     * Note that the end point may be above the start point so
     * we need to account for this.
     * @return {?}
     */
    RowSelectionStrategy.prototype.getSelectedItems = /**
     * Determine all the items affected by the current selection.
     * Note that the end point may be above the start point so
     * we need to account for this.
     * @return {?}
     */
    function () {
        // get the latest dataset
        var dataset = this.selectionService.dataset;
        // get the indexes of the start and end point
        var /** @type {?} */ startIdx = dataset.indexOf(this._selection.start);
        var /** @type {?} */ endIdx = dataset.indexOf(this._selection.end);
        // get the region of the array that is selected - note the endIdx may be before the startIdx so account for this
        return dataset.slice(Math.min(startIdx, endIdx), Math.max(startIdx, endIdx) + 1);
    };
    /**
     * Activate the sibling item when arrow keys are pressed
     * @param {?} event
     * @param {?} data
     * @return {?}
     */
    RowSelectionStrategy.prototype.navigate = /**
     * Activate the sibling item when arrow keys are pressed
     * @param {?} event
     * @param {?} data
     * @return {?}
     */
    function (event, data) {
        // determine which modifier keys are pressed
        var ctrlKey = event.ctrlKey, shiftKey = event.shiftKey;
        // if no modifier keys are pressed then deselect all and clear the selection
        if (!ctrlKey && !shiftKey) {
            this.deselectAll();
            this.clearSelection(false);
        }
        // activate the sibling - if the up arrow is pressed then navigate to the previous sibling
        var /** @type {?} */ sibling = this.selectionService.activateSibling(event.keyCode === KeyCode.UpArrow);
        // if the shift key is pressed then we also want to toggle the state if the item
        if (shiftKey && sibling) {
            // if there is no current selection start then select the current row
            if (!this._selection.start) {
                this.multipleSelect(data);
            }
            this.multipleSelect(sibling);
        }
    };
    return RowSelectionStrategy;
}(SelectionStrategy));
/** @enum {number} */
var KeyCode = {
    UpArrow: 38,
    DownArrow: 40,
    Spacebar: 32,
};
KeyCode[KeyCode.UpArrow] = "UpArrow";
KeyCode[KeyCode.DownArrow] = "DownArrow";
KeyCode[KeyCode.Spacebar] = "Spacebar";

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var SimpleSelectionStrategy = (function (_super) {
    __extends(SimpleSelectionStrategy, _super);
    function SimpleSelectionStrategy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * When the item is clicked simply toggle the current selected state
     */
    /**
     * When the item is clicked simply toggle the current selected state
     * @param {?} event
     * @param {?} data
     * @return {?}
     */
    SimpleSelectionStrategy.prototype.click = /**
     * When the item is clicked simply toggle the current selected state
     * @param {?} event
     * @param {?} data
     * @return {?}
     */
    function (event, data) {
        this.toggle(data);
    };
    /**
     * Add basic keyboard support for navigating
     * and selecting/deselecting items
     */
    /**
     * Add basic keyboard support for navigating
     * and selecting/deselecting items
     * @param {?} event
     * @param {?} data
     * @return {?}
     */
    SimpleSelectionStrategy.prototype.keydown = /**
     * Add basic keyboard support for navigating
     * and selecting/deselecting items
     * @param {?} event
     * @param {?} data
     * @return {?}
     */
    function (event, data) {
        switch (event.keyCode) {
            case KeyCode$1.UpArrow:
                event.preventDefault();
                return this.selectionService.activateSibling(true);
            case KeyCode$1.DownArrow:
                event.preventDefault();
                return this.selectionService.activateSibling(false);
            case KeyCode$1.Spacebar:
                event.preventDefault();
                return this.toggle(data);
        }
    };
    /**
     * Override the standard toggle function to always activate the item
     */
    /**
     * Override the standard toggle function to always activate the item
     * @param {?} data
     * @return {?}
     */
    SimpleSelectionStrategy.prototype.toggle = /**
     * Override the standard toggle function to always activate the item
     * @param {?} data
     * @return {?}
     */
    function (data) {
        _super.prototype.toggle.call(this, data);
        this.selectionService.activate(data);
    };
    return SimpleSelectionStrategy;
}(SelectionStrategy));
/** @enum {number} */
var KeyCode$1 = {
    UpArrow: 38,
    DownArrow: 40,
    Spacebar: 32,
};
KeyCode$1[KeyCode$1.UpArrow] = "UpArrow";
KeyCode$1[KeyCode$1.DownArrow] = "DownArrow";
KeyCode$1[KeyCode$1.Spacebar] = "Spacebar";

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var SelectionService = (function () {
    function SelectionService() {
        this._selection = new Set();
        this._rowStrategy = new RowSelectionStrategy(this);
        this._simpleStrategy = new SimpleSelectionStrategy(this);
        this.dataset = [];
        this.enabled = true;
        this.clickEnabled = true;
        this.keyboardEnabled = true;
        this.strategy = this._simpleStrategy;
        this.active$ = new BehaviorSubject(null);
        this.selection$ = new BehaviorSubject([]);
    }
    /**
     * @return {?}
     */
    SelectionService.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._rowStrategy.destroy();
        this._simpleStrategy.destroy();
    };
    /**
     * If the item is not currently selected then add it
     * to the list of selected items
     */
    /**
     * If the item is not currently selected then add it
     * to the list of selected items
     * @param {...?} selections
     * @return {?}
     */
    SelectionService.prototype.select = /**
     * If the item is not currently selected then add it
     * to the list of selected items
     * @param {...?} selections
     * @return {?}
     */
    function () {
        var _this = this;
        var selections = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            selections[_i] = arguments[_i];
        }
        // add each selection to the set
        selections.forEach(function (selection) { return _this._selection.add(selection); });
        // propagate the changes
        this.selectionHasMutated();
    };
    /**
     * Remove an item from the list of selected items
     */
    /**
     * Remove an item from the list of selected items
     * @param {...?} selections
     * @return {?}
     */
    SelectionService.prototype.deselect = /**
     * Remove an item from the list of selected items
     * @param {...?} selections
     * @return {?}
     */
    function () {
        var _this = this;
        var selections = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            selections[_i] = arguments[_i];
        }
        // remove each item from the set
        selections.forEach(function (selection) { return _this._selection.delete(selection); });
        // propagate the changes
        this.selectionHasMutated();
    };
    /**
     * Toggle the selected state of any specified items
     */
    /**
     * Toggle the selected state of any specified items
     * @param {...?} selections
     * @return {?}
     */
    SelectionService.prototype.toggle = /**
     * Toggle the selected state of any specified items
     * @param {...?} selections
     * @return {?}
     */
    function () {
        var _this = this;
        var selections = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            selections[_i] = arguments[_i];
        }
        selections.forEach(function (selection) { return _this.isSelected(selection) ? _this.deselect(selection) : _this.select(selection); });
    };
    /**
     * Determine whether or not a specific item is currently selected
     */
    /**
     * Determine whether or not a specific item is currently selected
     * @param {?} data
     * @return {?}
     */
    SelectionService.prototype.isSelected = /**
     * Determine whether or not a specific item is currently selected
     * @param {?} data
     * @return {?}
     */
    function (data) {
        return this._selection.has(data);
    };
    /**
     * Return an observable specifically for notifying the subscriber
     * only when the selection state of a specific object has changed
     */
    /**
     * Return an observable specifically for notifying the subscriber
     * only when the selection state of a specific object has changed
     * @param {?} data
     * @return {?}
     */
    SelectionService.prototype.selected$ = /**
     * Return an observable specifically for notifying the subscriber
     * only when the selection state of a specific object has changed
     * @param {?} data
     * @return {?}
     */
    function (data) {
        var _this = this;
        return this.selection$.pipe(map(function () { return _this.isSelected(data); }), distinctUntilChanged());
    };
    /**
     * Define how selections should be performed.
     * This allows us to use an strategy pattern to handle the various keyboard
     * and mouse interactions while keeping each mode separated and
     * easily extensible if we want to add more modes in future!
     */
    /**
     * Define how selections should be performed.
     * This allows us to use an strategy pattern to handle the various keyboard
     * and mouse interactions while keeping each mode separated and
     * easily extensible if we want to add more modes in future!
     * @param {?} mode
     * @return {?}
     */
    SelectionService.prototype.setMode = /**
     * Define how selections should be performed.
     * This allows us to use an strategy pattern to handle the various keyboard
     * and mouse interactions while keeping each mode separated and
     * easily extensible if we want to add more modes in future!
     * @param {?} mode
     * @return {?}
     */
    function (mode) {
        switch (mode.toLowerCase().trim()) {
            case 'simple':
                this.strategy = this._simpleStrategy;
                break;
            case 'row':
                this.strategy = this._rowStrategy;
                break;
            default:
                throw new Error("The selection mode '" + mode + "' does not exist. Valid modes are 'simple' or 'row'.");
        }
    };
    /**
     * Set the current active item
     */
    /**
     * Set the current active item
     * @param {?} data
     * @return {?}
     */
    SelectionService.prototype.activate = /**
     * Set the current active item
     * @param {?} data
     * @return {?}
     */
    function (data) {
        this.active$.next(data);
    };
    /**
     * Deactive all items
     */
    /**
     * Deactive all items
     * @return {?}
     */
    SelectionService.prototype.deactivate = /**
     * Deactive all items
     * @return {?}
     */
    function () {
        this.active$.next(null);
    };
    /**
     * Activate the sibling of the current active item.
     * If previous is set to true the previous sibling will be activated
     * rather than the next sibling. This function will also return the
     * data of the newly activated sibling
     */
    /**
     * Activate the sibling of the current active item.
     * If previous is set to true the previous sibling will be activated
     * rather than the next sibling. This function will also return the
     * data of the newly activated sibling
     * @param {?=} previous
     * @return {?}
     */
    SelectionService.prototype.activateSibling = /**
     * Activate the sibling of the current active item.
     * If previous is set to true the previous sibling will be activated
     * rather than the next sibling. This function will also return the
     * data of the newly activated sibling
     * @param {?=} previous
     * @return {?}
     */
    function (previous) {
        if (previous === void 0) { previous = false; }
        // get the currently active item
        var /** @type {?} */ current = this.active$.getValue();
        // check if there is a current active item
        if (!current) {
            return;
        }
        // get the index of the current item
        var /** @type {?} */ idx = this.dataset.indexOf(current);
        var /** @type {?} */ target = this.dataset[previous ? idx - 1 : idx + 1];
        // check if the target exists
        if (target) {
            this.activate(target);
        }
        return target;
    };
    /**
     * @param {?} disabled
     * @return {?}
     */
    SelectionService.prototype.setDisabled = /**
     * @param {?} disabled
     * @return {?}
     */
    function (disabled) {
        // store the current disabled state
        this.enabled = !disabled;
        // clear any stateful data
        this.active$.next(null);
        this._selection.clear();
        // emit the selection change information
        this.selectionHasMutated();
    };
    /**
     * @return {?}
     */
    SelectionService.prototype.selectionHasMutated = /**
     * @return {?}
     */
    function () {
        this.selection$.next(Array.from(this._selection));
    };
    SelectionService.decorators = [
        { type: Injectable },
    ];
    return SelectionService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var SelectionItemDirective = (function () {
    function SelectionItemDirective(_selectionService, _elementRef) {
        this._selectionService = _selectionService;
        this._elementRef = _elementRef;
        this.tabindex = 0;
        this.selectedChange = new EventEmitter();
        this.active = false;
        this._selected = false;
        this._subscriptions = new Subscription();
    }
    Object.defineProperty(SelectionItemDirective.prototype, "selected", {
        get: /**
         * @return {?}
         */
        function () {
            return this._selected;
        },
        set: /**
         * @param {?} selected
         * @return {?}
         */
        function (selected) {
            selected ? this.select() : this.deselect();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    SelectionItemDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // if there is no associated data then throw an error
        if (!this.uxSelectionItem) {
            throw new Error('The uxSelectionItem directive must have data associated with it.');
        }
        // subscribe to selection changes on this item
        this._subscriptions.add(this._selectionService.selected$(this.uxSelectionItem).subscribe(function (selected) {
            // store the selected state
            // store the selected state
            _this._selected = selected;
            // emit the selected state
            // emit the selected state
            _this.selectedChange.emit(selected);
        }));
        // subscribe to changes to the active state
        this._subscriptions.add(this._selectionService.active$.pipe(map(function (active) { return active === _this.uxSelectionItem; })).subscribe(function (active) {
            // store the focus state
            // store the focus state
            _this.active = active;
            // if it is active then focus the element
            if (active === true) {
                _this._elementRef.nativeElement.focus();
            }
        }));
    };
    /**
     * @return {?}
     */
    SelectionItemDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._subscriptions.unsubscribe();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SelectionItemDirective.prototype.click = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this._selectionService.enabled && this._selectionService.clickEnabled) {
            this._selectionService.strategy.click(event, this.uxSelectionItem);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SelectionItemDirective.prototype.mousedown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this._selectionService.enabled && this._selectionService.clickEnabled) {
            this._selectionService.strategy.mousedown(event, this.uxSelectionItem);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SelectionItemDirective.prototype.keydown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this._selectionService.enabled && this._selectionService.keyboardEnabled) {
            this._selectionService.strategy.keydown(event, this.uxSelectionItem);
        }
    };
    /**
     * Select this item using the current strategy
     */
    /**
     * Select this item using the current strategy
     * @return {?}
     */
    SelectionItemDirective.prototype.select = /**
     * Select this item using the current strategy
     * @return {?}
     */
    function () {
        if (this._selectionService.enabled) {
            this._selectionService.strategy.select(this.uxSelectionItem);
        }
    };
    /**
     * Deselect this item using the current strategy
     */
    /**
     * Deselect this item using the current strategy
     * @return {?}
     */
    SelectionItemDirective.prototype.deselect = /**
     * Deselect this item using the current strategy
     * @return {?}
     */
    function () {
        if (this._selectionService.enabled) {
            this._selectionService.strategy.deselect(this.uxSelectionItem);
        }
    };
    SelectionItemDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxSelectionItem]',
                    exportAs: 'ux-selection-item'
                },] },
    ];
    /** @nocollapse */
    SelectionItemDirective.ctorParameters = function () { return [
        { type: SelectionService, },
        { type: ElementRef, },
    ]; };
    SelectionItemDirective.propDecorators = {
        "uxSelectionItem": [{ type: Input },],
        "selected": [{ type: Input }, { type: HostBinding, args: ['class.ux-selection-selected',] },],
        "tabindex": [{ type: Input }, { type: HostBinding, args: ['tabindex',] },],
        "selectedChange": [{ type: Output },],
        "active": [{ type: HostBinding, args: ['class.ux-selection-focused',] },],
        "click": [{ type: HostListener, args: ['click', ['$event'],] },],
        "mousedown": [{ type: HostListener, args: ['mousedown', ['$event'],] },],
        "keydown": [{ type: HostListener, args: ['keydown', ['$event'],] },],
    };
    return SelectionItemDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var SelectionDirective = (function () {
    function SelectionDirective(_selectionService) {
        var _this = this;
        this._selectionService = _selectionService;
        this.tabindex = 0;
        this.uxSelectionChange = new EventEmitter();
        this._subscriptions = new Subscription();
        this._subscriptions.add(_selectionService.selection$.subscribe(function (items) { return _this.uxSelectionChange.emit(items); }));
    }
    Object.defineProperty(SelectionDirective.prototype, "uxSelection", {
        set: /**
         * @param {?} items
         * @return {?}
         */
        function (items) {
            (_a = this._selectionService).select.apply(_a, __spread(items));
            var _a;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionDirective.prototype, "disabled", {
        set: /**
         * @param {?} disabled
         * @return {?}
         */
        function (disabled) {
            this._selectionService.setDisabled(disabled);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionDirective.prototype, "mode", {
        set: /**
         * @param {?} mode
         * @return {?}
         */
        function (mode) {
            this._selectionService.setMode(mode);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionDirective.prototype, "clickSelection", {
        set: /**
         * @param {?} enabled
         * @return {?}
         */
        function (enabled) {
            this._selectionService.clickEnabled = enabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionDirective.prototype, "keyboardSelection", {
        set: /**
         * @param {?} enabled
         * @return {?}
         */
        function (enabled) {
            this._selectionService.keyboardEnabled = enabled;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    SelectionDirective.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // provide the initial list of selection items
        this.update();
        // if the list changes then inform the service
        this._subscriptions.add(this.items.changes.subscribe(function () { return _this.update(); }));
    };
    /**
     * @return {?}
     */
    SelectionDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._subscriptions.unsubscribe();
    };
    /**
     * If the directive element receives focus then activate the first item
     * @return {?}
     */
    SelectionDirective.prototype.focus = /**
     * If the directive element receives focus then activate the first item
     * @return {?}
     */
    function () {
        if (this._selectionService.enabled && this._selectionService.dataset.length > 0) {
            this._selectionService.activate(this._selectionService.dataset[0]);
        }
    };
    /**
     * Update the dataset to reflect the latest selection items
     */
    /**
     * Update the dataset to reflect the latest selection items
     * @return {?}
     */
    SelectionDirective.prototype.update = /**
     * Update the dataset to reflect the latest selection items
     * @return {?}
     */
    function () {
        this._selectionService.dataset = this.items.map(function (item) { return item.uxSelectionItem; });
    };
    /**
     * Select all the items in the list
     */
    /**
     * Select all the items in the list
     * @return {?}
     */
    SelectionDirective.prototype.selectAll = /**
     * Select all the items in the list
     * @return {?}
     */
    function () {
        if (this._selectionService.enabled) {
            this._selectionService.strategy.selectAll();
        }
    };
    /**
     * Deselect all currently selected items
     */
    /**
     * Deselect all currently selected items
     * @return {?}
     */
    SelectionDirective.prototype.deselectAll = /**
     * Deselect all currently selected items
     * @return {?}
     */
    function () {
        if (this._selectionService.enabled) {
            this._selectionService.strategy.deselectAll();
        }
    };
    SelectionDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxSelection]',
                    exportAs: 'ux-selection',
                    providers: [SelectionService]
                },] },
    ];
    /** @nocollapse */
    SelectionDirective.ctorParameters = function () { return [
        { type: SelectionService, },
    ]; };
    SelectionDirective.propDecorators = {
        "uxSelection": [{ type: Input },],
        "disabled": [{ type: Input },],
        "mode": [{ type: Input },],
        "clickSelection": [{ type: Input },],
        "keyboardSelection": [{ type: Input },],
        "tabindex": [{ type: Input }, { type: HostBinding, args: ['tabindex',] },],
        "uxSelectionChange": [{ type: Output },],
        "items": [{ type: ContentChildren, args: [SelectionItemDirective,] },],
        "focus": [{ type: HostListener, args: ['focus',] },],
    };
    return SelectionDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var SelectionModule = (function () {
    function SelectionModule() {
    }
    SelectionModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule
                    ],
                    declarations: [SelectionDirective, SelectionItemDirective],
                    exports: [SelectionDirective, SelectionItemDirective]
                },] },
    ];
    return SelectionModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var StringFilterPipe = (function () {
    function StringFilterPipe() {
    }
    /**
     * @param {?} items
     * @param {?} value
     * @return {?}
     */
    StringFilterPipe.prototype.transform = /**
     * @param {?} items
     * @param {?} value
     * @return {?}
     */
    function (items, value) {
        if (!items) {
            return [];
        }
        return items.filter(function (it) { return it.toLowerCase().indexOf(value.toLowerCase()) >= 0; });
    };
    StringFilterPipe.decorators = [
        { type: Pipe, args: [{
                    name: 'stringFilter'
                },] },
        { type: Injectable },
    ];
    return StringFilterPipe;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var StringFilterModule = (function () {
    function StringFilterModule() {
    }
    StringFilterModule.decorators = [
        { type: NgModule, args: [{
                    exports: [StringFilterPipe],
                    declarations: [StringFilterPipe]
                },] },
    ];
    return StringFilterModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var CookieAdapter = (function () {
    function CookieAdapter() {
    }
    /**
     * @param {?} key
     * @return {?}
     */
    CookieAdapter.prototype.getItem = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        if (document.cookie) {
            // get all the cookies for this site
            var /** @type {?} */ cookies = document.cookie.split(';');
            // process the cookies into a from we can easily manage
            var /** @type {?} */ match = cookies
                .map(function (cookie) { return ({ key: cookie.split('=')[0].trim(), value: cookie.split('=')[1].trim() }); })
                .find(function (cookie) { return cookie.key === key; });
            return match ? match.value : null;
        }
        return null;
    };
    /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    CookieAdapter.prototype.setItem = /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    function (key, value) {
        document.cookie = key + "=" + value + "; path=/";
    };
    /**
     * @param {?} key
     * @return {?}
     */
    CookieAdapter.prototype.removeItem = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        document.cookie.split(';').forEach(function (cookie) {
            var /** @type {?} */ eqPos = cookie.indexOf('=');
            var /** @type {?} */ name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie;
            if (name === key) {
                document.cookie = cookie.trim().replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
            }
        });
    };
    /**
     * @return {?}
     */
    CookieAdapter.prototype.clear = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // call remove item on each cookie
        document.cookie.split(';').map(function (cookie) { return cookie.split('=')[0].trim(); })
            .forEach(function (cookie) { return _this.removeItem(cookie); });
    };
    /**
     * @return {?}
     */
    CookieAdapter.prototype.getSupported = /**
     * @return {?}
     */
    function () {
        // cookies are supported in all browsers
        return this;
    };
    return CookieAdapter;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var LocalStorageAdapter = (function () {
    function LocalStorageAdapter() {
    }
    /**
     * @param {?} key
     * @return {?}
     */
    LocalStorageAdapter.prototype.getItem = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        return localStorage.getItem(key);
    };
    /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    LocalStorageAdapter.prototype.setItem = /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    function (key, value) {
        localStorage.setItem(key, value);
    };
    /**
     * @param {?} key
     * @return {?}
     */
    LocalStorageAdapter.prototype.removeItem = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        localStorage.removeItem(key);
    };
    /**
     * @return {?}
     */
    LocalStorageAdapter.prototype.clear = /**
     * @return {?}
     */
    function () {
        localStorage.clear();
    };
    /**
     * @return {?}
     */
    LocalStorageAdapter.prototype.getSupported = /**
     * @return {?}
     */
    function () {
        // if local storage variable does not exist fall back to cookies
        if (!localStorage) {
            return new CookieAdapter();
        }
        // try to make a test save to local storage to see if there are any exceptions
        try {
            localStorage.setItem('ux-persistent-data-service', 'ux-persistent-data-service');
            localStorage.removeItem('ux-persistent-data-service');
            return this;
        }
        catch (/** @type {?} */ err) {
            return new CookieAdapter();
        }
    };
    return LocalStorageAdapter;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var SessionStorageAdapter = (function () {
    function SessionStorageAdapter() {
    }
    /**
     * @param {?} key
     * @return {?}
     */
    SessionStorageAdapter.prototype.getItem = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        return sessionStorage.getItem(key);
    };
    /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    SessionStorageAdapter.prototype.setItem = /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    function (key, value) {
        sessionStorage.setItem(key, value);
    };
    /**
     * @param {?} key
     * @return {?}
     */
    SessionStorageAdapter.prototype.removeItem = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        sessionStorage.removeItem(key);
    };
    /**
     * @return {?}
     */
    SessionStorageAdapter.prototype.clear = /**
     * @return {?}
     */
    function () {
        sessionStorage.clear();
    };
    /**
     * @return {?}
     */
    SessionStorageAdapter.prototype.getSupported = /**
     * @return {?}
     */
    function () {
        // if local storage variable does not exist fall back to cookies
        if (!sessionStorage) {
            return new CookieAdapter();
        }
        // try to make a test save to local storage to see if there are any exceptions
        try {
            sessionStorage.setItem('ux-persistent-data-service', 'ux-persistent-data-service');
            sessionStorage.removeItem('ux-persistent-data-service');
            return this;
        }
        catch (/** @type {?} */ err) {
            return new CookieAdapter();
        }
    };
    return SessionStorageAdapter;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var PersistentDataService = (function () {
    function PersistentDataService() {
    }
    /**
     * Save the item in some form of persistent storage
     */
    /**
     * Save the item in some form of persistent storage
     * @param {?} key
     * @param {?} value
     * @param {?=} type
     * @return {?}
     */
    PersistentDataService.prototype.setItem = /**
     * Save the item in some form of persistent storage
     * @param {?} key
     * @param {?} value
     * @param {?=} type
     * @return {?}
     */
    function (key, value, type) {
        if (type === void 0) { type = PersistentDataStorageType.LocalStorage; }
        this.getAdapter(type).setItem(key, value);
    };
    /**
     * Get a stored value from persistent storage
     */
    /**
     * Get a stored value from persistent storage
     * @param {?} key
     * @param {?=} type
     * @return {?}
     */
    PersistentDataService.prototype.getItem = /**
     * Get a stored value from persistent storage
     * @param {?} key
     * @param {?=} type
     * @return {?}
     */
    function (key, type) {
        if (type === void 0) { type = PersistentDataStorageType.LocalStorage; }
        return this.getAdapter(type).getItem(key);
    };
    /**
     * Remove a stored value from persistent storage
     */
    /**
     * Remove a stored value from persistent storage
     * @param {?} key
     * @param {?=} type
     * @return {?}
     */
    PersistentDataService.prototype.removeItem = /**
     * Remove a stored value from persistent storage
     * @param {?} key
     * @param {?=} type
     * @return {?}
     */
    function (key, type) {
        if (type === void 0) { type = PersistentDataStorageType.LocalStorage; }
        this.getAdapter(type).removeItem(key);
    };
    /**
     * Remove a stored value from persistent storage
     */
    /**
     * Remove a stored value from persistent storage
     * @param {?=} type
     * @return {?}
     */
    PersistentDataService.prototype.clear = /**
     * Remove a stored value from persistent storage
     * @param {?=} type
     * @return {?}
     */
    function (type) {
        if (type === void 0) { type = PersistentDataStorageType.LocalStorage; }
        this.getAdapter(type).clear();
    };
    /**
     * Return the appropriate adapter based on the type requested
     * @param {?} type
     * @return {?}
     */
    PersistentDataService.prototype.getAdapter = /**
     * Return the appropriate adapter based on the type requested
     * @param {?} type
     * @return {?}
     */
    function (type) {
        switch (type) {
            case PersistentDataStorageType.Cookie:
                return new CookieAdapter();
            case PersistentDataStorageType.LocalStorage:
                var /** @type {?} */ localStorageAdapter = new LocalStorageAdapter();
                return localStorageAdapter.getSupported();
            case PersistentDataStorageType.SessionStorage:
                var /** @type {?} */ sessionStorageAdapter = new SessionStorageAdapter();
                return sessionStorageAdapter.getSupported();
        }
    };
    PersistentDataService.decorators = [
        { type: Injectable },
    ];
    return PersistentDataService;
}());
/** @enum {number} */
var PersistentDataStorageType = {
    LocalStorage: 0,
    Cookie: 1,
    SessionStorage: 2,
};
PersistentDataStorageType[PersistentDataStorageType.LocalStorage] = "LocalStorage";
PersistentDataStorageType[PersistentDataStorageType.Cookie] = "Cookie";
PersistentDataStorageType[PersistentDataStorageType.SessionStorage] = "SessionStorage";

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var PersistentDataModule = (function () {
    function PersistentDataModule() {
    }
    PersistentDataModule.decorators = [
        { type: NgModule, args: [{
                    providers: [PersistentDataService],
                },] },
    ];
    return PersistentDataModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @abstract
 */
var  /**
 * @abstract
 */
StorageAdapter = (function () {
    function StorageAdapter() {
    }
    return StorageAdapter;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ContactsNg1Component = (function (_super) {
    __extends(ContactsNg1Component, _super);
    function ContactsNg1Component(elementRef, injector) {
        var _this = _super.call(this, 'contactGroup', elementRef, injector) || this;
        _this.overflowClick = new EventEmitter();
        return _this;
    }
    ContactsNg1Component.decorators = [
        { type: Directive, args: [{
                    selector: 'contact-group'
                },] },
    ];
    /** @nocollapse */
    ContactsNg1Component.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Injector, },
    ]; };
    ContactsNg1Component.propDecorators = {
        "contacts": [{ type: Input },],
        "organization": [{ type: Input },],
        "size": [{ type: Input },],
        "colors": [{ type: Input },],
        "maxContacts": [{ type: Input },],
        "overflowClick": [{ type: Output },],
    };
    return ContactsNg1Component;
}(UpgradeComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ExpandInputNg1Component = (function (_super) {
    __extends(ExpandInputNg1Component, _super);
    function ExpandInputNg1Component(elementRef, injector) {
        var _this = _super.call(this, 'expandInput', elementRef, injector) || this;
        _this.focus = new EventEmitter();
        return _this;
    }
    ExpandInputNg1Component.decorators = [
        { type: Directive, args: [{
                    selector: 'expand-input'
                },] },
    ];
    /** @nocollapse */
    ExpandInputNg1Component.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Injector, },
    ]; };
    ExpandInputNg1Component.propDecorators = {
        "elname": [{ type: Input },],
        "placeHolder": [{ type: Input },],
        "className": [{ type: Input },],
        "clearTextIcon": [{ type: Input },],
        "closeSearch": [{ type: Input },],
        "expandAlways": [{ type: Input },],
        "onEnter": [{ type: Input },],
        "focus": [{ type: Output },],
    };
    return ExpandInputNg1Component;
}(UpgradeComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var FloatingActionButtonNg1Component = (function (_super) {
    __extends(FloatingActionButtonNg1Component, _super);
    function FloatingActionButtonNg1Component(elementRef, injector) {
        var _this = _super.call(this, 'floatingActionButton', elementRef, injector) || this;
        _this.items = [];
        return _this;
    }
    FloatingActionButtonNg1Component.decorators = [
        { type: Directive, args: [{
                    selector: 'floating-action-button'
                },] },
    ];
    /** @nocollapse */
    FloatingActionButtonNg1Component.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Injector, },
    ]; };
    FloatingActionButtonNg1Component.propDecorators = {
        "items": [{ type: Input },],
        "primary": [{ type: Input },],
        "direction": [{ type: Input },],
        "fabTooltip": [{ type: Input },],
        "fabTooltipPlacement": [{ type: Input },],
    };
    return FloatingActionButtonNg1Component;
}(UpgradeComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var FlotNg1Component = (function (_super) {
    __extends(FlotNg1Component, _super);
    function FlotNg1Component(elementRef, injector) {
        var _this = _super.call(this, 'uxFlotNg1', elementRef, injector) || this;
        _this.onPlotClick = new EventEmitter();
        _this.onPlotHover = new EventEmitter();
        return _this;
    }
    FlotNg1Component.decorators = [
        { type: Directive, args: [{
                    selector: 'flot'
                },] },
    ];
    /** @nocollapse */
    FlotNg1Component.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Injector, },
    ]; };
    FlotNg1Component.propDecorators = {
        "dataset": [{ type: Input },],
        "options": [{ type: Input },],
        "callback": [{ type: Input },],
        "donutLabels": [{ type: Input },],
        "onPlotClick": [{ type: Output },],
        "onPlotHover": [{ type: Output },],
    };
    return FlotNg1Component;
}(UpgradeComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var GridNg1Component = (function (_super) {
    __extends(GridNg1Component, _super);
    function GridNg1Component(elementRef, injector) {
        var _this = _super.call(this, 'grid', elementRef, injector) || this;
        _this.source = [];
        _this.columns = [];
        return _this;
    }
    GridNg1Component.decorators = [
        { type: Directive, args: [{
                    selector: 'grid'
                },] },
    ];
    /** @nocollapse */
    GridNg1Component.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Injector, },
    ]; };
    GridNg1Component.propDecorators = {
        "source": [{ type: Input },],
        "columns": [{ type: Input },],
        "options": [{ type: Input },],
        "events": [{ type: Input },],
        "plugins": [{ type: Input },],
    };
    return GridNg1Component;
}(UpgradeComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var HierarchyBarNg1Component = (function (_super) {
    __extends(HierarchyBarNg1Component, _super);
    function HierarchyBarNg1Component(elementRef, injector) {
        return _super.call(this, 'hierarchyBar', elementRef, injector) || this;
    }
    HierarchyBarNg1Component.decorators = [
        { type: Directive, args: [{
                    selector: 'hierarchy-bar'
                },] },
    ];
    /** @nocollapse */
    HierarchyBarNg1Component.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Injector, },
    ]; };
    HierarchyBarNg1Component.propDecorators = {
        "data": [{ type: Input },],
        "options": [{ type: Input },],
        "selectNode": [{ type: Input },],
        "containerClass": [{ type: Input },],
    };
    return HierarchyBarNg1Component;
}(UpgradeComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var MarqueeWizardNg1Component = (function (_super) {
    __extends(MarqueeWizardNg1Component, _super);
    function MarqueeWizardNg1Component(elementRef, injector) {
        var _this = _super.call(this, 'marqueeWizard', elementRef, injector) || this;
        _this.wizardStepsChange = new EventEmitter();
        return _this;
    }
    MarqueeWizardNg1Component.decorators = [
        { type: Directive, args: [{
                    selector: 'marquee-wizard'
                },] },
    ];
    /** @nocollapse */
    MarqueeWizardNg1Component.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Injector, },
    ]; };
    MarqueeWizardNg1Component.propDecorators = {
        "wizardIcon": [{ type: Input },],
        "wizardSteps": [{ type: Input },],
        "buttonOptions": [{ type: Input },],
        "onChanging": [{ type: Input },],
        "onFinished": [{ type: Input },],
        "onFinishing": [{ type: Input },],
        "onCanceled": [{ type: Input },],
        "isVisited": [{ type: Input },],
        "sideInfo": [{ type: Input },],
        "wizardStepsChange": [{ type: Output },],
    };
    return MarqueeWizardNg1Component;
}(UpgradeComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NestedDonutNg1Component = (function (_super) {
    __extends(NestedDonutNg1Component, _super);
    function NestedDonutNg1Component(elementRef, injector) {
        return _super.call(this, 'uxNestedDonutNg1', elementRef, injector) || this;
    }
    NestedDonutNg1Component.decorators = [
        { type: Directive, args: [{
                    selector: 'nested-donut'
                },] },
    ];
    /** @nocollapse */
    NestedDonutNg1Component.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Injector, },
    ]; };
    NestedDonutNg1Component.propDecorators = {
        "dataset": [{ type: Input },],
        "options": [{ type: Input },],
    };
    return NestedDonutNg1Component;
}(UpgradeComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var OrganizationChartNg1Component = (function (_super) {
    __extends(OrganizationChartNg1Component, _super);
    function OrganizationChartNg1Component(elementRef, injector) {
        var _this = _super.call(this, 'uxOrganizationChartNg1', elementRef, injector) || this;
        _this.dataChange = new EventEmitter();
        _this.optionsChange = new EventEmitter();
        return _this;
    }
    OrganizationChartNg1Component.decorators = [
        { type: Directive, args: [{
                    selector: 'organization-chart'
                },] },
    ];
    /** @nocollapse */
    OrganizationChartNg1Component.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Injector, },
    ]; };
    OrganizationChartNg1Component.propDecorators = {
        "data": [{ type: Input },],
        "options": [{ type: Input },],
        "dataChange": [{ type: Output },],
        "optionsChange": [{ type: Output },],
    };
    return OrganizationChartNg1Component;
}(UpgradeComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var PartitionMapNg1Component = (function (_super) {
    __extends(PartitionMapNg1Component, _super);
    function PartitionMapNg1Component(elementRef, injector) {
        return _super.call(this, 'uxPartitionMapNg1', elementRef, injector) || this;
    }
    PartitionMapNg1Component.decorators = [
        { type: Directive, args: [{
                    selector: 'partition-map'
                },] },
    ];
    /** @nocollapse */
    PartitionMapNg1Component.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Injector, },
    ]; };
    PartitionMapNg1Component.propDecorators = {
        "chartData": [{ type: Input },],
        "chartOptions": [{ type: Input },],
        "chartLoading": [{ type: Input },],
    };
    return PartitionMapNg1Component;
}(UpgradeComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var PeityBarChartNg1Component = (function (_super) {
    __extends(PeityBarChartNg1Component, _super);
    function PeityBarChartNg1Component(elementRef, injector) {
        return _super.call(this, 'uxPeityBarChartNg1', elementRef, injector) || this;
    }
    PeityBarChartNg1Component.decorators = [
        { type: Directive, args: [{
                    selector: 'bar-chart'
                },] },
    ];
    /** @nocollapse */
    PeityBarChartNg1Component.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Injector, },
    ]; };
    PeityBarChartNg1Component.propDecorators = {
        "data": [{ type: Input },],
        "options": [{ type: Input },],
    };
    return PeityBarChartNg1Component;
}(UpgradeComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var PeityLineChartNg1Component = (function (_super) {
    __extends(PeityLineChartNg1Component, _super);
    function PeityLineChartNg1Component(elementRef, injector) {
        return _super.call(this, 'uxPeityLineChartNg1', elementRef, injector) || this;
    }
    PeityLineChartNg1Component.decorators = [
        { type: Directive, args: [{
                    selector: 'line-chart'
                },] },
    ];
    /** @nocollapse */
    PeityLineChartNg1Component.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Injector, },
    ]; };
    PeityLineChartNg1Component.propDecorators = {
        "data": [{ type: Input },],
        "options": [{ type: Input },],
    };
    return PeityLineChartNg1Component;
}(UpgradeComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var PeityPieChartNg1Component = (function (_super) {
    __extends(PeityPieChartNg1Component, _super);
    function PeityPieChartNg1Component(elementRef, injector) {
        return _super.call(this, 'uxPeityPieChartNg1', elementRef, injector) || this;
    }
    PeityPieChartNg1Component.decorators = [
        { type: Directive, args: [{
                    selector: 'pie-chart'
                },] },
    ];
    /** @nocollapse */
    PeityPieChartNg1Component.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Injector, },
    ]; };
    PeityPieChartNg1Component.propDecorators = {
        "data": [{ type: Input },],
        "options": [{ type: Input },],
    };
    return PeityPieChartNg1Component;
}(UpgradeComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var PeityUpdatingLineChartNg1Component = (function (_super) {
    __extends(PeityUpdatingLineChartNg1Component, _super);
    function PeityUpdatingLineChartNg1Component(elementRef, injector) {
        return _super.call(this, 'uxPeityUpdatingLineChartNg1', elementRef, injector) || this;
    }
    PeityUpdatingLineChartNg1Component.decorators = [
        { type: Directive, args: [{
                    selector: 'updating-line-chart'
                },] },
    ];
    /** @nocollapse */
    PeityUpdatingLineChartNg1Component.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Injector, },
    ]; };
    PeityUpdatingLineChartNg1Component.propDecorators = {
        "data": [{ type: Input },],
        "options": [{ type: Input },],
        "method": [{ type: Input },],
        "updateinterval": [{ type: Input },],
    };
    return PeityUpdatingLineChartNg1Component;
}(UpgradeComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var SankeyNg1Component = (function (_super) {
    __extends(SankeyNg1Component, _super);
    function SankeyNg1Component(elementRef, injector) {
        return _super.call(this, 'uxSankeyNg1', elementRef, injector) || this;
    }
    SankeyNg1Component.decorators = [
        { type: Directive, args: [{
                    selector: 'sankey'
                },] },
    ];
    /** @nocollapse */
    SankeyNg1Component.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Injector, },
    ]; };
    SankeyNg1Component.propDecorators = {
        "chartSize": [{ type: Input },],
        "chartData": [{ type: Input },],
        "options": [{ type: Input },],
        "click": [{ type: Input },],
    };
    return SankeyNg1Component;
}(UpgradeComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var SearchToolbarNg1Component = (function (_super) {
    __extends(SearchToolbarNg1Component, _super);
    function SearchToolbarNg1Component(elementRef, injector) {
        return _super.call(this, 'searchToolbar', elementRef, injector) || this;
    }
    SearchToolbarNg1Component.decorators = [
        { type: Directive, args: [{
                    selector: 'search-toolbar'
                },] },
    ];
    /** @nocollapse */
    SearchToolbarNg1Component.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Injector, },
    ]; };
    SearchToolbarNg1Component.propDecorators = {
        "searchTypeahead": [{ type: Input },],
        "placeHolder": [{ type: Input },],
        "closeSearch": [{ type: Input },],
        "onSearch": [{ type: Input },],
        "onFocus": [{ type: Input },],
    };
    return SearchToolbarNg1Component;
}(UpgradeComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var SelectTableNg1Component = (function (_super) {
    __extends(SelectTableNg1Component, _super);
    function SelectTableNg1Component(elementRef, injector) {
        var _this = _super.call(this, 'selectTable', elementRef, injector) || this;
        _this.selectedChange = new EventEmitter();
        return _this;
    }
    SelectTableNg1Component.decorators = [
        { type: Directive, args: [{
                    selector: 'select-table'
                },] },
    ];
    /** @nocollapse */
    SelectTableNg1Component.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Injector, },
    ]; };
    SelectTableNg1Component.propDecorators = {
        "values": [{ type: Input },],
        "multipleSelect": [{ type: Input },],
        "selectKey": [{ type: Input },],
        "selected": [{ type: Input },],
        "searchText": [{ type: Input },],
        "tableHeight": [{ type: Input },],
        "selectHiddenItems": [{ type: Input },],
        "selectedChange": [{ type: Output },],
    };
    return SelectTableNg1Component;
}(UpgradeComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ SLIDER_CHART_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return SliderChartNg1Component; }),
    multi: true
};
var SliderChartNg1Component = (function (_super) {
    __extends(SliderChartNg1Component, _super);
    function SliderChartNg1Component(elementRef, injector) {
        var _this = _super.call(this, 'sliderChart', elementRef, injector) || this;
        _this.ngModelChange = new EventEmitter();
        return _this;
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    SliderChartNg1Component.prototype.writeValue = /**
     * @param {?} obj
     * @return {?}
     */
    function (obj) { };
    /**
     * @param {?} fn
     * @return {?}
     */
    SliderChartNg1Component.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { };
    /**
     * @param {?} fn
     * @return {?}
     */
    SliderChartNg1Component.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { };
    SliderChartNg1Component.decorators = [
        { type: Directive, args: [{
                    selector: 'slider-chart',
                    providers: [SLIDER_CHART_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    SliderChartNg1Component.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Injector, },
    ]; };
    SliderChartNg1Component.propDecorators = {
        "sliderOptions": [{ type: Input },],
        "ngModel": [{ type: Input },],
        "chartOptions": [{ type: Input },],
        "chartData": [{ type: Input },],
        "ngModelChange": [{ type: Output },],
    };
    return SliderChartNg1Component;
}(UpgradeComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var SocialChartNg1Component = (function (_super) {
    __extends(SocialChartNg1Component, _super);
    function SocialChartNg1Component(elementRef, injector) {
        return _super.call(this, 'uxSocialChartNg1', elementRef, injector) || this;
    }
    SocialChartNg1Component.decorators = [
        { type: Directive, args: [{
                    selector: 'social-chart'
                },] },
    ];
    /** @nocollapse */
    SocialChartNg1Component.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Injector, },
    ]; };
    SocialChartNg1Component.propDecorators = {
        "data": [{ type: Input },],
        "options": [{ type: Input },],
        "width": [{ type: Input },],
        "height": [{ type: Input },],
        "api": [{ type: Input },],
        "communities": [{ type: Input },],
        "detailStyle": [{ type: Input },],
        "popoverStyle": [{ type: Input },],
        "nodeDetail": [{ type: Input },],
        "edgeDetail": [{ type: Input },],
        "nodePopover": [{ type: Input },],
        "edgePopover": [{ type: Input },],
        "forceAtlasDuration": [{ type: Input },],
        "nodeSizeAttribute": [{ type: Input },],
        "startMaximized": [{ type: Input },],
        "startMaximised": [{ type: Input },],
        "showMaximizeControl": [{ type: Input },],
        "showMaximiseControl": [{ type: Input },],
        "socialChartContainer": [{ type: Input },],
        "fullscreenButtonPosition": [{ type: Input },],
        "localStrings": [{ type: Input },],
        "chartTitle": [{ type: Input },],
        "titleDisplayTime": [{ type: Input },],
        "edgeWeightInfluence": [{ type: Input },],
        "minLabels": [{ type: Input },],
    };
    return SocialChartNg1Component;
}(UpgradeComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var SortDirectionToggleNg1Component = (function (_super) {
    __extends(SortDirectionToggleNg1Component, _super);
    function SortDirectionToggleNg1Component(elementRef, injector) {
        return _super.call(this, 'sortDirectionToggle', elementRef, injector) || this;
    }
    SortDirectionToggleNg1Component.decorators = [
        { type: Directive, args: [{
                    selector: 'sort-direction-toggle'
                },] },
    ];
    /** @nocollapse */
    SortDirectionToggleNg1Component.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Injector, },
    ]; };
    SortDirectionToggleNg1Component.propDecorators = {
        "label": [{ type: Input },],
        "sorters": [{ type: Input },],
        "descend": [{ type: Input },],
    };
    return SortDirectionToggleNg1Component;
}(UpgradeComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var TreeGridNg1Component = (function (_super) {
    __extends(TreeGridNg1Component, _super);
    function TreeGridNg1Component(elementRef, injector) {
        var _this = _super.call(this, 'treegrid', elementRef, injector) || this;
        _this.optionsChange = new EventEmitter();
        _this.selectedChange = new EventEmitter();
        _this.currentRowChange = new EventEmitter();
        _this.treeDataChange = new EventEmitter();
        return _this;
    }
    TreeGridNg1Component.decorators = [
        { type: Directive, args: [{
                    selector: 'treegrid'
                },] },
    ];
    /** @nocollapse */
    TreeGridNg1Component.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Injector, },
    ]; };
    TreeGridNg1Component.propDecorators = {
        "data": [{ type: Input },],
        "columns": [{ type: Input },],
        "treeData": [{ type: Input },],
        "selected": [{ type: Input },],
        "currentRow": [{ type: Input },],
        "options": [{ type: Input },],
        "optionsChange": [{ type: Output },],
        "selectedChange": [{ type: Output },],
        "currentRowChange": [{ type: Output },],
        "treeDataChange": [{ type: Output },],
    };
    return TreeGridNg1Component;
}(UpgradeComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ThumbnailNg1Component = (function (_super) {
    __extends(ThumbnailNg1Component, _super);
    function ThumbnailNg1Component(elementRef, injector) {
        return _super.call(this, 'thumbnail', elementRef, injector) || this;
    }
    ThumbnailNg1Component.decorators = [
        { type: Directive, args: [{
                    selector: 'thumbnail'
                },] },
    ];
    /** @nocollapse */
    ThumbnailNg1Component.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Injector, },
    ]; };
    ThumbnailNg1Component.propDecorators = {
        "url": [{ type: Input },],
        "show": [{ type: Input },],
        "width": [{ type: Input },],
        "height": [{ type: Input },],
    };
    return ThumbnailNg1Component;
}(UpgradeComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NavigationMenuService = (function () {
    function NavigationMenuService(_navigationMenuService) {
        this._navigationMenuService = _navigationMenuService;
    }
    /**
     * @return {?}
     */
    NavigationMenuService.prototype.show = /**
     * @return {?}
     */
    function () {
        this._navigationMenuService.show();
    };
    /**
     * @return {?}
     */
    NavigationMenuService.prototype.hide = /**
     * @return {?}
     */
    function () {
        this._navigationMenuService.hide();
    };
    /**
     * @return {?}
     */
    NavigationMenuService.prototype.visible = /**
     * @return {?}
     */
    function () {
        return this._navigationMenuService.visible();
    };
    /**
     * @return {?}
     */
    NavigationMenuService.prototype.collapseAtWidth = /**
     * @return {?}
     */
    function () {
        return this._navigationMenuService.collapseAtWidth();
    };
    /**
     * @param {?} width
     * @return {?}
     */
    NavigationMenuService.prototype.setCollapseAtWidth = /**
     * @param {?} width
     * @return {?}
     */
    function (width) {
        this._navigationMenuService.setCollapseAtWidth(width);
    };
    /**
     * @return {?}
     */
    NavigationMenuService.prototype.setDefaultCollapseAtWidth = /**
     * @return {?}
     */
    function () {
        this._navigationMenuService.setDefaultCollapseAtWidth();
    };
    NavigationMenuService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    NavigationMenuService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: ['$navigationMenu',] },] },
    ]; };
    return NavigationMenuService;
}());
/**
 * @param {?} injector
 * @return {?}
 */
function navigationMenuServiceFactory(injector) {
    return injector.get('$navigationMenu');
}
var /** @type {?} */ navigationMenuServiceProvider = {
    provide: '$navigationMenu',
    useFactory: navigationMenuServiceFactory,
    deps: ['$injector']
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var PdfService = (function () {
    function PdfService(_pdfService) {
        this._pdfService = _pdfService;
    }
    /**
     * @param {?} columns
     * @param {?} rows
     * @param {?=} options
     * @return {?}
     */
    PdfService.prototype.createTable = /**
     * @param {?} columns
     * @param {?} rows
     * @param {?=} options
     * @return {?}
     */
    function (columns, rows, options) {
        if (options === void 0) { options = {}; }
        return this._pdfService.createTable(columns, rows, options);
    };
    PdfService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    PdfService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: ['$pdf',] },] },
    ]; };
    return PdfService;
}());
/**
 * @param {?} injector
 * @return {?}
 */
function pdfServiceFactory(injector) {
    return injector.get('$pdf');
}
var /** @type {?} */ pdfServiceProvider = {
    provide: '$pdf',
    useFactory: pdfServiceFactory,
    deps: ['$injector']
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var TimeAgoService = (function () {
    function TimeAgoService(_timeAgoService) {
        this._timeAgoService = _timeAgoService;
    }
    /**
     * @param {?} strings
     * @return {?}
     */
    TimeAgoService.prototype.setStrings = /**
     * @param {?} strings
     * @return {?}
     */
    function (strings) {
        this._timeAgoService.setStrings(strings);
    };
    /**
     * @param {?} past
     * @param {?} present
     * @return {?}
     */
    TimeAgoService.prototype.timeSince = /**
     * @param {?} past
     * @param {?} present
     * @return {?}
     */
    function (past, present) {
        return this._timeAgoService.timeSince(past, present);
    };
    /**
     * @param {?} moment
     * @return {?}
     */
    TimeAgoService.prototype.timeSinceNow = /**
     * @param {?} moment
     * @return {?}
     */
    function (moment) {
        return this._timeAgoService.timeSinceNow(moment);
    };
    TimeAgoService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    TimeAgoService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: ['timeAgoService',] },] },
    ]; };
    return TimeAgoService;
}());
/**
 * @param {?} injector
 * @return {?}
 */
function timeAgoServiceFactory(injector) {
    return injector.get('timeAgoService');
}
var /** @type {?} */ timeAgoServiceProvider = {
    provide: 'timeAgoService',
    useFactory: timeAgoServiceFactory,
    deps: ['$injector']
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ declarations = [
    ContactsNg1Component,
    ExpandInputNg1Component,
    FloatingActionButtonNg1Component,
    FlotNg1Component,
    GridNg1Component,
    HierarchyBarNg1Component,
    MarqueeWizardNg1Component,
    NestedDonutNg1Component,
    OrganizationChartNg1Component,
    PartitionMapNg1Component,
    PeityBarChartNg1Component,
    PeityLineChartNg1Component,
    PeityPieChartNg1Component,
    PeityUpdatingLineChartNg1Component,
    SankeyNg1Component,
    SearchToolbarNg1Component,
    SelectTableNg1Component,
    SliderChartNg1Component,
    SocialChartNg1Component,
    SortDirectionToggleNg1Component,
    TreeGridNg1Component,
    ThumbnailNg1Component,
];
var HybridModule = (function () {
    function HybridModule() {
    }
    HybridModule.decorators = [
        { type: NgModule, args: [{
                    imports: [],
                    exports: declarations,
                    declarations: declarations,
                    providers: [
                        navigationMenuServiceProvider,
                        pdfServiceProvider,
                        timeAgoServiceProvider,
                        TimeAgoService,
                        PdfService,
                        NavigationMenuService,
                    ],
                },] },
    ];
    return HybridModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { BreadcrumbsComponent, BreadcrumbsModule, CardTabsModule, CardTabsService, CardTabsetComponent, CardTabComponent, CardTabContentDirective, CheckboxModule, CHECKBOX_VALUE_ACCESSOR, CheckboxComponent, ColumnSortingModule, ColumnSortingComponent, ColumnSortingState, ColumnSortingDirective, DashboardModule, DashboardComponent, DashboardService, defaultOptions, ActionDirection, Rounding, DashboardDragHandleDirective, DashboardWidgetComponent, DateTimePickerModule, DateTimePickerComponent, DateTimePickerService, DatePickerMode, ModeDirection, DatePickerHeaderEvent, DateTimePickerConfig, EboxModule, EboxComponent, EboxHeaderDirective, EboxContentDirective, FacetsModule, FacetContainerComponent, FacetSelect, FacetDeselect, FacetDeselectAll, FacetHeaderComponent, FacetBaseComponent, FacetCheckListComponent, FacetTypeaheadListComponent, FacetTypeaheadHighlight, Facet, FilterModule, FilterContainerComponent, FilterAddEvent, FilterRemoveEvent, FilterRemoveAllEvent, FilterBaseComponent, FilterDropdownComponent, FilterDynamicComponent, FlippableCardModule, FlippableCardComponent, FlippableCardFrontDirective, FlippableCardBackDirective, FloatingActionButtonsModule, FloatingActionButtonsComponent, FloatingActionButtonComponent, HierarchyBarModule, HierarchyBarService, HierarchyBarComponent, ItemDisplayPanelModule, ItemDisplayPanelContentDirective, ItemDisplayPanelFooterDirective, ItemDisplayPanelComponent, MarqueeWizardStepComponent, MarqueeWizardComponent, MarqueeWizardModule, NavigationModule, NavigationComponent, NavigationItemComponent, NotificationModule, NotificationService, NotificationListComponent, NumberPickerModule, NUMBER_PICKER_VALUE_ACCESSOR, NumberPickerComponent, PageHeaderModule, PageHeaderComponent, PageHeaderNavigationComponent, PageHeaderIconMenuComponent, PageHeaderCustomMenuDirective, PopoverModule, PopoverComponent, PopoverDirective, ProgressBarModule, ProgressBarComponent, RadioButtonModule, RADIOBUTTON_VALUE_ACCESSOR, RadioButtonComponent, SearchBuilderGroupComponent, SearchBuilderGroupService, SearchBuilderOutletDirective, BaseSearchComponent, SearchTextComponent, SearchDateComponent, SearchDateRangeComponent, SearchSelectComponent, SearchBuilderComponent, SearchBuilderService, SearchBuilderModule, SELECT_VALUE_ACCESSOR, SelectComponent, SelectModule, SidePanelComponent, SidePanelCloseDirective, SidePanelModule, SliderModule, SliderComponent, SliderType, SliderStyle, SliderSize, SliderCalloutTrigger, SliderSnap, SliderTickType, SliderThumbEvent, SliderThumb, SparkModule, SparkComponent, SpinButtonModule, SPIN_BUTTON_VALUE_ACCESSOR, SpinButtonComponent, TabsetModule, TabsetComponent, TabsetService, TabComponent, TabHeadingDirective, TabFocusDirective, TagInputEvent, TagInputComponent, TagInputModule, TimelineModule, TimelineComponent, TimelineEventComponent, TimePickerModule, TIME_PICKER_VALUE_ACCESSOR, TimePickerComponent, TimeFormatPipe, ToggleSwitchModule, ToggleSwitchComponent, ToolbarSearchModule, ToolbarSearchComponent, ToolbarSearchFieldDirective, ToolbarSearchButtonDirective, TooltipModule, TooltipComponent, TooltipDirective$1 as TooltipDirective, TooltipService, TypeaheadOptionEvent, TypeaheadKeyService, TypeaheadComponent, TypeaheadModule$1 as TypeaheadModule, MediaPlayerModule, MediaPlayerComponent, MediaPlayerBaseExtensionDirective, MediaPlayerControlsExtensionComponent, MediaPlayerTimelineExtensionComponent, VirtualScrollModule, VirtualScrollComponent, VirtualScrollLoadingDirective, VirtualScrollLoadButtonDirective, VirtualScrollCellDirective, WizardModule, WizardComponent, StepChangingEvent, WizardStepComponent, AutoGrowModule, AutoGrowDirective, ClickOutsideModule, ClickOutsideDirective, DragModule, DragDirective, FixedHeaderTableModule, FixedHeaderTableDirective, FloatLabelDirective, FloatLabelModule, FocusIfDirective, FocusIfModule, HelpCenterModule, HelpCenterService, HelpCenterItemDirective, HoverActionModule, HoverActionContainerDirective, HoverActionDirective, InfiniteScrollDirective, InfiniteScrollLoadingEvent, InfiniteScrollLoadedEvent, InfiniteScrollLoadErrorEvent, InfiniteScrollLoadButtonDirective, InfiniteScrollLoadingDirective, InfiniteScrollModule, LayoutSwitcherModule, LayoutSwitcherDirective, LayoutSwitcherItemDirective, MenuNavigationItemDirective, MenuNavigationDirective, MenuNavigationModule, ResizeService, ResizeDirective, ResizeModule, ScrollModule as ScrollIntoViewIfModule, ScrollIntoViewIfDirective, ScrollIntoViewDirective, ScrollIntoViewService, ScrollModule, SelectionItemDirective, SelectionDirective, SelectionModule, ReorderableModule, ReorderableDirective, ReorderableHandleDirective, ReorderableModelDirective, ReorderableService, ReorderableGroup, DurationPipeModule, DurationPipe, FileSizePipeModule, FileSizePipe, StringFilterPipe, StringFilterModule, AudioServiceModule, AudioService, ColorServiceModule, ColorService, ThemeColor, colorSets, FrameExtractionModule, FrameExtractionService, PersistentDataModule, PersistentDataService, PersistentDataStorageType, StorageAdapter, CookieAdapter, LocalStorageAdapter, SessionStorageAdapter, ContactsNg1Component, ExpandInputNg1Component, FloatingActionButtonNg1Component, FlotNg1Component, GridNg1Component, HierarchyBarNg1Component, MarqueeWizardNg1Component, NestedDonutNg1Component, OrganizationChartNg1Component, PartitionMapNg1Component, PeityBarChartNg1Component, PeityLineChartNg1Component, PeityPieChartNg1Component, PeityUpdatingLineChartNg1Component, SankeyNg1Component, SearchToolbarNg1Component, SelectTableNg1Component, SLIDER_CHART_VALUE_ACCESSOR, SliderChartNg1Component, SocialChartNg1Component, SortDirectionToggleNg1Component, TreeGridNg1Component, ThumbnailNg1Component, NavigationMenuService, navigationMenuServiceFactory, navigationMenuServiceProvider, PdfService, pdfServiceFactory, pdfServiceProvider, TimeAgoService, timeAgoServiceFactory, timeAgoServiceProvider, HybridModule, DayViewComponent as ɵd, DayViewService as ɵe, HeaderComponent as ɵc, MonthViewComponent as ɵf, MonthViewService as ɵg, TimeViewComponent as ɵj, YearViewComponent as ɵh, YearViewService as ɵi, FloatingActionButtonsService as ɵk, MarqueeWizardService as ɵm, MediaPlayerService as ɵu, PageHeaderNavigationDropdownItemComponent as ɵr, PageHeaderNavigationItemComponent as ɵq, PageHeaderService as ɵp, SidePanelService as ɵl, TypeaheadHighlightDirective as ɵt, TypeaheadService as ɵs, HoverActionService as ɵv, MenuNavigationToggleDirective as ɵo, MenuNavigationService as ɵn, SelectionService as ɵw };
