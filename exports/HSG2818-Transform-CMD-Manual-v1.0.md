# HSG2818 Transform CMD - Manual v1.0

- Emitido: 2026-05-31T21:35:30.012745-04:00
- Commit: `73edb8fb91b65cfb35b696f2bfe91ac5af2a6d05`
- Catalogo: `hcx0001` a `hcx1000`

## Proposito

Transform CMD toma codes guardados en la base de datos local de HSG2818, permite estudiarlos, convertirlos, derivarlos y guardar resultados nuevos.

Las familias `CRYPTO` usan Web Crypto. Las familias `CONVERT`, `FORMAT`, `TRANSFORM` y `ANALYZE` son utilidades reproducibles y no deben presentarse como cifrado.

## Uso rapido

1. Abre `TRANSFORM CMD` desde la barra superior o inferior.
2. Selecciona un code guardado.
3. Escribe `help` para ver la sintaxis.
4. Ejecuta una transformacion, por ejemplo: `run hcx0001`.
5. Guarda el resultado con `save` o exportalo con `export json`.

## Comandos de consola

| Comando | Funcion |
| --- | --- |
| `help` | Muestra la sintaxis disponible. |
| `list [pagina]` | Muestra una pagina del catalogo. |
| `find <texto>` | Filtra por ID, operacion o categoria. |
| `select <fila>` | Selecciona un code guardado por numero de fila. |
| `show` | Imprime el valor actual del editor. |
| `run <hcxID>` | Ejecuta un comando HCX. |
| `chain <id,id,...>` | Encadena hasta 12 comandos HCX. |
| `save` | Guarda el resultado en la base de datos. |
| `copy` | Copia el valor actual. |
| `export json` | Descarga un manifiesto JSON. |
| `export txt` | Descarga el resultado TXT. |
| `history` | Lista ejecuciones de la sesion. |
| `reset` | Restaura el code original seleccionado. |
| `clear` | Limpia la terminal. |

## Catalogo completo

| ID | Categoria | Perfil | Operacion | Funcion | Parametros |
| --- | --- | --- | --- | --- | --- |
| `hcx0001` | CRYPTO | P1 | `sha256-domain` | SHA-256 con dominio aislado. digest SHA-256 de domain \| value. | P1; width=5; rounds=3; PBKDF2=9000 |
| `hcx0002` | CRYPTO | P1 | `hmac-sha256` | Etiqueta HMAC-SHA-256. HMAC local; usa clave opcional o dominio del comando. | P1; width=5; rounds=3; PBKDF2=9000 |
| `hcx0003` | CRYPTO | P1 | `pbkdf2-sha256` | Derivacion PBKDF2-SHA-256. sal local; iteraciones = 8000 + perfil x 1000. | P1; width=5; rounds=3; PBKDF2=9000 |
| `hcx0004` | CRYPTO | P1 | `hkdf-sha256` | Derivacion HKDF-SHA-256. salt local e info HSG2818-HCX-P1. | P1; width=5; rounds=3; PBKDF2=9000 |
| `hcx0005` | CRYPTO | P1 | `hash-chain` | Cadena iterada SHA-256. rondas = 2 + (perfil mod 8). | P1; width=5; rounds=3; PBKDF2=9000 |
| `hcx0006` | CONVERT | P1 | `base64-encode` | Conversion UTF-8 a Base64. conversion reversible; no es cifrado. | P1; width=5; rounds=3; PBKDF2=9000 |
| `hcx0007` | CONVERT | P1 | `base64-decode` | Restauracion Base64 a UTF-8. valida y decodifica Base64. | P1; width=5; rounds=3; PBKDF2=9000 |
| `hcx0008` | CONVERT | P1 | `hex-encode` | Conversion UTF-8 a hexadecimal. conversion reversible; no es cifrado. | P1; width=5; rounds=3; PBKDF2=9000 |
| `hcx0009` | CONVERT | P1 | `hex-decode` | Restauracion hexadecimal a UTF-8. requiere pares completos de bytes. | P1; width=5; rounds=3; PBKDF2=9000 |
| `hcx0010` | CONVERT | P1 | `url-encode` | Codificacion URL component. protege caracteres reservados para transporte. | P1; width=5; rounds=3; PBKDF2=9000 |
| `hcx0011` | CONVERT | P1 | `url-decode` | Restauracion URL component. decodifica transporte URL. | P1; width=5; rounds=3; PBKDF2=9000 |
| `hcx0012` | TRANSFORM | P1 | `rotate-left` | Rotacion determinista a la izquierda. desplazamiento dependiente del perfil. | P1; width=5; rounds=3; PBKDF2=9000 |
| `hcx0013` | TRANSFORM | P1 | `rotate-right` | Rotacion determinista a la derecha. inversa conceptual de rotate-left. | P1; width=5; rounds=3; PBKDF2=9000 |
| `hcx0014` | TRANSFORM | P1 | `xor-mask` | Mascara XOR de laboratorio. salida hexadecimal; reversible con misma mascara. | P1; width=5; rounds=3; PBKDF2=9000 |
| `hcx0015` | TRANSFORM | P1 | `reverse-blocks` | Inversion por bloques. ancho = 4 + (perfil mod 13). | P1; width=5; rounds=3; PBKDF2=9000 |
| `hcx0016` | FORMAT | P1 | `chunk-delimit` | Segmentacion con guiones. ancho = 4 + (perfil mod 13). | P1; width=5; rounds=3; PBKDF2=9000 |
| `hcx0017` | ANALYZE | P1 | `window-sample` | Muestra determinista por ventana. offset guiado por SHA-256 y perfil. | P1; width=5; rounds=3; PBKDF2=9000 |
| `hcx0018` | FORMAT | P1 | `checksum-envelope` | Sobre con integridad SHA-256. domain \| SHA256 \| VALUE. | P1; width=5; rounds=3; PBKDF2=9000 |
| `hcx0019` | FORMAT | P1 | `json-envelope` | Sobre de transporte JSON. incluye dominio, perfil, valor y SHA-256. | P1; width=5; rounds=3; PBKDF2=9000 |
| `hcx0020` | ANALYZE | P1 | `entropy-report` | Reporte de entropia y perfil. chars, bytes, unique, entropy, estimatedBits y SHA-256. | P1; width=5; rounds=3; PBKDF2=9000 |
| `hcx0021` | CRYPTO | P2 | `sha256-domain` | SHA-256 con dominio aislado. digest SHA-256 de domain \| value. | P2; width=6; rounds=4; PBKDF2=10000 |
| `hcx0022` | CRYPTO | P2 | `hmac-sha256` | Etiqueta HMAC-SHA-256. HMAC local; usa clave opcional o dominio del comando. | P2; width=6; rounds=4; PBKDF2=10000 |
| `hcx0023` | CRYPTO | P2 | `pbkdf2-sha256` | Derivacion PBKDF2-SHA-256. sal local; iteraciones = 8000 + perfil x 1000. | P2; width=6; rounds=4; PBKDF2=10000 |
| `hcx0024` | CRYPTO | P2 | `hkdf-sha256` | Derivacion HKDF-SHA-256. salt local e info HSG2818-HCX-P2. | P2; width=6; rounds=4; PBKDF2=10000 |
| `hcx0025` | CRYPTO | P2 | `hash-chain` | Cadena iterada SHA-256. rondas = 2 + (perfil mod 8). | P2; width=6; rounds=4; PBKDF2=10000 |
| `hcx0026` | CONVERT | P2 | `base64-encode` | Conversion UTF-8 a Base64. conversion reversible; no es cifrado. | P2; width=6; rounds=4; PBKDF2=10000 |
| `hcx0027` | CONVERT | P2 | `base64-decode` | Restauracion Base64 a UTF-8. valida y decodifica Base64. | P2; width=6; rounds=4; PBKDF2=10000 |
| `hcx0028` | CONVERT | P2 | `hex-encode` | Conversion UTF-8 a hexadecimal. conversion reversible; no es cifrado. | P2; width=6; rounds=4; PBKDF2=10000 |
| `hcx0029` | CONVERT | P2 | `hex-decode` | Restauracion hexadecimal a UTF-8. requiere pares completos de bytes. | P2; width=6; rounds=4; PBKDF2=10000 |
| `hcx0030` | CONVERT | P2 | `url-encode` | Codificacion URL component. protege caracteres reservados para transporte. | P2; width=6; rounds=4; PBKDF2=10000 |
| `hcx0031` | CONVERT | P2 | `url-decode` | Restauracion URL component. decodifica transporte URL. | P2; width=6; rounds=4; PBKDF2=10000 |
| `hcx0032` | TRANSFORM | P2 | `rotate-left` | Rotacion determinista a la izquierda. desplazamiento dependiente del perfil. | P2; width=6; rounds=4; PBKDF2=10000 |
| `hcx0033` | TRANSFORM | P2 | `rotate-right` | Rotacion determinista a la derecha. inversa conceptual de rotate-left. | P2; width=6; rounds=4; PBKDF2=10000 |
| `hcx0034` | TRANSFORM | P2 | `xor-mask` | Mascara XOR de laboratorio. salida hexadecimal; reversible con misma mascara. | P2; width=6; rounds=4; PBKDF2=10000 |
| `hcx0035` | TRANSFORM | P2 | `reverse-blocks` | Inversion por bloques. ancho = 4 + (perfil mod 13). | P2; width=6; rounds=4; PBKDF2=10000 |
| `hcx0036` | FORMAT | P2 | `chunk-delimit` | Segmentacion con guiones. ancho = 4 + (perfil mod 13). | P2; width=6; rounds=4; PBKDF2=10000 |
| `hcx0037` | ANALYZE | P2 | `window-sample` | Muestra determinista por ventana. offset guiado por SHA-256 y perfil. | P2; width=6; rounds=4; PBKDF2=10000 |
| `hcx0038` | FORMAT | P2 | `checksum-envelope` | Sobre con integridad SHA-256. domain \| SHA256 \| VALUE. | P2; width=6; rounds=4; PBKDF2=10000 |
| `hcx0039` | FORMAT | P2 | `json-envelope` | Sobre de transporte JSON. incluye dominio, perfil, valor y SHA-256. | P2; width=6; rounds=4; PBKDF2=10000 |
| `hcx0040` | ANALYZE | P2 | `entropy-report` | Reporte de entropia y perfil. chars, bytes, unique, entropy, estimatedBits y SHA-256. | P2; width=6; rounds=4; PBKDF2=10000 |
| `hcx0041` | CRYPTO | P3 | `sha256-domain` | SHA-256 con dominio aislado. digest SHA-256 de domain \| value. | P3; width=7; rounds=5; PBKDF2=11000 |
| `hcx0042` | CRYPTO | P3 | `hmac-sha256` | Etiqueta HMAC-SHA-256. HMAC local; usa clave opcional o dominio del comando. | P3; width=7; rounds=5; PBKDF2=11000 |
| `hcx0043` | CRYPTO | P3 | `pbkdf2-sha256` | Derivacion PBKDF2-SHA-256. sal local; iteraciones = 8000 + perfil x 1000. | P3; width=7; rounds=5; PBKDF2=11000 |
| `hcx0044` | CRYPTO | P3 | `hkdf-sha256` | Derivacion HKDF-SHA-256. salt local e info HSG2818-HCX-P3. | P3; width=7; rounds=5; PBKDF2=11000 |
| `hcx0045` | CRYPTO | P3 | `hash-chain` | Cadena iterada SHA-256. rondas = 2 + (perfil mod 8). | P3; width=7; rounds=5; PBKDF2=11000 |
| `hcx0046` | CONVERT | P3 | `base64-encode` | Conversion UTF-8 a Base64. conversion reversible; no es cifrado. | P3; width=7; rounds=5; PBKDF2=11000 |
| `hcx0047` | CONVERT | P3 | `base64-decode` | Restauracion Base64 a UTF-8. valida y decodifica Base64. | P3; width=7; rounds=5; PBKDF2=11000 |
| `hcx0048` | CONVERT | P3 | `hex-encode` | Conversion UTF-8 a hexadecimal. conversion reversible; no es cifrado. | P3; width=7; rounds=5; PBKDF2=11000 |
| `hcx0049` | CONVERT | P3 | `hex-decode` | Restauracion hexadecimal a UTF-8. requiere pares completos de bytes. | P3; width=7; rounds=5; PBKDF2=11000 |
| `hcx0050` | CONVERT | P3 | `url-encode` | Codificacion URL component. protege caracteres reservados para transporte. | P3; width=7; rounds=5; PBKDF2=11000 |
| `hcx0051` | CONVERT | P3 | `url-decode` | Restauracion URL component. decodifica transporte URL. | P3; width=7; rounds=5; PBKDF2=11000 |
| `hcx0052` | TRANSFORM | P3 | `rotate-left` | Rotacion determinista a la izquierda. desplazamiento dependiente del perfil. | P3; width=7; rounds=5; PBKDF2=11000 |
| `hcx0053` | TRANSFORM | P3 | `rotate-right` | Rotacion determinista a la derecha. inversa conceptual de rotate-left. | P3; width=7; rounds=5; PBKDF2=11000 |
| `hcx0054` | TRANSFORM | P3 | `xor-mask` | Mascara XOR de laboratorio. salida hexadecimal; reversible con misma mascara. | P3; width=7; rounds=5; PBKDF2=11000 |
| `hcx0055` | TRANSFORM | P3 | `reverse-blocks` | Inversion por bloques. ancho = 4 + (perfil mod 13). | P3; width=7; rounds=5; PBKDF2=11000 |
| `hcx0056` | FORMAT | P3 | `chunk-delimit` | Segmentacion con guiones. ancho = 4 + (perfil mod 13). | P3; width=7; rounds=5; PBKDF2=11000 |
| `hcx0057` | ANALYZE | P3 | `window-sample` | Muestra determinista por ventana. offset guiado por SHA-256 y perfil. | P3; width=7; rounds=5; PBKDF2=11000 |
| `hcx0058` | FORMAT | P3 | `checksum-envelope` | Sobre con integridad SHA-256. domain \| SHA256 \| VALUE. | P3; width=7; rounds=5; PBKDF2=11000 |
| `hcx0059` | FORMAT | P3 | `json-envelope` | Sobre de transporte JSON. incluye dominio, perfil, valor y SHA-256. | P3; width=7; rounds=5; PBKDF2=11000 |
| `hcx0060` | ANALYZE | P3 | `entropy-report` | Reporte de entropia y perfil. chars, bytes, unique, entropy, estimatedBits y SHA-256. | P3; width=7; rounds=5; PBKDF2=11000 |
| `hcx0061` | CRYPTO | P4 | `sha256-domain` | SHA-256 con dominio aislado. digest SHA-256 de domain \| value. | P4; width=8; rounds=6; PBKDF2=12000 |
| `hcx0062` | CRYPTO | P4 | `hmac-sha256` | Etiqueta HMAC-SHA-256. HMAC local; usa clave opcional o dominio del comando. | P4; width=8; rounds=6; PBKDF2=12000 |
| `hcx0063` | CRYPTO | P4 | `pbkdf2-sha256` | Derivacion PBKDF2-SHA-256. sal local; iteraciones = 8000 + perfil x 1000. | P4; width=8; rounds=6; PBKDF2=12000 |
| `hcx0064` | CRYPTO | P4 | `hkdf-sha256` | Derivacion HKDF-SHA-256. salt local e info HSG2818-HCX-P4. | P4; width=8; rounds=6; PBKDF2=12000 |
| `hcx0065` | CRYPTO | P4 | `hash-chain` | Cadena iterada SHA-256. rondas = 2 + (perfil mod 8). | P4; width=8; rounds=6; PBKDF2=12000 |
| `hcx0066` | CONVERT | P4 | `base64-encode` | Conversion UTF-8 a Base64. conversion reversible; no es cifrado. | P4; width=8; rounds=6; PBKDF2=12000 |
| `hcx0067` | CONVERT | P4 | `base64-decode` | Restauracion Base64 a UTF-8. valida y decodifica Base64. | P4; width=8; rounds=6; PBKDF2=12000 |
| `hcx0068` | CONVERT | P4 | `hex-encode` | Conversion UTF-8 a hexadecimal. conversion reversible; no es cifrado. | P4; width=8; rounds=6; PBKDF2=12000 |
| `hcx0069` | CONVERT | P4 | `hex-decode` | Restauracion hexadecimal a UTF-8. requiere pares completos de bytes. | P4; width=8; rounds=6; PBKDF2=12000 |
| `hcx0070` | CONVERT | P4 | `url-encode` | Codificacion URL component. protege caracteres reservados para transporte. | P4; width=8; rounds=6; PBKDF2=12000 |
| `hcx0071` | CONVERT | P4 | `url-decode` | Restauracion URL component. decodifica transporte URL. | P4; width=8; rounds=6; PBKDF2=12000 |
| `hcx0072` | TRANSFORM | P4 | `rotate-left` | Rotacion determinista a la izquierda. desplazamiento dependiente del perfil. | P4; width=8; rounds=6; PBKDF2=12000 |
| `hcx0073` | TRANSFORM | P4 | `rotate-right` | Rotacion determinista a la derecha. inversa conceptual de rotate-left. | P4; width=8; rounds=6; PBKDF2=12000 |
| `hcx0074` | TRANSFORM | P4 | `xor-mask` | Mascara XOR de laboratorio. salida hexadecimal; reversible con misma mascara. | P4; width=8; rounds=6; PBKDF2=12000 |
| `hcx0075` | TRANSFORM | P4 | `reverse-blocks` | Inversion por bloques. ancho = 4 + (perfil mod 13). | P4; width=8; rounds=6; PBKDF2=12000 |
| `hcx0076` | FORMAT | P4 | `chunk-delimit` | Segmentacion con guiones. ancho = 4 + (perfil mod 13). | P4; width=8; rounds=6; PBKDF2=12000 |
| `hcx0077` | ANALYZE | P4 | `window-sample` | Muestra determinista por ventana. offset guiado por SHA-256 y perfil. | P4; width=8; rounds=6; PBKDF2=12000 |
| `hcx0078` | FORMAT | P4 | `checksum-envelope` | Sobre con integridad SHA-256. domain \| SHA256 \| VALUE. | P4; width=8; rounds=6; PBKDF2=12000 |
| `hcx0079` | FORMAT | P4 | `json-envelope` | Sobre de transporte JSON. incluye dominio, perfil, valor y SHA-256. | P4; width=8; rounds=6; PBKDF2=12000 |
| `hcx0080` | ANALYZE | P4 | `entropy-report` | Reporte de entropia y perfil. chars, bytes, unique, entropy, estimatedBits y SHA-256. | P4; width=8; rounds=6; PBKDF2=12000 |
| `hcx0081` | CRYPTO | P5 | `sha256-domain` | SHA-256 con dominio aislado. digest SHA-256 de domain \| value. | P5; width=9; rounds=7; PBKDF2=13000 |
| `hcx0082` | CRYPTO | P5 | `hmac-sha256` | Etiqueta HMAC-SHA-256. HMAC local; usa clave opcional o dominio del comando. | P5; width=9; rounds=7; PBKDF2=13000 |
| `hcx0083` | CRYPTO | P5 | `pbkdf2-sha256` | Derivacion PBKDF2-SHA-256. sal local; iteraciones = 8000 + perfil x 1000. | P5; width=9; rounds=7; PBKDF2=13000 |
| `hcx0084` | CRYPTO | P5 | `hkdf-sha256` | Derivacion HKDF-SHA-256. salt local e info HSG2818-HCX-P5. | P5; width=9; rounds=7; PBKDF2=13000 |
| `hcx0085` | CRYPTO | P5 | `hash-chain` | Cadena iterada SHA-256. rondas = 2 + (perfil mod 8). | P5; width=9; rounds=7; PBKDF2=13000 |
| `hcx0086` | CONVERT | P5 | `base64-encode` | Conversion UTF-8 a Base64. conversion reversible; no es cifrado. | P5; width=9; rounds=7; PBKDF2=13000 |
| `hcx0087` | CONVERT | P5 | `base64-decode` | Restauracion Base64 a UTF-8. valida y decodifica Base64. | P5; width=9; rounds=7; PBKDF2=13000 |
| `hcx0088` | CONVERT | P5 | `hex-encode` | Conversion UTF-8 a hexadecimal. conversion reversible; no es cifrado. | P5; width=9; rounds=7; PBKDF2=13000 |
| `hcx0089` | CONVERT | P5 | `hex-decode` | Restauracion hexadecimal a UTF-8. requiere pares completos de bytes. | P5; width=9; rounds=7; PBKDF2=13000 |
| `hcx0090` | CONVERT | P5 | `url-encode` | Codificacion URL component. protege caracteres reservados para transporte. | P5; width=9; rounds=7; PBKDF2=13000 |
| `hcx0091` | CONVERT | P5 | `url-decode` | Restauracion URL component. decodifica transporte URL. | P5; width=9; rounds=7; PBKDF2=13000 |
| `hcx0092` | TRANSFORM | P5 | `rotate-left` | Rotacion determinista a la izquierda. desplazamiento dependiente del perfil. | P5; width=9; rounds=7; PBKDF2=13000 |
| `hcx0093` | TRANSFORM | P5 | `rotate-right` | Rotacion determinista a la derecha. inversa conceptual de rotate-left. | P5; width=9; rounds=7; PBKDF2=13000 |
| `hcx0094` | TRANSFORM | P5 | `xor-mask` | Mascara XOR de laboratorio. salida hexadecimal; reversible con misma mascara. | P5; width=9; rounds=7; PBKDF2=13000 |
| `hcx0095` | TRANSFORM | P5 | `reverse-blocks` | Inversion por bloques. ancho = 4 + (perfil mod 13). | P5; width=9; rounds=7; PBKDF2=13000 |
| `hcx0096` | FORMAT | P5 | `chunk-delimit` | Segmentacion con guiones. ancho = 4 + (perfil mod 13). | P5; width=9; rounds=7; PBKDF2=13000 |
| `hcx0097` | ANALYZE | P5 | `window-sample` | Muestra determinista por ventana. offset guiado por SHA-256 y perfil. | P5; width=9; rounds=7; PBKDF2=13000 |
| `hcx0098` | FORMAT | P5 | `checksum-envelope` | Sobre con integridad SHA-256. domain \| SHA256 \| VALUE. | P5; width=9; rounds=7; PBKDF2=13000 |
| `hcx0099` | FORMAT | P5 | `json-envelope` | Sobre de transporte JSON. incluye dominio, perfil, valor y SHA-256. | P5; width=9; rounds=7; PBKDF2=13000 |
| `hcx0100` | ANALYZE | P5 | `entropy-report` | Reporte de entropia y perfil. chars, bytes, unique, entropy, estimatedBits y SHA-256. | P5; width=9; rounds=7; PBKDF2=13000 |
| `hcx0101` | CRYPTO | P6 | `sha256-domain` | SHA-256 con dominio aislado. digest SHA-256 de domain \| value. | P6; width=10; rounds=8; PBKDF2=14000 |
| `hcx0102` | CRYPTO | P6 | `hmac-sha256` | Etiqueta HMAC-SHA-256. HMAC local; usa clave opcional o dominio del comando. | P6; width=10; rounds=8; PBKDF2=14000 |
| `hcx0103` | CRYPTO | P6 | `pbkdf2-sha256` | Derivacion PBKDF2-SHA-256. sal local; iteraciones = 8000 + perfil x 1000. | P6; width=10; rounds=8; PBKDF2=14000 |
| `hcx0104` | CRYPTO | P6 | `hkdf-sha256` | Derivacion HKDF-SHA-256. salt local e info HSG2818-HCX-P6. | P6; width=10; rounds=8; PBKDF2=14000 |
| `hcx0105` | CRYPTO | P6 | `hash-chain` | Cadena iterada SHA-256. rondas = 2 + (perfil mod 8). | P6; width=10; rounds=8; PBKDF2=14000 |
| `hcx0106` | CONVERT | P6 | `base64-encode` | Conversion UTF-8 a Base64. conversion reversible; no es cifrado. | P6; width=10; rounds=8; PBKDF2=14000 |
| `hcx0107` | CONVERT | P6 | `base64-decode` | Restauracion Base64 a UTF-8. valida y decodifica Base64. | P6; width=10; rounds=8; PBKDF2=14000 |
| `hcx0108` | CONVERT | P6 | `hex-encode` | Conversion UTF-8 a hexadecimal. conversion reversible; no es cifrado. | P6; width=10; rounds=8; PBKDF2=14000 |
| `hcx0109` | CONVERT | P6 | `hex-decode` | Restauracion hexadecimal a UTF-8. requiere pares completos de bytes. | P6; width=10; rounds=8; PBKDF2=14000 |
| `hcx0110` | CONVERT | P6 | `url-encode` | Codificacion URL component. protege caracteres reservados para transporte. | P6; width=10; rounds=8; PBKDF2=14000 |
| `hcx0111` | CONVERT | P6 | `url-decode` | Restauracion URL component. decodifica transporte URL. | P6; width=10; rounds=8; PBKDF2=14000 |
| `hcx0112` | TRANSFORM | P6 | `rotate-left` | Rotacion determinista a la izquierda. desplazamiento dependiente del perfil. | P6; width=10; rounds=8; PBKDF2=14000 |
| `hcx0113` | TRANSFORM | P6 | `rotate-right` | Rotacion determinista a la derecha. inversa conceptual de rotate-left. | P6; width=10; rounds=8; PBKDF2=14000 |
| `hcx0114` | TRANSFORM | P6 | `xor-mask` | Mascara XOR de laboratorio. salida hexadecimal; reversible con misma mascara. | P6; width=10; rounds=8; PBKDF2=14000 |
| `hcx0115` | TRANSFORM | P6 | `reverse-blocks` | Inversion por bloques. ancho = 4 + (perfil mod 13). | P6; width=10; rounds=8; PBKDF2=14000 |
| `hcx0116` | FORMAT | P6 | `chunk-delimit` | Segmentacion con guiones. ancho = 4 + (perfil mod 13). | P6; width=10; rounds=8; PBKDF2=14000 |
| `hcx0117` | ANALYZE | P6 | `window-sample` | Muestra determinista por ventana. offset guiado por SHA-256 y perfil. | P6; width=10; rounds=8; PBKDF2=14000 |
| `hcx0118` | FORMAT | P6 | `checksum-envelope` | Sobre con integridad SHA-256. domain \| SHA256 \| VALUE. | P6; width=10; rounds=8; PBKDF2=14000 |
| `hcx0119` | FORMAT | P6 | `json-envelope` | Sobre de transporte JSON. incluye dominio, perfil, valor y SHA-256. | P6; width=10; rounds=8; PBKDF2=14000 |
| `hcx0120` | ANALYZE | P6 | `entropy-report` | Reporte de entropia y perfil. chars, bytes, unique, entropy, estimatedBits y SHA-256. | P6; width=10; rounds=8; PBKDF2=14000 |
| `hcx0121` | CRYPTO | P7 | `sha256-domain` | SHA-256 con dominio aislado. digest SHA-256 de domain \| value. | P7; width=11; rounds=9; PBKDF2=15000 |
| `hcx0122` | CRYPTO | P7 | `hmac-sha256` | Etiqueta HMAC-SHA-256. HMAC local; usa clave opcional o dominio del comando. | P7; width=11; rounds=9; PBKDF2=15000 |
| `hcx0123` | CRYPTO | P7 | `pbkdf2-sha256` | Derivacion PBKDF2-SHA-256. sal local; iteraciones = 8000 + perfil x 1000. | P7; width=11; rounds=9; PBKDF2=15000 |
| `hcx0124` | CRYPTO | P7 | `hkdf-sha256` | Derivacion HKDF-SHA-256. salt local e info HSG2818-HCX-P7. | P7; width=11; rounds=9; PBKDF2=15000 |
| `hcx0125` | CRYPTO | P7 | `hash-chain` | Cadena iterada SHA-256. rondas = 2 + (perfil mod 8). | P7; width=11; rounds=9; PBKDF2=15000 |
| `hcx0126` | CONVERT | P7 | `base64-encode` | Conversion UTF-8 a Base64. conversion reversible; no es cifrado. | P7; width=11; rounds=9; PBKDF2=15000 |
| `hcx0127` | CONVERT | P7 | `base64-decode` | Restauracion Base64 a UTF-8. valida y decodifica Base64. | P7; width=11; rounds=9; PBKDF2=15000 |
| `hcx0128` | CONVERT | P7 | `hex-encode` | Conversion UTF-8 a hexadecimal. conversion reversible; no es cifrado. | P7; width=11; rounds=9; PBKDF2=15000 |
| `hcx0129` | CONVERT | P7 | `hex-decode` | Restauracion hexadecimal a UTF-8. requiere pares completos de bytes. | P7; width=11; rounds=9; PBKDF2=15000 |
| `hcx0130` | CONVERT | P7 | `url-encode` | Codificacion URL component. protege caracteres reservados para transporte. | P7; width=11; rounds=9; PBKDF2=15000 |
| `hcx0131` | CONVERT | P7 | `url-decode` | Restauracion URL component. decodifica transporte URL. | P7; width=11; rounds=9; PBKDF2=15000 |
| `hcx0132` | TRANSFORM | P7 | `rotate-left` | Rotacion determinista a la izquierda. desplazamiento dependiente del perfil. | P7; width=11; rounds=9; PBKDF2=15000 |
| `hcx0133` | TRANSFORM | P7 | `rotate-right` | Rotacion determinista a la derecha. inversa conceptual de rotate-left. | P7; width=11; rounds=9; PBKDF2=15000 |
| `hcx0134` | TRANSFORM | P7 | `xor-mask` | Mascara XOR de laboratorio. salida hexadecimal; reversible con misma mascara. | P7; width=11; rounds=9; PBKDF2=15000 |
| `hcx0135` | TRANSFORM | P7 | `reverse-blocks` | Inversion por bloques. ancho = 4 + (perfil mod 13). | P7; width=11; rounds=9; PBKDF2=15000 |
| `hcx0136` | FORMAT | P7 | `chunk-delimit` | Segmentacion con guiones. ancho = 4 + (perfil mod 13). | P7; width=11; rounds=9; PBKDF2=15000 |
| `hcx0137` | ANALYZE | P7 | `window-sample` | Muestra determinista por ventana. offset guiado por SHA-256 y perfil. | P7; width=11; rounds=9; PBKDF2=15000 |
| `hcx0138` | FORMAT | P7 | `checksum-envelope` | Sobre con integridad SHA-256. domain \| SHA256 \| VALUE. | P7; width=11; rounds=9; PBKDF2=15000 |
| `hcx0139` | FORMAT | P7 | `json-envelope` | Sobre de transporte JSON. incluye dominio, perfil, valor y SHA-256. | P7; width=11; rounds=9; PBKDF2=15000 |
| `hcx0140` | ANALYZE | P7 | `entropy-report` | Reporte de entropia y perfil. chars, bytes, unique, entropy, estimatedBits y SHA-256. | P7; width=11; rounds=9; PBKDF2=15000 |
| `hcx0141` | CRYPTO | P8 | `sha256-domain` | SHA-256 con dominio aislado. digest SHA-256 de domain \| value. | P8; width=12; rounds=2; PBKDF2=16000 |
| `hcx0142` | CRYPTO | P8 | `hmac-sha256` | Etiqueta HMAC-SHA-256. HMAC local; usa clave opcional o dominio del comando. | P8; width=12; rounds=2; PBKDF2=16000 |
| `hcx0143` | CRYPTO | P8 | `pbkdf2-sha256` | Derivacion PBKDF2-SHA-256. sal local; iteraciones = 8000 + perfil x 1000. | P8; width=12; rounds=2; PBKDF2=16000 |
| `hcx0144` | CRYPTO | P8 | `hkdf-sha256` | Derivacion HKDF-SHA-256. salt local e info HSG2818-HCX-P8. | P8; width=12; rounds=2; PBKDF2=16000 |
| `hcx0145` | CRYPTO | P8 | `hash-chain` | Cadena iterada SHA-256. rondas = 2 + (perfil mod 8). | P8; width=12; rounds=2; PBKDF2=16000 |
| `hcx0146` | CONVERT | P8 | `base64-encode` | Conversion UTF-8 a Base64. conversion reversible; no es cifrado. | P8; width=12; rounds=2; PBKDF2=16000 |
| `hcx0147` | CONVERT | P8 | `base64-decode` | Restauracion Base64 a UTF-8. valida y decodifica Base64. | P8; width=12; rounds=2; PBKDF2=16000 |
| `hcx0148` | CONVERT | P8 | `hex-encode` | Conversion UTF-8 a hexadecimal. conversion reversible; no es cifrado. | P8; width=12; rounds=2; PBKDF2=16000 |
| `hcx0149` | CONVERT | P8 | `hex-decode` | Restauracion hexadecimal a UTF-8. requiere pares completos de bytes. | P8; width=12; rounds=2; PBKDF2=16000 |
| `hcx0150` | CONVERT | P8 | `url-encode` | Codificacion URL component. protege caracteres reservados para transporte. | P8; width=12; rounds=2; PBKDF2=16000 |
| `hcx0151` | CONVERT | P8 | `url-decode` | Restauracion URL component. decodifica transporte URL. | P8; width=12; rounds=2; PBKDF2=16000 |
| `hcx0152` | TRANSFORM | P8 | `rotate-left` | Rotacion determinista a la izquierda. desplazamiento dependiente del perfil. | P8; width=12; rounds=2; PBKDF2=16000 |
| `hcx0153` | TRANSFORM | P8 | `rotate-right` | Rotacion determinista a la derecha. inversa conceptual de rotate-left. | P8; width=12; rounds=2; PBKDF2=16000 |
| `hcx0154` | TRANSFORM | P8 | `xor-mask` | Mascara XOR de laboratorio. salida hexadecimal; reversible con misma mascara. | P8; width=12; rounds=2; PBKDF2=16000 |
| `hcx0155` | TRANSFORM | P8 | `reverse-blocks` | Inversion por bloques. ancho = 4 + (perfil mod 13). | P8; width=12; rounds=2; PBKDF2=16000 |
| `hcx0156` | FORMAT | P8 | `chunk-delimit` | Segmentacion con guiones. ancho = 4 + (perfil mod 13). | P8; width=12; rounds=2; PBKDF2=16000 |
| `hcx0157` | ANALYZE | P8 | `window-sample` | Muestra determinista por ventana. offset guiado por SHA-256 y perfil. | P8; width=12; rounds=2; PBKDF2=16000 |
| `hcx0158` | FORMAT | P8 | `checksum-envelope` | Sobre con integridad SHA-256. domain \| SHA256 \| VALUE. | P8; width=12; rounds=2; PBKDF2=16000 |
| `hcx0159` | FORMAT | P8 | `json-envelope` | Sobre de transporte JSON. incluye dominio, perfil, valor y SHA-256. | P8; width=12; rounds=2; PBKDF2=16000 |
| `hcx0160` | ANALYZE | P8 | `entropy-report` | Reporte de entropia y perfil. chars, bytes, unique, entropy, estimatedBits y SHA-256. | P8; width=12; rounds=2; PBKDF2=16000 |
| `hcx0161` | CRYPTO | P9 | `sha256-domain` | SHA-256 con dominio aislado. digest SHA-256 de domain \| value. | P9; width=13; rounds=3; PBKDF2=17000 |
| `hcx0162` | CRYPTO | P9 | `hmac-sha256` | Etiqueta HMAC-SHA-256. HMAC local; usa clave opcional o dominio del comando. | P9; width=13; rounds=3; PBKDF2=17000 |
| `hcx0163` | CRYPTO | P9 | `pbkdf2-sha256` | Derivacion PBKDF2-SHA-256. sal local; iteraciones = 8000 + perfil x 1000. | P9; width=13; rounds=3; PBKDF2=17000 |
| `hcx0164` | CRYPTO | P9 | `hkdf-sha256` | Derivacion HKDF-SHA-256. salt local e info HSG2818-HCX-P9. | P9; width=13; rounds=3; PBKDF2=17000 |
| `hcx0165` | CRYPTO | P9 | `hash-chain` | Cadena iterada SHA-256. rondas = 2 + (perfil mod 8). | P9; width=13; rounds=3; PBKDF2=17000 |
| `hcx0166` | CONVERT | P9 | `base64-encode` | Conversion UTF-8 a Base64. conversion reversible; no es cifrado. | P9; width=13; rounds=3; PBKDF2=17000 |
| `hcx0167` | CONVERT | P9 | `base64-decode` | Restauracion Base64 a UTF-8. valida y decodifica Base64. | P9; width=13; rounds=3; PBKDF2=17000 |
| `hcx0168` | CONVERT | P9 | `hex-encode` | Conversion UTF-8 a hexadecimal. conversion reversible; no es cifrado. | P9; width=13; rounds=3; PBKDF2=17000 |
| `hcx0169` | CONVERT | P9 | `hex-decode` | Restauracion hexadecimal a UTF-8. requiere pares completos de bytes. | P9; width=13; rounds=3; PBKDF2=17000 |
| `hcx0170` | CONVERT | P9 | `url-encode` | Codificacion URL component. protege caracteres reservados para transporte. | P9; width=13; rounds=3; PBKDF2=17000 |
| `hcx0171` | CONVERT | P9 | `url-decode` | Restauracion URL component. decodifica transporte URL. | P9; width=13; rounds=3; PBKDF2=17000 |
| `hcx0172` | TRANSFORM | P9 | `rotate-left` | Rotacion determinista a la izquierda. desplazamiento dependiente del perfil. | P9; width=13; rounds=3; PBKDF2=17000 |
| `hcx0173` | TRANSFORM | P9 | `rotate-right` | Rotacion determinista a la derecha. inversa conceptual de rotate-left. | P9; width=13; rounds=3; PBKDF2=17000 |
| `hcx0174` | TRANSFORM | P9 | `xor-mask` | Mascara XOR de laboratorio. salida hexadecimal; reversible con misma mascara. | P9; width=13; rounds=3; PBKDF2=17000 |
| `hcx0175` | TRANSFORM | P9 | `reverse-blocks` | Inversion por bloques. ancho = 4 + (perfil mod 13). | P9; width=13; rounds=3; PBKDF2=17000 |
| `hcx0176` | FORMAT | P9 | `chunk-delimit` | Segmentacion con guiones. ancho = 4 + (perfil mod 13). | P9; width=13; rounds=3; PBKDF2=17000 |
| `hcx0177` | ANALYZE | P9 | `window-sample` | Muestra determinista por ventana. offset guiado por SHA-256 y perfil. | P9; width=13; rounds=3; PBKDF2=17000 |
| `hcx0178` | FORMAT | P9 | `checksum-envelope` | Sobre con integridad SHA-256. domain \| SHA256 \| VALUE. | P9; width=13; rounds=3; PBKDF2=17000 |
| `hcx0179` | FORMAT | P9 | `json-envelope` | Sobre de transporte JSON. incluye dominio, perfil, valor y SHA-256. | P9; width=13; rounds=3; PBKDF2=17000 |
| `hcx0180` | ANALYZE | P9 | `entropy-report` | Reporte de entropia y perfil. chars, bytes, unique, entropy, estimatedBits y SHA-256. | P9; width=13; rounds=3; PBKDF2=17000 |
| `hcx0181` | CRYPTO | P10 | `sha256-domain` | SHA-256 con dominio aislado. digest SHA-256 de domain \| value. | P10; width=14; rounds=4; PBKDF2=18000 |
| `hcx0182` | CRYPTO | P10 | `hmac-sha256` | Etiqueta HMAC-SHA-256. HMAC local; usa clave opcional o dominio del comando. | P10; width=14; rounds=4; PBKDF2=18000 |
| `hcx0183` | CRYPTO | P10 | `pbkdf2-sha256` | Derivacion PBKDF2-SHA-256. sal local; iteraciones = 8000 + perfil x 1000. | P10; width=14; rounds=4; PBKDF2=18000 |
| `hcx0184` | CRYPTO | P10 | `hkdf-sha256` | Derivacion HKDF-SHA-256. salt local e info HSG2818-HCX-P10. | P10; width=14; rounds=4; PBKDF2=18000 |
| `hcx0185` | CRYPTO | P10 | `hash-chain` | Cadena iterada SHA-256. rondas = 2 + (perfil mod 8). | P10; width=14; rounds=4; PBKDF2=18000 |
| `hcx0186` | CONVERT | P10 | `base64-encode` | Conversion UTF-8 a Base64. conversion reversible; no es cifrado. | P10; width=14; rounds=4; PBKDF2=18000 |
| `hcx0187` | CONVERT | P10 | `base64-decode` | Restauracion Base64 a UTF-8. valida y decodifica Base64. | P10; width=14; rounds=4; PBKDF2=18000 |
| `hcx0188` | CONVERT | P10 | `hex-encode` | Conversion UTF-8 a hexadecimal. conversion reversible; no es cifrado. | P10; width=14; rounds=4; PBKDF2=18000 |
| `hcx0189` | CONVERT | P10 | `hex-decode` | Restauracion hexadecimal a UTF-8. requiere pares completos de bytes. | P10; width=14; rounds=4; PBKDF2=18000 |
| `hcx0190` | CONVERT | P10 | `url-encode` | Codificacion URL component. protege caracteres reservados para transporte. | P10; width=14; rounds=4; PBKDF2=18000 |
| `hcx0191` | CONVERT | P10 | `url-decode` | Restauracion URL component. decodifica transporte URL. | P10; width=14; rounds=4; PBKDF2=18000 |
| `hcx0192` | TRANSFORM | P10 | `rotate-left` | Rotacion determinista a la izquierda. desplazamiento dependiente del perfil. | P10; width=14; rounds=4; PBKDF2=18000 |
| `hcx0193` | TRANSFORM | P10 | `rotate-right` | Rotacion determinista a la derecha. inversa conceptual de rotate-left. | P10; width=14; rounds=4; PBKDF2=18000 |
| `hcx0194` | TRANSFORM | P10 | `xor-mask` | Mascara XOR de laboratorio. salida hexadecimal; reversible con misma mascara. | P10; width=14; rounds=4; PBKDF2=18000 |
| `hcx0195` | TRANSFORM | P10 | `reverse-blocks` | Inversion por bloques. ancho = 4 + (perfil mod 13). | P10; width=14; rounds=4; PBKDF2=18000 |
| `hcx0196` | FORMAT | P10 | `chunk-delimit` | Segmentacion con guiones. ancho = 4 + (perfil mod 13). | P10; width=14; rounds=4; PBKDF2=18000 |
| `hcx0197` | ANALYZE | P10 | `window-sample` | Muestra determinista por ventana. offset guiado por SHA-256 y perfil. | P10; width=14; rounds=4; PBKDF2=18000 |
| `hcx0198` | FORMAT | P10 | `checksum-envelope` | Sobre con integridad SHA-256. domain \| SHA256 \| VALUE. | P10; width=14; rounds=4; PBKDF2=18000 |
| `hcx0199` | FORMAT | P10 | `json-envelope` | Sobre de transporte JSON. incluye dominio, perfil, valor y SHA-256. | P10; width=14; rounds=4; PBKDF2=18000 |
| `hcx0200` | ANALYZE | P10 | `entropy-report` | Reporte de entropia y perfil. chars, bytes, unique, entropy, estimatedBits y SHA-256. | P10; width=14; rounds=4; PBKDF2=18000 |
| `hcx0201` | CRYPTO | P11 | `sha256-domain` | SHA-256 con dominio aislado. digest SHA-256 de domain \| value. | P11; width=15; rounds=5; PBKDF2=19000 |
| `hcx0202` | CRYPTO | P11 | `hmac-sha256` | Etiqueta HMAC-SHA-256. HMAC local; usa clave opcional o dominio del comando. | P11; width=15; rounds=5; PBKDF2=19000 |
| `hcx0203` | CRYPTO | P11 | `pbkdf2-sha256` | Derivacion PBKDF2-SHA-256. sal local; iteraciones = 8000 + perfil x 1000. | P11; width=15; rounds=5; PBKDF2=19000 |
| `hcx0204` | CRYPTO | P11 | `hkdf-sha256` | Derivacion HKDF-SHA-256. salt local e info HSG2818-HCX-P11. | P11; width=15; rounds=5; PBKDF2=19000 |
| `hcx0205` | CRYPTO | P11 | `hash-chain` | Cadena iterada SHA-256. rondas = 2 + (perfil mod 8). | P11; width=15; rounds=5; PBKDF2=19000 |
| `hcx0206` | CONVERT | P11 | `base64-encode` | Conversion UTF-8 a Base64. conversion reversible; no es cifrado. | P11; width=15; rounds=5; PBKDF2=19000 |
| `hcx0207` | CONVERT | P11 | `base64-decode` | Restauracion Base64 a UTF-8. valida y decodifica Base64. | P11; width=15; rounds=5; PBKDF2=19000 |
| `hcx0208` | CONVERT | P11 | `hex-encode` | Conversion UTF-8 a hexadecimal. conversion reversible; no es cifrado. | P11; width=15; rounds=5; PBKDF2=19000 |
| `hcx0209` | CONVERT | P11 | `hex-decode` | Restauracion hexadecimal a UTF-8. requiere pares completos de bytes. | P11; width=15; rounds=5; PBKDF2=19000 |
| `hcx0210` | CONVERT | P11 | `url-encode` | Codificacion URL component. protege caracteres reservados para transporte. | P11; width=15; rounds=5; PBKDF2=19000 |
| `hcx0211` | CONVERT | P11 | `url-decode` | Restauracion URL component. decodifica transporte URL. | P11; width=15; rounds=5; PBKDF2=19000 |
| `hcx0212` | TRANSFORM | P11 | `rotate-left` | Rotacion determinista a la izquierda. desplazamiento dependiente del perfil. | P11; width=15; rounds=5; PBKDF2=19000 |
| `hcx0213` | TRANSFORM | P11 | `rotate-right` | Rotacion determinista a la derecha. inversa conceptual de rotate-left. | P11; width=15; rounds=5; PBKDF2=19000 |
| `hcx0214` | TRANSFORM | P11 | `xor-mask` | Mascara XOR de laboratorio. salida hexadecimal; reversible con misma mascara. | P11; width=15; rounds=5; PBKDF2=19000 |
| `hcx0215` | TRANSFORM | P11 | `reverse-blocks` | Inversion por bloques. ancho = 4 + (perfil mod 13). | P11; width=15; rounds=5; PBKDF2=19000 |
| `hcx0216` | FORMAT | P11 | `chunk-delimit` | Segmentacion con guiones. ancho = 4 + (perfil mod 13). | P11; width=15; rounds=5; PBKDF2=19000 |
| `hcx0217` | ANALYZE | P11 | `window-sample` | Muestra determinista por ventana. offset guiado por SHA-256 y perfil. | P11; width=15; rounds=5; PBKDF2=19000 |
| `hcx0218` | FORMAT | P11 | `checksum-envelope` | Sobre con integridad SHA-256. domain \| SHA256 \| VALUE. | P11; width=15; rounds=5; PBKDF2=19000 |
| `hcx0219` | FORMAT | P11 | `json-envelope` | Sobre de transporte JSON. incluye dominio, perfil, valor y SHA-256. | P11; width=15; rounds=5; PBKDF2=19000 |
| `hcx0220` | ANALYZE | P11 | `entropy-report` | Reporte de entropia y perfil. chars, bytes, unique, entropy, estimatedBits y SHA-256. | P11; width=15; rounds=5; PBKDF2=19000 |
| `hcx0221` | CRYPTO | P12 | `sha256-domain` | SHA-256 con dominio aislado. digest SHA-256 de domain \| value. | P12; width=16; rounds=6; PBKDF2=20000 |
| `hcx0222` | CRYPTO | P12 | `hmac-sha256` | Etiqueta HMAC-SHA-256. HMAC local; usa clave opcional o dominio del comando. | P12; width=16; rounds=6; PBKDF2=20000 |
| `hcx0223` | CRYPTO | P12 | `pbkdf2-sha256` | Derivacion PBKDF2-SHA-256. sal local; iteraciones = 8000 + perfil x 1000. | P12; width=16; rounds=6; PBKDF2=20000 |
| `hcx0224` | CRYPTO | P12 | `hkdf-sha256` | Derivacion HKDF-SHA-256. salt local e info HSG2818-HCX-P12. | P12; width=16; rounds=6; PBKDF2=20000 |
| `hcx0225` | CRYPTO | P12 | `hash-chain` | Cadena iterada SHA-256. rondas = 2 + (perfil mod 8). | P12; width=16; rounds=6; PBKDF2=20000 |
| `hcx0226` | CONVERT | P12 | `base64-encode` | Conversion UTF-8 a Base64. conversion reversible; no es cifrado. | P12; width=16; rounds=6; PBKDF2=20000 |
| `hcx0227` | CONVERT | P12 | `base64-decode` | Restauracion Base64 a UTF-8. valida y decodifica Base64. | P12; width=16; rounds=6; PBKDF2=20000 |
| `hcx0228` | CONVERT | P12 | `hex-encode` | Conversion UTF-8 a hexadecimal. conversion reversible; no es cifrado. | P12; width=16; rounds=6; PBKDF2=20000 |
| `hcx0229` | CONVERT | P12 | `hex-decode` | Restauracion hexadecimal a UTF-8. requiere pares completos de bytes. | P12; width=16; rounds=6; PBKDF2=20000 |
| `hcx0230` | CONVERT | P12 | `url-encode` | Codificacion URL component. protege caracteres reservados para transporte. | P12; width=16; rounds=6; PBKDF2=20000 |
| `hcx0231` | CONVERT | P12 | `url-decode` | Restauracion URL component. decodifica transporte URL. | P12; width=16; rounds=6; PBKDF2=20000 |
| `hcx0232` | TRANSFORM | P12 | `rotate-left` | Rotacion determinista a la izquierda. desplazamiento dependiente del perfil. | P12; width=16; rounds=6; PBKDF2=20000 |
| `hcx0233` | TRANSFORM | P12 | `rotate-right` | Rotacion determinista a la derecha. inversa conceptual de rotate-left. | P12; width=16; rounds=6; PBKDF2=20000 |
| `hcx0234` | TRANSFORM | P12 | `xor-mask` | Mascara XOR de laboratorio. salida hexadecimal; reversible con misma mascara. | P12; width=16; rounds=6; PBKDF2=20000 |
| `hcx0235` | TRANSFORM | P12 | `reverse-blocks` | Inversion por bloques. ancho = 4 + (perfil mod 13). | P12; width=16; rounds=6; PBKDF2=20000 |
| `hcx0236` | FORMAT | P12 | `chunk-delimit` | Segmentacion con guiones. ancho = 4 + (perfil mod 13). | P12; width=16; rounds=6; PBKDF2=20000 |
| `hcx0237` | ANALYZE | P12 | `window-sample` | Muestra determinista por ventana. offset guiado por SHA-256 y perfil. | P12; width=16; rounds=6; PBKDF2=20000 |
| `hcx0238` | FORMAT | P12 | `checksum-envelope` | Sobre con integridad SHA-256. domain \| SHA256 \| VALUE. | P12; width=16; rounds=6; PBKDF2=20000 |
| `hcx0239` | FORMAT | P12 | `json-envelope` | Sobre de transporte JSON. incluye dominio, perfil, valor y SHA-256. | P12; width=16; rounds=6; PBKDF2=20000 |
| `hcx0240` | ANALYZE | P12 | `entropy-report` | Reporte de entropia y perfil. chars, bytes, unique, entropy, estimatedBits y SHA-256. | P12; width=16; rounds=6; PBKDF2=20000 |
| `hcx0241` | CRYPTO | P13 | `sha256-domain` | SHA-256 con dominio aislado. digest SHA-256 de domain \| value. | P13; width=4; rounds=7; PBKDF2=21000 |
| `hcx0242` | CRYPTO | P13 | `hmac-sha256` | Etiqueta HMAC-SHA-256. HMAC local; usa clave opcional o dominio del comando. | P13; width=4; rounds=7; PBKDF2=21000 |
| `hcx0243` | CRYPTO | P13 | `pbkdf2-sha256` | Derivacion PBKDF2-SHA-256. sal local; iteraciones = 8000 + perfil x 1000. | P13; width=4; rounds=7; PBKDF2=21000 |
| `hcx0244` | CRYPTO | P13 | `hkdf-sha256` | Derivacion HKDF-SHA-256. salt local e info HSG2818-HCX-P13. | P13; width=4; rounds=7; PBKDF2=21000 |
| `hcx0245` | CRYPTO | P13 | `hash-chain` | Cadena iterada SHA-256. rondas = 2 + (perfil mod 8). | P13; width=4; rounds=7; PBKDF2=21000 |
| `hcx0246` | CONVERT | P13 | `base64-encode` | Conversion UTF-8 a Base64. conversion reversible; no es cifrado. | P13; width=4; rounds=7; PBKDF2=21000 |
| `hcx0247` | CONVERT | P13 | `base64-decode` | Restauracion Base64 a UTF-8. valida y decodifica Base64. | P13; width=4; rounds=7; PBKDF2=21000 |
| `hcx0248` | CONVERT | P13 | `hex-encode` | Conversion UTF-8 a hexadecimal. conversion reversible; no es cifrado. | P13; width=4; rounds=7; PBKDF2=21000 |
| `hcx0249` | CONVERT | P13 | `hex-decode` | Restauracion hexadecimal a UTF-8. requiere pares completos de bytes. | P13; width=4; rounds=7; PBKDF2=21000 |
| `hcx0250` | CONVERT | P13 | `url-encode` | Codificacion URL component. protege caracteres reservados para transporte. | P13; width=4; rounds=7; PBKDF2=21000 |
| `hcx0251` | CONVERT | P13 | `url-decode` | Restauracion URL component. decodifica transporte URL. | P13; width=4; rounds=7; PBKDF2=21000 |
| `hcx0252` | TRANSFORM | P13 | `rotate-left` | Rotacion determinista a la izquierda. desplazamiento dependiente del perfil. | P13; width=4; rounds=7; PBKDF2=21000 |
| `hcx0253` | TRANSFORM | P13 | `rotate-right` | Rotacion determinista a la derecha. inversa conceptual de rotate-left. | P13; width=4; rounds=7; PBKDF2=21000 |
| `hcx0254` | TRANSFORM | P13 | `xor-mask` | Mascara XOR de laboratorio. salida hexadecimal; reversible con misma mascara. | P13; width=4; rounds=7; PBKDF2=21000 |
| `hcx0255` | TRANSFORM | P13 | `reverse-blocks` | Inversion por bloques. ancho = 4 + (perfil mod 13). | P13; width=4; rounds=7; PBKDF2=21000 |
| `hcx0256` | FORMAT | P13 | `chunk-delimit` | Segmentacion con guiones. ancho = 4 + (perfil mod 13). | P13; width=4; rounds=7; PBKDF2=21000 |
| `hcx0257` | ANALYZE | P13 | `window-sample` | Muestra determinista por ventana. offset guiado por SHA-256 y perfil. | P13; width=4; rounds=7; PBKDF2=21000 |
| `hcx0258` | FORMAT | P13 | `checksum-envelope` | Sobre con integridad SHA-256. domain \| SHA256 \| VALUE. | P13; width=4; rounds=7; PBKDF2=21000 |
| `hcx0259` | FORMAT | P13 | `json-envelope` | Sobre de transporte JSON. incluye dominio, perfil, valor y SHA-256. | P13; width=4; rounds=7; PBKDF2=21000 |
| `hcx0260` | ANALYZE | P13 | `entropy-report` | Reporte de entropia y perfil. chars, bytes, unique, entropy, estimatedBits y SHA-256. | P13; width=4; rounds=7; PBKDF2=21000 |
| `hcx0261` | CRYPTO | P14 | `sha256-domain` | SHA-256 con dominio aislado. digest SHA-256 de domain \| value. | P14; width=5; rounds=8; PBKDF2=22000 |
| `hcx0262` | CRYPTO | P14 | `hmac-sha256` | Etiqueta HMAC-SHA-256. HMAC local; usa clave opcional o dominio del comando. | P14; width=5; rounds=8; PBKDF2=22000 |
| `hcx0263` | CRYPTO | P14 | `pbkdf2-sha256` | Derivacion PBKDF2-SHA-256. sal local; iteraciones = 8000 + perfil x 1000. | P14; width=5; rounds=8; PBKDF2=22000 |
| `hcx0264` | CRYPTO | P14 | `hkdf-sha256` | Derivacion HKDF-SHA-256. salt local e info HSG2818-HCX-P14. | P14; width=5; rounds=8; PBKDF2=22000 |
| `hcx0265` | CRYPTO | P14 | `hash-chain` | Cadena iterada SHA-256. rondas = 2 + (perfil mod 8). | P14; width=5; rounds=8; PBKDF2=22000 |
| `hcx0266` | CONVERT | P14 | `base64-encode` | Conversion UTF-8 a Base64. conversion reversible; no es cifrado. | P14; width=5; rounds=8; PBKDF2=22000 |
| `hcx0267` | CONVERT | P14 | `base64-decode` | Restauracion Base64 a UTF-8. valida y decodifica Base64. | P14; width=5; rounds=8; PBKDF2=22000 |
| `hcx0268` | CONVERT | P14 | `hex-encode` | Conversion UTF-8 a hexadecimal. conversion reversible; no es cifrado. | P14; width=5; rounds=8; PBKDF2=22000 |
| `hcx0269` | CONVERT | P14 | `hex-decode` | Restauracion hexadecimal a UTF-8. requiere pares completos de bytes. | P14; width=5; rounds=8; PBKDF2=22000 |
| `hcx0270` | CONVERT | P14 | `url-encode` | Codificacion URL component. protege caracteres reservados para transporte. | P14; width=5; rounds=8; PBKDF2=22000 |
| `hcx0271` | CONVERT | P14 | `url-decode` | Restauracion URL component. decodifica transporte URL. | P14; width=5; rounds=8; PBKDF2=22000 |
| `hcx0272` | TRANSFORM | P14 | `rotate-left` | Rotacion determinista a la izquierda. desplazamiento dependiente del perfil. | P14; width=5; rounds=8; PBKDF2=22000 |
| `hcx0273` | TRANSFORM | P14 | `rotate-right` | Rotacion determinista a la derecha. inversa conceptual de rotate-left. | P14; width=5; rounds=8; PBKDF2=22000 |
| `hcx0274` | TRANSFORM | P14 | `xor-mask` | Mascara XOR de laboratorio. salida hexadecimal; reversible con misma mascara. | P14; width=5; rounds=8; PBKDF2=22000 |
| `hcx0275` | TRANSFORM | P14 | `reverse-blocks` | Inversion por bloques. ancho = 4 + (perfil mod 13). | P14; width=5; rounds=8; PBKDF2=22000 |
| `hcx0276` | FORMAT | P14 | `chunk-delimit` | Segmentacion con guiones. ancho = 4 + (perfil mod 13). | P14; width=5; rounds=8; PBKDF2=22000 |
| `hcx0277` | ANALYZE | P14 | `window-sample` | Muestra determinista por ventana. offset guiado por SHA-256 y perfil. | P14; width=5; rounds=8; PBKDF2=22000 |
| `hcx0278` | FORMAT | P14 | `checksum-envelope` | Sobre con integridad SHA-256. domain \| SHA256 \| VALUE. | P14; width=5; rounds=8; PBKDF2=22000 |
| `hcx0279` | FORMAT | P14 | `json-envelope` | Sobre de transporte JSON. incluye dominio, perfil, valor y SHA-256. | P14; width=5; rounds=8; PBKDF2=22000 |
| `hcx0280` | ANALYZE | P14 | `entropy-report` | Reporte de entropia y perfil. chars, bytes, unique, entropy, estimatedBits y SHA-256. | P14; width=5; rounds=8; PBKDF2=22000 |
| `hcx0281` | CRYPTO | P15 | `sha256-domain` | SHA-256 con dominio aislado. digest SHA-256 de domain \| value. | P15; width=6; rounds=9; PBKDF2=23000 |
| `hcx0282` | CRYPTO | P15 | `hmac-sha256` | Etiqueta HMAC-SHA-256. HMAC local; usa clave opcional o dominio del comando. | P15; width=6; rounds=9; PBKDF2=23000 |
| `hcx0283` | CRYPTO | P15 | `pbkdf2-sha256` | Derivacion PBKDF2-SHA-256. sal local; iteraciones = 8000 + perfil x 1000. | P15; width=6; rounds=9; PBKDF2=23000 |
| `hcx0284` | CRYPTO | P15 | `hkdf-sha256` | Derivacion HKDF-SHA-256. salt local e info HSG2818-HCX-P15. | P15; width=6; rounds=9; PBKDF2=23000 |
| `hcx0285` | CRYPTO | P15 | `hash-chain` | Cadena iterada SHA-256. rondas = 2 + (perfil mod 8). | P15; width=6; rounds=9; PBKDF2=23000 |
| `hcx0286` | CONVERT | P15 | `base64-encode` | Conversion UTF-8 a Base64. conversion reversible; no es cifrado. | P15; width=6; rounds=9; PBKDF2=23000 |
| `hcx0287` | CONVERT | P15 | `base64-decode` | Restauracion Base64 a UTF-8. valida y decodifica Base64. | P15; width=6; rounds=9; PBKDF2=23000 |
| `hcx0288` | CONVERT | P15 | `hex-encode` | Conversion UTF-8 a hexadecimal. conversion reversible; no es cifrado. | P15; width=6; rounds=9; PBKDF2=23000 |
| `hcx0289` | CONVERT | P15 | `hex-decode` | Restauracion hexadecimal a UTF-8. requiere pares completos de bytes. | P15; width=6; rounds=9; PBKDF2=23000 |
| `hcx0290` | CONVERT | P15 | `url-encode` | Codificacion URL component. protege caracteres reservados para transporte. | P15; width=6; rounds=9; PBKDF2=23000 |
| `hcx0291` | CONVERT | P15 | `url-decode` | Restauracion URL component. decodifica transporte URL. | P15; width=6; rounds=9; PBKDF2=23000 |
| `hcx0292` | TRANSFORM | P15 | `rotate-left` | Rotacion determinista a la izquierda. desplazamiento dependiente del perfil. | P15; width=6; rounds=9; PBKDF2=23000 |
| `hcx0293` | TRANSFORM | P15 | `rotate-right` | Rotacion determinista a la derecha. inversa conceptual de rotate-left. | P15; width=6; rounds=9; PBKDF2=23000 |
| `hcx0294` | TRANSFORM | P15 | `xor-mask` | Mascara XOR de laboratorio. salida hexadecimal; reversible con misma mascara. | P15; width=6; rounds=9; PBKDF2=23000 |
| `hcx0295` | TRANSFORM | P15 | `reverse-blocks` | Inversion por bloques. ancho = 4 + (perfil mod 13). | P15; width=6; rounds=9; PBKDF2=23000 |
| `hcx0296` | FORMAT | P15 | `chunk-delimit` | Segmentacion con guiones. ancho = 4 + (perfil mod 13). | P15; width=6; rounds=9; PBKDF2=23000 |
| `hcx0297` | ANALYZE | P15 | `window-sample` | Muestra determinista por ventana. offset guiado por SHA-256 y perfil. | P15; width=6; rounds=9; PBKDF2=23000 |
| `hcx0298` | FORMAT | P15 | `checksum-envelope` | Sobre con integridad SHA-256. domain \| SHA256 \| VALUE. | P15; width=6; rounds=9; PBKDF2=23000 |
| `hcx0299` | FORMAT | P15 | `json-envelope` | Sobre de transporte JSON. incluye dominio, perfil, valor y SHA-256. | P15; width=6; rounds=9; PBKDF2=23000 |
| `hcx0300` | ANALYZE | P15 | `entropy-report` | Reporte de entropia y perfil. chars, bytes, unique, entropy, estimatedBits y SHA-256. | P15; width=6; rounds=9; PBKDF2=23000 |
| `hcx0301` | CRYPTO | P16 | `sha256-domain` | SHA-256 con dominio aislado. digest SHA-256 de domain \| value. | P16; width=7; rounds=2; PBKDF2=24000 |
| `hcx0302` | CRYPTO | P16 | `hmac-sha256` | Etiqueta HMAC-SHA-256. HMAC local; usa clave opcional o dominio del comando. | P16; width=7; rounds=2; PBKDF2=24000 |
| `hcx0303` | CRYPTO | P16 | `pbkdf2-sha256` | Derivacion PBKDF2-SHA-256. sal local; iteraciones = 8000 + perfil x 1000. | P16; width=7; rounds=2; PBKDF2=24000 |
| `hcx0304` | CRYPTO | P16 | `hkdf-sha256` | Derivacion HKDF-SHA-256. salt local e info HSG2818-HCX-P16. | P16; width=7; rounds=2; PBKDF2=24000 |
| `hcx0305` | CRYPTO | P16 | `hash-chain` | Cadena iterada SHA-256. rondas = 2 + (perfil mod 8). | P16; width=7; rounds=2; PBKDF2=24000 |
| `hcx0306` | CONVERT | P16 | `base64-encode` | Conversion UTF-8 a Base64. conversion reversible; no es cifrado. | P16; width=7; rounds=2; PBKDF2=24000 |
| `hcx0307` | CONVERT | P16 | `base64-decode` | Restauracion Base64 a UTF-8. valida y decodifica Base64. | P16; width=7; rounds=2; PBKDF2=24000 |
| `hcx0308` | CONVERT | P16 | `hex-encode` | Conversion UTF-8 a hexadecimal. conversion reversible; no es cifrado. | P16; width=7; rounds=2; PBKDF2=24000 |
| `hcx0309` | CONVERT | P16 | `hex-decode` | Restauracion hexadecimal a UTF-8. requiere pares completos de bytes. | P16; width=7; rounds=2; PBKDF2=24000 |
| `hcx0310` | CONVERT | P16 | `url-encode` | Codificacion URL component. protege caracteres reservados para transporte. | P16; width=7; rounds=2; PBKDF2=24000 |
| `hcx0311` | CONVERT | P16 | `url-decode` | Restauracion URL component. decodifica transporte URL. | P16; width=7; rounds=2; PBKDF2=24000 |
| `hcx0312` | TRANSFORM | P16 | `rotate-left` | Rotacion determinista a la izquierda. desplazamiento dependiente del perfil. | P16; width=7; rounds=2; PBKDF2=24000 |
| `hcx0313` | TRANSFORM | P16 | `rotate-right` | Rotacion determinista a la derecha. inversa conceptual de rotate-left. | P16; width=7; rounds=2; PBKDF2=24000 |
| `hcx0314` | TRANSFORM | P16 | `xor-mask` | Mascara XOR de laboratorio. salida hexadecimal; reversible con misma mascara. | P16; width=7; rounds=2; PBKDF2=24000 |
| `hcx0315` | TRANSFORM | P16 | `reverse-blocks` | Inversion por bloques. ancho = 4 + (perfil mod 13). | P16; width=7; rounds=2; PBKDF2=24000 |
| `hcx0316` | FORMAT | P16 | `chunk-delimit` | Segmentacion con guiones. ancho = 4 + (perfil mod 13). | P16; width=7; rounds=2; PBKDF2=24000 |
| `hcx0317` | ANALYZE | P16 | `window-sample` | Muestra determinista por ventana. offset guiado por SHA-256 y perfil. | P16; width=7; rounds=2; PBKDF2=24000 |
| `hcx0318` | FORMAT | P16 | `checksum-envelope` | Sobre con integridad SHA-256. domain \| SHA256 \| VALUE. | P16; width=7; rounds=2; PBKDF2=24000 |
| `hcx0319` | FORMAT | P16 | `json-envelope` | Sobre de transporte JSON. incluye dominio, perfil, valor y SHA-256. | P16; width=7; rounds=2; PBKDF2=24000 |
| `hcx0320` | ANALYZE | P16 | `entropy-report` | Reporte de entropia y perfil. chars, bytes, unique, entropy, estimatedBits y SHA-256. | P16; width=7; rounds=2; PBKDF2=24000 |
| `hcx0321` | CRYPTO | P17 | `sha256-domain` | SHA-256 con dominio aislado. digest SHA-256 de domain \| value. | P17; width=8; rounds=3; PBKDF2=25000 |
| `hcx0322` | CRYPTO | P17 | `hmac-sha256` | Etiqueta HMAC-SHA-256. HMAC local; usa clave opcional o dominio del comando. | P17; width=8; rounds=3; PBKDF2=25000 |
| `hcx0323` | CRYPTO | P17 | `pbkdf2-sha256` | Derivacion PBKDF2-SHA-256. sal local; iteraciones = 8000 + perfil x 1000. | P17; width=8; rounds=3; PBKDF2=25000 |
| `hcx0324` | CRYPTO | P17 | `hkdf-sha256` | Derivacion HKDF-SHA-256. salt local e info HSG2818-HCX-P17. | P17; width=8; rounds=3; PBKDF2=25000 |
| `hcx0325` | CRYPTO | P17 | `hash-chain` | Cadena iterada SHA-256. rondas = 2 + (perfil mod 8). | P17; width=8; rounds=3; PBKDF2=25000 |
| `hcx0326` | CONVERT | P17 | `base64-encode` | Conversion UTF-8 a Base64. conversion reversible; no es cifrado. | P17; width=8; rounds=3; PBKDF2=25000 |
| `hcx0327` | CONVERT | P17 | `base64-decode` | Restauracion Base64 a UTF-8. valida y decodifica Base64. | P17; width=8; rounds=3; PBKDF2=25000 |
| `hcx0328` | CONVERT | P17 | `hex-encode` | Conversion UTF-8 a hexadecimal. conversion reversible; no es cifrado. | P17; width=8; rounds=3; PBKDF2=25000 |
| `hcx0329` | CONVERT | P17 | `hex-decode` | Restauracion hexadecimal a UTF-8. requiere pares completos de bytes. | P17; width=8; rounds=3; PBKDF2=25000 |
| `hcx0330` | CONVERT | P17 | `url-encode` | Codificacion URL component. protege caracteres reservados para transporte. | P17; width=8; rounds=3; PBKDF2=25000 |
| `hcx0331` | CONVERT | P17 | `url-decode` | Restauracion URL component. decodifica transporte URL. | P17; width=8; rounds=3; PBKDF2=25000 |
| `hcx0332` | TRANSFORM | P17 | `rotate-left` | Rotacion determinista a la izquierda. desplazamiento dependiente del perfil. | P17; width=8; rounds=3; PBKDF2=25000 |
| `hcx0333` | TRANSFORM | P17 | `rotate-right` | Rotacion determinista a la derecha. inversa conceptual de rotate-left. | P17; width=8; rounds=3; PBKDF2=25000 |
| `hcx0334` | TRANSFORM | P17 | `xor-mask` | Mascara XOR de laboratorio. salida hexadecimal; reversible con misma mascara. | P17; width=8; rounds=3; PBKDF2=25000 |
| `hcx0335` | TRANSFORM | P17 | `reverse-blocks` | Inversion por bloques. ancho = 4 + (perfil mod 13). | P17; width=8; rounds=3; PBKDF2=25000 |
| `hcx0336` | FORMAT | P17 | `chunk-delimit` | Segmentacion con guiones. ancho = 4 + (perfil mod 13). | P17; width=8; rounds=3; PBKDF2=25000 |
| `hcx0337` | ANALYZE | P17 | `window-sample` | Muestra determinista por ventana. offset guiado por SHA-256 y perfil. | P17; width=8; rounds=3; PBKDF2=25000 |
| `hcx0338` | FORMAT | P17 | `checksum-envelope` | Sobre con integridad SHA-256. domain \| SHA256 \| VALUE. | P17; width=8; rounds=3; PBKDF2=25000 |
| `hcx0339` | FORMAT | P17 | `json-envelope` | Sobre de transporte JSON. incluye dominio, perfil, valor y SHA-256. | P17; width=8; rounds=3; PBKDF2=25000 |
| `hcx0340` | ANALYZE | P17 | `entropy-report` | Reporte de entropia y perfil. chars, bytes, unique, entropy, estimatedBits y SHA-256. | P17; width=8; rounds=3; PBKDF2=25000 |
| `hcx0341` | CRYPTO | P18 | `sha256-domain` | SHA-256 con dominio aislado. digest SHA-256 de domain \| value. | P18; width=9; rounds=4; PBKDF2=26000 |
| `hcx0342` | CRYPTO | P18 | `hmac-sha256` | Etiqueta HMAC-SHA-256. HMAC local; usa clave opcional o dominio del comando. | P18; width=9; rounds=4; PBKDF2=26000 |
| `hcx0343` | CRYPTO | P18 | `pbkdf2-sha256` | Derivacion PBKDF2-SHA-256. sal local; iteraciones = 8000 + perfil x 1000. | P18; width=9; rounds=4; PBKDF2=26000 |
| `hcx0344` | CRYPTO | P18 | `hkdf-sha256` | Derivacion HKDF-SHA-256. salt local e info HSG2818-HCX-P18. | P18; width=9; rounds=4; PBKDF2=26000 |
| `hcx0345` | CRYPTO | P18 | `hash-chain` | Cadena iterada SHA-256. rondas = 2 + (perfil mod 8). | P18; width=9; rounds=4; PBKDF2=26000 |
| `hcx0346` | CONVERT | P18 | `base64-encode` | Conversion UTF-8 a Base64. conversion reversible; no es cifrado. | P18; width=9; rounds=4; PBKDF2=26000 |
| `hcx0347` | CONVERT | P18 | `base64-decode` | Restauracion Base64 a UTF-8. valida y decodifica Base64. | P18; width=9; rounds=4; PBKDF2=26000 |
| `hcx0348` | CONVERT | P18 | `hex-encode` | Conversion UTF-8 a hexadecimal. conversion reversible; no es cifrado. | P18; width=9; rounds=4; PBKDF2=26000 |
| `hcx0349` | CONVERT | P18 | `hex-decode` | Restauracion hexadecimal a UTF-8. requiere pares completos de bytes. | P18; width=9; rounds=4; PBKDF2=26000 |
| `hcx0350` | CONVERT | P18 | `url-encode` | Codificacion URL component. protege caracteres reservados para transporte. | P18; width=9; rounds=4; PBKDF2=26000 |
| `hcx0351` | CONVERT | P18 | `url-decode` | Restauracion URL component. decodifica transporte URL. | P18; width=9; rounds=4; PBKDF2=26000 |
| `hcx0352` | TRANSFORM | P18 | `rotate-left` | Rotacion determinista a la izquierda. desplazamiento dependiente del perfil. | P18; width=9; rounds=4; PBKDF2=26000 |
| `hcx0353` | TRANSFORM | P18 | `rotate-right` | Rotacion determinista a la derecha. inversa conceptual de rotate-left. | P18; width=9; rounds=4; PBKDF2=26000 |
| `hcx0354` | TRANSFORM | P18 | `xor-mask` | Mascara XOR de laboratorio. salida hexadecimal; reversible con misma mascara. | P18; width=9; rounds=4; PBKDF2=26000 |
| `hcx0355` | TRANSFORM | P18 | `reverse-blocks` | Inversion por bloques. ancho = 4 + (perfil mod 13). | P18; width=9; rounds=4; PBKDF2=26000 |
| `hcx0356` | FORMAT | P18 | `chunk-delimit` | Segmentacion con guiones. ancho = 4 + (perfil mod 13). | P18; width=9; rounds=4; PBKDF2=26000 |
| `hcx0357` | ANALYZE | P18 | `window-sample` | Muestra determinista por ventana. offset guiado por SHA-256 y perfil. | P18; width=9; rounds=4; PBKDF2=26000 |
| `hcx0358` | FORMAT | P18 | `checksum-envelope` | Sobre con integridad SHA-256. domain \| SHA256 \| VALUE. | P18; width=9; rounds=4; PBKDF2=26000 |
| `hcx0359` | FORMAT | P18 | `json-envelope` | Sobre de transporte JSON. incluye dominio, perfil, valor y SHA-256. | P18; width=9; rounds=4; PBKDF2=26000 |
| `hcx0360` | ANALYZE | P18 | `entropy-report` | Reporte de entropia y perfil. chars, bytes, unique, entropy, estimatedBits y SHA-256. | P18; width=9; rounds=4; PBKDF2=26000 |
| `hcx0361` | CRYPTO | P19 | `sha256-domain` | SHA-256 con dominio aislado. digest SHA-256 de domain \| value. | P19; width=10; rounds=5; PBKDF2=27000 |
| `hcx0362` | CRYPTO | P19 | `hmac-sha256` | Etiqueta HMAC-SHA-256. HMAC local; usa clave opcional o dominio del comando. | P19; width=10; rounds=5; PBKDF2=27000 |
| `hcx0363` | CRYPTO | P19 | `pbkdf2-sha256` | Derivacion PBKDF2-SHA-256. sal local; iteraciones = 8000 + perfil x 1000. | P19; width=10; rounds=5; PBKDF2=27000 |
| `hcx0364` | CRYPTO | P19 | `hkdf-sha256` | Derivacion HKDF-SHA-256. salt local e info HSG2818-HCX-P19. | P19; width=10; rounds=5; PBKDF2=27000 |
| `hcx0365` | CRYPTO | P19 | `hash-chain` | Cadena iterada SHA-256. rondas = 2 + (perfil mod 8). | P19; width=10; rounds=5; PBKDF2=27000 |
| `hcx0366` | CONVERT | P19 | `base64-encode` | Conversion UTF-8 a Base64. conversion reversible; no es cifrado. | P19; width=10; rounds=5; PBKDF2=27000 |
| `hcx0367` | CONVERT | P19 | `base64-decode` | Restauracion Base64 a UTF-8. valida y decodifica Base64. | P19; width=10; rounds=5; PBKDF2=27000 |
| `hcx0368` | CONVERT | P19 | `hex-encode` | Conversion UTF-8 a hexadecimal. conversion reversible; no es cifrado. | P19; width=10; rounds=5; PBKDF2=27000 |
| `hcx0369` | CONVERT | P19 | `hex-decode` | Restauracion hexadecimal a UTF-8. requiere pares completos de bytes. | P19; width=10; rounds=5; PBKDF2=27000 |
| `hcx0370` | CONVERT | P19 | `url-encode` | Codificacion URL component. protege caracteres reservados para transporte. | P19; width=10; rounds=5; PBKDF2=27000 |
| `hcx0371` | CONVERT | P19 | `url-decode` | Restauracion URL component. decodifica transporte URL. | P19; width=10; rounds=5; PBKDF2=27000 |
| `hcx0372` | TRANSFORM | P19 | `rotate-left` | Rotacion determinista a la izquierda. desplazamiento dependiente del perfil. | P19; width=10; rounds=5; PBKDF2=27000 |
| `hcx0373` | TRANSFORM | P19 | `rotate-right` | Rotacion determinista a la derecha. inversa conceptual de rotate-left. | P19; width=10; rounds=5; PBKDF2=27000 |
| `hcx0374` | TRANSFORM | P19 | `xor-mask` | Mascara XOR de laboratorio. salida hexadecimal; reversible con misma mascara. | P19; width=10; rounds=5; PBKDF2=27000 |
| `hcx0375` | TRANSFORM | P19 | `reverse-blocks` | Inversion por bloques. ancho = 4 + (perfil mod 13). | P19; width=10; rounds=5; PBKDF2=27000 |
| `hcx0376` | FORMAT | P19 | `chunk-delimit` | Segmentacion con guiones. ancho = 4 + (perfil mod 13). | P19; width=10; rounds=5; PBKDF2=27000 |
| `hcx0377` | ANALYZE | P19 | `window-sample` | Muestra determinista por ventana. offset guiado por SHA-256 y perfil. | P19; width=10; rounds=5; PBKDF2=27000 |
| `hcx0378` | FORMAT | P19 | `checksum-envelope` | Sobre con integridad SHA-256. domain \| SHA256 \| VALUE. | P19; width=10; rounds=5; PBKDF2=27000 |
| `hcx0379` | FORMAT | P19 | `json-envelope` | Sobre de transporte JSON. incluye dominio, perfil, valor y SHA-256. | P19; width=10; rounds=5; PBKDF2=27000 |
| `hcx0380` | ANALYZE | P19 | `entropy-report` | Reporte de entropia y perfil. chars, bytes, unique, entropy, estimatedBits y SHA-256. | P19; width=10; rounds=5; PBKDF2=27000 |
| `hcx0381` | CRYPTO | P20 | `sha256-domain` | SHA-256 con dominio aislado. digest SHA-256 de domain \| value. | P20; width=11; rounds=6; PBKDF2=28000 |
| `hcx0382` | CRYPTO | P20 | `hmac-sha256` | Etiqueta HMAC-SHA-256. HMAC local; usa clave opcional o dominio del comando. | P20; width=11; rounds=6; PBKDF2=28000 |
| `hcx0383` | CRYPTO | P20 | `pbkdf2-sha256` | Derivacion PBKDF2-SHA-256. sal local; iteraciones = 8000 + perfil x 1000. | P20; width=11; rounds=6; PBKDF2=28000 |
| `hcx0384` | CRYPTO | P20 | `hkdf-sha256` | Derivacion HKDF-SHA-256. salt local e info HSG2818-HCX-P20. | P20; width=11; rounds=6; PBKDF2=28000 |
| `hcx0385` | CRYPTO | P20 | `hash-chain` | Cadena iterada SHA-256. rondas = 2 + (perfil mod 8). | P20; width=11; rounds=6; PBKDF2=28000 |
| `hcx0386` | CONVERT | P20 | `base64-encode` | Conversion UTF-8 a Base64. conversion reversible; no es cifrado. | P20; width=11; rounds=6; PBKDF2=28000 |
| `hcx0387` | CONVERT | P20 | `base64-decode` | Restauracion Base64 a UTF-8. valida y decodifica Base64. | P20; width=11; rounds=6; PBKDF2=28000 |
| `hcx0388` | CONVERT | P20 | `hex-encode` | Conversion UTF-8 a hexadecimal. conversion reversible; no es cifrado. | P20; width=11; rounds=6; PBKDF2=28000 |
| `hcx0389` | CONVERT | P20 | `hex-decode` | Restauracion hexadecimal a UTF-8. requiere pares completos de bytes. | P20; width=11; rounds=6; PBKDF2=28000 |
| `hcx0390` | CONVERT | P20 | `url-encode` | Codificacion URL component. protege caracteres reservados para transporte. | P20; width=11; rounds=6; PBKDF2=28000 |
| `hcx0391` | CONVERT | P20 | `url-decode` | Restauracion URL component. decodifica transporte URL. | P20; width=11; rounds=6; PBKDF2=28000 |
| `hcx0392` | TRANSFORM | P20 | `rotate-left` | Rotacion determinista a la izquierda. desplazamiento dependiente del perfil. | P20; width=11; rounds=6; PBKDF2=28000 |
| `hcx0393` | TRANSFORM | P20 | `rotate-right` | Rotacion determinista a la derecha. inversa conceptual de rotate-left. | P20; width=11; rounds=6; PBKDF2=28000 |
| `hcx0394` | TRANSFORM | P20 | `xor-mask` | Mascara XOR de laboratorio. salida hexadecimal; reversible con misma mascara. | P20; width=11; rounds=6; PBKDF2=28000 |
| `hcx0395` | TRANSFORM | P20 | `reverse-blocks` | Inversion por bloques. ancho = 4 + (perfil mod 13). | P20; width=11; rounds=6; PBKDF2=28000 |
| `hcx0396` | FORMAT | P20 | `chunk-delimit` | Segmentacion con guiones. ancho = 4 + (perfil mod 13). | P20; width=11; rounds=6; PBKDF2=28000 |
| `hcx0397` | ANALYZE | P20 | `window-sample` | Muestra determinista por ventana. offset guiado por SHA-256 y perfil. | P20; width=11; rounds=6; PBKDF2=28000 |
| `hcx0398` | FORMAT | P20 | `checksum-envelope` | Sobre con integridad SHA-256. domain \| SHA256 \| VALUE. | P20; width=11; rounds=6; PBKDF2=28000 |
| `hcx0399` | FORMAT | P20 | `json-envelope` | Sobre de transporte JSON. incluye dominio, perfil, valor y SHA-256. | P20; width=11; rounds=6; PBKDF2=28000 |
| `hcx0400` | ANALYZE | P20 | `entropy-report` | Reporte de entropia y perfil. chars, bytes, unique, entropy, estimatedBits y SHA-256. | P20; width=11; rounds=6; PBKDF2=28000 |
| `hcx0401` | CRYPTO | P21 | `sha256-domain` | SHA-256 con dominio aislado. digest SHA-256 de domain \| value. | P21; width=12; rounds=7; PBKDF2=29000 |
| `hcx0402` | CRYPTO | P21 | `hmac-sha256` | Etiqueta HMAC-SHA-256. HMAC local; usa clave opcional o dominio del comando. | P21; width=12; rounds=7; PBKDF2=29000 |
| `hcx0403` | CRYPTO | P21 | `pbkdf2-sha256` | Derivacion PBKDF2-SHA-256. sal local; iteraciones = 8000 + perfil x 1000. | P21; width=12; rounds=7; PBKDF2=29000 |
| `hcx0404` | CRYPTO | P21 | `hkdf-sha256` | Derivacion HKDF-SHA-256. salt local e info HSG2818-HCX-P21. | P21; width=12; rounds=7; PBKDF2=29000 |
| `hcx0405` | CRYPTO | P21 | `hash-chain` | Cadena iterada SHA-256. rondas = 2 + (perfil mod 8). | P21; width=12; rounds=7; PBKDF2=29000 |
| `hcx0406` | CONVERT | P21 | `base64-encode` | Conversion UTF-8 a Base64. conversion reversible; no es cifrado. | P21; width=12; rounds=7; PBKDF2=29000 |
| `hcx0407` | CONVERT | P21 | `base64-decode` | Restauracion Base64 a UTF-8. valida y decodifica Base64. | P21; width=12; rounds=7; PBKDF2=29000 |
| `hcx0408` | CONVERT | P21 | `hex-encode` | Conversion UTF-8 a hexadecimal. conversion reversible; no es cifrado. | P21; width=12; rounds=7; PBKDF2=29000 |
| `hcx0409` | CONVERT | P21 | `hex-decode` | Restauracion hexadecimal a UTF-8. requiere pares completos de bytes. | P21; width=12; rounds=7; PBKDF2=29000 |
| `hcx0410` | CONVERT | P21 | `url-encode` | Codificacion URL component. protege caracteres reservados para transporte. | P21; width=12; rounds=7; PBKDF2=29000 |
| `hcx0411` | CONVERT | P21 | `url-decode` | Restauracion URL component. decodifica transporte URL. | P21; width=12; rounds=7; PBKDF2=29000 |
| `hcx0412` | TRANSFORM | P21 | `rotate-left` | Rotacion determinista a la izquierda. desplazamiento dependiente del perfil. | P21; width=12; rounds=7; PBKDF2=29000 |
| `hcx0413` | TRANSFORM | P21 | `rotate-right` | Rotacion determinista a la derecha. inversa conceptual de rotate-left. | P21; width=12; rounds=7; PBKDF2=29000 |
| `hcx0414` | TRANSFORM | P21 | `xor-mask` | Mascara XOR de laboratorio. salida hexadecimal; reversible con misma mascara. | P21; width=12; rounds=7; PBKDF2=29000 |
| `hcx0415` | TRANSFORM | P21 | `reverse-blocks` | Inversion por bloques. ancho = 4 + (perfil mod 13). | P21; width=12; rounds=7; PBKDF2=29000 |
| `hcx0416` | FORMAT | P21 | `chunk-delimit` | Segmentacion con guiones. ancho = 4 + (perfil mod 13). | P21; width=12; rounds=7; PBKDF2=29000 |
| `hcx0417` | ANALYZE | P21 | `window-sample` | Muestra determinista por ventana. offset guiado por SHA-256 y perfil. | P21; width=12; rounds=7; PBKDF2=29000 |
| `hcx0418` | FORMAT | P21 | `checksum-envelope` | Sobre con integridad SHA-256. domain \| SHA256 \| VALUE. | P21; width=12; rounds=7; PBKDF2=29000 |
| `hcx0419` | FORMAT | P21 | `json-envelope` | Sobre de transporte JSON. incluye dominio, perfil, valor y SHA-256. | P21; width=12; rounds=7; PBKDF2=29000 |
| `hcx0420` | ANALYZE | P21 | `entropy-report` | Reporte de entropia y perfil. chars, bytes, unique, entropy, estimatedBits y SHA-256. | P21; width=12; rounds=7; PBKDF2=29000 |
| `hcx0421` | CRYPTO | P22 | `sha256-domain` | SHA-256 con dominio aislado. digest SHA-256 de domain \| value. | P22; width=13; rounds=8; PBKDF2=30000 |
| `hcx0422` | CRYPTO | P22 | `hmac-sha256` | Etiqueta HMAC-SHA-256. HMAC local; usa clave opcional o dominio del comando. | P22; width=13; rounds=8; PBKDF2=30000 |
| `hcx0423` | CRYPTO | P22 | `pbkdf2-sha256` | Derivacion PBKDF2-SHA-256. sal local; iteraciones = 8000 + perfil x 1000. | P22; width=13; rounds=8; PBKDF2=30000 |
| `hcx0424` | CRYPTO | P22 | `hkdf-sha256` | Derivacion HKDF-SHA-256. salt local e info HSG2818-HCX-P22. | P22; width=13; rounds=8; PBKDF2=30000 |
| `hcx0425` | CRYPTO | P22 | `hash-chain` | Cadena iterada SHA-256. rondas = 2 + (perfil mod 8). | P22; width=13; rounds=8; PBKDF2=30000 |
| `hcx0426` | CONVERT | P22 | `base64-encode` | Conversion UTF-8 a Base64. conversion reversible; no es cifrado. | P22; width=13; rounds=8; PBKDF2=30000 |
| `hcx0427` | CONVERT | P22 | `base64-decode` | Restauracion Base64 a UTF-8. valida y decodifica Base64. | P22; width=13; rounds=8; PBKDF2=30000 |
| `hcx0428` | CONVERT | P22 | `hex-encode` | Conversion UTF-8 a hexadecimal. conversion reversible; no es cifrado. | P22; width=13; rounds=8; PBKDF2=30000 |
| `hcx0429` | CONVERT | P22 | `hex-decode` | Restauracion hexadecimal a UTF-8. requiere pares completos de bytes. | P22; width=13; rounds=8; PBKDF2=30000 |
| `hcx0430` | CONVERT | P22 | `url-encode` | Codificacion URL component. protege caracteres reservados para transporte. | P22; width=13; rounds=8; PBKDF2=30000 |
| `hcx0431` | CONVERT | P22 | `url-decode` | Restauracion URL component. decodifica transporte URL. | P22; width=13; rounds=8; PBKDF2=30000 |
| `hcx0432` | TRANSFORM | P22 | `rotate-left` | Rotacion determinista a la izquierda. desplazamiento dependiente del perfil. | P22; width=13; rounds=8; PBKDF2=30000 |
| `hcx0433` | TRANSFORM | P22 | `rotate-right` | Rotacion determinista a la derecha. inversa conceptual de rotate-left. | P22; width=13; rounds=8; PBKDF2=30000 |
| `hcx0434` | TRANSFORM | P22 | `xor-mask` | Mascara XOR de laboratorio. salida hexadecimal; reversible con misma mascara. | P22; width=13; rounds=8; PBKDF2=30000 |
| `hcx0435` | TRANSFORM | P22 | `reverse-blocks` | Inversion por bloques. ancho = 4 + (perfil mod 13). | P22; width=13; rounds=8; PBKDF2=30000 |
| `hcx0436` | FORMAT | P22 | `chunk-delimit` | Segmentacion con guiones. ancho = 4 + (perfil mod 13). | P22; width=13; rounds=8; PBKDF2=30000 |
| `hcx0437` | ANALYZE | P22 | `window-sample` | Muestra determinista por ventana. offset guiado por SHA-256 y perfil. | P22; width=13; rounds=8; PBKDF2=30000 |
| `hcx0438` | FORMAT | P22 | `checksum-envelope` | Sobre con integridad SHA-256. domain \| SHA256 \| VALUE. | P22; width=13; rounds=8; PBKDF2=30000 |
| `hcx0439` | FORMAT | P22 | `json-envelope` | Sobre de transporte JSON. incluye dominio, perfil, valor y SHA-256. | P22; width=13; rounds=8; PBKDF2=30000 |
| `hcx0440` | ANALYZE | P22 | `entropy-report` | Reporte de entropia y perfil. chars, bytes, unique, entropy, estimatedBits y SHA-256. | P22; width=13; rounds=8; PBKDF2=30000 |
| `hcx0441` | CRYPTO | P23 | `sha256-domain` | SHA-256 con dominio aislado. digest SHA-256 de domain \| value. | P23; width=14; rounds=9; PBKDF2=31000 |
| `hcx0442` | CRYPTO | P23 | `hmac-sha256` | Etiqueta HMAC-SHA-256. HMAC local; usa clave opcional o dominio del comando. | P23; width=14; rounds=9; PBKDF2=31000 |
| `hcx0443` | CRYPTO | P23 | `pbkdf2-sha256` | Derivacion PBKDF2-SHA-256. sal local; iteraciones = 8000 + perfil x 1000. | P23; width=14; rounds=9; PBKDF2=31000 |
| `hcx0444` | CRYPTO | P23 | `hkdf-sha256` | Derivacion HKDF-SHA-256. salt local e info HSG2818-HCX-P23. | P23; width=14; rounds=9; PBKDF2=31000 |
| `hcx0445` | CRYPTO | P23 | `hash-chain` | Cadena iterada SHA-256. rondas = 2 + (perfil mod 8). | P23; width=14; rounds=9; PBKDF2=31000 |
| `hcx0446` | CONVERT | P23 | `base64-encode` | Conversion UTF-8 a Base64. conversion reversible; no es cifrado. | P23; width=14; rounds=9; PBKDF2=31000 |
| `hcx0447` | CONVERT | P23 | `base64-decode` | Restauracion Base64 a UTF-8. valida y decodifica Base64. | P23; width=14; rounds=9; PBKDF2=31000 |
| `hcx0448` | CONVERT | P23 | `hex-encode` | Conversion UTF-8 a hexadecimal. conversion reversible; no es cifrado. | P23; width=14; rounds=9; PBKDF2=31000 |
| `hcx0449` | CONVERT | P23 | `hex-decode` | Restauracion hexadecimal a UTF-8. requiere pares completos de bytes. | P23; width=14; rounds=9; PBKDF2=31000 |
| `hcx0450` | CONVERT | P23 | `url-encode` | Codificacion URL component. protege caracteres reservados para transporte. | P23; width=14; rounds=9; PBKDF2=31000 |
| `hcx0451` | CONVERT | P23 | `url-decode` | Restauracion URL component. decodifica transporte URL. | P23; width=14; rounds=9; PBKDF2=31000 |
| `hcx0452` | TRANSFORM | P23 | `rotate-left` | Rotacion determinista a la izquierda. desplazamiento dependiente del perfil. | P23; width=14; rounds=9; PBKDF2=31000 |
| `hcx0453` | TRANSFORM | P23 | `rotate-right` | Rotacion determinista a la derecha. inversa conceptual de rotate-left. | P23; width=14; rounds=9; PBKDF2=31000 |
| `hcx0454` | TRANSFORM | P23 | `xor-mask` | Mascara XOR de laboratorio. salida hexadecimal; reversible con misma mascara. | P23; width=14; rounds=9; PBKDF2=31000 |
| `hcx0455` | TRANSFORM | P23 | `reverse-blocks` | Inversion por bloques. ancho = 4 + (perfil mod 13). | P23; width=14; rounds=9; PBKDF2=31000 |
| `hcx0456` | FORMAT | P23 | `chunk-delimit` | Segmentacion con guiones. ancho = 4 + (perfil mod 13). | P23; width=14; rounds=9; PBKDF2=31000 |
| `hcx0457` | ANALYZE | P23 | `window-sample` | Muestra determinista por ventana. offset guiado por SHA-256 y perfil. | P23; width=14; rounds=9; PBKDF2=31000 |
| `hcx0458` | FORMAT | P23 | `checksum-envelope` | Sobre con integridad SHA-256. domain \| SHA256 \| VALUE. | P23; width=14; rounds=9; PBKDF2=31000 |
| `hcx0459` | FORMAT | P23 | `json-envelope` | Sobre de transporte JSON. incluye dominio, perfil, valor y SHA-256. | P23; width=14; rounds=9; PBKDF2=31000 |
| `hcx0460` | ANALYZE | P23 | `entropy-report` | Reporte de entropia y perfil. chars, bytes, unique, entropy, estimatedBits y SHA-256. | P23; width=14; rounds=9; PBKDF2=31000 |
| `hcx0461` | CRYPTO | P24 | `sha256-domain` | SHA-256 con dominio aislado. digest SHA-256 de domain \| value. | P24; width=15; rounds=2; PBKDF2=32000 |
| `hcx0462` | CRYPTO | P24 | `hmac-sha256` | Etiqueta HMAC-SHA-256. HMAC local; usa clave opcional o dominio del comando. | P24; width=15; rounds=2; PBKDF2=32000 |
| `hcx0463` | CRYPTO | P24 | `pbkdf2-sha256` | Derivacion PBKDF2-SHA-256. sal local; iteraciones = 8000 + perfil x 1000. | P24; width=15; rounds=2; PBKDF2=32000 |
| `hcx0464` | CRYPTO | P24 | `hkdf-sha256` | Derivacion HKDF-SHA-256. salt local e info HSG2818-HCX-P24. | P24; width=15; rounds=2; PBKDF2=32000 |
| `hcx0465` | CRYPTO | P24 | `hash-chain` | Cadena iterada SHA-256. rondas = 2 + (perfil mod 8). | P24; width=15; rounds=2; PBKDF2=32000 |
| `hcx0466` | CONVERT | P24 | `base64-encode` | Conversion UTF-8 a Base64. conversion reversible; no es cifrado. | P24; width=15; rounds=2; PBKDF2=32000 |
| `hcx0467` | CONVERT | P24 | `base64-decode` | Restauracion Base64 a UTF-8. valida y decodifica Base64. | P24; width=15; rounds=2; PBKDF2=32000 |
| `hcx0468` | CONVERT | P24 | `hex-encode` | Conversion UTF-8 a hexadecimal. conversion reversible; no es cifrado. | P24; width=15; rounds=2; PBKDF2=32000 |
| `hcx0469` | CONVERT | P24 | `hex-decode` | Restauracion hexadecimal a UTF-8. requiere pares completos de bytes. | P24; width=15; rounds=2; PBKDF2=32000 |
| `hcx0470` | CONVERT | P24 | `url-encode` | Codificacion URL component. protege caracteres reservados para transporte. | P24; width=15; rounds=2; PBKDF2=32000 |
| `hcx0471` | CONVERT | P24 | `url-decode` | Restauracion URL component. decodifica transporte URL. | P24; width=15; rounds=2; PBKDF2=32000 |
| `hcx0472` | TRANSFORM | P24 | `rotate-left` | Rotacion determinista a la izquierda. desplazamiento dependiente del perfil. | P24; width=15; rounds=2; PBKDF2=32000 |
| `hcx0473` | TRANSFORM | P24 | `rotate-right` | Rotacion determinista a la derecha. inversa conceptual de rotate-left. | P24; width=15; rounds=2; PBKDF2=32000 |
| `hcx0474` | TRANSFORM | P24 | `xor-mask` | Mascara XOR de laboratorio. salida hexadecimal; reversible con misma mascara. | P24; width=15; rounds=2; PBKDF2=32000 |
| `hcx0475` | TRANSFORM | P24 | `reverse-blocks` | Inversion por bloques. ancho = 4 + (perfil mod 13). | P24; width=15; rounds=2; PBKDF2=32000 |
| `hcx0476` | FORMAT | P24 | `chunk-delimit` | Segmentacion con guiones. ancho = 4 + (perfil mod 13). | P24; width=15; rounds=2; PBKDF2=32000 |
| `hcx0477` | ANALYZE | P24 | `window-sample` | Muestra determinista por ventana. offset guiado por SHA-256 y perfil. | P24; width=15; rounds=2; PBKDF2=32000 |
| `hcx0478` | FORMAT | P24 | `checksum-envelope` | Sobre con integridad SHA-256. domain \| SHA256 \| VALUE. | P24; width=15; rounds=2; PBKDF2=32000 |
| `hcx0479` | FORMAT | P24 | `json-envelope` | Sobre de transporte JSON. incluye dominio, perfil, valor y SHA-256. | P24; width=15; rounds=2; PBKDF2=32000 |
| `hcx0480` | ANALYZE | P24 | `entropy-report` | Reporte de entropia y perfil. chars, bytes, unique, entropy, estimatedBits y SHA-256. | P24; width=15; rounds=2; PBKDF2=32000 |
| `hcx0481` | CRYPTO | P25 | `sha256-domain` | SHA-256 con dominio aislado. digest SHA-256 de domain \| value. | P25; width=16; rounds=3; PBKDF2=33000 |
| `hcx0482` | CRYPTO | P25 | `hmac-sha256` | Etiqueta HMAC-SHA-256. HMAC local; usa clave opcional o dominio del comando. | P25; width=16; rounds=3; PBKDF2=33000 |
| `hcx0483` | CRYPTO | P25 | `pbkdf2-sha256` | Derivacion PBKDF2-SHA-256. sal local; iteraciones = 8000 + perfil x 1000. | P25; width=16; rounds=3; PBKDF2=33000 |
| `hcx0484` | CRYPTO | P25 | `hkdf-sha256` | Derivacion HKDF-SHA-256. salt local e info HSG2818-HCX-P25. | P25; width=16; rounds=3; PBKDF2=33000 |
| `hcx0485` | CRYPTO | P25 | `hash-chain` | Cadena iterada SHA-256. rondas = 2 + (perfil mod 8). | P25; width=16; rounds=3; PBKDF2=33000 |
| `hcx0486` | CONVERT | P25 | `base64-encode` | Conversion UTF-8 a Base64. conversion reversible; no es cifrado. | P25; width=16; rounds=3; PBKDF2=33000 |
| `hcx0487` | CONVERT | P25 | `base64-decode` | Restauracion Base64 a UTF-8. valida y decodifica Base64. | P25; width=16; rounds=3; PBKDF2=33000 |
| `hcx0488` | CONVERT | P25 | `hex-encode` | Conversion UTF-8 a hexadecimal. conversion reversible; no es cifrado. | P25; width=16; rounds=3; PBKDF2=33000 |
| `hcx0489` | CONVERT | P25 | `hex-decode` | Restauracion hexadecimal a UTF-8. requiere pares completos de bytes. | P25; width=16; rounds=3; PBKDF2=33000 |
| `hcx0490` | CONVERT | P25 | `url-encode` | Codificacion URL component. protege caracteres reservados para transporte. | P25; width=16; rounds=3; PBKDF2=33000 |
| `hcx0491` | CONVERT | P25 | `url-decode` | Restauracion URL component. decodifica transporte URL. | P25; width=16; rounds=3; PBKDF2=33000 |
| `hcx0492` | TRANSFORM | P25 | `rotate-left` | Rotacion determinista a la izquierda. desplazamiento dependiente del perfil. | P25; width=16; rounds=3; PBKDF2=33000 |
| `hcx0493` | TRANSFORM | P25 | `rotate-right` | Rotacion determinista a la derecha. inversa conceptual de rotate-left. | P25; width=16; rounds=3; PBKDF2=33000 |
| `hcx0494` | TRANSFORM | P25 | `xor-mask` | Mascara XOR de laboratorio. salida hexadecimal; reversible con misma mascara. | P25; width=16; rounds=3; PBKDF2=33000 |
| `hcx0495` | TRANSFORM | P25 | `reverse-blocks` | Inversion por bloques. ancho = 4 + (perfil mod 13). | P25; width=16; rounds=3; PBKDF2=33000 |
| `hcx0496` | FORMAT | P25 | `chunk-delimit` | Segmentacion con guiones. ancho = 4 + (perfil mod 13). | P25; width=16; rounds=3; PBKDF2=33000 |
| `hcx0497` | ANALYZE | P25 | `window-sample` | Muestra determinista por ventana. offset guiado por SHA-256 y perfil. | P25; width=16; rounds=3; PBKDF2=33000 |
| `hcx0498` | FORMAT | P25 | `checksum-envelope` | Sobre con integridad SHA-256. domain \| SHA256 \| VALUE. | P25; width=16; rounds=3; PBKDF2=33000 |
| `hcx0499` | FORMAT | P25 | `json-envelope` | Sobre de transporte JSON. incluye dominio, perfil, valor y SHA-256. | P25; width=16; rounds=3; PBKDF2=33000 |
| `hcx0500` | ANALYZE | P25 | `entropy-report` | Reporte de entropia y perfil. chars, bytes, unique, entropy, estimatedBits y SHA-256. | P25; width=16; rounds=3; PBKDF2=33000 |
| `hcx0501` | CRYPTO | P26 | `sha256-domain` | SHA-256 con dominio aislado. digest SHA-256 de domain \| value. | P26; width=4; rounds=4; PBKDF2=34000 |
| `hcx0502` | CRYPTO | P26 | `hmac-sha256` | Etiqueta HMAC-SHA-256. HMAC local; usa clave opcional o dominio del comando. | P26; width=4; rounds=4; PBKDF2=34000 |
| `hcx0503` | CRYPTO | P26 | `pbkdf2-sha256` | Derivacion PBKDF2-SHA-256. sal local; iteraciones = 8000 + perfil x 1000. | P26; width=4; rounds=4; PBKDF2=34000 |
| `hcx0504` | CRYPTO | P26 | `hkdf-sha256` | Derivacion HKDF-SHA-256. salt local e info HSG2818-HCX-P26. | P26; width=4; rounds=4; PBKDF2=34000 |
| `hcx0505` | CRYPTO | P26 | `hash-chain` | Cadena iterada SHA-256. rondas = 2 + (perfil mod 8). | P26; width=4; rounds=4; PBKDF2=34000 |
| `hcx0506` | CONVERT | P26 | `base64-encode` | Conversion UTF-8 a Base64. conversion reversible; no es cifrado. | P26; width=4; rounds=4; PBKDF2=34000 |
| `hcx0507` | CONVERT | P26 | `base64-decode` | Restauracion Base64 a UTF-8. valida y decodifica Base64. | P26; width=4; rounds=4; PBKDF2=34000 |
| `hcx0508` | CONVERT | P26 | `hex-encode` | Conversion UTF-8 a hexadecimal. conversion reversible; no es cifrado. | P26; width=4; rounds=4; PBKDF2=34000 |
| `hcx0509` | CONVERT | P26 | `hex-decode` | Restauracion hexadecimal a UTF-8. requiere pares completos de bytes. | P26; width=4; rounds=4; PBKDF2=34000 |
| `hcx0510` | CONVERT | P26 | `url-encode` | Codificacion URL component. protege caracteres reservados para transporte. | P26; width=4; rounds=4; PBKDF2=34000 |
| `hcx0511` | CONVERT | P26 | `url-decode` | Restauracion URL component. decodifica transporte URL. | P26; width=4; rounds=4; PBKDF2=34000 |
| `hcx0512` | TRANSFORM | P26 | `rotate-left` | Rotacion determinista a la izquierda. desplazamiento dependiente del perfil. | P26; width=4; rounds=4; PBKDF2=34000 |
| `hcx0513` | TRANSFORM | P26 | `rotate-right` | Rotacion determinista a la derecha. inversa conceptual de rotate-left. | P26; width=4; rounds=4; PBKDF2=34000 |
| `hcx0514` | TRANSFORM | P26 | `xor-mask` | Mascara XOR de laboratorio. salida hexadecimal; reversible con misma mascara. | P26; width=4; rounds=4; PBKDF2=34000 |
| `hcx0515` | TRANSFORM | P26 | `reverse-blocks` | Inversion por bloques. ancho = 4 + (perfil mod 13). | P26; width=4; rounds=4; PBKDF2=34000 |
| `hcx0516` | FORMAT | P26 | `chunk-delimit` | Segmentacion con guiones. ancho = 4 + (perfil mod 13). | P26; width=4; rounds=4; PBKDF2=34000 |
| `hcx0517` | ANALYZE | P26 | `window-sample` | Muestra determinista por ventana. offset guiado por SHA-256 y perfil. | P26; width=4; rounds=4; PBKDF2=34000 |
| `hcx0518` | FORMAT | P26 | `checksum-envelope` | Sobre con integridad SHA-256. domain \| SHA256 \| VALUE. | P26; width=4; rounds=4; PBKDF2=34000 |
| `hcx0519` | FORMAT | P26 | `json-envelope` | Sobre de transporte JSON. incluye dominio, perfil, valor y SHA-256. | P26; width=4; rounds=4; PBKDF2=34000 |
| `hcx0520` | ANALYZE | P26 | `entropy-report` | Reporte de entropia y perfil. chars, bytes, unique, entropy, estimatedBits y SHA-256. | P26; width=4; rounds=4; PBKDF2=34000 |
| `hcx0521` | CRYPTO | P27 | `sha256-domain` | SHA-256 con dominio aislado. digest SHA-256 de domain \| value. | P27; width=5; rounds=5; PBKDF2=35000 |
| `hcx0522` | CRYPTO | P27 | `hmac-sha256` | Etiqueta HMAC-SHA-256. HMAC local; usa clave opcional o dominio del comando. | P27; width=5; rounds=5; PBKDF2=35000 |
| `hcx0523` | CRYPTO | P27 | `pbkdf2-sha256` | Derivacion PBKDF2-SHA-256. sal local; iteraciones = 8000 + perfil x 1000. | P27; width=5; rounds=5; PBKDF2=35000 |
| `hcx0524` | CRYPTO | P27 | `hkdf-sha256` | Derivacion HKDF-SHA-256. salt local e info HSG2818-HCX-P27. | P27; width=5; rounds=5; PBKDF2=35000 |
| `hcx0525` | CRYPTO | P27 | `hash-chain` | Cadena iterada SHA-256. rondas = 2 + (perfil mod 8). | P27; width=5; rounds=5; PBKDF2=35000 |
| `hcx0526` | CONVERT | P27 | `base64-encode` | Conversion UTF-8 a Base64. conversion reversible; no es cifrado. | P27; width=5; rounds=5; PBKDF2=35000 |
| `hcx0527` | CONVERT | P27 | `base64-decode` | Restauracion Base64 a UTF-8. valida y decodifica Base64. | P27; width=5; rounds=5; PBKDF2=35000 |
| `hcx0528` | CONVERT | P27 | `hex-encode` | Conversion UTF-8 a hexadecimal. conversion reversible; no es cifrado. | P27; width=5; rounds=5; PBKDF2=35000 |
| `hcx0529` | CONVERT | P27 | `hex-decode` | Restauracion hexadecimal a UTF-8. requiere pares completos de bytes. | P27; width=5; rounds=5; PBKDF2=35000 |
| `hcx0530` | CONVERT | P27 | `url-encode` | Codificacion URL component. protege caracteres reservados para transporte. | P27; width=5; rounds=5; PBKDF2=35000 |
| `hcx0531` | CONVERT | P27 | `url-decode` | Restauracion URL component. decodifica transporte URL. | P27; width=5; rounds=5; PBKDF2=35000 |
| `hcx0532` | TRANSFORM | P27 | `rotate-left` | Rotacion determinista a la izquierda. desplazamiento dependiente del perfil. | P27; width=5; rounds=5; PBKDF2=35000 |
| `hcx0533` | TRANSFORM | P27 | `rotate-right` | Rotacion determinista a la derecha. inversa conceptual de rotate-left. | P27; width=5; rounds=5; PBKDF2=35000 |
| `hcx0534` | TRANSFORM | P27 | `xor-mask` | Mascara XOR de laboratorio. salida hexadecimal; reversible con misma mascara. | P27; width=5; rounds=5; PBKDF2=35000 |
| `hcx0535` | TRANSFORM | P27 | `reverse-blocks` | Inversion por bloques. ancho = 4 + (perfil mod 13). | P27; width=5; rounds=5; PBKDF2=35000 |
| `hcx0536` | FORMAT | P27 | `chunk-delimit` | Segmentacion con guiones. ancho = 4 + (perfil mod 13). | P27; width=5; rounds=5; PBKDF2=35000 |
| `hcx0537` | ANALYZE | P27 | `window-sample` | Muestra determinista por ventana. offset guiado por SHA-256 y perfil. | P27; width=5; rounds=5; PBKDF2=35000 |
| `hcx0538` | FORMAT | P27 | `checksum-envelope` | Sobre con integridad SHA-256. domain \| SHA256 \| VALUE. | P27; width=5; rounds=5; PBKDF2=35000 |
| `hcx0539` | FORMAT | P27 | `json-envelope` | Sobre de transporte JSON. incluye dominio, perfil, valor y SHA-256. | P27; width=5; rounds=5; PBKDF2=35000 |
| `hcx0540` | ANALYZE | P27 | `entropy-report` | Reporte de entropia y perfil. chars, bytes, unique, entropy, estimatedBits y SHA-256. | P27; width=5; rounds=5; PBKDF2=35000 |
| `hcx0541` | CRYPTO | P28 | `sha256-domain` | SHA-256 con dominio aislado. digest SHA-256 de domain \| value. | P28; width=6; rounds=6; PBKDF2=36000 |
| `hcx0542` | CRYPTO | P28 | `hmac-sha256` | Etiqueta HMAC-SHA-256. HMAC local; usa clave opcional o dominio del comando. | P28; width=6; rounds=6; PBKDF2=36000 |
| `hcx0543` | CRYPTO | P28 | `pbkdf2-sha256` | Derivacion PBKDF2-SHA-256. sal local; iteraciones = 8000 + perfil x 1000. | P28; width=6; rounds=6; PBKDF2=36000 |
| `hcx0544` | CRYPTO | P28 | `hkdf-sha256` | Derivacion HKDF-SHA-256. salt local e info HSG2818-HCX-P28. | P28; width=6; rounds=6; PBKDF2=36000 |
| `hcx0545` | CRYPTO | P28 | `hash-chain` | Cadena iterada SHA-256. rondas = 2 + (perfil mod 8). | P28; width=6; rounds=6; PBKDF2=36000 |
| `hcx0546` | CONVERT | P28 | `base64-encode` | Conversion UTF-8 a Base64. conversion reversible; no es cifrado. | P28; width=6; rounds=6; PBKDF2=36000 |
| `hcx0547` | CONVERT | P28 | `base64-decode` | Restauracion Base64 a UTF-8. valida y decodifica Base64. | P28; width=6; rounds=6; PBKDF2=36000 |
| `hcx0548` | CONVERT | P28 | `hex-encode` | Conversion UTF-8 a hexadecimal. conversion reversible; no es cifrado. | P28; width=6; rounds=6; PBKDF2=36000 |
| `hcx0549` | CONVERT | P28 | `hex-decode` | Restauracion hexadecimal a UTF-8. requiere pares completos de bytes. | P28; width=6; rounds=6; PBKDF2=36000 |
| `hcx0550` | CONVERT | P28 | `url-encode` | Codificacion URL component. protege caracteres reservados para transporte. | P28; width=6; rounds=6; PBKDF2=36000 |
| `hcx0551` | CONVERT | P28 | `url-decode` | Restauracion URL component. decodifica transporte URL. | P28; width=6; rounds=6; PBKDF2=36000 |
| `hcx0552` | TRANSFORM | P28 | `rotate-left` | Rotacion determinista a la izquierda. desplazamiento dependiente del perfil. | P28; width=6; rounds=6; PBKDF2=36000 |
| `hcx0553` | TRANSFORM | P28 | `rotate-right` | Rotacion determinista a la derecha. inversa conceptual de rotate-left. | P28; width=6; rounds=6; PBKDF2=36000 |
| `hcx0554` | TRANSFORM | P28 | `xor-mask` | Mascara XOR de laboratorio. salida hexadecimal; reversible con misma mascara. | P28; width=6; rounds=6; PBKDF2=36000 |
| `hcx0555` | TRANSFORM | P28 | `reverse-blocks` | Inversion por bloques. ancho = 4 + (perfil mod 13). | P28; width=6; rounds=6; PBKDF2=36000 |
| `hcx0556` | FORMAT | P28 | `chunk-delimit` | Segmentacion con guiones. ancho = 4 + (perfil mod 13). | P28; width=6; rounds=6; PBKDF2=36000 |
| `hcx0557` | ANALYZE | P28 | `window-sample` | Muestra determinista por ventana. offset guiado por SHA-256 y perfil. | P28; width=6; rounds=6; PBKDF2=36000 |
| `hcx0558` | FORMAT | P28 | `checksum-envelope` | Sobre con integridad SHA-256. domain \| SHA256 \| VALUE. | P28; width=6; rounds=6; PBKDF2=36000 |
| `hcx0559` | FORMAT | P28 | `json-envelope` | Sobre de transporte JSON. incluye dominio, perfil, valor y SHA-256. | P28; width=6; rounds=6; PBKDF2=36000 |
| `hcx0560` | ANALYZE | P28 | `entropy-report` | Reporte de entropia y perfil. chars, bytes, unique, entropy, estimatedBits y SHA-256. | P28; width=6; rounds=6; PBKDF2=36000 |
| `hcx0561` | CRYPTO | P29 | `sha256-domain` | SHA-256 con dominio aislado. digest SHA-256 de domain \| value. | P29; width=7; rounds=7; PBKDF2=37000 |
| `hcx0562` | CRYPTO | P29 | `hmac-sha256` | Etiqueta HMAC-SHA-256. HMAC local; usa clave opcional o dominio del comando. | P29; width=7; rounds=7; PBKDF2=37000 |
| `hcx0563` | CRYPTO | P29 | `pbkdf2-sha256` | Derivacion PBKDF2-SHA-256. sal local; iteraciones = 8000 + perfil x 1000. | P29; width=7; rounds=7; PBKDF2=37000 |
| `hcx0564` | CRYPTO | P29 | `hkdf-sha256` | Derivacion HKDF-SHA-256. salt local e info HSG2818-HCX-P29. | P29; width=7; rounds=7; PBKDF2=37000 |
| `hcx0565` | CRYPTO | P29 | `hash-chain` | Cadena iterada SHA-256. rondas = 2 + (perfil mod 8). | P29; width=7; rounds=7; PBKDF2=37000 |
| `hcx0566` | CONVERT | P29 | `base64-encode` | Conversion UTF-8 a Base64. conversion reversible; no es cifrado. | P29; width=7; rounds=7; PBKDF2=37000 |
| `hcx0567` | CONVERT | P29 | `base64-decode` | Restauracion Base64 a UTF-8. valida y decodifica Base64. | P29; width=7; rounds=7; PBKDF2=37000 |
| `hcx0568` | CONVERT | P29 | `hex-encode` | Conversion UTF-8 a hexadecimal. conversion reversible; no es cifrado. | P29; width=7; rounds=7; PBKDF2=37000 |
| `hcx0569` | CONVERT | P29 | `hex-decode` | Restauracion hexadecimal a UTF-8. requiere pares completos de bytes. | P29; width=7; rounds=7; PBKDF2=37000 |
| `hcx0570` | CONVERT | P29 | `url-encode` | Codificacion URL component. protege caracteres reservados para transporte. | P29; width=7; rounds=7; PBKDF2=37000 |
| `hcx0571` | CONVERT | P29 | `url-decode` | Restauracion URL component. decodifica transporte URL. | P29; width=7; rounds=7; PBKDF2=37000 |
| `hcx0572` | TRANSFORM | P29 | `rotate-left` | Rotacion determinista a la izquierda. desplazamiento dependiente del perfil. | P29; width=7; rounds=7; PBKDF2=37000 |
| `hcx0573` | TRANSFORM | P29 | `rotate-right` | Rotacion determinista a la derecha. inversa conceptual de rotate-left. | P29; width=7; rounds=7; PBKDF2=37000 |
| `hcx0574` | TRANSFORM | P29 | `xor-mask` | Mascara XOR de laboratorio. salida hexadecimal; reversible con misma mascara. | P29; width=7; rounds=7; PBKDF2=37000 |
| `hcx0575` | TRANSFORM | P29 | `reverse-blocks` | Inversion por bloques. ancho = 4 + (perfil mod 13). | P29; width=7; rounds=7; PBKDF2=37000 |
| `hcx0576` | FORMAT | P29 | `chunk-delimit` | Segmentacion con guiones. ancho = 4 + (perfil mod 13). | P29; width=7; rounds=7; PBKDF2=37000 |
| `hcx0577` | ANALYZE | P29 | `window-sample` | Muestra determinista por ventana. offset guiado por SHA-256 y perfil. | P29; width=7; rounds=7; PBKDF2=37000 |
| `hcx0578` | FORMAT | P29 | `checksum-envelope` | Sobre con integridad SHA-256. domain \| SHA256 \| VALUE. | P29; width=7; rounds=7; PBKDF2=37000 |
| `hcx0579` | FORMAT | P29 | `json-envelope` | Sobre de transporte JSON. incluye dominio, perfil, valor y SHA-256. | P29; width=7; rounds=7; PBKDF2=37000 |
| `hcx0580` | ANALYZE | P29 | `entropy-report` | Reporte de entropia y perfil. chars, bytes, unique, entropy, estimatedBits y SHA-256. | P29; width=7; rounds=7; PBKDF2=37000 |
| `hcx0581` | CRYPTO | P30 | `sha256-domain` | SHA-256 con dominio aislado. digest SHA-256 de domain \| value. | P30; width=8; rounds=8; PBKDF2=38000 |
| `hcx0582` | CRYPTO | P30 | `hmac-sha256` | Etiqueta HMAC-SHA-256. HMAC local; usa clave opcional o dominio del comando. | P30; width=8; rounds=8; PBKDF2=38000 |
| `hcx0583` | CRYPTO | P30 | `pbkdf2-sha256` | Derivacion PBKDF2-SHA-256. sal local; iteraciones = 8000 + perfil x 1000. | P30; width=8; rounds=8; PBKDF2=38000 |
| `hcx0584` | CRYPTO | P30 | `hkdf-sha256` | Derivacion HKDF-SHA-256. salt local e info HSG2818-HCX-P30. | P30; width=8; rounds=8; PBKDF2=38000 |
| `hcx0585` | CRYPTO | P30 | `hash-chain` | Cadena iterada SHA-256. rondas = 2 + (perfil mod 8). | P30; width=8; rounds=8; PBKDF2=38000 |
| `hcx0586` | CONVERT | P30 | `base64-encode` | Conversion UTF-8 a Base64. conversion reversible; no es cifrado. | P30; width=8; rounds=8; PBKDF2=38000 |
| `hcx0587` | CONVERT | P30 | `base64-decode` | Restauracion Base64 a UTF-8. valida y decodifica Base64. | P30; width=8; rounds=8; PBKDF2=38000 |
| `hcx0588` | CONVERT | P30 | `hex-encode` | Conversion UTF-8 a hexadecimal. conversion reversible; no es cifrado. | P30; width=8; rounds=8; PBKDF2=38000 |
| `hcx0589` | CONVERT | P30 | `hex-decode` | Restauracion hexadecimal a UTF-8. requiere pares completos de bytes. | P30; width=8; rounds=8; PBKDF2=38000 |
| `hcx0590` | CONVERT | P30 | `url-encode` | Codificacion URL component. protege caracteres reservados para transporte. | P30; width=8; rounds=8; PBKDF2=38000 |
| `hcx0591` | CONVERT | P30 | `url-decode` | Restauracion URL component. decodifica transporte URL. | P30; width=8; rounds=8; PBKDF2=38000 |
| `hcx0592` | TRANSFORM | P30 | `rotate-left` | Rotacion determinista a la izquierda. desplazamiento dependiente del perfil. | P30; width=8; rounds=8; PBKDF2=38000 |
| `hcx0593` | TRANSFORM | P30 | `rotate-right` | Rotacion determinista a la derecha. inversa conceptual de rotate-left. | P30; width=8; rounds=8; PBKDF2=38000 |
| `hcx0594` | TRANSFORM | P30 | `xor-mask` | Mascara XOR de laboratorio. salida hexadecimal; reversible con misma mascara. | P30; width=8; rounds=8; PBKDF2=38000 |
| `hcx0595` | TRANSFORM | P30 | `reverse-blocks` | Inversion por bloques. ancho = 4 + (perfil mod 13). | P30; width=8; rounds=8; PBKDF2=38000 |
| `hcx0596` | FORMAT | P30 | `chunk-delimit` | Segmentacion con guiones. ancho = 4 + (perfil mod 13). | P30; width=8; rounds=8; PBKDF2=38000 |
| `hcx0597` | ANALYZE | P30 | `window-sample` | Muestra determinista por ventana. offset guiado por SHA-256 y perfil. | P30; width=8; rounds=8; PBKDF2=38000 |
| `hcx0598` | FORMAT | P30 | `checksum-envelope` | Sobre con integridad SHA-256. domain \| SHA256 \| VALUE. | P30; width=8; rounds=8; PBKDF2=38000 |
| `hcx0599` | FORMAT | P30 | `json-envelope` | Sobre de transporte JSON. incluye dominio, perfil, valor y SHA-256. | P30; width=8; rounds=8; PBKDF2=38000 |
| `hcx0600` | ANALYZE | P30 | `entropy-report` | Reporte de entropia y perfil. chars, bytes, unique, entropy, estimatedBits y SHA-256. | P30; width=8; rounds=8; PBKDF2=38000 |
| `hcx0601` | CRYPTO | P31 | `sha256-domain` | SHA-256 con dominio aislado. digest SHA-256 de domain \| value. | P31; width=9; rounds=9; PBKDF2=39000 |
| `hcx0602` | CRYPTO | P31 | `hmac-sha256` | Etiqueta HMAC-SHA-256. HMAC local; usa clave opcional o dominio del comando. | P31; width=9; rounds=9; PBKDF2=39000 |
| `hcx0603` | CRYPTO | P31 | `pbkdf2-sha256` | Derivacion PBKDF2-SHA-256. sal local; iteraciones = 8000 + perfil x 1000. | P31; width=9; rounds=9; PBKDF2=39000 |
| `hcx0604` | CRYPTO | P31 | `hkdf-sha256` | Derivacion HKDF-SHA-256. salt local e info HSG2818-HCX-P31. | P31; width=9; rounds=9; PBKDF2=39000 |
| `hcx0605` | CRYPTO | P31 | `hash-chain` | Cadena iterada SHA-256. rondas = 2 + (perfil mod 8). | P31; width=9; rounds=9; PBKDF2=39000 |
| `hcx0606` | CONVERT | P31 | `base64-encode` | Conversion UTF-8 a Base64. conversion reversible; no es cifrado. | P31; width=9; rounds=9; PBKDF2=39000 |
| `hcx0607` | CONVERT | P31 | `base64-decode` | Restauracion Base64 a UTF-8. valida y decodifica Base64. | P31; width=9; rounds=9; PBKDF2=39000 |
| `hcx0608` | CONVERT | P31 | `hex-encode` | Conversion UTF-8 a hexadecimal. conversion reversible; no es cifrado. | P31; width=9; rounds=9; PBKDF2=39000 |
| `hcx0609` | CONVERT | P31 | `hex-decode` | Restauracion hexadecimal a UTF-8. requiere pares completos de bytes. | P31; width=9; rounds=9; PBKDF2=39000 |
| `hcx0610` | CONVERT | P31 | `url-encode` | Codificacion URL component. protege caracteres reservados para transporte. | P31; width=9; rounds=9; PBKDF2=39000 |
| `hcx0611` | CONVERT | P31 | `url-decode` | Restauracion URL component. decodifica transporte URL. | P31; width=9; rounds=9; PBKDF2=39000 |
| `hcx0612` | TRANSFORM | P31 | `rotate-left` | Rotacion determinista a la izquierda. desplazamiento dependiente del perfil. | P31; width=9; rounds=9; PBKDF2=39000 |
| `hcx0613` | TRANSFORM | P31 | `rotate-right` | Rotacion determinista a la derecha. inversa conceptual de rotate-left. | P31; width=9; rounds=9; PBKDF2=39000 |
| `hcx0614` | TRANSFORM | P31 | `xor-mask` | Mascara XOR de laboratorio. salida hexadecimal; reversible con misma mascara. | P31; width=9; rounds=9; PBKDF2=39000 |
| `hcx0615` | TRANSFORM | P31 | `reverse-blocks` | Inversion por bloques. ancho = 4 + (perfil mod 13). | P31; width=9; rounds=9; PBKDF2=39000 |
| `hcx0616` | FORMAT | P31 | `chunk-delimit` | Segmentacion con guiones. ancho = 4 + (perfil mod 13). | P31; width=9; rounds=9; PBKDF2=39000 |
| `hcx0617` | ANALYZE | P31 | `window-sample` | Muestra determinista por ventana. offset guiado por SHA-256 y perfil. | P31; width=9; rounds=9; PBKDF2=39000 |
| `hcx0618` | FORMAT | P31 | `checksum-envelope` | Sobre con integridad SHA-256. domain \| SHA256 \| VALUE. | P31; width=9; rounds=9; PBKDF2=39000 |
| `hcx0619` | FORMAT | P31 | `json-envelope` | Sobre de transporte JSON. incluye dominio, perfil, valor y SHA-256. | P31; width=9; rounds=9; PBKDF2=39000 |
| `hcx0620` | ANALYZE | P31 | `entropy-report` | Reporte de entropia y perfil. chars, bytes, unique, entropy, estimatedBits y SHA-256. | P31; width=9; rounds=9; PBKDF2=39000 |
| `hcx0621` | CRYPTO | P32 | `sha256-domain` | SHA-256 con dominio aislado. digest SHA-256 de domain \| value. | P32; width=10; rounds=2; PBKDF2=40000 |
| `hcx0622` | CRYPTO | P32 | `hmac-sha256` | Etiqueta HMAC-SHA-256. HMAC local; usa clave opcional o dominio del comando. | P32; width=10; rounds=2; PBKDF2=40000 |
| `hcx0623` | CRYPTO | P32 | `pbkdf2-sha256` | Derivacion PBKDF2-SHA-256. sal local; iteraciones = 8000 + perfil x 1000. | P32; width=10; rounds=2; PBKDF2=40000 |
| `hcx0624` | CRYPTO | P32 | `hkdf-sha256` | Derivacion HKDF-SHA-256. salt local e info HSG2818-HCX-P32. | P32; width=10; rounds=2; PBKDF2=40000 |
| `hcx0625` | CRYPTO | P32 | `hash-chain` | Cadena iterada SHA-256. rondas = 2 + (perfil mod 8). | P32; width=10; rounds=2; PBKDF2=40000 |
| `hcx0626` | CONVERT | P32 | `base64-encode` | Conversion UTF-8 a Base64. conversion reversible; no es cifrado. | P32; width=10; rounds=2; PBKDF2=40000 |
| `hcx0627` | CONVERT | P32 | `base64-decode` | Restauracion Base64 a UTF-8. valida y decodifica Base64. | P32; width=10; rounds=2; PBKDF2=40000 |
| `hcx0628` | CONVERT | P32 | `hex-encode` | Conversion UTF-8 a hexadecimal. conversion reversible; no es cifrado. | P32; width=10; rounds=2; PBKDF2=40000 |
| `hcx0629` | CONVERT | P32 | `hex-decode` | Restauracion hexadecimal a UTF-8. requiere pares completos de bytes. | P32; width=10; rounds=2; PBKDF2=40000 |
| `hcx0630` | CONVERT | P32 | `url-encode` | Codificacion URL component. protege caracteres reservados para transporte. | P32; width=10; rounds=2; PBKDF2=40000 |
| `hcx0631` | CONVERT | P32 | `url-decode` | Restauracion URL component. decodifica transporte URL. | P32; width=10; rounds=2; PBKDF2=40000 |
| `hcx0632` | TRANSFORM | P32 | `rotate-left` | Rotacion determinista a la izquierda. desplazamiento dependiente del perfil. | P32; width=10; rounds=2; PBKDF2=40000 |
| `hcx0633` | TRANSFORM | P32 | `rotate-right` | Rotacion determinista a la derecha. inversa conceptual de rotate-left. | P32; width=10; rounds=2; PBKDF2=40000 |
| `hcx0634` | TRANSFORM | P32 | `xor-mask` | Mascara XOR de laboratorio. salida hexadecimal; reversible con misma mascara. | P32; width=10; rounds=2; PBKDF2=40000 |
| `hcx0635` | TRANSFORM | P32 | `reverse-blocks` | Inversion por bloques. ancho = 4 + (perfil mod 13). | P32; width=10; rounds=2; PBKDF2=40000 |
| `hcx0636` | FORMAT | P32 | `chunk-delimit` | Segmentacion con guiones. ancho = 4 + (perfil mod 13). | P32; width=10; rounds=2; PBKDF2=40000 |
| `hcx0637` | ANALYZE | P32 | `window-sample` | Muestra determinista por ventana. offset guiado por SHA-256 y perfil. | P32; width=10; rounds=2; PBKDF2=40000 |
| `hcx0638` | FORMAT | P32 | `checksum-envelope` | Sobre con integridad SHA-256. domain \| SHA256 \| VALUE. | P32; width=10; rounds=2; PBKDF2=40000 |
| `hcx0639` | FORMAT | P32 | `json-envelope` | Sobre de transporte JSON. incluye dominio, perfil, valor y SHA-256. | P32; width=10; rounds=2; PBKDF2=40000 |
| `hcx0640` | ANALYZE | P32 | `entropy-report` | Reporte de entropia y perfil. chars, bytes, unique, entropy, estimatedBits y SHA-256. | P32; width=10; rounds=2; PBKDF2=40000 |
| `hcx0641` | CRYPTO | P33 | `sha256-domain` | SHA-256 con dominio aislado. digest SHA-256 de domain \| value. | P33; width=11; rounds=3; PBKDF2=41000 |
| `hcx0642` | CRYPTO | P33 | `hmac-sha256` | Etiqueta HMAC-SHA-256. HMAC local; usa clave opcional o dominio del comando. | P33; width=11; rounds=3; PBKDF2=41000 |
| `hcx0643` | CRYPTO | P33 | `pbkdf2-sha256` | Derivacion PBKDF2-SHA-256. sal local; iteraciones = 8000 + perfil x 1000. | P33; width=11; rounds=3; PBKDF2=41000 |
| `hcx0644` | CRYPTO | P33 | `hkdf-sha256` | Derivacion HKDF-SHA-256. salt local e info HSG2818-HCX-P33. | P33; width=11; rounds=3; PBKDF2=41000 |
| `hcx0645` | CRYPTO | P33 | `hash-chain` | Cadena iterada SHA-256. rondas = 2 + (perfil mod 8). | P33; width=11; rounds=3; PBKDF2=41000 |
| `hcx0646` | CONVERT | P33 | `base64-encode` | Conversion UTF-8 a Base64. conversion reversible; no es cifrado. | P33; width=11; rounds=3; PBKDF2=41000 |
| `hcx0647` | CONVERT | P33 | `base64-decode` | Restauracion Base64 a UTF-8. valida y decodifica Base64. | P33; width=11; rounds=3; PBKDF2=41000 |
| `hcx0648` | CONVERT | P33 | `hex-encode` | Conversion UTF-8 a hexadecimal. conversion reversible; no es cifrado. | P33; width=11; rounds=3; PBKDF2=41000 |
| `hcx0649` | CONVERT | P33 | `hex-decode` | Restauracion hexadecimal a UTF-8. requiere pares completos de bytes. | P33; width=11; rounds=3; PBKDF2=41000 |
| `hcx0650` | CONVERT | P33 | `url-encode` | Codificacion URL component. protege caracteres reservados para transporte. | P33; width=11; rounds=3; PBKDF2=41000 |
| `hcx0651` | CONVERT | P33 | `url-decode` | Restauracion URL component. decodifica transporte URL. | P33; width=11; rounds=3; PBKDF2=41000 |
| `hcx0652` | TRANSFORM | P33 | `rotate-left` | Rotacion determinista a la izquierda. desplazamiento dependiente del perfil. | P33; width=11; rounds=3; PBKDF2=41000 |
| `hcx0653` | TRANSFORM | P33 | `rotate-right` | Rotacion determinista a la derecha. inversa conceptual de rotate-left. | P33; width=11; rounds=3; PBKDF2=41000 |
| `hcx0654` | TRANSFORM | P33 | `xor-mask` | Mascara XOR de laboratorio. salida hexadecimal; reversible con misma mascara. | P33; width=11; rounds=3; PBKDF2=41000 |
| `hcx0655` | TRANSFORM | P33 | `reverse-blocks` | Inversion por bloques. ancho = 4 + (perfil mod 13). | P33; width=11; rounds=3; PBKDF2=41000 |
| `hcx0656` | FORMAT | P33 | `chunk-delimit` | Segmentacion con guiones. ancho = 4 + (perfil mod 13). | P33; width=11; rounds=3; PBKDF2=41000 |
| `hcx0657` | ANALYZE | P33 | `window-sample` | Muestra determinista por ventana. offset guiado por SHA-256 y perfil. | P33; width=11; rounds=3; PBKDF2=41000 |
| `hcx0658` | FORMAT | P33 | `checksum-envelope` | Sobre con integridad SHA-256. domain \| SHA256 \| VALUE. | P33; width=11; rounds=3; PBKDF2=41000 |
| `hcx0659` | FORMAT | P33 | `json-envelope` | Sobre de transporte JSON. incluye dominio, perfil, valor y SHA-256. | P33; width=11; rounds=3; PBKDF2=41000 |
| `hcx0660` | ANALYZE | P33 | `entropy-report` | Reporte de entropia y perfil. chars, bytes, unique, entropy, estimatedBits y SHA-256. | P33; width=11; rounds=3; PBKDF2=41000 |
| `hcx0661` | CRYPTO | P34 | `sha256-domain` | SHA-256 con dominio aislado. digest SHA-256 de domain \| value. | P34; width=12; rounds=4; PBKDF2=42000 |
| `hcx0662` | CRYPTO | P34 | `hmac-sha256` | Etiqueta HMAC-SHA-256. HMAC local; usa clave opcional o dominio del comando. | P34; width=12; rounds=4; PBKDF2=42000 |
| `hcx0663` | CRYPTO | P34 | `pbkdf2-sha256` | Derivacion PBKDF2-SHA-256. sal local; iteraciones = 8000 + perfil x 1000. | P34; width=12; rounds=4; PBKDF2=42000 |
| `hcx0664` | CRYPTO | P34 | `hkdf-sha256` | Derivacion HKDF-SHA-256. salt local e info HSG2818-HCX-P34. | P34; width=12; rounds=4; PBKDF2=42000 |
| `hcx0665` | CRYPTO | P34 | `hash-chain` | Cadena iterada SHA-256. rondas = 2 + (perfil mod 8). | P34; width=12; rounds=4; PBKDF2=42000 |
| `hcx0666` | CONVERT | P34 | `base64-encode` | Conversion UTF-8 a Base64. conversion reversible; no es cifrado. | P34; width=12; rounds=4; PBKDF2=42000 |
| `hcx0667` | CONVERT | P34 | `base64-decode` | Restauracion Base64 a UTF-8. valida y decodifica Base64. | P34; width=12; rounds=4; PBKDF2=42000 |
| `hcx0668` | CONVERT | P34 | `hex-encode` | Conversion UTF-8 a hexadecimal. conversion reversible; no es cifrado. | P34; width=12; rounds=4; PBKDF2=42000 |
| `hcx0669` | CONVERT | P34 | `hex-decode` | Restauracion hexadecimal a UTF-8. requiere pares completos de bytes. | P34; width=12; rounds=4; PBKDF2=42000 |
| `hcx0670` | CONVERT | P34 | `url-encode` | Codificacion URL component. protege caracteres reservados para transporte. | P34; width=12; rounds=4; PBKDF2=42000 |
| `hcx0671` | CONVERT | P34 | `url-decode` | Restauracion URL component. decodifica transporte URL. | P34; width=12; rounds=4; PBKDF2=42000 |
| `hcx0672` | TRANSFORM | P34 | `rotate-left` | Rotacion determinista a la izquierda. desplazamiento dependiente del perfil. | P34; width=12; rounds=4; PBKDF2=42000 |
| `hcx0673` | TRANSFORM | P34 | `rotate-right` | Rotacion determinista a la derecha. inversa conceptual de rotate-left. | P34; width=12; rounds=4; PBKDF2=42000 |
| `hcx0674` | TRANSFORM | P34 | `xor-mask` | Mascara XOR de laboratorio. salida hexadecimal; reversible con misma mascara. | P34; width=12; rounds=4; PBKDF2=42000 |
| `hcx0675` | TRANSFORM | P34 | `reverse-blocks` | Inversion por bloques. ancho = 4 + (perfil mod 13). | P34; width=12; rounds=4; PBKDF2=42000 |
| `hcx0676` | FORMAT | P34 | `chunk-delimit` | Segmentacion con guiones. ancho = 4 + (perfil mod 13). | P34; width=12; rounds=4; PBKDF2=42000 |
| `hcx0677` | ANALYZE | P34 | `window-sample` | Muestra determinista por ventana. offset guiado por SHA-256 y perfil. | P34; width=12; rounds=4; PBKDF2=42000 |
| `hcx0678` | FORMAT | P34 | `checksum-envelope` | Sobre con integridad SHA-256. domain \| SHA256 \| VALUE. | P34; width=12; rounds=4; PBKDF2=42000 |
| `hcx0679` | FORMAT | P34 | `json-envelope` | Sobre de transporte JSON. incluye dominio, perfil, valor y SHA-256. | P34; width=12; rounds=4; PBKDF2=42000 |
| `hcx0680` | ANALYZE | P34 | `entropy-report` | Reporte de entropia y perfil. chars, bytes, unique, entropy, estimatedBits y SHA-256. | P34; width=12; rounds=4; PBKDF2=42000 |
| `hcx0681` | CRYPTO | P35 | `sha256-domain` | SHA-256 con dominio aislado. digest SHA-256 de domain \| value. | P35; width=13; rounds=5; PBKDF2=43000 |
| `hcx0682` | CRYPTO | P35 | `hmac-sha256` | Etiqueta HMAC-SHA-256. HMAC local; usa clave opcional o dominio del comando. | P35; width=13; rounds=5; PBKDF2=43000 |
| `hcx0683` | CRYPTO | P35 | `pbkdf2-sha256` | Derivacion PBKDF2-SHA-256. sal local; iteraciones = 8000 + perfil x 1000. | P35; width=13; rounds=5; PBKDF2=43000 |
| `hcx0684` | CRYPTO | P35 | `hkdf-sha256` | Derivacion HKDF-SHA-256. salt local e info HSG2818-HCX-P35. | P35; width=13; rounds=5; PBKDF2=43000 |
| `hcx0685` | CRYPTO | P35 | `hash-chain` | Cadena iterada SHA-256. rondas = 2 + (perfil mod 8). | P35; width=13; rounds=5; PBKDF2=43000 |
| `hcx0686` | CONVERT | P35 | `base64-encode` | Conversion UTF-8 a Base64. conversion reversible; no es cifrado. | P35; width=13; rounds=5; PBKDF2=43000 |
| `hcx0687` | CONVERT | P35 | `base64-decode` | Restauracion Base64 a UTF-8. valida y decodifica Base64. | P35; width=13; rounds=5; PBKDF2=43000 |
| `hcx0688` | CONVERT | P35 | `hex-encode` | Conversion UTF-8 a hexadecimal. conversion reversible; no es cifrado. | P35; width=13; rounds=5; PBKDF2=43000 |
| `hcx0689` | CONVERT | P35 | `hex-decode` | Restauracion hexadecimal a UTF-8. requiere pares completos de bytes. | P35; width=13; rounds=5; PBKDF2=43000 |
| `hcx0690` | CONVERT | P35 | `url-encode` | Codificacion URL component. protege caracteres reservados para transporte. | P35; width=13; rounds=5; PBKDF2=43000 |
| `hcx0691` | CONVERT | P35 | `url-decode` | Restauracion URL component. decodifica transporte URL. | P35; width=13; rounds=5; PBKDF2=43000 |
| `hcx0692` | TRANSFORM | P35 | `rotate-left` | Rotacion determinista a la izquierda. desplazamiento dependiente del perfil. | P35; width=13; rounds=5; PBKDF2=43000 |
| `hcx0693` | TRANSFORM | P35 | `rotate-right` | Rotacion determinista a la derecha. inversa conceptual de rotate-left. | P35; width=13; rounds=5; PBKDF2=43000 |
| `hcx0694` | TRANSFORM | P35 | `xor-mask` | Mascara XOR de laboratorio. salida hexadecimal; reversible con misma mascara. | P35; width=13; rounds=5; PBKDF2=43000 |
| `hcx0695` | TRANSFORM | P35 | `reverse-blocks` | Inversion por bloques. ancho = 4 + (perfil mod 13). | P35; width=13; rounds=5; PBKDF2=43000 |
| `hcx0696` | FORMAT | P35 | `chunk-delimit` | Segmentacion con guiones. ancho = 4 + (perfil mod 13). | P35; width=13; rounds=5; PBKDF2=43000 |
| `hcx0697` | ANALYZE | P35 | `window-sample` | Muestra determinista por ventana. offset guiado por SHA-256 y perfil. | P35; width=13; rounds=5; PBKDF2=43000 |
| `hcx0698` | FORMAT | P35 | `checksum-envelope` | Sobre con integridad SHA-256. domain \| SHA256 \| VALUE. | P35; width=13; rounds=5; PBKDF2=43000 |
| `hcx0699` | FORMAT | P35 | `json-envelope` | Sobre de transporte JSON. incluye dominio, perfil, valor y SHA-256. | P35; width=13; rounds=5; PBKDF2=43000 |
| `hcx0700` | ANALYZE | P35 | `entropy-report` | Reporte de entropia y perfil. chars, bytes, unique, entropy, estimatedBits y SHA-256. | P35; width=13; rounds=5; PBKDF2=43000 |
| `hcx0701` | CRYPTO | P36 | `sha256-domain` | SHA-256 con dominio aislado. digest SHA-256 de domain \| value. | P36; width=14; rounds=6; PBKDF2=44000 |
| `hcx0702` | CRYPTO | P36 | `hmac-sha256` | Etiqueta HMAC-SHA-256. HMAC local; usa clave opcional o dominio del comando. | P36; width=14; rounds=6; PBKDF2=44000 |
| `hcx0703` | CRYPTO | P36 | `pbkdf2-sha256` | Derivacion PBKDF2-SHA-256. sal local; iteraciones = 8000 + perfil x 1000. | P36; width=14; rounds=6; PBKDF2=44000 |
| `hcx0704` | CRYPTO | P36 | `hkdf-sha256` | Derivacion HKDF-SHA-256. salt local e info HSG2818-HCX-P36. | P36; width=14; rounds=6; PBKDF2=44000 |
| `hcx0705` | CRYPTO | P36 | `hash-chain` | Cadena iterada SHA-256. rondas = 2 + (perfil mod 8). | P36; width=14; rounds=6; PBKDF2=44000 |
| `hcx0706` | CONVERT | P36 | `base64-encode` | Conversion UTF-8 a Base64. conversion reversible; no es cifrado. | P36; width=14; rounds=6; PBKDF2=44000 |
| `hcx0707` | CONVERT | P36 | `base64-decode` | Restauracion Base64 a UTF-8. valida y decodifica Base64. | P36; width=14; rounds=6; PBKDF2=44000 |
| `hcx0708` | CONVERT | P36 | `hex-encode` | Conversion UTF-8 a hexadecimal. conversion reversible; no es cifrado. | P36; width=14; rounds=6; PBKDF2=44000 |
| `hcx0709` | CONVERT | P36 | `hex-decode` | Restauracion hexadecimal a UTF-8. requiere pares completos de bytes. | P36; width=14; rounds=6; PBKDF2=44000 |
| `hcx0710` | CONVERT | P36 | `url-encode` | Codificacion URL component. protege caracteres reservados para transporte. | P36; width=14; rounds=6; PBKDF2=44000 |
| `hcx0711` | CONVERT | P36 | `url-decode` | Restauracion URL component. decodifica transporte URL. | P36; width=14; rounds=6; PBKDF2=44000 |
| `hcx0712` | TRANSFORM | P36 | `rotate-left` | Rotacion determinista a la izquierda. desplazamiento dependiente del perfil. | P36; width=14; rounds=6; PBKDF2=44000 |
| `hcx0713` | TRANSFORM | P36 | `rotate-right` | Rotacion determinista a la derecha. inversa conceptual de rotate-left. | P36; width=14; rounds=6; PBKDF2=44000 |
| `hcx0714` | TRANSFORM | P36 | `xor-mask` | Mascara XOR de laboratorio. salida hexadecimal; reversible con misma mascara. | P36; width=14; rounds=6; PBKDF2=44000 |
| `hcx0715` | TRANSFORM | P36 | `reverse-blocks` | Inversion por bloques. ancho = 4 + (perfil mod 13). | P36; width=14; rounds=6; PBKDF2=44000 |
| `hcx0716` | FORMAT | P36 | `chunk-delimit` | Segmentacion con guiones. ancho = 4 + (perfil mod 13). | P36; width=14; rounds=6; PBKDF2=44000 |
| `hcx0717` | ANALYZE | P36 | `window-sample` | Muestra determinista por ventana. offset guiado por SHA-256 y perfil. | P36; width=14; rounds=6; PBKDF2=44000 |
| `hcx0718` | FORMAT | P36 | `checksum-envelope` | Sobre con integridad SHA-256. domain \| SHA256 \| VALUE. | P36; width=14; rounds=6; PBKDF2=44000 |
| `hcx0719` | FORMAT | P36 | `json-envelope` | Sobre de transporte JSON. incluye dominio, perfil, valor y SHA-256. | P36; width=14; rounds=6; PBKDF2=44000 |
| `hcx0720` | ANALYZE | P36 | `entropy-report` | Reporte de entropia y perfil. chars, bytes, unique, entropy, estimatedBits y SHA-256. | P36; width=14; rounds=6; PBKDF2=44000 |
| `hcx0721` | CRYPTO | P37 | `sha256-domain` | SHA-256 con dominio aislado. digest SHA-256 de domain \| value. | P37; width=15; rounds=7; PBKDF2=45000 |
| `hcx0722` | CRYPTO | P37 | `hmac-sha256` | Etiqueta HMAC-SHA-256. HMAC local; usa clave opcional o dominio del comando. | P37; width=15; rounds=7; PBKDF2=45000 |
| `hcx0723` | CRYPTO | P37 | `pbkdf2-sha256` | Derivacion PBKDF2-SHA-256. sal local; iteraciones = 8000 + perfil x 1000. | P37; width=15; rounds=7; PBKDF2=45000 |
| `hcx0724` | CRYPTO | P37 | `hkdf-sha256` | Derivacion HKDF-SHA-256. salt local e info HSG2818-HCX-P37. | P37; width=15; rounds=7; PBKDF2=45000 |
| `hcx0725` | CRYPTO | P37 | `hash-chain` | Cadena iterada SHA-256. rondas = 2 + (perfil mod 8). | P37; width=15; rounds=7; PBKDF2=45000 |
| `hcx0726` | CONVERT | P37 | `base64-encode` | Conversion UTF-8 a Base64. conversion reversible; no es cifrado. | P37; width=15; rounds=7; PBKDF2=45000 |
| `hcx0727` | CONVERT | P37 | `base64-decode` | Restauracion Base64 a UTF-8. valida y decodifica Base64. | P37; width=15; rounds=7; PBKDF2=45000 |
| `hcx0728` | CONVERT | P37 | `hex-encode` | Conversion UTF-8 a hexadecimal. conversion reversible; no es cifrado. | P37; width=15; rounds=7; PBKDF2=45000 |
| `hcx0729` | CONVERT | P37 | `hex-decode` | Restauracion hexadecimal a UTF-8. requiere pares completos de bytes. | P37; width=15; rounds=7; PBKDF2=45000 |
| `hcx0730` | CONVERT | P37 | `url-encode` | Codificacion URL component. protege caracteres reservados para transporte. | P37; width=15; rounds=7; PBKDF2=45000 |
| `hcx0731` | CONVERT | P37 | `url-decode` | Restauracion URL component. decodifica transporte URL. | P37; width=15; rounds=7; PBKDF2=45000 |
| `hcx0732` | TRANSFORM | P37 | `rotate-left` | Rotacion determinista a la izquierda. desplazamiento dependiente del perfil. | P37; width=15; rounds=7; PBKDF2=45000 |
| `hcx0733` | TRANSFORM | P37 | `rotate-right` | Rotacion determinista a la derecha. inversa conceptual de rotate-left. | P37; width=15; rounds=7; PBKDF2=45000 |
| `hcx0734` | TRANSFORM | P37 | `xor-mask` | Mascara XOR de laboratorio. salida hexadecimal; reversible con misma mascara. | P37; width=15; rounds=7; PBKDF2=45000 |
| `hcx0735` | TRANSFORM | P37 | `reverse-blocks` | Inversion por bloques. ancho = 4 + (perfil mod 13). | P37; width=15; rounds=7; PBKDF2=45000 |
| `hcx0736` | FORMAT | P37 | `chunk-delimit` | Segmentacion con guiones. ancho = 4 + (perfil mod 13). | P37; width=15; rounds=7; PBKDF2=45000 |
| `hcx0737` | ANALYZE | P37 | `window-sample` | Muestra determinista por ventana. offset guiado por SHA-256 y perfil. | P37; width=15; rounds=7; PBKDF2=45000 |
| `hcx0738` | FORMAT | P37 | `checksum-envelope` | Sobre con integridad SHA-256. domain \| SHA256 \| VALUE. | P37; width=15; rounds=7; PBKDF2=45000 |
| `hcx0739` | FORMAT | P37 | `json-envelope` | Sobre de transporte JSON. incluye dominio, perfil, valor y SHA-256. | P37; width=15; rounds=7; PBKDF2=45000 |
| `hcx0740` | ANALYZE | P37 | `entropy-report` | Reporte de entropia y perfil. chars, bytes, unique, entropy, estimatedBits y SHA-256. | P37; width=15; rounds=7; PBKDF2=45000 |
| `hcx0741` | CRYPTO | P38 | `sha256-domain` | SHA-256 con dominio aislado. digest SHA-256 de domain \| value. | P38; width=16; rounds=8; PBKDF2=46000 |
| `hcx0742` | CRYPTO | P38 | `hmac-sha256` | Etiqueta HMAC-SHA-256. HMAC local; usa clave opcional o dominio del comando. | P38; width=16; rounds=8; PBKDF2=46000 |
| `hcx0743` | CRYPTO | P38 | `pbkdf2-sha256` | Derivacion PBKDF2-SHA-256. sal local; iteraciones = 8000 + perfil x 1000. | P38; width=16; rounds=8; PBKDF2=46000 |
| `hcx0744` | CRYPTO | P38 | `hkdf-sha256` | Derivacion HKDF-SHA-256. salt local e info HSG2818-HCX-P38. | P38; width=16; rounds=8; PBKDF2=46000 |
| `hcx0745` | CRYPTO | P38 | `hash-chain` | Cadena iterada SHA-256. rondas = 2 + (perfil mod 8). | P38; width=16; rounds=8; PBKDF2=46000 |
| `hcx0746` | CONVERT | P38 | `base64-encode` | Conversion UTF-8 a Base64. conversion reversible; no es cifrado. | P38; width=16; rounds=8; PBKDF2=46000 |
| `hcx0747` | CONVERT | P38 | `base64-decode` | Restauracion Base64 a UTF-8. valida y decodifica Base64. | P38; width=16; rounds=8; PBKDF2=46000 |
| `hcx0748` | CONVERT | P38 | `hex-encode` | Conversion UTF-8 a hexadecimal. conversion reversible; no es cifrado. | P38; width=16; rounds=8; PBKDF2=46000 |
| `hcx0749` | CONVERT | P38 | `hex-decode` | Restauracion hexadecimal a UTF-8. requiere pares completos de bytes. | P38; width=16; rounds=8; PBKDF2=46000 |
| `hcx0750` | CONVERT | P38 | `url-encode` | Codificacion URL component. protege caracteres reservados para transporte. | P38; width=16; rounds=8; PBKDF2=46000 |
| `hcx0751` | CONVERT | P38 | `url-decode` | Restauracion URL component. decodifica transporte URL. | P38; width=16; rounds=8; PBKDF2=46000 |
| `hcx0752` | TRANSFORM | P38 | `rotate-left` | Rotacion determinista a la izquierda. desplazamiento dependiente del perfil. | P38; width=16; rounds=8; PBKDF2=46000 |
| `hcx0753` | TRANSFORM | P38 | `rotate-right` | Rotacion determinista a la derecha. inversa conceptual de rotate-left. | P38; width=16; rounds=8; PBKDF2=46000 |
| `hcx0754` | TRANSFORM | P38 | `xor-mask` | Mascara XOR de laboratorio. salida hexadecimal; reversible con misma mascara. | P38; width=16; rounds=8; PBKDF2=46000 |
| `hcx0755` | TRANSFORM | P38 | `reverse-blocks` | Inversion por bloques. ancho = 4 + (perfil mod 13). | P38; width=16; rounds=8; PBKDF2=46000 |
| `hcx0756` | FORMAT | P38 | `chunk-delimit` | Segmentacion con guiones. ancho = 4 + (perfil mod 13). | P38; width=16; rounds=8; PBKDF2=46000 |
| `hcx0757` | ANALYZE | P38 | `window-sample` | Muestra determinista por ventana. offset guiado por SHA-256 y perfil. | P38; width=16; rounds=8; PBKDF2=46000 |
| `hcx0758` | FORMAT | P38 | `checksum-envelope` | Sobre con integridad SHA-256. domain \| SHA256 \| VALUE. | P38; width=16; rounds=8; PBKDF2=46000 |
| `hcx0759` | FORMAT | P38 | `json-envelope` | Sobre de transporte JSON. incluye dominio, perfil, valor y SHA-256. | P38; width=16; rounds=8; PBKDF2=46000 |
| `hcx0760` | ANALYZE | P38 | `entropy-report` | Reporte de entropia y perfil. chars, bytes, unique, entropy, estimatedBits y SHA-256. | P38; width=16; rounds=8; PBKDF2=46000 |
| `hcx0761` | CRYPTO | P39 | `sha256-domain` | SHA-256 con dominio aislado. digest SHA-256 de domain \| value. | P39; width=4; rounds=9; PBKDF2=47000 |
| `hcx0762` | CRYPTO | P39 | `hmac-sha256` | Etiqueta HMAC-SHA-256. HMAC local; usa clave opcional o dominio del comando. | P39; width=4; rounds=9; PBKDF2=47000 |
| `hcx0763` | CRYPTO | P39 | `pbkdf2-sha256` | Derivacion PBKDF2-SHA-256. sal local; iteraciones = 8000 + perfil x 1000. | P39; width=4; rounds=9; PBKDF2=47000 |
| `hcx0764` | CRYPTO | P39 | `hkdf-sha256` | Derivacion HKDF-SHA-256. salt local e info HSG2818-HCX-P39. | P39; width=4; rounds=9; PBKDF2=47000 |
| `hcx0765` | CRYPTO | P39 | `hash-chain` | Cadena iterada SHA-256. rondas = 2 + (perfil mod 8). | P39; width=4; rounds=9; PBKDF2=47000 |
| `hcx0766` | CONVERT | P39 | `base64-encode` | Conversion UTF-8 a Base64. conversion reversible; no es cifrado. | P39; width=4; rounds=9; PBKDF2=47000 |
| `hcx0767` | CONVERT | P39 | `base64-decode` | Restauracion Base64 a UTF-8. valida y decodifica Base64. | P39; width=4; rounds=9; PBKDF2=47000 |
| `hcx0768` | CONVERT | P39 | `hex-encode` | Conversion UTF-8 a hexadecimal. conversion reversible; no es cifrado. | P39; width=4; rounds=9; PBKDF2=47000 |
| `hcx0769` | CONVERT | P39 | `hex-decode` | Restauracion hexadecimal a UTF-8. requiere pares completos de bytes. | P39; width=4; rounds=9; PBKDF2=47000 |
| `hcx0770` | CONVERT | P39 | `url-encode` | Codificacion URL component. protege caracteres reservados para transporte. | P39; width=4; rounds=9; PBKDF2=47000 |
| `hcx0771` | CONVERT | P39 | `url-decode` | Restauracion URL component. decodifica transporte URL. | P39; width=4; rounds=9; PBKDF2=47000 |
| `hcx0772` | TRANSFORM | P39 | `rotate-left` | Rotacion determinista a la izquierda. desplazamiento dependiente del perfil. | P39; width=4; rounds=9; PBKDF2=47000 |
| `hcx0773` | TRANSFORM | P39 | `rotate-right` | Rotacion determinista a la derecha. inversa conceptual de rotate-left. | P39; width=4; rounds=9; PBKDF2=47000 |
| `hcx0774` | TRANSFORM | P39 | `xor-mask` | Mascara XOR de laboratorio. salida hexadecimal; reversible con misma mascara. | P39; width=4; rounds=9; PBKDF2=47000 |
| `hcx0775` | TRANSFORM | P39 | `reverse-blocks` | Inversion por bloques. ancho = 4 + (perfil mod 13). | P39; width=4; rounds=9; PBKDF2=47000 |
| `hcx0776` | FORMAT | P39 | `chunk-delimit` | Segmentacion con guiones. ancho = 4 + (perfil mod 13). | P39; width=4; rounds=9; PBKDF2=47000 |
| `hcx0777` | ANALYZE | P39 | `window-sample` | Muestra determinista por ventana. offset guiado por SHA-256 y perfil. | P39; width=4; rounds=9; PBKDF2=47000 |
| `hcx0778` | FORMAT | P39 | `checksum-envelope` | Sobre con integridad SHA-256. domain \| SHA256 \| VALUE. | P39; width=4; rounds=9; PBKDF2=47000 |
| `hcx0779` | FORMAT | P39 | `json-envelope` | Sobre de transporte JSON. incluye dominio, perfil, valor y SHA-256. | P39; width=4; rounds=9; PBKDF2=47000 |
| `hcx0780` | ANALYZE | P39 | `entropy-report` | Reporte de entropia y perfil. chars, bytes, unique, entropy, estimatedBits y SHA-256. | P39; width=4; rounds=9; PBKDF2=47000 |
| `hcx0781` | CRYPTO | P40 | `sha256-domain` | SHA-256 con dominio aislado. digest SHA-256 de domain \| value. | P40; width=5; rounds=2; PBKDF2=48000 |
| `hcx0782` | CRYPTO | P40 | `hmac-sha256` | Etiqueta HMAC-SHA-256. HMAC local; usa clave opcional o dominio del comando. | P40; width=5; rounds=2; PBKDF2=48000 |
| `hcx0783` | CRYPTO | P40 | `pbkdf2-sha256` | Derivacion PBKDF2-SHA-256. sal local; iteraciones = 8000 + perfil x 1000. | P40; width=5; rounds=2; PBKDF2=48000 |
| `hcx0784` | CRYPTO | P40 | `hkdf-sha256` | Derivacion HKDF-SHA-256. salt local e info HSG2818-HCX-P40. | P40; width=5; rounds=2; PBKDF2=48000 |
| `hcx0785` | CRYPTO | P40 | `hash-chain` | Cadena iterada SHA-256. rondas = 2 + (perfil mod 8). | P40; width=5; rounds=2; PBKDF2=48000 |
| `hcx0786` | CONVERT | P40 | `base64-encode` | Conversion UTF-8 a Base64. conversion reversible; no es cifrado. | P40; width=5; rounds=2; PBKDF2=48000 |
| `hcx0787` | CONVERT | P40 | `base64-decode` | Restauracion Base64 a UTF-8. valida y decodifica Base64. | P40; width=5; rounds=2; PBKDF2=48000 |
| `hcx0788` | CONVERT | P40 | `hex-encode` | Conversion UTF-8 a hexadecimal. conversion reversible; no es cifrado. | P40; width=5; rounds=2; PBKDF2=48000 |
| `hcx0789` | CONVERT | P40 | `hex-decode` | Restauracion hexadecimal a UTF-8. requiere pares completos de bytes. | P40; width=5; rounds=2; PBKDF2=48000 |
| `hcx0790` | CONVERT | P40 | `url-encode` | Codificacion URL component. protege caracteres reservados para transporte. | P40; width=5; rounds=2; PBKDF2=48000 |
| `hcx0791` | CONVERT | P40 | `url-decode` | Restauracion URL component. decodifica transporte URL. | P40; width=5; rounds=2; PBKDF2=48000 |
| `hcx0792` | TRANSFORM | P40 | `rotate-left` | Rotacion determinista a la izquierda. desplazamiento dependiente del perfil. | P40; width=5; rounds=2; PBKDF2=48000 |
| `hcx0793` | TRANSFORM | P40 | `rotate-right` | Rotacion determinista a la derecha. inversa conceptual de rotate-left. | P40; width=5; rounds=2; PBKDF2=48000 |
| `hcx0794` | TRANSFORM | P40 | `xor-mask` | Mascara XOR de laboratorio. salida hexadecimal; reversible con misma mascara. | P40; width=5; rounds=2; PBKDF2=48000 |
| `hcx0795` | TRANSFORM | P40 | `reverse-blocks` | Inversion por bloques. ancho = 4 + (perfil mod 13). | P40; width=5; rounds=2; PBKDF2=48000 |
| `hcx0796` | FORMAT | P40 | `chunk-delimit` | Segmentacion con guiones. ancho = 4 + (perfil mod 13). | P40; width=5; rounds=2; PBKDF2=48000 |
| `hcx0797` | ANALYZE | P40 | `window-sample` | Muestra determinista por ventana. offset guiado por SHA-256 y perfil. | P40; width=5; rounds=2; PBKDF2=48000 |
| `hcx0798` | FORMAT | P40 | `checksum-envelope` | Sobre con integridad SHA-256. domain \| SHA256 \| VALUE. | P40; width=5; rounds=2; PBKDF2=48000 |
| `hcx0799` | FORMAT | P40 | `json-envelope` | Sobre de transporte JSON. incluye dominio, perfil, valor y SHA-256. | P40; width=5; rounds=2; PBKDF2=48000 |
| `hcx0800` | ANALYZE | P40 | `entropy-report` | Reporte de entropia y perfil. chars, bytes, unique, entropy, estimatedBits y SHA-256. | P40; width=5; rounds=2; PBKDF2=48000 |
| `hcx0801` | CRYPTO | P41 | `sha256-domain` | SHA-256 con dominio aislado. digest SHA-256 de domain \| value. | P41; width=6; rounds=3; PBKDF2=49000 |
| `hcx0802` | CRYPTO | P41 | `hmac-sha256` | Etiqueta HMAC-SHA-256. HMAC local; usa clave opcional o dominio del comando. | P41; width=6; rounds=3; PBKDF2=49000 |
| `hcx0803` | CRYPTO | P41 | `pbkdf2-sha256` | Derivacion PBKDF2-SHA-256. sal local; iteraciones = 8000 + perfil x 1000. | P41; width=6; rounds=3; PBKDF2=49000 |
| `hcx0804` | CRYPTO | P41 | `hkdf-sha256` | Derivacion HKDF-SHA-256. salt local e info HSG2818-HCX-P41. | P41; width=6; rounds=3; PBKDF2=49000 |
| `hcx0805` | CRYPTO | P41 | `hash-chain` | Cadena iterada SHA-256. rondas = 2 + (perfil mod 8). | P41; width=6; rounds=3; PBKDF2=49000 |
| `hcx0806` | CONVERT | P41 | `base64-encode` | Conversion UTF-8 a Base64. conversion reversible; no es cifrado. | P41; width=6; rounds=3; PBKDF2=49000 |
| `hcx0807` | CONVERT | P41 | `base64-decode` | Restauracion Base64 a UTF-8. valida y decodifica Base64. | P41; width=6; rounds=3; PBKDF2=49000 |
| `hcx0808` | CONVERT | P41 | `hex-encode` | Conversion UTF-8 a hexadecimal. conversion reversible; no es cifrado. | P41; width=6; rounds=3; PBKDF2=49000 |
| `hcx0809` | CONVERT | P41 | `hex-decode` | Restauracion hexadecimal a UTF-8. requiere pares completos de bytes. | P41; width=6; rounds=3; PBKDF2=49000 |
| `hcx0810` | CONVERT | P41 | `url-encode` | Codificacion URL component. protege caracteres reservados para transporte. | P41; width=6; rounds=3; PBKDF2=49000 |
| `hcx0811` | CONVERT | P41 | `url-decode` | Restauracion URL component. decodifica transporte URL. | P41; width=6; rounds=3; PBKDF2=49000 |
| `hcx0812` | TRANSFORM | P41 | `rotate-left` | Rotacion determinista a la izquierda. desplazamiento dependiente del perfil. | P41; width=6; rounds=3; PBKDF2=49000 |
| `hcx0813` | TRANSFORM | P41 | `rotate-right` | Rotacion determinista a la derecha. inversa conceptual de rotate-left. | P41; width=6; rounds=3; PBKDF2=49000 |
| `hcx0814` | TRANSFORM | P41 | `xor-mask` | Mascara XOR de laboratorio. salida hexadecimal; reversible con misma mascara. | P41; width=6; rounds=3; PBKDF2=49000 |
| `hcx0815` | TRANSFORM | P41 | `reverse-blocks` | Inversion por bloques. ancho = 4 + (perfil mod 13). | P41; width=6; rounds=3; PBKDF2=49000 |
| `hcx0816` | FORMAT | P41 | `chunk-delimit` | Segmentacion con guiones. ancho = 4 + (perfil mod 13). | P41; width=6; rounds=3; PBKDF2=49000 |
| `hcx0817` | ANALYZE | P41 | `window-sample` | Muestra determinista por ventana. offset guiado por SHA-256 y perfil. | P41; width=6; rounds=3; PBKDF2=49000 |
| `hcx0818` | FORMAT | P41 | `checksum-envelope` | Sobre con integridad SHA-256. domain \| SHA256 \| VALUE. | P41; width=6; rounds=3; PBKDF2=49000 |
| `hcx0819` | FORMAT | P41 | `json-envelope` | Sobre de transporte JSON. incluye dominio, perfil, valor y SHA-256. | P41; width=6; rounds=3; PBKDF2=49000 |
| `hcx0820` | ANALYZE | P41 | `entropy-report` | Reporte de entropia y perfil. chars, bytes, unique, entropy, estimatedBits y SHA-256. | P41; width=6; rounds=3; PBKDF2=49000 |
| `hcx0821` | CRYPTO | P42 | `sha256-domain` | SHA-256 con dominio aislado. digest SHA-256 de domain \| value. | P42; width=7; rounds=4; PBKDF2=50000 |
| `hcx0822` | CRYPTO | P42 | `hmac-sha256` | Etiqueta HMAC-SHA-256. HMAC local; usa clave opcional o dominio del comando. | P42; width=7; rounds=4; PBKDF2=50000 |
| `hcx0823` | CRYPTO | P42 | `pbkdf2-sha256` | Derivacion PBKDF2-SHA-256. sal local; iteraciones = 8000 + perfil x 1000. | P42; width=7; rounds=4; PBKDF2=50000 |
| `hcx0824` | CRYPTO | P42 | `hkdf-sha256` | Derivacion HKDF-SHA-256. salt local e info HSG2818-HCX-P42. | P42; width=7; rounds=4; PBKDF2=50000 |
| `hcx0825` | CRYPTO | P42 | `hash-chain` | Cadena iterada SHA-256. rondas = 2 + (perfil mod 8). | P42; width=7; rounds=4; PBKDF2=50000 |
| `hcx0826` | CONVERT | P42 | `base64-encode` | Conversion UTF-8 a Base64. conversion reversible; no es cifrado. | P42; width=7; rounds=4; PBKDF2=50000 |
| `hcx0827` | CONVERT | P42 | `base64-decode` | Restauracion Base64 a UTF-8. valida y decodifica Base64. | P42; width=7; rounds=4; PBKDF2=50000 |
| `hcx0828` | CONVERT | P42 | `hex-encode` | Conversion UTF-8 a hexadecimal. conversion reversible; no es cifrado. | P42; width=7; rounds=4; PBKDF2=50000 |
| `hcx0829` | CONVERT | P42 | `hex-decode` | Restauracion hexadecimal a UTF-8. requiere pares completos de bytes. | P42; width=7; rounds=4; PBKDF2=50000 |
| `hcx0830` | CONVERT | P42 | `url-encode` | Codificacion URL component. protege caracteres reservados para transporte. | P42; width=7; rounds=4; PBKDF2=50000 |
| `hcx0831` | CONVERT | P42 | `url-decode` | Restauracion URL component. decodifica transporte URL. | P42; width=7; rounds=4; PBKDF2=50000 |
| `hcx0832` | TRANSFORM | P42 | `rotate-left` | Rotacion determinista a la izquierda. desplazamiento dependiente del perfil. | P42; width=7; rounds=4; PBKDF2=50000 |
| `hcx0833` | TRANSFORM | P42 | `rotate-right` | Rotacion determinista a la derecha. inversa conceptual de rotate-left. | P42; width=7; rounds=4; PBKDF2=50000 |
| `hcx0834` | TRANSFORM | P42 | `xor-mask` | Mascara XOR de laboratorio. salida hexadecimal; reversible con misma mascara. | P42; width=7; rounds=4; PBKDF2=50000 |
| `hcx0835` | TRANSFORM | P42 | `reverse-blocks` | Inversion por bloques. ancho = 4 + (perfil mod 13). | P42; width=7; rounds=4; PBKDF2=50000 |
| `hcx0836` | FORMAT | P42 | `chunk-delimit` | Segmentacion con guiones. ancho = 4 + (perfil mod 13). | P42; width=7; rounds=4; PBKDF2=50000 |
| `hcx0837` | ANALYZE | P42 | `window-sample` | Muestra determinista por ventana. offset guiado por SHA-256 y perfil. | P42; width=7; rounds=4; PBKDF2=50000 |
| `hcx0838` | FORMAT | P42 | `checksum-envelope` | Sobre con integridad SHA-256. domain \| SHA256 \| VALUE. | P42; width=7; rounds=4; PBKDF2=50000 |
| `hcx0839` | FORMAT | P42 | `json-envelope` | Sobre de transporte JSON. incluye dominio, perfil, valor y SHA-256. | P42; width=7; rounds=4; PBKDF2=50000 |
| `hcx0840` | ANALYZE | P42 | `entropy-report` | Reporte de entropia y perfil. chars, bytes, unique, entropy, estimatedBits y SHA-256. | P42; width=7; rounds=4; PBKDF2=50000 |
| `hcx0841` | CRYPTO | P43 | `sha256-domain` | SHA-256 con dominio aislado. digest SHA-256 de domain \| value. | P43; width=8; rounds=5; PBKDF2=51000 |
| `hcx0842` | CRYPTO | P43 | `hmac-sha256` | Etiqueta HMAC-SHA-256. HMAC local; usa clave opcional o dominio del comando. | P43; width=8; rounds=5; PBKDF2=51000 |
| `hcx0843` | CRYPTO | P43 | `pbkdf2-sha256` | Derivacion PBKDF2-SHA-256. sal local; iteraciones = 8000 + perfil x 1000. | P43; width=8; rounds=5; PBKDF2=51000 |
| `hcx0844` | CRYPTO | P43 | `hkdf-sha256` | Derivacion HKDF-SHA-256. salt local e info HSG2818-HCX-P43. | P43; width=8; rounds=5; PBKDF2=51000 |
| `hcx0845` | CRYPTO | P43 | `hash-chain` | Cadena iterada SHA-256. rondas = 2 + (perfil mod 8). | P43; width=8; rounds=5; PBKDF2=51000 |
| `hcx0846` | CONVERT | P43 | `base64-encode` | Conversion UTF-8 a Base64. conversion reversible; no es cifrado. | P43; width=8; rounds=5; PBKDF2=51000 |
| `hcx0847` | CONVERT | P43 | `base64-decode` | Restauracion Base64 a UTF-8. valida y decodifica Base64. | P43; width=8; rounds=5; PBKDF2=51000 |
| `hcx0848` | CONVERT | P43 | `hex-encode` | Conversion UTF-8 a hexadecimal. conversion reversible; no es cifrado. | P43; width=8; rounds=5; PBKDF2=51000 |
| `hcx0849` | CONVERT | P43 | `hex-decode` | Restauracion hexadecimal a UTF-8. requiere pares completos de bytes. | P43; width=8; rounds=5; PBKDF2=51000 |
| `hcx0850` | CONVERT | P43 | `url-encode` | Codificacion URL component. protege caracteres reservados para transporte. | P43; width=8; rounds=5; PBKDF2=51000 |
| `hcx0851` | CONVERT | P43 | `url-decode` | Restauracion URL component. decodifica transporte URL. | P43; width=8; rounds=5; PBKDF2=51000 |
| `hcx0852` | TRANSFORM | P43 | `rotate-left` | Rotacion determinista a la izquierda. desplazamiento dependiente del perfil. | P43; width=8; rounds=5; PBKDF2=51000 |
| `hcx0853` | TRANSFORM | P43 | `rotate-right` | Rotacion determinista a la derecha. inversa conceptual de rotate-left. | P43; width=8; rounds=5; PBKDF2=51000 |
| `hcx0854` | TRANSFORM | P43 | `xor-mask` | Mascara XOR de laboratorio. salida hexadecimal; reversible con misma mascara. | P43; width=8; rounds=5; PBKDF2=51000 |
| `hcx0855` | TRANSFORM | P43 | `reverse-blocks` | Inversion por bloques. ancho = 4 + (perfil mod 13). | P43; width=8; rounds=5; PBKDF2=51000 |
| `hcx0856` | FORMAT | P43 | `chunk-delimit` | Segmentacion con guiones. ancho = 4 + (perfil mod 13). | P43; width=8; rounds=5; PBKDF2=51000 |
| `hcx0857` | ANALYZE | P43 | `window-sample` | Muestra determinista por ventana. offset guiado por SHA-256 y perfil. | P43; width=8; rounds=5; PBKDF2=51000 |
| `hcx0858` | FORMAT | P43 | `checksum-envelope` | Sobre con integridad SHA-256. domain \| SHA256 \| VALUE. | P43; width=8; rounds=5; PBKDF2=51000 |
| `hcx0859` | FORMAT | P43 | `json-envelope` | Sobre de transporte JSON. incluye dominio, perfil, valor y SHA-256. | P43; width=8; rounds=5; PBKDF2=51000 |
| `hcx0860` | ANALYZE | P43 | `entropy-report` | Reporte de entropia y perfil. chars, bytes, unique, entropy, estimatedBits y SHA-256. | P43; width=8; rounds=5; PBKDF2=51000 |
| `hcx0861` | CRYPTO | P44 | `sha256-domain` | SHA-256 con dominio aislado. digest SHA-256 de domain \| value. | P44; width=9; rounds=6; PBKDF2=52000 |
| `hcx0862` | CRYPTO | P44 | `hmac-sha256` | Etiqueta HMAC-SHA-256. HMAC local; usa clave opcional o dominio del comando. | P44; width=9; rounds=6; PBKDF2=52000 |
| `hcx0863` | CRYPTO | P44 | `pbkdf2-sha256` | Derivacion PBKDF2-SHA-256. sal local; iteraciones = 8000 + perfil x 1000. | P44; width=9; rounds=6; PBKDF2=52000 |
| `hcx0864` | CRYPTO | P44 | `hkdf-sha256` | Derivacion HKDF-SHA-256. salt local e info HSG2818-HCX-P44. | P44; width=9; rounds=6; PBKDF2=52000 |
| `hcx0865` | CRYPTO | P44 | `hash-chain` | Cadena iterada SHA-256. rondas = 2 + (perfil mod 8). | P44; width=9; rounds=6; PBKDF2=52000 |
| `hcx0866` | CONVERT | P44 | `base64-encode` | Conversion UTF-8 a Base64. conversion reversible; no es cifrado. | P44; width=9; rounds=6; PBKDF2=52000 |
| `hcx0867` | CONVERT | P44 | `base64-decode` | Restauracion Base64 a UTF-8. valida y decodifica Base64. | P44; width=9; rounds=6; PBKDF2=52000 |
| `hcx0868` | CONVERT | P44 | `hex-encode` | Conversion UTF-8 a hexadecimal. conversion reversible; no es cifrado. | P44; width=9; rounds=6; PBKDF2=52000 |
| `hcx0869` | CONVERT | P44 | `hex-decode` | Restauracion hexadecimal a UTF-8. requiere pares completos de bytes. | P44; width=9; rounds=6; PBKDF2=52000 |
| `hcx0870` | CONVERT | P44 | `url-encode` | Codificacion URL component. protege caracteres reservados para transporte. | P44; width=9; rounds=6; PBKDF2=52000 |
| `hcx0871` | CONVERT | P44 | `url-decode` | Restauracion URL component. decodifica transporte URL. | P44; width=9; rounds=6; PBKDF2=52000 |
| `hcx0872` | TRANSFORM | P44 | `rotate-left` | Rotacion determinista a la izquierda. desplazamiento dependiente del perfil. | P44; width=9; rounds=6; PBKDF2=52000 |
| `hcx0873` | TRANSFORM | P44 | `rotate-right` | Rotacion determinista a la derecha. inversa conceptual de rotate-left. | P44; width=9; rounds=6; PBKDF2=52000 |
| `hcx0874` | TRANSFORM | P44 | `xor-mask` | Mascara XOR de laboratorio. salida hexadecimal; reversible con misma mascara. | P44; width=9; rounds=6; PBKDF2=52000 |
| `hcx0875` | TRANSFORM | P44 | `reverse-blocks` | Inversion por bloques. ancho = 4 + (perfil mod 13). | P44; width=9; rounds=6; PBKDF2=52000 |
| `hcx0876` | FORMAT | P44 | `chunk-delimit` | Segmentacion con guiones. ancho = 4 + (perfil mod 13). | P44; width=9; rounds=6; PBKDF2=52000 |
| `hcx0877` | ANALYZE | P44 | `window-sample` | Muestra determinista por ventana. offset guiado por SHA-256 y perfil. | P44; width=9; rounds=6; PBKDF2=52000 |
| `hcx0878` | FORMAT | P44 | `checksum-envelope` | Sobre con integridad SHA-256. domain \| SHA256 \| VALUE. | P44; width=9; rounds=6; PBKDF2=52000 |
| `hcx0879` | FORMAT | P44 | `json-envelope` | Sobre de transporte JSON. incluye dominio, perfil, valor y SHA-256. | P44; width=9; rounds=6; PBKDF2=52000 |
| `hcx0880` | ANALYZE | P44 | `entropy-report` | Reporte de entropia y perfil. chars, bytes, unique, entropy, estimatedBits y SHA-256. | P44; width=9; rounds=6; PBKDF2=52000 |
| `hcx0881` | CRYPTO | P45 | `sha256-domain` | SHA-256 con dominio aislado. digest SHA-256 de domain \| value. | P45; width=10; rounds=7; PBKDF2=53000 |
| `hcx0882` | CRYPTO | P45 | `hmac-sha256` | Etiqueta HMAC-SHA-256. HMAC local; usa clave opcional o dominio del comando. | P45; width=10; rounds=7; PBKDF2=53000 |
| `hcx0883` | CRYPTO | P45 | `pbkdf2-sha256` | Derivacion PBKDF2-SHA-256. sal local; iteraciones = 8000 + perfil x 1000. | P45; width=10; rounds=7; PBKDF2=53000 |
| `hcx0884` | CRYPTO | P45 | `hkdf-sha256` | Derivacion HKDF-SHA-256. salt local e info HSG2818-HCX-P45. | P45; width=10; rounds=7; PBKDF2=53000 |
| `hcx0885` | CRYPTO | P45 | `hash-chain` | Cadena iterada SHA-256. rondas = 2 + (perfil mod 8). | P45; width=10; rounds=7; PBKDF2=53000 |
| `hcx0886` | CONVERT | P45 | `base64-encode` | Conversion UTF-8 a Base64. conversion reversible; no es cifrado. | P45; width=10; rounds=7; PBKDF2=53000 |
| `hcx0887` | CONVERT | P45 | `base64-decode` | Restauracion Base64 a UTF-8. valida y decodifica Base64. | P45; width=10; rounds=7; PBKDF2=53000 |
| `hcx0888` | CONVERT | P45 | `hex-encode` | Conversion UTF-8 a hexadecimal. conversion reversible; no es cifrado. | P45; width=10; rounds=7; PBKDF2=53000 |
| `hcx0889` | CONVERT | P45 | `hex-decode` | Restauracion hexadecimal a UTF-8. requiere pares completos de bytes. | P45; width=10; rounds=7; PBKDF2=53000 |
| `hcx0890` | CONVERT | P45 | `url-encode` | Codificacion URL component. protege caracteres reservados para transporte. | P45; width=10; rounds=7; PBKDF2=53000 |
| `hcx0891` | CONVERT | P45 | `url-decode` | Restauracion URL component. decodifica transporte URL. | P45; width=10; rounds=7; PBKDF2=53000 |
| `hcx0892` | TRANSFORM | P45 | `rotate-left` | Rotacion determinista a la izquierda. desplazamiento dependiente del perfil. | P45; width=10; rounds=7; PBKDF2=53000 |
| `hcx0893` | TRANSFORM | P45 | `rotate-right` | Rotacion determinista a la derecha. inversa conceptual de rotate-left. | P45; width=10; rounds=7; PBKDF2=53000 |
| `hcx0894` | TRANSFORM | P45 | `xor-mask` | Mascara XOR de laboratorio. salida hexadecimal; reversible con misma mascara. | P45; width=10; rounds=7; PBKDF2=53000 |
| `hcx0895` | TRANSFORM | P45 | `reverse-blocks` | Inversion por bloques. ancho = 4 + (perfil mod 13). | P45; width=10; rounds=7; PBKDF2=53000 |
| `hcx0896` | FORMAT | P45 | `chunk-delimit` | Segmentacion con guiones. ancho = 4 + (perfil mod 13). | P45; width=10; rounds=7; PBKDF2=53000 |
| `hcx0897` | ANALYZE | P45 | `window-sample` | Muestra determinista por ventana. offset guiado por SHA-256 y perfil. | P45; width=10; rounds=7; PBKDF2=53000 |
| `hcx0898` | FORMAT | P45 | `checksum-envelope` | Sobre con integridad SHA-256. domain \| SHA256 \| VALUE. | P45; width=10; rounds=7; PBKDF2=53000 |
| `hcx0899` | FORMAT | P45 | `json-envelope` | Sobre de transporte JSON. incluye dominio, perfil, valor y SHA-256. | P45; width=10; rounds=7; PBKDF2=53000 |
| `hcx0900` | ANALYZE | P45 | `entropy-report` | Reporte de entropia y perfil. chars, bytes, unique, entropy, estimatedBits y SHA-256. | P45; width=10; rounds=7; PBKDF2=53000 |
| `hcx0901` | CRYPTO | P46 | `sha256-domain` | SHA-256 con dominio aislado. digest SHA-256 de domain \| value. | P46; width=11; rounds=8; PBKDF2=54000 |
| `hcx0902` | CRYPTO | P46 | `hmac-sha256` | Etiqueta HMAC-SHA-256. HMAC local; usa clave opcional o dominio del comando. | P46; width=11; rounds=8; PBKDF2=54000 |
| `hcx0903` | CRYPTO | P46 | `pbkdf2-sha256` | Derivacion PBKDF2-SHA-256. sal local; iteraciones = 8000 + perfil x 1000. | P46; width=11; rounds=8; PBKDF2=54000 |
| `hcx0904` | CRYPTO | P46 | `hkdf-sha256` | Derivacion HKDF-SHA-256. salt local e info HSG2818-HCX-P46. | P46; width=11; rounds=8; PBKDF2=54000 |
| `hcx0905` | CRYPTO | P46 | `hash-chain` | Cadena iterada SHA-256. rondas = 2 + (perfil mod 8). | P46; width=11; rounds=8; PBKDF2=54000 |
| `hcx0906` | CONVERT | P46 | `base64-encode` | Conversion UTF-8 a Base64. conversion reversible; no es cifrado. | P46; width=11; rounds=8; PBKDF2=54000 |
| `hcx0907` | CONVERT | P46 | `base64-decode` | Restauracion Base64 a UTF-8. valida y decodifica Base64. | P46; width=11; rounds=8; PBKDF2=54000 |
| `hcx0908` | CONVERT | P46 | `hex-encode` | Conversion UTF-8 a hexadecimal. conversion reversible; no es cifrado. | P46; width=11; rounds=8; PBKDF2=54000 |
| `hcx0909` | CONVERT | P46 | `hex-decode` | Restauracion hexadecimal a UTF-8. requiere pares completos de bytes. | P46; width=11; rounds=8; PBKDF2=54000 |
| `hcx0910` | CONVERT | P46 | `url-encode` | Codificacion URL component. protege caracteres reservados para transporte. | P46; width=11; rounds=8; PBKDF2=54000 |
| `hcx0911` | CONVERT | P46 | `url-decode` | Restauracion URL component. decodifica transporte URL. | P46; width=11; rounds=8; PBKDF2=54000 |
| `hcx0912` | TRANSFORM | P46 | `rotate-left` | Rotacion determinista a la izquierda. desplazamiento dependiente del perfil. | P46; width=11; rounds=8; PBKDF2=54000 |
| `hcx0913` | TRANSFORM | P46 | `rotate-right` | Rotacion determinista a la derecha. inversa conceptual de rotate-left. | P46; width=11; rounds=8; PBKDF2=54000 |
| `hcx0914` | TRANSFORM | P46 | `xor-mask` | Mascara XOR de laboratorio. salida hexadecimal; reversible con misma mascara. | P46; width=11; rounds=8; PBKDF2=54000 |
| `hcx0915` | TRANSFORM | P46 | `reverse-blocks` | Inversion por bloques. ancho = 4 + (perfil mod 13). | P46; width=11; rounds=8; PBKDF2=54000 |
| `hcx0916` | FORMAT | P46 | `chunk-delimit` | Segmentacion con guiones. ancho = 4 + (perfil mod 13). | P46; width=11; rounds=8; PBKDF2=54000 |
| `hcx0917` | ANALYZE | P46 | `window-sample` | Muestra determinista por ventana. offset guiado por SHA-256 y perfil. | P46; width=11; rounds=8; PBKDF2=54000 |
| `hcx0918` | FORMAT | P46 | `checksum-envelope` | Sobre con integridad SHA-256. domain \| SHA256 \| VALUE. | P46; width=11; rounds=8; PBKDF2=54000 |
| `hcx0919` | FORMAT | P46 | `json-envelope` | Sobre de transporte JSON. incluye dominio, perfil, valor y SHA-256. | P46; width=11; rounds=8; PBKDF2=54000 |
| `hcx0920` | ANALYZE | P46 | `entropy-report` | Reporte de entropia y perfil. chars, bytes, unique, entropy, estimatedBits y SHA-256. | P46; width=11; rounds=8; PBKDF2=54000 |
| `hcx0921` | CRYPTO | P47 | `sha256-domain` | SHA-256 con dominio aislado. digest SHA-256 de domain \| value. | P47; width=12; rounds=9; PBKDF2=55000 |
| `hcx0922` | CRYPTO | P47 | `hmac-sha256` | Etiqueta HMAC-SHA-256. HMAC local; usa clave opcional o dominio del comando. | P47; width=12; rounds=9; PBKDF2=55000 |
| `hcx0923` | CRYPTO | P47 | `pbkdf2-sha256` | Derivacion PBKDF2-SHA-256. sal local; iteraciones = 8000 + perfil x 1000. | P47; width=12; rounds=9; PBKDF2=55000 |
| `hcx0924` | CRYPTO | P47 | `hkdf-sha256` | Derivacion HKDF-SHA-256. salt local e info HSG2818-HCX-P47. | P47; width=12; rounds=9; PBKDF2=55000 |
| `hcx0925` | CRYPTO | P47 | `hash-chain` | Cadena iterada SHA-256. rondas = 2 + (perfil mod 8). | P47; width=12; rounds=9; PBKDF2=55000 |
| `hcx0926` | CONVERT | P47 | `base64-encode` | Conversion UTF-8 a Base64. conversion reversible; no es cifrado. | P47; width=12; rounds=9; PBKDF2=55000 |
| `hcx0927` | CONVERT | P47 | `base64-decode` | Restauracion Base64 a UTF-8. valida y decodifica Base64. | P47; width=12; rounds=9; PBKDF2=55000 |
| `hcx0928` | CONVERT | P47 | `hex-encode` | Conversion UTF-8 a hexadecimal. conversion reversible; no es cifrado. | P47; width=12; rounds=9; PBKDF2=55000 |
| `hcx0929` | CONVERT | P47 | `hex-decode` | Restauracion hexadecimal a UTF-8. requiere pares completos de bytes. | P47; width=12; rounds=9; PBKDF2=55000 |
| `hcx0930` | CONVERT | P47 | `url-encode` | Codificacion URL component. protege caracteres reservados para transporte. | P47; width=12; rounds=9; PBKDF2=55000 |
| `hcx0931` | CONVERT | P47 | `url-decode` | Restauracion URL component. decodifica transporte URL. | P47; width=12; rounds=9; PBKDF2=55000 |
| `hcx0932` | TRANSFORM | P47 | `rotate-left` | Rotacion determinista a la izquierda. desplazamiento dependiente del perfil. | P47; width=12; rounds=9; PBKDF2=55000 |
| `hcx0933` | TRANSFORM | P47 | `rotate-right` | Rotacion determinista a la derecha. inversa conceptual de rotate-left. | P47; width=12; rounds=9; PBKDF2=55000 |
| `hcx0934` | TRANSFORM | P47 | `xor-mask` | Mascara XOR de laboratorio. salida hexadecimal; reversible con misma mascara. | P47; width=12; rounds=9; PBKDF2=55000 |
| `hcx0935` | TRANSFORM | P47 | `reverse-blocks` | Inversion por bloques. ancho = 4 + (perfil mod 13). | P47; width=12; rounds=9; PBKDF2=55000 |
| `hcx0936` | FORMAT | P47 | `chunk-delimit` | Segmentacion con guiones. ancho = 4 + (perfil mod 13). | P47; width=12; rounds=9; PBKDF2=55000 |
| `hcx0937` | ANALYZE | P47 | `window-sample` | Muestra determinista por ventana. offset guiado por SHA-256 y perfil. | P47; width=12; rounds=9; PBKDF2=55000 |
| `hcx0938` | FORMAT | P47 | `checksum-envelope` | Sobre con integridad SHA-256. domain \| SHA256 \| VALUE. | P47; width=12; rounds=9; PBKDF2=55000 |
| `hcx0939` | FORMAT | P47 | `json-envelope` | Sobre de transporte JSON. incluye dominio, perfil, valor y SHA-256. | P47; width=12; rounds=9; PBKDF2=55000 |
| `hcx0940` | ANALYZE | P47 | `entropy-report` | Reporte de entropia y perfil. chars, bytes, unique, entropy, estimatedBits y SHA-256. | P47; width=12; rounds=9; PBKDF2=55000 |
| `hcx0941` | CRYPTO | P48 | `sha256-domain` | SHA-256 con dominio aislado. digest SHA-256 de domain \| value. | P48; width=13; rounds=2; PBKDF2=56000 |
| `hcx0942` | CRYPTO | P48 | `hmac-sha256` | Etiqueta HMAC-SHA-256. HMAC local; usa clave opcional o dominio del comando. | P48; width=13; rounds=2; PBKDF2=56000 |
| `hcx0943` | CRYPTO | P48 | `pbkdf2-sha256` | Derivacion PBKDF2-SHA-256. sal local; iteraciones = 8000 + perfil x 1000. | P48; width=13; rounds=2; PBKDF2=56000 |
| `hcx0944` | CRYPTO | P48 | `hkdf-sha256` | Derivacion HKDF-SHA-256. salt local e info HSG2818-HCX-P48. | P48; width=13; rounds=2; PBKDF2=56000 |
| `hcx0945` | CRYPTO | P48 | `hash-chain` | Cadena iterada SHA-256. rondas = 2 + (perfil mod 8). | P48; width=13; rounds=2; PBKDF2=56000 |
| `hcx0946` | CONVERT | P48 | `base64-encode` | Conversion UTF-8 a Base64. conversion reversible; no es cifrado. | P48; width=13; rounds=2; PBKDF2=56000 |
| `hcx0947` | CONVERT | P48 | `base64-decode` | Restauracion Base64 a UTF-8. valida y decodifica Base64. | P48; width=13; rounds=2; PBKDF2=56000 |
| `hcx0948` | CONVERT | P48 | `hex-encode` | Conversion UTF-8 a hexadecimal. conversion reversible; no es cifrado. | P48; width=13; rounds=2; PBKDF2=56000 |
| `hcx0949` | CONVERT | P48 | `hex-decode` | Restauracion hexadecimal a UTF-8. requiere pares completos de bytes. | P48; width=13; rounds=2; PBKDF2=56000 |
| `hcx0950` | CONVERT | P48 | `url-encode` | Codificacion URL component. protege caracteres reservados para transporte. | P48; width=13; rounds=2; PBKDF2=56000 |
| `hcx0951` | CONVERT | P48 | `url-decode` | Restauracion URL component. decodifica transporte URL. | P48; width=13; rounds=2; PBKDF2=56000 |
| `hcx0952` | TRANSFORM | P48 | `rotate-left` | Rotacion determinista a la izquierda. desplazamiento dependiente del perfil. | P48; width=13; rounds=2; PBKDF2=56000 |
| `hcx0953` | TRANSFORM | P48 | `rotate-right` | Rotacion determinista a la derecha. inversa conceptual de rotate-left. | P48; width=13; rounds=2; PBKDF2=56000 |
| `hcx0954` | TRANSFORM | P48 | `xor-mask` | Mascara XOR de laboratorio. salida hexadecimal; reversible con misma mascara. | P48; width=13; rounds=2; PBKDF2=56000 |
| `hcx0955` | TRANSFORM | P48 | `reverse-blocks` | Inversion por bloques. ancho = 4 + (perfil mod 13). | P48; width=13; rounds=2; PBKDF2=56000 |
| `hcx0956` | FORMAT | P48 | `chunk-delimit` | Segmentacion con guiones. ancho = 4 + (perfil mod 13). | P48; width=13; rounds=2; PBKDF2=56000 |
| `hcx0957` | ANALYZE | P48 | `window-sample` | Muestra determinista por ventana. offset guiado por SHA-256 y perfil. | P48; width=13; rounds=2; PBKDF2=56000 |
| `hcx0958` | FORMAT | P48 | `checksum-envelope` | Sobre con integridad SHA-256. domain \| SHA256 \| VALUE. | P48; width=13; rounds=2; PBKDF2=56000 |
| `hcx0959` | FORMAT | P48 | `json-envelope` | Sobre de transporte JSON. incluye dominio, perfil, valor y SHA-256. | P48; width=13; rounds=2; PBKDF2=56000 |
| `hcx0960` | ANALYZE | P48 | `entropy-report` | Reporte de entropia y perfil. chars, bytes, unique, entropy, estimatedBits y SHA-256. | P48; width=13; rounds=2; PBKDF2=56000 |
| `hcx0961` | CRYPTO | P49 | `sha256-domain` | SHA-256 con dominio aislado. digest SHA-256 de domain \| value. | P49; width=14; rounds=3; PBKDF2=57000 |
| `hcx0962` | CRYPTO | P49 | `hmac-sha256` | Etiqueta HMAC-SHA-256. HMAC local; usa clave opcional o dominio del comando. | P49; width=14; rounds=3; PBKDF2=57000 |
| `hcx0963` | CRYPTO | P49 | `pbkdf2-sha256` | Derivacion PBKDF2-SHA-256. sal local; iteraciones = 8000 + perfil x 1000. | P49; width=14; rounds=3; PBKDF2=57000 |
| `hcx0964` | CRYPTO | P49 | `hkdf-sha256` | Derivacion HKDF-SHA-256. salt local e info HSG2818-HCX-P49. | P49; width=14; rounds=3; PBKDF2=57000 |
| `hcx0965` | CRYPTO | P49 | `hash-chain` | Cadena iterada SHA-256. rondas = 2 + (perfil mod 8). | P49; width=14; rounds=3; PBKDF2=57000 |
| `hcx0966` | CONVERT | P49 | `base64-encode` | Conversion UTF-8 a Base64. conversion reversible; no es cifrado. | P49; width=14; rounds=3; PBKDF2=57000 |
| `hcx0967` | CONVERT | P49 | `base64-decode` | Restauracion Base64 a UTF-8. valida y decodifica Base64. | P49; width=14; rounds=3; PBKDF2=57000 |
| `hcx0968` | CONVERT | P49 | `hex-encode` | Conversion UTF-8 a hexadecimal. conversion reversible; no es cifrado. | P49; width=14; rounds=3; PBKDF2=57000 |
| `hcx0969` | CONVERT | P49 | `hex-decode` | Restauracion hexadecimal a UTF-8. requiere pares completos de bytes. | P49; width=14; rounds=3; PBKDF2=57000 |
| `hcx0970` | CONVERT | P49 | `url-encode` | Codificacion URL component. protege caracteres reservados para transporte. | P49; width=14; rounds=3; PBKDF2=57000 |
| `hcx0971` | CONVERT | P49 | `url-decode` | Restauracion URL component. decodifica transporte URL. | P49; width=14; rounds=3; PBKDF2=57000 |
| `hcx0972` | TRANSFORM | P49 | `rotate-left` | Rotacion determinista a la izquierda. desplazamiento dependiente del perfil. | P49; width=14; rounds=3; PBKDF2=57000 |
| `hcx0973` | TRANSFORM | P49 | `rotate-right` | Rotacion determinista a la derecha. inversa conceptual de rotate-left. | P49; width=14; rounds=3; PBKDF2=57000 |
| `hcx0974` | TRANSFORM | P49 | `xor-mask` | Mascara XOR de laboratorio. salida hexadecimal; reversible con misma mascara. | P49; width=14; rounds=3; PBKDF2=57000 |
| `hcx0975` | TRANSFORM | P49 | `reverse-blocks` | Inversion por bloques. ancho = 4 + (perfil mod 13). | P49; width=14; rounds=3; PBKDF2=57000 |
| `hcx0976` | FORMAT | P49 | `chunk-delimit` | Segmentacion con guiones. ancho = 4 + (perfil mod 13). | P49; width=14; rounds=3; PBKDF2=57000 |
| `hcx0977` | ANALYZE | P49 | `window-sample` | Muestra determinista por ventana. offset guiado por SHA-256 y perfil. | P49; width=14; rounds=3; PBKDF2=57000 |
| `hcx0978` | FORMAT | P49 | `checksum-envelope` | Sobre con integridad SHA-256. domain \| SHA256 \| VALUE. | P49; width=14; rounds=3; PBKDF2=57000 |
| `hcx0979` | FORMAT | P49 | `json-envelope` | Sobre de transporte JSON. incluye dominio, perfil, valor y SHA-256. | P49; width=14; rounds=3; PBKDF2=57000 |
| `hcx0980` | ANALYZE | P49 | `entropy-report` | Reporte de entropia y perfil. chars, bytes, unique, entropy, estimatedBits y SHA-256. | P49; width=14; rounds=3; PBKDF2=57000 |
| `hcx0981` | CRYPTO | P50 | `sha256-domain` | SHA-256 con dominio aislado. digest SHA-256 de domain \| value. | P50; width=15; rounds=4; PBKDF2=58000 |
| `hcx0982` | CRYPTO | P50 | `hmac-sha256` | Etiqueta HMAC-SHA-256. HMAC local; usa clave opcional o dominio del comando. | P50; width=15; rounds=4; PBKDF2=58000 |
| `hcx0983` | CRYPTO | P50 | `pbkdf2-sha256` | Derivacion PBKDF2-SHA-256. sal local; iteraciones = 8000 + perfil x 1000. | P50; width=15; rounds=4; PBKDF2=58000 |
| `hcx0984` | CRYPTO | P50 | `hkdf-sha256` | Derivacion HKDF-SHA-256. salt local e info HSG2818-HCX-P50. | P50; width=15; rounds=4; PBKDF2=58000 |
| `hcx0985` | CRYPTO | P50 | `hash-chain` | Cadena iterada SHA-256. rondas = 2 + (perfil mod 8). | P50; width=15; rounds=4; PBKDF2=58000 |
| `hcx0986` | CONVERT | P50 | `base64-encode` | Conversion UTF-8 a Base64. conversion reversible; no es cifrado. | P50; width=15; rounds=4; PBKDF2=58000 |
| `hcx0987` | CONVERT | P50 | `base64-decode` | Restauracion Base64 a UTF-8. valida y decodifica Base64. | P50; width=15; rounds=4; PBKDF2=58000 |
| `hcx0988` | CONVERT | P50 | `hex-encode` | Conversion UTF-8 a hexadecimal. conversion reversible; no es cifrado. | P50; width=15; rounds=4; PBKDF2=58000 |
| `hcx0989` | CONVERT | P50 | `hex-decode` | Restauracion hexadecimal a UTF-8. requiere pares completos de bytes. | P50; width=15; rounds=4; PBKDF2=58000 |
| `hcx0990` | CONVERT | P50 | `url-encode` | Codificacion URL component. protege caracteres reservados para transporte. | P50; width=15; rounds=4; PBKDF2=58000 |
| `hcx0991` | CONVERT | P50 | `url-decode` | Restauracion URL component. decodifica transporte URL. | P50; width=15; rounds=4; PBKDF2=58000 |
| `hcx0992` | TRANSFORM | P50 | `rotate-left` | Rotacion determinista a la izquierda. desplazamiento dependiente del perfil. | P50; width=15; rounds=4; PBKDF2=58000 |
| `hcx0993` | TRANSFORM | P50 | `rotate-right` | Rotacion determinista a la derecha. inversa conceptual de rotate-left. | P50; width=15; rounds=4; PBKDF2=58000 |
| `hcx0994` | TRANSFORM | P50 | `xor-mask` | Mascara XOR de laboratorio. salida hexadecimal; reversible con misma mascara. | P50; width=15; rounds=4; PBKDF2=58000 |
| `hcx0995` | TRANSFORM | P50 | `reverse-blocks` | Inversion por bloques. ancho = 4 + (perfil mod 13). | P50; width=15; rounds=4; PBKDF2=58000 |
| `hcx0996` | FORMAT | P50 | `chunk-delimit` | Segmentacion con guiones. ancho = 4 + (perfil mod 13). | P50; width=15; rounds=4; PBKDF2=58000 |
| `hcx0997` | ANALYZE | P50 | `window-sample` | Muestra determinista por ventana. offset guiado por SHA-256 y perfil. | P50; width=15; rounds=4; PBKDF2=58000 |
| `hcx0998` | FORMAT | P50 | `checksum-envelope` | Sobre con integridad SHA-256. domain \| SHA256 \| VALUE. | P50; width=15; rounds=4; PBKDF2=58000 |
| `hcx0999` | FORMAT | P50 | `json-envelope` | Sobre de transporte JSON. incluye dominio, perfil, valor y SHA-256. | P50; width=15; rounds=4; PBKDF2=58000 |
| `hcx1000` | ANALYZE | P50 | `entropy-report` | Reporte de entropia y perfil. chars, bytes, unique, entropy, estimatedBits y SHA-256. | P50; width=15; rounds=4; PBKDF2=58000 |
