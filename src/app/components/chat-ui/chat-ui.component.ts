import { Component, OnInit } from '@angular/core';
import { OpenAiService } from '../../service/open-ai.service';
import { OpenAiQuery } from '../../model/OpenAiQuery';
import { trigger, transition, animate, style } from '@angular/animations';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-chat-ui',
  templateUrl: './chat-ui.component.html',
  styleUrls: ['./chat-ui.component.scss'],
  animations: [
    trigger('messageAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class ChatUiComponent implements OnInit {
  userPrompt: string = ''; // Entrada del usuario
  queries: OpenAiQuery[] = []; // Array para almacenar las consultas y respuestas
  isLoading: boolean = false; // Estado de carga para el botón de envío
  errorMessage: string = ''; // Mensaje de error (en caso de fallo)
  editingQueryIndex: number | null = null; // Índice de la consulta que se está editando

  constructor(private openAiService: OpenAiService) {}

  ngOnInit(): void {
    this.loadQueries();
  }

  loadQueries() {
    this.openAiService.listAllQueries().subscribe(
      (data) => {
        this.queries = data;
      },
      (error) => {
        console.error('Error al cargar las consultas:', error);
        this.errorMessage = 'Hubo un problema al cargar las consultas previas.';
      }
    );
  }

  sendQuery() {
    if (this.userPrompt.trim()) {
      if (this.editingQueryIndex !== null) {
        // Si estamos editando, actualizamos la consulta
        this.updateQuery(this.editingQueryIndex);
      } else {
        // Si no estamos editando, enviamos una nueva consulta
        const newQuery: OpenAiQuery = {
          id: 0,
          prompt: this.userPrompt,
          response: '',
          timestamp: new Date().toISOString(),
        };

        this.queries.push(newQuery);
        this.isLoading = true;

        this.openAiService.createQuery(this.userPrompt).subscribe(
          (response) => {
            newQuery.response = response.response;
            this.isLoading = false;
          },
          (error) => {
            console.error('Error al enviar la consulta:', error);
            this.isLoading = false;
            this.errorMessage = 'Hubo un problema al enviar tu consulta.';
          }
        );
      }
      this.userPrompt = ''; // Limpiar el campo después de enviar
      this.editingQueryIndex = null; // Resetear el estado de edición
    }
  }

  editPrompt(index: number): void {
    this.editingQueryIndex = index;
    this.userPrompt = this.queries[index].prompt; // Cargar el texto en el campo de entrada
  }

  updateQuery(index: number): void {
    const queryToUpdate = this.queries[index];
    queryToUpdate.prompt = this.userPrompt; // Actualizamos el prompt en el array local

    // Actualizar en el backend
    this.openAiService.updateQuery(queryToUpdate.id, this.userPrompt).subscribe(
      (updatedQuery) => {
        console.log('Prompt actualizado correctamente:', updatedQuery);
        this.queries[index] = updatedQuery; // Actualizamos la consulta en la lista
      },
      (error) => {
        console.error('Error al actualizar el prompt:', error);
        this.errorMessage = 'Hubo un problema al actualizar el prompt.';
      }
    );
  }

  confirmDeletePrompt(index: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás recuperar esta consulta después de eliminarla.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      background: '#1e1e1e',
      color: '#ffffff',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deletePrompt(index);
      }
    });
  }

  deletePrompt(index: number): void {
    const queryToDelete = this.queries[index];
    this.queries.splice(index, 1);

    // Eliminar en el backend
    this.openAiService.deleteQuery(queryToDelete.id).subscribe(
      () => {
        console.log('Prompt eliminado correctamente');
      },
      (error) => {
        console.error('Error al eliminar el prompt:', error);
        this.errorMessage = 'Hubo un problema al eliminar el prompt.';
      }
    );
  }
}
