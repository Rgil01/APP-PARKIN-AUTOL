# Parkin Autol · Control de clientes de parking

Aplicación web **sin servidor ni base de datos**: todos los datos se guardan en el propio
móvil u ordenador (localStorage del navegador). Funciona sin conexión una vez cargada y se puede
instalar como una app en el móvil.

Al abrirla por primera vez, se crea una contraseña y una pregunta de validación con su respuesta.
Si se olvida la contraseña, «Restablecer acceso» solicitará la respuesta antes de permitir crear
otra, sin borrar los datos del parking. Este acceso local no reemplaza la autenticación de un
servidor ni protege los datos frente a otras personas que puedan acceder al almacenamiento del
dispositivo. Las contraseñas ya creadas anteriormente deben iniciar sesión una vez para configurar
la pregunta de validación.

## Qué hace
- **Clientes**: alta/modificación con datos personales, vehículo (matrícula), plaza (número, planta,
  tipo, mando, llaves) y contrato (fecha de alta, cuota, día de pago, forma de pago, IBAN, fianza).
  Ficha del cliente exportable a **PDF** y listado de clientes en PDF.
- **Pagos del mes**: lista de quién ha pagado y quién debe cada mes, botón grande COBRAR,
  recibo en PDF de cada cobro, lista del mes en PDF.
- **Contabilidad**: ingresos (cobros) y gastos por meses y por año, exportable a **Excel**
  (hojas: Resumen, Cobros, Gastos, Cuadro de pagos del año, Clientes).
- **Copias**: descargar / restaurar copia de seguridad (archivo .json) para cambiar de dispositivo.

## Archivos
```
index.html     la aplicación completa
manifest.json  para instalarla como app (PWA)
sw.js          funcionamiento sin conexión
Parkingautol.png  logo de la aplicación y los documentos
lib/           librerías locales de PDF y Excel (incluye la licencia de ExcelJS)
icon.svg, icon-192.png, icon-512.png   iconos PWA
vercel.json    cabeceras para Vercel (opcional)
```

## Desplegar en Vercel (3 opciones)

**Opción A – arrastrar y soltar (la más fácil)**
1. Entra en https://vercel.com y crea una cuenta gratuita.
2. Pulsa **Add New → Project**.
3. Arrastra la carpeta `parkin-autol` completa a la zona de subida (o usa la opción de subir carpeta).
4. Pulsa **Deploy**. En menos de un minuto tendrás una dirección tipo `parkin-autol.vercel.app`.

**Opción B – con GitHub**
1. Sube la carpeta a un repositorio de GitHub.
2. En Vercel: Add New → Project → importa el repositorio → Deploy (no hace falta configurar nada:
   es un sitio estático, sin comando de build).

**Opción C – con la terminal**
```bash
npm i -g vercel
cd parkin-autol
vercel --prod
```

## Instalarla en el móvil
Abre la dirección de Vercel en el móvil:
- **Android (Chrome)**: menú ⋮ → *Añadir a pantalla de inicio* / *Instalar aplicación*.
- **iPhone (Safari)**: botón Compartir → *Añadir a pantalla de inicio*.

## Importante sobre los datos
- Los datos viven **solo en el dispositivo** donde se usa la app. No se envían a ningún sitio.
- Si se usa en el móvil y en el ordenador, cada uno tiene sus propios datos: use
  **Copias → Descargar copia** en uno y **Restaurar copia** en el otro.
- Haga copias de seguridad periódicas (la app lo recuerda si pasan más de 30 días).
- No borre los datos de navegación / caché del navegador para esa web, o se perderán los datos
  (la copia de seguridad los recupera).

## Uso sin Vercel
También funciona abriendo `index.html` directamente en el navegador (doble clic). La generación de
PDF y Excel necesita conexión a Internet la primera vez (descarga dos librerías); después queda en caché.
