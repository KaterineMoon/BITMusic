import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { routing, appRoutingProviders } 
from './app.routing';

import { AppComponent } from './app.component';
import { ContentIndexComponent } from './componentes/content-index/content-index.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { LoginComponent } from './componentes/login/login.component';
import { PlayerComponent } from './componentes/player/player.component';
import { MenuSongComponent } from './componentes/menu-song/menu-song.component';
import { UserProfileComponent } from './componentes/user-profile/user-profile.component';
import { SongToolsComponent } from './componentes/song-tools/song-tools.component';
import { MainMenuComponent } from './componentes/main-menu/main-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    ContentIndexComponent,
    FooterComponent,
    LoginComponent,
    PlayerComponent,
    MenuSongComponent,
    UserProfileComponent,
    SongToolsComponent,
    MainMenuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
