const mensajesEspanol = {
    ra: {
        action: {
            create: 'Crear',
            export: 'Exportar',
            edit: 'Editar',
            delete: 'Eliminar',
            save: 'Guardar',
            cancel: 'Cancelar',
            back: 'Regresar',
            confirm: 'Confirmar',
            refresh: 'Actualizar',
            show: 'Ver detalles',
            sort: 'Ordenar',
            unselect: 'Deseleccionar',
            undo: 'Deshacer',
            add_filter: 'Agregar filtro',
            remove_filter: 'Quitar filtro',
            clear_input_value: 'Limpiar valor',
            toggle_theme: 'Cambiar tema',
            remove_all_filters: 'Quitar filtros',
            save_query: 'Guardar consulta actual como...'
        },
        boolean: {
            true: 'Sí',
            false: 'No',
        },
        page: {
            list: 'Lista de %{name}',
            edit: 'Editar %{name}',
            show: 'Mostrar %{name}',
            create: 'Crear %{name}',
            dashboard: 'Panel de control',
            not_found: 'No encontrado',
            loading: 'Cargando',
        },
        sort: {
            ASC: 'Ascendente',
            DESC: 'Descendente',
        },
        navigation: {
            page_rows_per_page: 'Filas por página',
            page_range_info: '%{offsetBegin}-%{offsetEnd} de %{total}',
            page_out_of_boundaries: 'Número de página %{page} fuera de límites',
            page_out_from_end: 'No se puede ir después de la última página',
            page_out_from_begin: 'No se puede ir antes de la página 1',
            page_first: 'Ir a la primera página',
            page_last: 'Ir a la última página',
            page_next: 'Ir a la página siguiente',
            page_previous: 'Ir a la página anterior',
            next: 'Siguiente',
            prev: 'Anterior',
            skip_nav: 'Ir al contenido',
            no_results: 'No se encontraron resultados',
            no_more_results: 'La página número %{page} está fuera de rango. Intenta la anterior.',
            'No results found with the current filters.': 'No se encontraron resultados con los filtros actuales.',
            'Clear filters': 'Limpiar filtros',
        
        },
        message: {
            yes: 'Sí',
            no: 'No',
            are_you_sure: '¿Está seguro?',
            about: 'Acerca de',
            not_found: 'No se pudo encontrar la página o hubo un error en la URL.',
            loading: 'La página se está cargando, espere por favor',
            invalid_form: 'El formulario no es válido. Por favor revise los errores',
            delete_title: 'Eliminar %{name} #%{id}',
            delete_content: '¿Está seguro que desea eliminar este elemento?',
            bulk_delete_title: 'Eliminar %{name} |||| Eliminar %{smart_count} %{name}',
            bulk_delete_content: '¿Está seguro que desea eliminar este %{name}? |||| ¿Está seguro que desea eliminar estos %{smart_count} elementos?',
            'No results found with the current filters.': 'No se encontraron resultados con los filtros actuales.',
            'Clear filters': 'Limpiar filtros',
        
        },
        input: {
            file: {
                upload_several: 'Arrastra algunos archivos para subir, o haz clic para seleccionar uno.',
                upload_single: 'Arrastra un archivo para subir, o haz clic para seleccionarlo.',
            },
            image: {
                upload_several: 'Arrastra algunas imágenes para subir, o haz clic para seleccionar una.',
                upload_single: 'Arrastra una imagen para subir, o haz clic para seleccionarla.',
            },
            references: {
                all_missing: 'No se pueden encontrar datos de referencias.',
                many_missing: 'Al menos una de las referencias asociadas ya no parece estar disponible.',
                single_missing: 'La referencia asociada ya no parece estar disponible.',
            },
            password: {
                toggle_visible: 'Ocultar contraseña',
                toggle_hidden: 'Mostrar contraseña',
            },
        },
        notification: {
            updated: 'Elemento actualizado |||| %{smart_count} elementos actualizados',
            created: 'Elemento creado',
            deleted: 'Elemento eliminado |||| %{smart_count} elementos eliminados',
            bad_item: 'Elemento incorrecto',
            item_doesnt_exist: 'El elemento no existe',
            http_error: 'Error de comunicación con el servidor',
            data_provider_error: 'Error del proveedor de datos. Revisar la consola para más detalles.',
            i18n_error: 'No se pueden cargar las traducciones para el idioma especificado',
            canceled: 'Acción cancelada',
            logged_out: 'Su sesión ha terminado, por favor vuelva a conectarse.',
            "Invalid username or password": "Usuario o contraseña inválidos"
        },
        validation: {
            required: 'Requerido',
            minLength: 'Debe tener al menos %{min} caracteres',
            maxLength: 'Debe tener %{max} caracteres o menos',
            minValue: 'Debe ser al menos %{min}',
            maxValue: 'Debe ser %{max} o menos',
            number: 'Debe ser un número',
            email: 'Debe ser un email válido',
            oneOf: 'Debe ser uno de: %{options}',
            regex: 'Debe coincidir con un formato específico (regexp): %{pattern}',
        },
        filter: {
      no_results: 'No se encontraron resultados con los filtros actuales.',
      clear: 'Limpiar filtros',
      'No results found with the current filters.': 'No se encontraron resultados con los filtros actuales.',
      'Clear filters': 'Limpiar filtros',

        },

        auth: {
            user_menu: 'Perfil',
        }
    },
};

export default mensajesEspanol;