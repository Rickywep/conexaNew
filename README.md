# ConexaNews

Aplicación móvil de noticias fintech desarrollada con React Native y Expo. Permite navegar artículos, marcar favoritos, consultar el equipo y personalizar la experiencia con soporte de tema oscuro/claro.

---

## Requisitos previos

- Node.js >= 22.11.0
- npm >= 10
- [Expo Go](https://expo.dev/go) instalado en el dispositivo físico, **o** Xcode (iOS Simulator) / Android Studio (Android Emulator)

---

## Instalación y puesta en marcha

```bash
# 1. Clonar el repositorio
git clone git@github.com:Rickywep/conexaNew.git
cd ConexaNews

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor de desarrollo
npm start
```

Una vez levantado el servidor de Expo, elegir plataforma:

| Acción | Comando / Tecla |
|---|---|
| Abrir en iOS Simulator | `i` en la terminal |
| Abrir en Android Emulator | `a` en la terminal |
| Escanear con Expo Go (dispositivo físico) | Cámara (iOS) o app Expo Go (Android) |


## Arquitectura

### Estructura de carpetas

El proyecto sigue una arquitectura **vertical slice** (feature-based): cada funcionalidad es una unidad autónoma con sus propias pantallas, componentes, hooks y tipos.

```
src/
├── api/               # Módulos de recursos API (api.news, api.users)
├── services/          # Instancia axios con configuración base
├── features/
│   ├── login/         # Autenticación: pantalla + formulario + credenciales mock
│   ├── news/          # Noticias: lista, detalle, header, hook useNews, helpers
│   ├── users/         # Equipo: lista, bottom sheet, hook useUsers
│   └── profile/       # Perfil: favoritos, toggle de tema, logout
├── components/        # Componentes compartidos: Typography, Button, SearchBar
├── context/           # AppContext + AppReducer (solo lógica de auth)
├── store/             # Stores Zustand con persistencia
├── theme/             # Tokens de color y hook useTheme
├── navigation/        # Configuración de React Navigation
└── types/             # Tipos globales (AppState, AppAction, param lists)
```

### Capas de datos

```
Pantalla / Hook
    └── src/api/{resource}.ts       ← módulo de recurso (api.news.list)
            └── src/services/api.ts ← instancia axios (baseURL, timeout)
                    └── https://jsonplaceholder.org
```

Los hooks (`useNews`, `useUsers`) son el único punto de entrada a los datos desde las pantallas. Nunca se llama al cliente axios directamente desde un componente.

### Gestión de estado

| Responsabilidad | Solución | Persistencia |
|---|---|---|
| Autenticación (`isAuthenticated`) | `AppContext` + `useReducer` | AsyncStorage (manual) |
| Datos de noticias y usuarios | Hooks locales (`useNews`, `useUsers`) | No (se re-fetchea al montar) |
| Artículos favoritos | Zustand (`useFavoritesStore`) | AsyncStorage (automática) |
| Tema oscuro/claro | Zustand (`useThemeStore`) | AsyncStorage (automática) |

`AppContext` es intencionalmente mínimo: solo maneja `LOGIN`, `LOGOUT` y `LOAD_AUTH`. La lógica de datos vive en los hooks de cada feature.

---

## Patrones de diseño

### Feature hooks
Cada feature con datos remotos expone un hook dedicado en `features/{name}/hooks/`:

```ts
// Encapsula fetch, loading, error y lógica derivada
const { filtered, isLoading, error, searchQuery, setSearchQuery } = useNews();
const { users, isLoading, error } = useUsers();
```

### Componentes autocontenidos
Los componentes de header (`HeaderNews`, `HeaderUsers`, `HeaderProfile`) y utilidades (`ThemeToggle`) consumen sus propios hooks internamente — no reciben datos como props desde el padre, lo que mantiene las pantallas limpias.

### Theming por tokens
Ningún componente usa colores hardcodeados. Todos consumen `useTheme()`:

```ts
const { colors, isDark, toggle } = useTheme();
// colors.accent, colors.surface, colors.danger, etc.
```

El cambio de tema es instantáneo y persiste entre sesiones via Zustand + AsyncStorage.

---

## Bibliotecas principales

| Biblioteca | Versión | Rol |
|---|---|---|
| `@shopify/flash-list` | 2 | Lista de alto rendimiento (reemplaza FlatList) |
| `zustand` | 5 | Estado global liviano con middleware `persist` |
| `axios` | 1 | Cliente HTTP con instancia configurada |
| `@react-native-async-storage/async-storage` | 2 | Persistencia local (auth, favoritos, tema) |

---

## Credenciales de prueba

La autenticación es mock. Usar:

```
Email:     admin@conexanews.com
Password:  admin123
```
