import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';  // Import routing module
import { AppComponent } from './app.component';
import { ChatUiComponent } from './components/chat-ui/chat-ui.component';
import { HttpClientModule } from '@angular/common/http';
import { ChatMessageComponent } from './components/chat-message/chat-message.component';
import { RouterModule } from '@angular/router';
import { HttpParams } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ChatUiComponent,
    ChatMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,  // Ensure AppRoutingModule is imported here
    FormsModule,
    HttpClientModule,
    RouterModule  // This should also be added if needed
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
