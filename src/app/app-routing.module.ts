import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatUiComponent } from './components/chat-ui/chat-ui.component';
import { ChatMessageComponent } from './components/chat-message/chat-message.component';
const routes: Routes = [
  { path: '', redirectTo: '/chat', pathMatch: 'full' }, // Redirigir a /chat por defecto
  { path: 'chat', component: ChatUiComponent }, // Ruta para el componente principal de chat
  { path: 'message', component: ChatMessageComponent }, // Ruta para mensajes específicos
  { path: '**', redirectTo: '/chat' } // Redirigir rutas no encontradas a /chat
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
