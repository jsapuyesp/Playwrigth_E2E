import { Text } from '@serenity-js/web';

import { Catalogo } from '../../ui/Catalogo';

// Obtiene un dato observable para que el step pueda expresar una expectativa.
export const TituloDelCatalogo = () => Text.of(Catalogo.titulo);
