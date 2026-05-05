# Plantillas para automatización (WhatsApp, Email, SMS)

> **Estado:** plantillas listas. Pendiente desplegar fase de automatización (campañas por WhatsApp + correo).
> **Creado:** 2026-05-05

---

## 1. SOLICITUD DE RESEÑA — WhatsApp (post-cita)

**Cuándo enviar:** 24-48h después de la cita, solo a pacientes con buena experiencia.

```
Hola [Nombre], muchas gracias por venir a Dentimagen [Norte/Cumbayá] 🦷

¿Nos ayudas con una reseña en Google? Solo toma 1 minuto.

👉 [LINK_RESENA_SEDE]

💡 Tip: si puedes mencionar qué tratamiento te hiciste (implante, ortodoncia, limpieza, etc.) y cómo fue tu experiencia, ayuda muchísimo a que otros pacientes te encuentren.

¡Gracias!
Equipo Dentimagen
```

**Variables a personalizar:**
- `[Nombre]` → primer nombre del paciente
- `[Norte/Cumbayá]` → sede según el origen de la cita
- `[LINK_RESENA_SEDE]` → link directo de reseña de la sede correspondiente (pendiente generar)

**Por qué funciona el tip de keywords:**
Google escanea el texto de las reseñas buscando keywords (servicios + ubicación). Reseñas con "implante dental Cumbayá" o "ortodoncia Quito Norte" hacen que el negocio rankee mejor para esas búsquedas. La sugerencia del tip guía al paciente a incluirlas naturalmente sin parecer guion.

---

## 2. RESPUESTA A RESEÑA POSITIVA (5★)

```
Muchas gracias [Nombre] por tu confianza. Nos alegra haberte ayudado con tu [tratamiento mencionado]. Te esperamos en tu próxima cita 🦷
```

---

## 3. RESPUESTA A RESEÑA NEUTRA (3-4★)

```
Gracias por tu reseña [Nombre]. Nos gustaría conocer cómo podemos mejorar tu próxima visita. Por favor escríbenos al WhatsApp +593 994236117 para conversarlo.
```

---

## 4. RESPUESTA A RESEÑA NEGATIVA (1-2★) — NUNCA discutir públicamente

```
Hola [Nombre], lamentamos que tu experiencia no haya sido la esperada. Nos importa mucho entender qué pasó. Por favor escríbenos al WhatsApp +593 994236117 para conversarlo en privado y resolverlo.
```

**Reglas de oro al responder negativas:**
- Responder en menos de 24h
- Nunca dar detalles del caso clínico (HIPAA / privacidad)
- Nunca decir "esto es mentira" o defenderse públicamente
- Siempre llevar la conversación a privado
- Una mala reseña respondida con elegancia se ve mejor que sin respuesta

---

## 5. PENDIENTES PARA LA FASE DE AUTOMATIZACIÓN

Cuando arranque la fase de automatización, necesitamos:

### Datos a recopilar
- [ ] Link directo de reseña Sede Norte
- [ ] Link directo de reseña Sede Cumbayá
- [ ] Lista de pacientes históricos con consentimiento de marketing (LOPD/ARCOTEL)
- [ ] CRM o sistema donde se guardan las citas (¿Excel, Google Sheets, software dental?)
- [ ] Email del cliente para campañas

### Herramientas a evaluar
- **WhatsApp Business API** (oficial) vs **WhatsApp Business App** (manual)
- **Email marketing:** Mailchimp, Brevo (Sendinblue), Resend
- **Automatización de citas:** Calendly, Bookify, Cliengo
- **CRM dental específico:** Dentimax, Doctoralia Pro, Helo

### Plantillas adicionales que necesitaremos
- Recordatorio de cita (24h antes)
- Confirmación de cita
- Bienvenida a nuevo paciente
- Recordatorio de limpieza semestral (cada 6 meses)
- Newsletter mensual con tips dentales
- Promoción estacional (blanqueamiento, ortodoncia)
- Recuperación de pacientes inactivos (>1 año sin venir)

---

## 6. CONSIDERACIONES LEGALES

Para enviar campañas masivas en Ecuador:
- **Consentimiento previo:** todo paciente debe haber aceptado recibir comunicaciones de marketing
- **Opt-out:** cada mensaje debe permitir darse de baja fácilmente
- **LOPDP Ecuador (Ley Orgánica de Protección de Datos):** vigente desde 2021
- **Política de privacidad** del sitio web debe mencionar el uso de datos para marketing

Las páginas legales del sitio (`politica-de-privacidad.html` y `politica-de-cookies.html`) ya cubren esto. Verificar que el formulario de contacto/agendamiento tenga checkbox de consentimiento marketing.
