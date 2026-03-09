# 💰 MoneyWise - Gestión de Finanzas Personales

Examen de Programación Móvil - **Daniel Francisco Valle Ortiz**

MoneyWise es una aplicación híbrida desarrollada con **Ionic 7**, **Angular 16** y **Capacitor**. Diseñada bajo una arquitectura modular (Core, Shared, Feature Modules) para la gestión eficiente de ingresos y gastos personales con soporte de hardware nativo.

## 🛠️ Stack Tecnológico

* **Frontend:** Ionic Framework & Angular.
* **Nativo:** Capacitor (Camera & Filesystem).
* **Persistencia:** @ionic/storage.
* **Arquitectura:** Lazy Loading, Guards, y Servicios con BehaviorSubject.

## 📋 Cumplimiento de Requisitos (Rúbrica)

### 1. Módulos y Estructura
- [x] **CoreModule:** Servicios centralizados (Auth, Storage, Transaccion, Camera, Analytics).
- [x] **SharedModule:** Declaración y exportación de componentes y pipes reutilizables.
- [x] **Lazy Loading:** Módulos independientes para Auth, Dashboard y Transacciones.

### 2. Componentes Custom (Punto 4 del Notion)
He implementado la lista completa de componentes requeridos en el `SharedModule`:
- **Dashboard:** `DashboardCardComponent`, `ProgressBarCategoryComponent`.
- **Transacciones:** `TransactionItemComponent`, `TransactionDetailComponent`, `TransactionFormComponent`.
- **Multimedia:** `PhotoSelectorComponent`, `PhotoPreviewComponent`, `PhotoGalleryModal`.
- **UI Base:** `CategoryBadgeComponent`, `AmountDisplayComponent`, `EmptyStateComponent`, e inputs personalizados (`InputFieldComponent`, `SelectFieldComponent`).

### 3. Pipes Personalizados (Punto 5 del Notion)
- `CurrencyFormatPipe` (Formato COP).
- `DateFormatPipe` (Fechas relativas).
- `FilterByTypePipe` / `FilterByCategoryPipe` (Filtrado de datos).
- `CategoryIconPipe` / `CategoryColorPipe` (Lógica visual dinámica).

### 4. Funcionalidades Nativa (RF-3)
- Integración completa con **@capacitor/camera** para capturar comprobantes de gastos.
- Almacenamiento local persistente para mantener los datos tras cerrar la app.

## 📱 Instrucciones de Ejecución

1. **Instalar dependencias:** `npm install`
2. **Generar Build:** `ionic build`
3. **Sincronizar Android:** `npx cap sync`
4. **Abrir en Android Studio:** `npx cap open android`

> [!IMPORTANT]
> El APK generado se encuentra en la carpeta del repositorio y en el enlace de entrega adjunto.