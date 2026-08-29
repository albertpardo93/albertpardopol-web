const sharedParent = "fracturas-mano-muneca";

export const fractureCluster = {
  es: [
    {
      name: "Fractura de escafoides",
      slug: "fractura-escafoides",
      parentSlug: sharedParent,
      description: "Dolor en el lado del pulgar tras una caída: diagnóstico precoz y tratamiento de la fractura de escafoides.",
      detail: `<p>La <strong>fractura de escafoides</strong> afecta a uno de los huesos pequeños de la muñeca. Suele producirse al apoyar la mano en una caída y puede confundirse con un esguince porque la deformidad no siempre es visible.</p>
<h2>Síntomas y cuándo consultar</h2><p>El signo más típico es dolor en la base del pulgar o en la tabaquera anatómica, que aumenta al agarrar, empujar o mover la muñeca. Conviene valorar pronto el dolor persistente tras un traumatismo: algunas fracturas no se ven en la primera radiografía.</p>
<h2>Diagnóstico</h2><p>La exploración se completa con radiografías específicas. Si la sospecha clínica continúa, una resonancia o un TAC pueden confirmar la lesión, localizarla y valorar el desplazamiento. El escafoides tiene una vascularización delicada; retrasar el diagnóstico puede dificultar la consolidación.</p>
<h2>Tratamiento</h2><p>Las fracturas estables y no desplazadas pueden tratarse con inmovilización y controles radiológicos. Las desplazadas, inestables o con riesgo de falta de consolidación pueden requerir fijación con tornillo. La decisión depende de la localización, el desplazamiento, el tiempo desde la lesión y las necesidades de cada paciente.</p>
<h2>Recuperación</h2><p>El seguimiento comprueba la consolidación antes de aumentar cargas. Después se recuperan movilidad, fuerza y función de forma progresiva. Los plazos varían y no deben basarse solo en la desaparición del dolor.</p>`,
      faq: [
        { question: "¿Puede haber fractura con una radiografía normal?", answer: "Sí. Algunas fracturas de escafoides no son visibles al inicio; si persiste la sospecha pueden ser necesarias nuevas radiografías, resonancia o TAC." },
        { question: "¿Siempre necesita cirugía?", answer: "No. Muchas fracturas estables se tratan con inmovilización. La cirugía se valora cuando existe desplazamiento, inestabilidad o mayor riesgo de no consolidación." },
        { question: "¿Cuándo podré volver al deporte?", answer: "Depende de la consolidación, el tipo de tratamiento y el deporte. La vuelta debe ser progresiva y confirmada en los controles." },
      ],
      imageAlt: "Exploración de una fractura de escafoides en la muñeca",
      relatedSlugs: ["fractura-radio-distal", "fracturas-mano-muneca", "lesiones-deportivas-muneca"],
    },
    {
      name: "Fractura de radio distal",
      slug: "fractura-radio-distal",
      parentSlug: sharedParent,
      description: "Valoración y tratamiento de la fractura de muñeca o radio distal según desplazamiento, estabilidad y función.",
      detail: `<p>La <strong>fractura de radio distal</strong>, conocida como fractura de muñeca, aparece con frecuencia tras una caída sobre la mano extendida. Puede afectar a la alineación de la muñeca y, en ocasiones, a la superficie articular.</p>
<h2>Signos de alarma</h2><p>Dolor, hinchazón, hematoma, deformidad o dificultad para mover los dedos requieren valoración. Si hay entumecimiento, una herida, dedos fríos o cambio de color, la atención debe ser urgente.</p>
<h2>Pruebas y clasificación</h2><p>Las radiografías muestran la alineación y el patrón de fractura. El TAC resulta útil cuando la lesión alcanza la articulación o es compleja. También se revisan la sensibilidad, la circulación y posibles lesiones asociadas de ligamentos o del cúbito.</p>
<h2>Escayola o cirugía</h2><p>Una fractura estable y bien alineada puede tratarse con reducción, férula o yeso y controles sucesivos. Si pierde la posición, presenta desplazamiento relevante o compromete la articulación, puede indicarse cirugía, con frecuencia mediante placa y tornillos. Edad, calidad ósea, mano dominante y actividad ayudan a individualizar la decisión.</p>
<h2>Rehabilitación</h2><p>Se mantiene el movimiento de los dedos desde el principio cuando es posible. Tras la inmovilización se trabaja movilidad, fuerza y tareas cotidianas. La rigidez y la inflamación pueden tardar meses en desaparecer por completo.</p>`,
      faq: [
        { question: "¿Cómo sé si una fractura de muñeca necesita cirugía?", answer: "Se valora la alineación, la estabilidad, la afectación articular y las necesidades funcionales. Los controles radiológicos son importantes porque algunas fracturas se desplazan después." },
        { question: "¿Cuánto tiempo se lleva yeso?", answer: "Varía según el patrón y la consolidación. El especialista adapta la inmovilización y los controles a cada fractura." },
        { question: "¿Es normal que la muñeca quede rígida?", answer: "Es frecuente tras la inmovilización. La movilidad suele mejorar progresivamente con ejercicios y, cuando está indicado, terapia de mano." },
      ],
      imageAlt: "Radiografía y valoración clínica de una fractura de radio distal",
      relatedSlugs: ["fractura-escafoides", "fracturas-mano-muneca", "lesiones-deportivas-muneca"],
    },
    {
      name: "Fractura de metacarpiano",
      slug: "fractura-metacarpiano",
      parentSlug: sharedParent,
      description: "Diagnóstico de fracturas de metacarpiano y del boxeador, con atención a rotación, estabilidad y función de la mano.",
      detail: `<p>Los metacarpianos conectan la muñeca con los dedos. Una <strong>fractura de metacarpiano</strong> puede aparecer por un golpe, una caída o un impacto directo; la del cuello del quinto metacarpiano se conoce como fractura del boxeador.</p>
<h2>Síntomas importantes</h2><p>Son frecuentes el dolor, la inflamación, el hematoma y la pérdida del relieve del nudillo. Más importante que una pequeña deformidad estética es la rotación: al cerrar la mano, un dedo no debería cruzarse sobre otro.</p>
<h2>Cómo se diagnostica</h2><p>La exploración comprueba heridas, estabilidad, sensibilidad, tendones y alineación de los dedos. Las radiografías definen la zona y el desplazamiento; el TAC se reserva para fracturas articulares o complejas.</p>
<h2>Tratamiento conservador y quirúrgico</h2><p>Las fracturas estables y sin rotación pueden tratarse con inmovilización funcional y movilización controlada. Si hay rotación, acortamiento o angulación no aceptables, inestabilidad, herida o afectación articular, puede ser necesaria una reducción y fijación con agujas, tornillos o placa.</p>
<h2>Vuelta a la actividad</h2><p>El objetivo es proteger la consolidación sin mantener la mano inmóvil más tiempo del necesario. La carga, el trabajo manual y el deporte se reintroducen según el control clínico y radiológico.</p>`,
      faq: [
        { question: "¿Qué es la fractura del boxeador?", answer: "Es una fractura habitual del cuello del quinto metacarpiano, cerca del nudillo del dedo pequeño, normalmente tras golpear con el puño." },
        { question: "¿La pérdida del nudillo significa que hay que operar?", answer: "No necesariamente. La indicación depende sobre todo de la rotación, estabilidad, angulación, afectación articular y función." },
        { question: "¿Puedo mover los dedos?", answer: "Cuando el patrón es estable, el movimiento controlado puede ayudar a evitar rigidez, pero debe seguir las indicaciones del especialista." },
      ],
      imageAlt: "Valoración de una fractura de metacarpiano en la mano",
      relatedSlugs: ["fractura-dedo-falange", "fracturas-mano-muneca", "lesiones-tendinosas"],
    },
    {
      name: "Fractura de dedo o falange",
      slug: "fractura-dedo-falange",
      parentSlug: sharedParent,
      description: "Tratamiento de fracturas de falange y dedos para recuperar alineación, movilidad y estabilidad articular.",
      detail: `<p>Las <strong>fracturas de los dedos o falanges</strong> son frecuentes en caídas, golpes y deportes. Aunque parezcan pequeñas, una mala rotación o una fractura que alcanza la articulación puede limitar el movimiento y la pinza.</p>
<h2>Cuándo debe valorarse pronto</h2><p>Dolor localizado, hinchazón, deformidad, incapacidad para mover el dedo o un dedo que se cruza al cerrar la mano justifican una exploración. Una herida junto a la fractura, alteración de sensibilidad o cambio de color requiere atención urgente.</p>
<h2>Diagnóstico de la lesión</h2><p>Se examinan alineación, rotación, estabilidad, tendones y estado neurovascular. Las radiografías muestran qué falange está afectada y si la fractura entra en la articulación. Algunas lesiones incluyen luxación o daño tendinoso.</p>
<h2>Tratamiento</h2><p>Las fracturas estables pueden tratarse con sindactilia —unión temporal al dedo vecino— o una férula específica. Las inestables, rotadas, abiertas o articulares desplazadas pueden necesitar reducción y fijación. El método se elige para mantener la alineación permitiendo movilizar en cuanto sea seguro.</p>
<h2>Evitar la rigidez</h2><p>Los dedos desarrollan rigidez con rapidez. Por eso el seguimiento y los ejercicios indicados son parte esencial del tratamiento. La inflamación puede persistir incluso después de consolidar.</p>`,
      faq: [
        { question: "¿Un dedo fracturado siempre se inmoviliza?", answer: "Necesita protección, pero la forma y duración dependen de la estabilidad. Algunas fracturas permiten movimiento controlado precoz para reducir la rigidez." },
        { question: "¿Por qué importa que el dedo esté rotado?", answer: "La rotación puede hacer que los dedos se crucen al cerrar la mano y alterar el agarre; por eso debe corregirse aunque la radiografía parezca poco llamativa." },
        { question: "¿Cuándo se opera una fractura de falange?", answer: "Puede indicarse si es inestable, abierta, está rotada, afecta de forma desplazada a la articulación o no mantiene una alineación funcional." },
      ],
      imageAlt: "Exploración de una fractura de dedo o falange",
      relatedSlugs: ["fractura-metacarpiano", "fracturas-mano-muneca", "lesiones-tendinosas"],
    },
  ],
  ca: [
    {
      name: "Fractura d'escafoide",
      slug: "fractura-escafoides",
      parentSlug: sharedParent,
      description: "Dolor al costat del polze després d'una caiguda: diagnòstic precoç i tractament de la fractura d'escafoide.",
      detail: `<p>La <strong>fractura d'escafoide</strong> afecta un dels ossos petits del canell. Sol produir-se en recolzar la mà durant una caiguda i es pot confondre amb un esquinç perquè no sempre hi ha deformitat visible.</p><h2>Símptomes i diagnòstic</h2><p>El dolor a la base del polze o a la tabaquera anatòmica, sobretot en agafar o empènyer, és característic. Les radiografies inicials poden ser normals; si la sospita continua, la ressonància o el TAC permeten confirmar i definir la lesió.</p><h2>Tractament</h2><p>Les fractures estables i no desplaçades poden tractar-se amb immobilització i controls. Les desplaçades, inestables o amb risc de no consolidació poden requerir fixació amb cargol. La decisió considera localització, desplaçament, temps d'evolució i necessitats del pacient.</p><h2>Recuperació</h2><p>Abans d'augmentar càrregues cal comprovar la consolidació. Després es recuperen progressivament mobilitat, força i funció; els terminis varien segons cada patró.</p>`,
      faq: [
        { question: "Pot haver-hi fractura amb una radiografia normal?", answer: "Sí. Algunes fractures no són visibles al principi i poden requerir noves radiografies, ressonància o TAC." },
        { question: "Sempre necessita cirurgia?", answer: "No. Moltes fractures estables es tracten amb immobilització; la cirurgia es valora davant desplaçament, inestabilitat o risc de no consolidació." },
        { question: "Quan podré tornar a l'esport?", answer: "Depèn de la consolidació, el tractament i l'esport. La tornada ha de ser progressiva i confirmada als controls." },
      ],
      imageAlt: "Exploració d'una fractura d'escafoide al canell",
      relatedSlugs: ["fractura-radio-distal", "fracturas-mano-muneca", "lesiones-deportivas-muneca"],
    },
    {
      name: "Fractura de radi distal",
      slug: "fractura-radio-distal",
      parentSlug: sharedParent,
      description: "Valoració i tractament de la fractura de canell o radi distal segons desplaçament, estabilitat i funció.",
      detail: `<p>La <strong>fractura de radi distal</strong>, sovint anomenada fractura de canell, és freqüent després d'una caiguda sobre la mà estesa. Pot alterar l'alineació i afectar la superfície articular.</p><h2>Símptomes i proves</h2><p>Dolor, inflor, hematoma, deformitat o dificultat per moure els dits requereixen valoració. Les radiografies defineixen l'alineació; el TAC és útil en fractures articulars o complexes. Entumiment, ferida o dits freds exigeixen atenció urgent.</p><h2>Guix o cirurgia</h2><p>Una fractura estable i ben alineada es pot tractar amb reducció, fèrula o guix i controls radiològics. Si perd la posició, està molt desplaçada o compromet l'articulació, es pot indicar cirurgia amb placa i cargols. La decisió s'individualitza segons edat, os i activitat.</p><h2>Rehabilitació</h2><p>Quan és possible, es mouen els dits des del principi. Després de la immobilització es treballen mobilitat, força i activitats quotidianes; la rigidesa i la inflor poden millorar durant mesos.</p>`,
      faq: [
        { question: "Com se sap si necessita cirurgia?", answer: "Es valoren alineació, estabilitat, afectació articular i necessitats funcionals, amb controls perquè algunes fractures es desplacen després." },
        { question: "Quant de temps cal portar guix?", answer: "Depèn del patró i la consolidació. L'especialista adapta la immobilització i els controls." },
        { question: "És normal que el canell quedi rígid?", answer: "És freqüent després de la immobilització i acostuma a millorar amb exercicis progressius i, si cal, teràpia de mà." },
      ],
      imageAlt: "Valoració d'una fractura de radi distal al canell",
      relatedSlugs: ["fractura-escafoides", "fracturas-mano-muneca", "lesiones-deportivas-muneca"],
    },
    {
      name: "Fractura de metacarpià",
      slug: "fractura-metacarpiano",
      parentSlug: sharedParent,
      description: "Diagnòstic de fractures de metacarpià i del boxejador, amb atenció a rotació, estabilitat i funció.",
      detail: `<p>Els metacarpians connecten el canell amb els dits. Una <strong>fractura de metacarpià</strong> pot aparèixer per un cop, una caiguda o un impacte directe; la del coll del cinquè metacarpià es coneix com a fractura del boxejador.</p><h2>Exploració i diagnòstic</h2><p>Són habituals dolor, inflor, hematoma i pèrdua del relleu del artell. Cal comprovar sobretot la rotació: en tancar la mà un dit no hauria de creuar-se sobre un altre. Les radiografies defineixen el desplaçament.</p><h2>Tractament</h2><p>Les fractures estables i sense rotació poden tractar-se amb immobilització funcional i moviment controlat. Si hi ha rotació, angulació o escurçament no acceptables, inestabilitat, ferida o afectació articular, pot caldre reducció i fixació amb agulles, cargols o placa.</p><h2>Tornada a l'activitat</h2><p>L'objectiu és protegir la consolidació evitant immobilitzar més temps del necessari. La càrrega, el treball manual i l'esport es reprenen segons els controls clínics i radiològics.</p>`,
      faq: [
        { question: "Què és la fractura del boxejador?", answer: "És la fractura del coll del cinquè metacarpià, prop de l'artell del dit petit, habitualment després de colpejar amb el puny." },
        { question: "Perdre el relleu de l'artell obliga a operar?", answer: "No necessàriament. La indicació depèn sobretot de la rotació, estabilitat, angulació, articulació i funció." },
        { question: "Puc moure els dits?", answer: "En patrons estables, el moviment controlat pot prevenir rigidesa, sempre seguint les indicacions de l'especialista." },
      ],
      imageAlt: "Valoració d'una fractura de metacarpià a la mà",
      relatedSlugs: ["fractura-dedo-falange", "fracturas-mano-muneca", "lesiones-tendinosas"],
    },
    {
      name: "Fractura de dit o falange",
      slug: "fractura-dedo-falange",
      parentSlug: sharedParent,
      description: "Tractament de fractures de falange i dits per recuperar alineació, mobilitat i estabilitat articular.",
      detail: `<p>Les <strong>fractures dels dits o falanges</strong> són freqüents en caigudes, cops i esports. Una rotació incorrecta o una fractura articular pot limitar el moviment i la pinça.</p><h2>Quan consultar</h2><p>Dolor, inflor, deformitat, incapacitat per moure el dit o creuament en tancar la mà requereixen exploració. Una ferida, pèrdua de sensibilitat o canvi de color exigeixen atenció urgent.</p><h2>Diagnòstic</h2><p>S'examinen alineació, rotació, estabilitat, tendons i circulació. Les radiografies indiquen la falange afectada i si la fractura entra a l'articulació; també poden coexistir luxacions o lesions tendinoses.</p><h2>Tractament i mobilitat</h2><p>Les fractures estables poden protegir-se unint temporalment el dit al veí o amb una fèrula. Les inestables, rotades, obertes o articulars desplaçades poden necessitar reducció i fixació. Els dits es tornen rígids ràpidament, de manera que el seguiment i els exercicis indicats són essencials.</p>`,
      faq: [
        { question: "Un dit fracturat sempre s'immobilitza?", answer: "Necessita protecció, però la forma i la durada depenen de l'estabilitat; algunes fractures permeten moviment controlat precoç." },
        { question: "Per què importa la rotació?", answer: "Pot fer que els dits es creuin en tancar la mà i alterar l'agafada, per això cal corregir-la." },
        { question: "Quan s'opera una fractura de falange?", answer: "Es pot indicar si és inestable, oberta, rotada, articular desplaçada o no manté una alineació funcional." },
      ],
      imageAlt: "Exploració d'una fractura de dit o falange",
      relatedSlugs: ["fractura-metacarpiano", "fracturas-mano-muneca", "lesiones-tendinosas"],
    },
  ],
  en: [
    {
      name: "Scaphoid fracture",
      slug: "fractura-escafoides",
      parentSlug: sharedParent,
      description: "Thumb-side wrist pain after a fall: early diagnosis and treatment of a scaphoid fracture in Barcelona.",
      detail: `<p>A <strong>scaphoid fracture</strong> affects one of the small wrist bones. It often follows a fall onto an outstretched hand and may be mistaken for a sprain because there is not always visible deformity.</p><h2>Symptoms and diagnosis</h2><p>Pain at the base of the thumb or in the anatomical snuffbox, especially when gripping or pushing, is typical. Early X-rays may look normal. If clinical suspicion remains, MRI or CT can confirm the fracture and assess its position.</p><h2>Treatment options</h2><p>Stable, undisplaced fractures may be managed with immobilisation and imaging follow-up. Displaced or unstable fractures, and those with a higher risk of non-union, may need screw fixation. Location, displacement, time from injury and individual needs guide the decision.</p><h2>Recovery</h2><p>Healing should be confirmed before loads increase. Wrist movement, strength and function are then restored progressively; timing varies with the fracture and treatment.</p>`,
      faq: [
        { question: "Can I have a scaphoid fracture with a normal X-ray?", answer: "Yes. Some fractures are not visible initially, so repeat X-rays, MRI or CT may be needed when suspicion remains." },
        { question: "Does every scaphoid fracture need surgery?", answer: "No. Many stable fractures heal in a cast. Surgery is considered for displacement, instability or a higher risk of non-union." },
        { question: "When can I return to sport?", answer: "This depends on confirmed healing, treatment and the sport. Return should be gradual and guided by follow-up." },
      ],
      imageAlt: "Clinical assessment of a scaphoid fracture in the wrist",
      relatedSlugs: ["fractura-radio-distal", "fracturas-mano-muneca", "lesiones-deportivas-muneca"],
    },
    {
      name: "Distal radius fracture",
      slug: "fractura-radio-distal",
      parentSlug: sharedParent,
      description: "Assessment and treatment of a distal radius or wrist fracture based on alignment, stability and function.",
      detail: `<p>A <strong>distal radius fracture</strong>, often called a broken wrist, commonly follows a fall onto an outstretched hand. It can alter wrist alignment and sometimes extends into the joint.</p><h2>Symptoms and tests</h2><p>Pain, swelling, bruising, deformity or difficulty moving the fingers need assessment. X-rays define alignment and fracture pattern; CT can clarify complex joint involvement. Numbness, an open wound or cold, discoloured fingers require urgent care.</p><h2>Cast or surgery</h2><p>A stable, well-aligned fracture may be treated with reduction, a splint or cast and repeat imaging. A fracture that loses position, is substantially displaced or disrupts the joint may require surgery, commonly with a plate and screws. Age, bone quality, hand dominance and activity are considered.</p><h2>Rehabilitation</h2><p>Finger movement is encouraged early when safe. After immobilisation, mobility, strength and daily tasks are restored progressively. Swelling and stiffness can continue improving for several months.</p>`,
      faq: [
        { question: "How do you decide whether surgery is needed?", answer: "Alignment, stability, joint involvement and functional needs are assessed, with follow-up X-rays because some fractures move after the injury." },
        { question: "How long will I need a cast?", answer: "It varies with the fracture pattern and healing. Immobilisation and review are tailored to each patient." },
        { question: "Is wrist stiffness normal?", answer: "It is common after immobilisation and usually improves with progressive exercises and hand therapy when indicated." },
      ],
      imageAlt: "X-ray and clinical assessment of a distal radius fracture",
      relatedSlugs: ["fractura-escafoides", "fracturas-mano-muneca", "lesiones-deportivas-muneca"],
    },
    {
      name: "Metacarpal fracture",
      slug: "fractura-metacarpiano",
      parentSlug: sharedParent,
      description: "Diagnosis of metacarpal and boxer's fractures, with attention to rotation, stability and hand function.",
      detail: `<p>The metacarpals connect the wrist to the fingers. A <strong>metacarpal fracture</strong> can follow a punch, fall or direct impact; a fracture at the neck of the fifth metacarpal is commonly called a boxer's fracture.</p><h2>Assessment</h2><p>Pain, swelling, bruising and a flattened knuckle are common. Rotation is particularly important: when making a fist, one finger should not cross over another. Examination checks skin, tendons, sensation, stability and alignment, while X-rays define displacement.</p><h2>Non-surgical and surgical treatment</h2><p>Stable fractures without rotation may be treated with functional immobilisation and controlled movement. Unacceptable rotation, shortening or angulation, instability, an open wound or joint involvement may require reduction and fixation with wires, screws or a plate.</p><h2>Return to activity</h2><p>The aim is to protect healing without immobilising longer than necessary. Loading, manual work and sport are resumed according to clinical and imaging follow-up.</p>`,
      faq: [
        { question: "What is a boxer's fracture?", answer: "It is a fracture of the fifth metacarpal neck near the little-finger knuckle, often caused by punching a hard object." },
        { question: "Does a flattened knuckle always require surgery?", answer: "Not necessarily. Rotation, stability, angulation, joint involvement and function matter more to the decision." },
        { question: "Can I move my fingers?", answer: "For stable patterns, guided early movement can reduce stiffness, but it should follow the specialist's instructions." },
      ],
      imageAlt: "Assessment of a metacarpal fracture in the hand",
      relatedSlugs: ["fractura-dedo-falange", "fracturas-mano-muneca", "lesiones-tendinosas"],
    },
    {
      name: "Finger or phalanx fracture",
      slug: "fractura-dedo-falange",
      parentSlug: sharedParent,
      description: "Treatment of finger and phalanx fractures to restore alignment, movement and joint stability.",
      detail: `<p><strong>Finger or phalanx fractures</strong> are common after falls, impacts and sport. Even a small fracture can affect grip when there is rotation or displaced joint involvement.</p><h2>When to seek assessment</h2><p>Local pain, swelling, deformity, inability to move the finger or crossing when making a fist should be examined. A nearby wound, altered sensation or colour change requires urgent attention.</p><h2>Diagnosis</h2><p>Assessment covers alignment, rotation, stability, tendons, sensation and circulation. X-rays show the affected phalanx and joint involvement; dislocation or tendon damage may coexist.</p><h2>Treatment and movement</h2><p>Stable fractures can be protected by buddy strapping to the neighbouring finger or a specific splint. Unstable, rotated, open or displaced joint fractures may require reduction and fixation. Fingers stiffen quickly, so follow-up and appropriately timed exercises are essential.</p>`,
      faq: [
        { question: "Does a broken finger always need immobilisation?", answer: "It needs protection, but the type and duration depend on stability. Some fractures allow early controlled movement to limit stiffness." },
        { question: "Why does finger rotation matter?", answer: "Rotation can make fingers cross when making a fist and impair grip, so it needs careful assessment and correction." },
        { question: "When is surgery considered?", answer: "It may be needed for unstable, open, rotated or displaced joint fractures, or when functional alignment cannot be maintained." },
      ],
      imageAlt: "Clinical assessment of a finger or phalanx fracture",
      relatedSlugs: ["fractura-metacarpiano", "fracturas-mano-muneca", "lesiones-tendinosas"],
    },
  ],
} as const;
