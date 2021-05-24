import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootModules } from './root-modules.enum';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: RootModules.TICKET,
        loadChildren: () => import('src/app/features/ticket/ticket.module').then(m => m.TicketModule),
    },
    { path: '**', redirectTo: RootModules.TICKET }
];


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        /**
         * enable lazy-loading with preload strategy
         * @see https://angular.io/guide/lazy-loading-ngmodules#preloading
         */
        RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled',
    relativeLinkResolution: 'legacy'
}),
    ],
    exports: [RouterModule]
})
export class RoutingModule {
}
