import {NgModule, ApplicationRef, LOCALE_ID} from "@angular/core";
import {RouterModule, PreloadAllModules} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {createNewHosts, createInputTransfer, removeNgStyles} from "@angularclass/hmr";
import {AppComponent} from "./app.component";
import {NoContentComponent} from "./pages/no-content/no-content.component";
import {TopModule} from "./pages/top/top.module";
import {HeaderModule} from "./components/header/header.module";
import {CoreModule} from "./core/core.module";
import {AuthModule} from "./pages/auth/auth.module";
import {HomeModule} from "./pages/home/home.module";
import {CatalogModule} from "./pages/catalog/catalog.module";
import {ProductModule} from "./pages/product/product.module";
import {PolicyModule} from "./components/policy/policy.module";
import {ENV_PROVIDERS} from "./environment";
import {ROUTES} from "./app.routes";
import '../styles/_index.scss';

@NgModule({
    bootstrap: [
        AppComponent,
    ],
    declarations: [
        AppComponent,
        NoContentComponent,
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(ROUTES, {
            preloadingStrategy: PreloadAllModules,
        }),
        FormsModule,
        ReactiveFormsModule,

        PolicyModule,
        CoreModule,
        TopModule,
        HeaderModule,
        AuthModule,
        HomeModule,
        ProductModule,
        CatalogModule
    ],
    providers: [
        ENV_PROVIDERS,
        {provide: LOCALE_ID, useValue: 'ru'}
    ]
})
export class AppModule {

    constructor(public appRef: ApplicationRef) {
    }

    // Hot Module Replacement feature https://github.com/AngularClass/angular2-hmr

    hmrOnInit(store) {
        if (!store || !store.state) return;
        console.log('HMR store', store);
        console.log('store.state.data:', store.state.data);
        // inject AppStore here and update it
        // this.AppStore.update(store.state)
        if ('restoreInputValues' in store) {
            store.restoreInputValues();
        }
        // change detection
        this.appRef.tick();
        delete store.state;
        delete store.restoreInputValues;
    }

    hmrOnDestroy(store) {
        const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
        // recreate elements
        store.disposeOldHosts = createNewHosts(cmpLocation);
        // inject your AppStore and grab state then set it on store
        // var appState = this.AppStore.get()
        store.state = {data: 'yolo'};
        // store.state = Object.assign({}, appState)
        // save input values
        store.restoreInputValues = createInputTransfer();
        // remove styles
        removeNgStyles();
    }

    hmrAfterDestroy(store) {
        // display new elements
        store.disposeOldHosts();
        delete store.disposeOldHosts;
        // anything you need done the component is removed
    }

}
