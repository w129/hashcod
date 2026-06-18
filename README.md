# Hashcod V12.1 Local

Plataforma criptográfica local con 10,100 códigos, herramientas Enterprise,
Vault, QR, Docuseal, Warp Workspace, registro de códigos y utilidades de
auditoría.

## Diseño Hashcod Spectrum

La interfaz utiliza la paleta oficial solicitada:

```text
#E50058  #FF5B5B  #FFD399
#FFE9CC  #09607D  #07485E
```

Los azules estructuran la plataforma, magenta y coral identifican acciones,
y los tonos crema crean superficies de trabajo. El nombre y el icono oficial
de Hashcod permanecen exclusivamente en blanco o negro según el contraste.

## Inicio rápido en Windows

Haz doble clic en:

```text
INICIAR-HASHCOD.bat
```

El iniciador:

- comprueba Node.js;
- instala las dependencias únicamente cuando faltan;
- genera secretos locales únicos la primera vez;
- selecciona otro puerto si `2340` está ocupado;
- espera a que el diagnóstico responda;
- abre Hashcod automáticamente en el navegador.

Para detener un proceso iniciado de esta forma usa:

```text
DETENER-HASHCOD.bat
```

## Diagnóstico

Ejecuta:

```text
DIAGNOSTICO-HASHCOD.bat
```

También puedes usar:

```powershell
npm test
```

El estado del servidor está disponible en:

```text
http://127.0.0.1:2340/health
```

## Credenciales locales

En el primer arranque se crean:

- `.env.local`: secretos y configuración privada;
- `runtime-data/LOCAL-CREDENTIALS.txt`: claves legibles para los paneles locales.

Ambos están excluidos de Git. Guarda `LOCAL-CREDENTIALS.txt` en un lugar
seguro y no lo publiques.

## Persistencia y copias de seguridad

Los datos locales se guardan cifrados dentro de `runtime-data/`. Hashcod crea
copias automáticas diarias y conserva 14 días de forma predeterminada. Puedes
cambiarlo en `.env.local`:

```text
HASHCOD_BACKUP_RETENTION_DAYS=30
```

## Ejecución manual

```powershell
npm ci
npm run setup:local
npm start
```

Por seguridad, el servidor escucha sólo en `127.0.0.1`. Cambia `HOST`
únicamente si necesitas acceso desde otros equipos y cuentas con un firewall y
una configuración privada adecuados.
