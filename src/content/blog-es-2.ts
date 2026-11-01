import type { Article } from "./blog";

/** Spanish versions of the guides in blog-fr-2.ts; `key` is the French slug. */
export const ARTICLES_ES_2: Omit<Article, "locale">[] = [
  {
    key: "taille-de-position",
    slug: "tamano-de-posicion",
    title: "Tamaño de posición: cuánto arriesgar en una operación",
    description:
      "La regla del porcentaje de capital arriesgado, el cálculo paso a paso a partir del stop y los errores que convierten una mala racha en una cuenta vacía.",
    date: "2026-11-01",
    body: [
      {
        p: "La mayoría de las cuentas no se hunden por una mala operación, sino por una operación demasiado grande. El tamaño de posición es la única variable que controlas por completo: el mercado decide si tienes razón, tú decides cuánto te cuesta cuando te equivocas.",
      },
      { h2: "Parte del riesgo, no de la apuesta" },
      {
        p: "La pregunta no es «¿cuánto meto?», sino «¿cuánto acepto perder si salta mi stop?». Muchos traders fijan esa cantidad en un pequeño porcentaje de su capital, a menudo entre el **0,5 % y el 2 %** por operación. Con 5.000 € y una regla del 1 %, la pérdida máxima prevista en una operación es de 50 €.",
      },
      {
        p: "Parece poco. Es a propósito: con un 1 % de riesgo, diez pérdidas seguidas, algo que le pasa a todo el mundo, cuestan alrededor de un 10 % de la cuenta. Con un 10 % de riesgo por operación, la misma racha cuesta más de un 65 %.",
      },
      { h2: "El cálculo, en tres pasos" },
      {
        ol: [
          "**La cantidad en riesgo**: capital × porcentaje. 5.000 € × 1 % = 50 €.",
          "**La distancia al stop**: diferencia entre la entrada y el stop. Entrada en 100 €, stop en 96 €: 4 € por unidad.",
          "**El tamaño**: cantidad en riesgo ÷ distancia al stop. 50 € ÷ 4 € = 12,5 unidades, unos 1.250 € de posición.",
        ],
      },
      {
        p: "Es el stop el que fija el tamaño, y no al revés. Un stop amplio da una posición pequeña; un stop ajustado, una más grande, para la misma pérdida posible. Si aún no sabes dónde ponerlo, lee primero [dónde poner el stop loss](/blog/donde-poner-el-stop-loss): un stop puesto al azar falsea todo el cálculo.",
      },
      { tip: "En forex o CFD, razona en valor del punto o del pip: el principio es el mismo, cantidad en riesgo ÷ (distancia al stop × valor de un punto)." },
      { h2: "El apalancamiento no cambia el riesgo" },
      {
        p: "El apalancamiento reduce el dinero inmovilizado para abrir una posición, no la pérdida si salta el stop. Una posición de 1.250 € con apalancamiento x10 inmoviliza 125 €, pero sigue perdiendo 50 € si el precio va de 100 a 96. El peligro llega cuando el apalancamiento sirve para abrir posiciones mucho mayores de lo que permite el cálculo.",
      },
      { h2: "Los errores que más cuestan" },
      {
        ul: [
          "**Aumentar el tamaño tras una pérdida** para «recuperarse»: el camino más corto hacia la gran pérdida.",
          "**Alejar el stop** una vez dentro: el riesgo real ya no es el que habías calculado.",
          "**Acumular posiciones correlacionadas**: tres compras en tres criptos que se mueven juntas son un solo riesgo grande, no tres pequeños.",
          "**Olvidar comisiones y deslizamiento**: con stops muy ajustados, pesan una parte importante de la pérdida.",
        ],
      },
      { h2: "Tamaño y ratio riesgo/beneficio van juntos" },
      {
        p: "Un tamaño bien calculado limita la pérdida; el [ratio riesgo/beneficio](/blog/ratio-riesgo-beneficio) dice si la operación merece la pena. Arriesgar 50 € para buscar 40 € solo tiene sentido si aciertas muy a menudo. Buscar 100 € o más con el mismo riesgo deja un margen de error mucho más cómodo.",
      },
      {
        p: "Un análisis de [Scanzivo](/) da la entrada, el stop y los objetivos de cada escenario: te queda aplicar tu porcentaje para obtener el tamaño. Es intencionado, porque la cantidad depende de tu capital y de tu tolerancia al riesgo, que solo tú conoces.",
      },
    ],
  },
  {
    key: "calendrier-economique",
    slug: "calendario-economico",
    title: "Calendario económico: los anuncios que mueven los mercados",
    description:
      "Tipos de interés, inflación, empleo, resultados empresariales: las publicaciones que generan volatilidad y cómo integrarlas en tu análisis técnico.",
    date: "2026-11-01",
    body: [
      {
        p: "Un gráfico perfecto puede quedar barrido en un minuto por un anuncio de un banco central. El análisis técnico dice dónde están los niveles; el calendario económico dice cuándo el mercado puede atravesarlos sin avisar. Los dos se complementan.",
      },
      { h2: "Los anuncios que más cuentan" },
      { h3: "Los bancos centrales" },
      {
        p: "Las decisiones de tipos de la Reserva Federal estadounidense (Fed) y del Banco Central Europeo (BCE), y sobre todo las ruedas de prensa posteriores, están entre los momentos más agitados del año. El dólar, el euro, el oro, los índices y las criptomonedas suelen reaccionar a la vez.",
      },
      { h3: "La inflación" },
      {
        p: "El índice de precios al consumo (CPI en Estados Unidos) influye directamente en lo que los mercados esperan de los bancos centrales. Un dato muy por encima o por debajo de las previsiones puede provocar movimientos de varios puntos porcentuales en los activos más volátiles.",
      },
      { h3: "El empleo" },
      {
        p: "El informe mensual de empleo estadounidense (NFP), publicado normalmente el primer viernes del mes a las 14:30 hora peninsular española, es una de las citas más seguidas del forex.",
      },
      { h3: "Los resultados empresariales" },
      {
        p: "En una acción, la publicación trimestral de resultados puede abrir la sesión siguiente lejos del cierre anterior. Un soporte, o un stop puesto justo debajo, no ofrece entonces ninguna protección: el precio salta por encima.",
      },
      { h2: "Lo que cuenta es la sorpresa" },
      {
        p: "El mercado no reacciona al dato en sí, sino a la diferencia con lo que esperaba. Una inflación a la baja puede hundir un activo si baja menos de lo previsto. Por eso los calendarios muestran siempre tres valores: el anterior, el consenso y el publicado.",
      },
      { h2: "Cómo tenerlo en cuenta en una operación" },
      {
        ul: [
          "**Mira el calendario antes de entrar**: una operación pensada para unas horas no tiene el mismo riesgo si cae un anuncio importante en medio.",
          "**Evita entrar justo antes** de una publicación fuerte: el diferencial se amplía y el precio puede tocar tu stop antes de ir a tu favor.",
          "**Reduce el tamaño** si mantienes una posición durante el anuncio (consulta [el tamaño de posición](/blog/tamano-de-posicion)).",
          "**Espera la reacción**: dejar pasar los primeros minutos y ver si el precio aguanta o rompe los niveles suele ser más legible.",
        ],
      },
      { tip: "Los calendarios suelen mostrar las horas en hora de Nueva York o en UTC. Comprueba la zona horaria: un error de una hora basta para estar dentro en el peor momento." },
      { h2: "Técnico y macro: dos lecturas del mismo mercado" },
      {
        p: "Los [soportes y resistencias](/blog/soportes-y-resistencias) siguen siendo las referencias del plan; el calendario dice cuándo esas referencias pueden ponerse a prueba con violencia. Un buen análisis cruza ambos en lugar de elegir uno.",
      },
      {
        p: "Es lo que hace el pack Pro de [Scanzivo](/): con cada análisis de gráfico, la IA recoge los anuncios de los próximos 7 días y las noticias recientes sobre el activo, con sus fuentes, y explica cómo tenerlos en cuenta en el plan. No predice el dato: evita que te sorprenda la fecha.",
      },
    ],
  },
  {
    key: "choisir-son-unite-de-temps",
    slug: "elegir-temporalidad",
    title: "¿Qué temporalidad elegir para operar?",
    description:
      "1 minuto, 1 hora, diario: lo que cambia la temporalidad, cuál encaja con tu horario y por qué mirar la superior.",
    date: "2026-11-01",
    body: [
      {
        p: "Un mismo activo puede ser alcista en 4 horas y bajista en diario. No es una contradicción: cada temporalidad cuenta una parte distinta de la historia. Elegir la tuya es, sobre todo, elegir el ritmo al que puedes seguir tus posiciones.",
      },
      { h2: "Lo que cambia la temporalidad" },
      {
        p: "Cuanto más corta, más velas, más señales y más ruido. En 1 minuto, un movimiento de unos segundos parece una tendencia. En diario, cada vela resume una sesión entera: las señales son más escasas pero más sólidas, y los stops más amplios.",
      },
      { h2: "Los grandes estilos" },
      {
        ul: [
          "**Scalping (1 a 5 minutos)**: decenas de operaciones al día, atención constante, comisiones que pesan mucho. Difícil de compaginar con un trabajo.",
          "**Day trading (15 minutos a 1 hora)**: posiciones abiertas y cerradas en el día. Exige estar disponible en las horas activas del mercado.",
          "**Swing trading (4 horas a diario)**: posiciones de unos días a unas semanas. Compatible con un trabajo: miras el gráfico una o dos veces al día.",
          "**Posición (semanal)**: tendencias de varios meses, muy pocas decisiones.",
        ],
      },
      { tip: "Elige la temporalidad según el tiempo que puedes pasar frente a la pantalla, no según la que promete más oportunidades." },
      { h2: "Mira siempre una temporalidad por encima" },
      {
        p: "La tendencia de fondo se lee en la temporalidad superior; las entradas, en la tuya. Si operas en 1 hora, el gráfico de 4 horas te dice hacia dónde va la corriente. Comprar una señal alcista en 1 hora mientras el de 4 horas y el diario bajan es nadar contra corriente.",
      },
      {
        p: "Un método sencillo mantiene una relación de 4 a 6 entre temporalidades: diario para la dirección, 4 horas para el plan, 1 hora para la entrada. Los niveles trazados en la temporalidad superior, como los [soportes y resistencias](/blog/soportes-y-resistencias), cuentan más que los de abajo.",
      },
      { h2: "Errores frecuentes" },
      {
        ul: [
          "**Cambiar de temporalidad en mitad de una operación** para encontrar un gráfico que te dé la razón.",
          "**Bajar de temporalidad tras una pérdida** para recuperarte más rápido.",
          "**Usar un stop pensado para 1 minuto** en una posición que mantienes varios días, o al revés.",
        ],
      },
      { h2: "El horizonte de un análisis depende de su temporalidad" },
      {
        p: "Un escenario leído en 15 minutos vale para unas horas; en diario, para días o semanas. Por eso [Scanzivo](/) indica el horizonte de validez de cada análisis a partir de la temporalidad visible en tu captura. Asegúrate de que se vea bien, como se explica en la [guía de la captura de pantalla](/blog/captura-de-pantalla-grafico).",
      },
    ],
  },
  {
    key: "chandeliers-japonais",
    slug: "velas-japonesas",
    title: "Velas japonesas: los patrones que merecen tu atención",
    description:
      "Martillo, envolvente, estrella fugaz, doji: cómo leer los patrones de velas más útiles y por qué su ubicación cuenta más que su forma.",
    date: "2026-11-01",
    body: [
      {
        p: "Existen decenas de patrones de velas japonesas, muchos con nombres poéticos. Para la práctica basta con unos pocos, y una regla importa más que todas: un patrón no significa nada por sí solo, cobra sentido en un lugar concreto del gráfico.",
      },
      {
        p: "Si estás empezando, empieza por [cómo leer un gráfico de trading](/blog/como-leer-un-grafico-de-trading): cuerpo, mechas, apertura y cierre son la base de todo lo que sigue.",
      },
      { h2: "El martillo y la estrella fugaz" },
      {
        p: "El **martillo** tiene un cuerpo pequeño arriba y una mecha inferior larga, al menos el doble del cuerpo. Muestra que los vendedores empujaron el precio hacia abajo y que los compradores lo recuperaron todo antes del cierre. Tras una caída, sobre un soporte, es una señal de rechazo.",
      },
      {
        p: "La **estrella fugaz** es su reflejo: cuerpo pequeño abajo, mecha superior larga. Tras una subida, bajo una resistencia, indica que los compradores no lograron mantener los máximos.",
      },
      { h2: "La envolvente" },
      {
        p: "Una **envolvente alcista** es una vela verde cuyo cuerpo cubre por completo el de la vela roja anterior. Los compradores no solo frenaron la caída: recuperaron más de lo que habían ganado los vendedores. La envolvente bajista es lo contrario. Es uno de los patrones más claros, sobre todo en temporalidades altas.",
      },
      { h2: "El doji" },
      {
        p: "Un **doji** abre y cierra casi al mismo precio: el cuerpo es una simple línea. Refleja indecisión. Por sí solo no dice hacia dónde irá el mercado; tras una tendencia larga, indica sobre todo que el impulso se agota.",
      },
      { h2: "Lo que hace fiable un patrón" },
      {
        ul: [
          "**La ubicación**: un martillo en mitad de la nada no vale nada; sobre un soporte probado varias veces, cuenta.",
          "**La temporalidad**: un patrón en diario pesa mucho más que en 5 minutos (consulta [qué temporalidad elegir](/blog/elegir-temporalidad)).",
          "**La confirmación**: esperar a que la vela siguiente vaya en el sentido anunciado evita muchas señales falsas.",
          "**El volumen**, cuando está disponible: una envolvente con volumen alto convence más.",
        ],
      },
      { tip: "Un patrón de velas sirve para activar una entrada cerca de un nivel que ya tenías localizado. No sustituye a ese nivel." },
      { h2: "Los patrones se leen con el resto" },
      {
        p: "Las velas describen el comportamiento de una o dos velas; los [patrones chartistas](/blog/patrones-chartistas) describen la forma de decenas de ellas. Las mejores señales llegan cuando ambos cuentan lo mismo, por ejemplo una envolvente alcista en el mínimo de un doble suelo.",
      },
      {
        p: "En un análisis de [Scanzivo](/), la IA señala los patrones visibles en tu captura e indica, para cada uno, lo que implica y en qué nivel. Así puedes comprobar su lectura en el gráfico en lugar de creerla a ciegas.",
      },
    ],
  },
  {
    key: "figures-chartistes",
    slug: "patrones-chartistas",
    title: "Patrones chartistas que debes conocer: hombro-cabeza-hombro, doble techo, triángulos",
    description:
      "Cómo reconocer los patrones chartistas más comunes, dónde está su línea de ruptura, cómo calcular un objetivo y cuándo desconfiar.",
    date: "2026-11-01",
    body: [
      {
        p: "Los patrones chartistas son formas que el precio dibuja a lo largo de decenas de velas, cuando compradores y vendedores se disputan una zona. No predicen nada con certeza, pero dan tres datos útiles: dónde se activa el escenario, dónde falla y hasta dónde puede llegar.",
      },
      { h2: "Patrones de cambio de tendencia" },
      { h3: "Hombro-cabeza-hombro" },
      {
        p: "Tres máximos, el del medio (la cabeza) más alto que los otros dos (los hombros). La línea que une los dos mínimos se llama **línea clavicular**. Mientras aguanta, solo es una duda; un cierre claro por debajo valida el patrón. La versión invertida, al final de una tendencia bajista, anuncia una posible recuperación.",
      },
      { h3: "Doble techo y doble suelo" },
      {
        p: "El precio choca dos veces con el mismo nivel y se gira. El **doble techo** dibuja una M; el doble suelo, una W. La validación llega cuando el precio rompe el mínimo (o el máximo) situado entre los dos intentos. Antes de eso, solo es una [resistencia](/blog/soportes-y-resistencias) que ha aguantado dos veces.",
      },
      { h2: "Patrones de continuación" },
      { h3: "Los triángulos" },
      {
        p: "El precio se estrecha entre dos rectas. Un **triángulo ascendente** (resistencia horizontal, mínimos cada vez más altos) muestra compradores cada vez más impacientes. El triángulo descendente es lo contrario. Un triángulo simétrico solo dice que el mercado duda: la ruptura marca la dirección.",
      },
      { h3: "Banderas y banderines" },
      {
        p: "Tras un movimiento rápido (el mástil), el precio hace una breve pausa con una ligera pendiente contraria. Si la pausa termina con una ruptura en el sentido del mástil, la tendencia suele continuar.",
      },
      { h2: "Medir un objetivo" },
      {
        p: "El método clásico proyecta la altura del patrón desde el punto de ruptura. En un hombro-cabeza-hombro, se mide la distancia entre la cabeza y la línea clavicular y se proyecta por debajo de ella. Es un orden de magnitud, no una promesa: el precio a menudo se detiene antes, en un soporte intermedio.",
      },
      { tip: "Compara ese objetivo con tu stop antes de entrar. Si el [ratio riesgo/beneficio](/blog/ratio-riesgo-beneficio) es inferior a 1, el patrón puede ser bonito y la operación mala." },
      { h2: "Cuándo desconfiar" },
      {
        ul: [
          "**Antes de la ruptura**: un patrón no validado es solo una hipótesis. Muchos «hombro-cabeza-hombro» nunca rompen su línea clavicular.",
          "**Las falsas rupturas**: el precio sale y vuelve a entrar en el patrón. Esperar un cierre, o incluso un retest, filtra parte de estas trampas.",
          "**Las temporalidades bajas**: en 1 minuto se ven patrones por todas partes.",
          "**El contexto**: un patrón de giro contra una tendencia de fondo muy fuerte falla más a menudo.",
        ],
      },
      { h2: "¿Ver un patrón o proyectarlo?" },
      {
        p: "El riesgo principal es ver lo que uno quiere ver. Una mirada externa ayuda: es uno de los usos más útiles del [análisis técnico con IA](/blog/analisis-tecnico-con-ia). En una captura, [Scanzivo](/) nombra los patrones que detecta, su línea de validación y lo que invalidaría el escenario.",
      },
    ],
  },
  {
    key: "rsi-indicateur",
    slug: "indicador-rsi",
    title: "El RSI: cómo leerlo sin caer en las trampas",
    description:
      "Lo que mide realmente el RSI, por qué «sobrevendido» no significa «comprar» y cómo usar las divergencias y la línea de 50.",
    date: "2026-11-01",
    body: [
      {
        p: "El RSI (Relative Strength Index) es probablemente el indicador más presente en los gráficos. También es uno de los peor utilizados: muchos principiantes compran en cuanto baja de 30 y luego ven cómo el precio sigue cayendo.",
      },
      { h2: "Lo que mide el RSI" },
      {
        p: "El RSI compara el tamaño de las subidas y bajadas recientes, normalmente sobre **14 periodos**, y lleva el resultado a una escala de 0 a 100. Por encima de 70, las subidas recientes han sido mucho más fuertes que las bajadas; por debajo de 30, lo contrario. Mide la **velocidad** del movimiento, no su dirección futura.",
      },
      { h2: "Sobrevendido no significa «comprar»" },
      {
        p: "En una tendencia bajista fuerte, el RSI puede quedarse por debajo de 30 durante días. Un mercado «sobrevendido» puede volverse todavía más sobrevendido. La señal no es bajar de 30, sino **salir** de esa zona, idealmente sobre un [soporte](/blog/soportes-y-resistencias) identificado, con una vela de giro.",
      },
      { tip: "En una tendencia alcista sólida, el RSI suele moverse entre 40 y 80; en una bajista, entre 20 y 60. Localizar ese rango ya dice mucho de la fuerza del mercado." },
      { h2: "Las divergencias" },
      {
        p: "Una **divergencia bajista** aparece cuando el precio marca un máximo más alto pero el RSI uno más bajo: la subida continúa, pero con menos fuerza. Una divergencia alcista es lo contrario, al final de una tendencia bajista.",
      },
      {
        p: "Una divergencia no es una señal inmediata de compra o venta. Puede durar mucho antes de que el precio reaccione. Sirve sobre todo como aviso: ajustar un stop, no abrir nuevas posiciones en el sentido de la tendencia, esperar una ruptura de estructura.",
      },
      { h2: "La línea de 50" },
      {
        p: "A menudo olvidada, la línea de 50 separa las fases en que dominan las subidas de aquellas en que dominan las bajadas. Un RSI que vuelve por encima de 50 tras mucho tiempo por debajo suele acompañar un cambio de tendencia, que hay que confirmar en el precio.",
      },
      { h2: "Los ajustes" },
      {
        p: "El ajuste de 14 periodos sirve en la mayoría de los casos. Uno más corto vuelve el indicador más nervioso y multiplica las señales falsas; uno más largo lo suaviza pero lo retrasa. Cambiar el ajuste hasta encontrar el que «habría funcionado» en el pasado es una forma de engañarse a uno mismo.",
      },
      { h2: "El RSI confirma, no decide" },
      {
        ul: [
          "Lee primero la tendencia y los niveles en las velas.",
          "Usa el RSI para valorar la fuerza del movimiento y detectar divergencias.",
          "Decide la entrada y el stop a partir del precio, nunca solo del RSI.",
        ],
      },
      {
        p: "Si el RSI aparece en tu captura, [Scanzivo](/) lo tiene en cuenta en su lectura, por ejemplo para señalar una divergencia o un agotamiento. Pero, como se explica en [cómo leer un gráfico de trading](/blog/como-leer-un-grafico-de-trading), un gráfico cargado de indicadores se lee peor: con dos o tres basta.",
      },
    ],
  },
];
