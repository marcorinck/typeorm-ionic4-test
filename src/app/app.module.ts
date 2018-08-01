import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy, Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {createConnection} from 'typeorm';
import {Author} from './entities/author';
import {Category} from './entities/category';
import {Post} from './entities/post';

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

    constructor(private platform: Platform) {
        platform.ready().then(async () => {
            // Depending on the machine the app is running on, configure
            // different database connections
            if (platform.is('cordova')) {
                // Running on device or emulator
                await createConnection({
                    type: 'cordova',
                    database: 'test',
                    location: 'default',
                    logging: ['error', 'query', 'schema'],
                    synchronize: true,
                    entities: [
                        Author,
                        Category,
                        Post
                    ]
                });
            } else {
                // Running app in browser
                await createConnection({
                    type: 'sqljs',
                    autoSave: true,
                    location: 'browser',
                    logging: ['error', 'query', 'schema'],
                    synchronize: true,
                    entities: [
                        Author,
                        Category,
                        Post
                    ]
                });
            }
        });
    }
}

