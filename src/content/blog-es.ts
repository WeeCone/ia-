import type { Article } from "./blog";

/** Spanish versions of the French guides in blog.ts; `key` is the French slug, linking the translations. */
export const ARTICLES_ES: Omit<Article, "locale">[] = [
  {
    key: "comment-lire-un-graphique-de-trading",
    slug: "como-leer-un-grafico-de-trading",
    title: "Cómo leer un gráfico de trading si estás empezando",
    description:
      "Velas, tendencia, soportes y resistencias, indicadores: lo básico para leer un gráfico de precios sin perderte entre indicadores.",
    date: "2026-10-28",
    body: [
      {
        p: "Un gráfico de precios cuenta lo que han hecho compradores y vendedores. Antes de buscar una señal, tienes que saber leer esa historia: quién se impuso, dónde se frenó el precio y en qué momento cambió la relación de fuerzas. Estas son las cuatro cosas que hay que mirar, en este orden.",
      },
      { h2: "1. Las velas: qué pasó en cada periodo" },
      {
        p: "Cada vela resume un periodo: un minuto, una hora o un día, según la temporalidad que elijas. Su **cuerpo** va del precio de apertura al precio de cierre. Es verde (o blanco) si el precio terminó más arriba de donde empezó, y rojo (o negro) si fue al revés. Las **mechas** de arriba y de abajo muestran hasta dónde llegó el precio durante el periodo antes de volver.",
      },
      {
        p: "Una mecha inferior larga significa que los vendedores empujaron el precio hacia abajo y que luego los compradores lo hicieron subir antes del cierre. Una vela sola no basta para sacar conclusiones, pero varias mechas largas en el mismo sitio señalan una zona que el mercado se niega a superar.",
      },
      { h2: "2. La tendencia: hacia dónde va el mercado" },
      {
        p: "Una tendencia alcista es una sucesión de **máximos cada vez más altos** y de **mínimos cada vez más altos**. Una tendencia bajista, lo contrario. Cuando los máximos y los mínimos se quedan más o menos al mismo nivel, el mercado está en rango: duda.",
      },
      {
        p: "Para verla, aleja el zoom: mira al menos un centenar de velas. Con diez velas, cualquier movimiento parece una tendencia. Muchos principiantes compran una subida que no es más que un rebote dentro de una caída más amplia.",
      },
      { tip: "Mira siempre una temporalidad por encima de la que operas. Si operas en 1 hora, echa un vistazo al gráfico de 4 horas: es el que marca la dirección de fondo." },
      { h2: "3. Los soportes y resistencias: dónde reacciona el precio" },
      {
        p: "Un **soporte** es una zona donde el precio ha dejado de caer varias veces: ahí aparecen compradores. Una **resistencia** es una zona donde ha dejado de subir: ahí esperan vendedores. Son zonas, no líneas exactas al céntimo. Cuantas más veces y con más claridad haya reaccionado el precio en ellas, más importan.",
      },
      {
        p: "Cuando el precio supera una resistencia con un cierre claro por encima, esa resistencia suele convertirse en soporte. Es uno de los comportamientos más útiles que puedes conocer: el antiguo techo pasa a ser el suelo.",
      },
      { h2: "4. Los indicadores: para confirmar, no para decidir" },
      {
        p: "Medias móviles, RSI, MACD: los indicadores se calculan a partir del precio. No aportan información nueva, la presentan de otra forma. Sirven para confirmar lo que ya ves en las velas, por ejemplo un RSI que se debilita mientras el precio marca un nuevo máximo, señal de que la subida pierde fuerza.",
      },
      {
        p: "Con dos o tres indicadores tienes suficiente. Un gráfico lleno de curvas ya no se puede leer, y cada indicador acaba diciendo una cosa distinta.",
      },
      { h2: "Lo que hay que quedarse" },
      {
        ul: [
          "Lee las velas para saber quién controla el mercado en cada periodo.",
          "Identifica la tendencia en al menos un centenar de velas y en la temporalidad superior.",
          "Marca las zonas donde el precio ha reaccionado varias veces: son tus referencias para entrar, salir y poner un stop.",
          "Usa los indicadores para confirmar, nunca para decidir por sí solos.",
        ],
      },
      {
        p: "Con estos cuatro elementos claros, un gráfico se convierte en un mapa: sabes dónde estás, hacia dónde podría ir el precio y a partir de qué punto tu idea estaría equivocada. Esta última pregunta es la que la mayoría de los principiantes se olvida de hacerse.",
      },
    ],
  },
  {
    key: "supports-et-resistances",
    slug: "soportes-y-resistencias",
    title: "Soportes y resistencias: cómo encontrarlos y usarlos",
    description:
      "Cómo trazar soportes y resistencias que de verdad importan, reconocer una ruptura real y usarlos para entrar, salir o poner un stop.",
    date: "2026-10-28",
    body: [
      {
        p: "Los soportes y las resistencias son los primeros niveles que traza cualquier trader, y a menudo los más útiles. Eso sí, hay que trazar los correctos: un gráfico con veinte líneas ya no dice nada.",
      },
      { h2: "Qué es de verdad un soporte o una resistencia" },
      {
        p: "Un soporte es una zona de precio donde la demanda ha bastado, varias veces, para frenar una caída. Una resistencia es una zona donde la oferta ha bastado para frenar una subida. Detrás hay órdenes reales: compradores que se perdieron el último rebote y esperan el precio en ese nivel, vendedores que quieren salir sin perder.",
      },
      {
        p: "Por eso se habla de **zonas** y no de líneas. El precio suele pasarse un poco del nivel antes de darse la vuelta. Trazar una franja de unas décimas de porcentaje evita creer que un nivel se ha roto cuando solo se está poniendo a prueba.",
      },
      { h2: "Cómo trazar los que importan" },
      {
        ol: [
          "Empieza con una vista amplia: varios meses en gráfico diario o varias semanas en 4 horas.",
          "Busca los puntos donde el precio se ha dado la vuelta al menos dos veces. Un solo toque no hace un nivel.",
          "Da prioridad a las reacciones claras: mechas largas, fuerte aceleración en sentido contrario.",
          "Quédate con los dos o tres niveles más cercanos al precio actual, por encima y por debajo. Los demás están demasiado lejos para tu próxima decisión.",
        ],
      },
      { tip: "Los números redondos (60.000 en bitcoin, 1,1000 en el EUR/USD) suelen atraer órdenes. Cuando un nivel que has trazado cae cerca de un número redondo, gana importancia." },
      { h2: "¿Ruptura o falsa ruptura?" },
      {
        p: "Que el precio pase por encima de una resistencia no es una ruptura mientras la vela no haya **cerrado** por encima. Muchos movimientos perforan un nivel durante unos minutos y luego vuelven a caer: es una falsa ruptura, y quienes compraron demasiado pronto se quedan atrapados.",
      },
      {
        p: "Dos señales hacen más creíble una ruptura: un cierre claramente más allá de la zona y una vuelta del precio al antiguo nivel que aguanta (el famoso retest). Esperar ese retest a veces te hace perder el movimiento, pero te evita buena parte de las trampas.",
      },
      { h2: "Cómo usarlos en una operación" },
      {
        ul: [
          "**Entrar**: cerca de un soporte en una tendencia alcista, o tras la ruptura confirmada de una resistencia.",
          "**Poner el stop**: al otro lado de la zona que justifica la operación, con margen. Si el soporte se rompe, la idea inicial ya no se sostiene.",
          "**Objetivo**: la siguiente resistencia si compras, el siguiente soporte si vendes. Es ahí donde otros traders recogerán beneficios.",
        ],
      },
      {
        p: "Con esta lógica tienes un plan completo antes de entrar: un punto de entrada, un punto donde reconoces que te has equivocado y un objetivo realista. Es lo que después te permite calcular si la operación compensa el riesgo.",
      },
    ],
  },
  {
    key: "ou-placer-son-stop-loss",
    slug: "donde-poner-el-stop-loss",
    title: "Dónde poner el stop loss: 4 referencias sacadas del gráfico",
    description:
      "Un stop loss se pone donde tu idea deja de ser válida, no a un porcentaje arbitrario. Cuatro referencias concretas para colocarlo en un gráfico.",
    date: "2026-10-28",
    body: [
      {
        p: "El stop loss es la orden que cierra una posición cuando el precio va en tu contra. Mucha gente lo pone a un porcentaje fijo, un 2 % o un 5 % por debajo del precio de entrada. Es sencillo, pero al mercado le da igual tu porcentaje. Un buen stop se pone **donde tu motivo para entrar deja de existir**.",
      },
      { h2: "1. Debajo del soporte que justifica la compra" },
      {
        p: "¿Compras porque el precio rebota en un soporte? Si ese soporte se rompe, tu idea queda invalidada. Así que el stop va justo por debajo de la zona, no encima de ella. Deja margen: el precio suele probar un nivel unas décimas por debajo antes de volver a subir.",
      },
      { h2: "2. Debajo del último mínimo, en tendencia alcista" },
      {
        p: "En una tendencia alcista, cada mínimo es más alto que el anterior. Si el precio cae por debajo del último mínimo, la estructura se rompe: la tendencia ya no es la que era. El stop debajo de ese mínimo protege justo la hipótesis de que «la tendencia continúa».",
      },
      { h2: "3. Más allá de la mecha de una vela de rechazo" },
      {
        p: "Una vela con una mecha inferior larga sobre un soporte muestra que los vendedores han sido rechazados. Si entras con esa señal, pon el stop por debajo del extremo de la mecha: si el precio vuelve ahí, el rechazo no ha aguantado.",
      },
      { h2: "4. Según la volatilidad" },
      {
        p: "En un activo que se mueve mucho, un stop ajustado salta con el ruido normal del mercado. El indicador ATR (Average True Range) mide el rango medio de una vela. Poner el stop a una o dos veces el ATR más allá de tu nivel evita que te saque un simple movimiento rutinario.",
      },
      { tip: "Si el stop bien colocado queda demasiado lejos para tu capital, no lo acerques: reduce el tamaño de la posición. Es el tamaño el que se adapta al stop, nunca al revés." },
      { h2: "Los errores que salen caros" },
      {
        ul: [
          "Alejar el stop cuando el precio se le acerca. Así conviertes una pérdida pequeña y prevista en una pérdida grande que no tenías prevista.",
          "Ponerlo justo en un número redondo o en el propio nivel, donde todo el mundo tiene el suyo.",
          "No poner ninguno «porque ya volverá a subir».",
        ],
      },
      {
        p: "Un stop bien colocado no garantiza que la operación salga ganadora. Garantiza que, si no lo es, la pérdida será la que aceptaste antes de entrar.",
      },
    ],
  },
  {
    key: "ratio-gain-risque",
    slug: "ratio-riesgo-beneficio",
    title: "El ratio beneficio/riesgo, explicado de forma sencilla",
    description:
      "Cómo calcular el ratio beneficio/riesgo de una operación con la entrada, el stop y el objetivo, y por qué importa tanto como el porcentaje de aciertos.",
    date: "2026-10-28",
    body: [
      {
        p: "El ratio beneficio/riesgo compara lo que puedes ganar con lo que aceptas perder en una operación. Es el cálculo más sencillo del trading y uno de los más olvidados.",
      },
      { h2: "El cálculo" },
      {
        p: "Necesitas tres precios: la entrada, el stop y el objetivo. El riesgo es la distancia entre la entrada y el stop. El beneficio potencial es la distancia entre la entrada y el objetivo. El ratio es el segundo dividido entre el primero.",
      },
      {
        p: "Ejemplo ficticio: entrada en 100, stop en 95, objetivo en 112. El riesgo es de 5 y el beneficio potencial de 12. El ratio es 12 ÷ 5 = **2,4**. Por cada 1 € que arriesgas, buscas 2,40 €.",
      },
      { h2: "Por qué importa tanto como el porcentaje de aciertos" },
      {
        p: "Con un ratio de 2, puedes equivocarte dos de cada tres veces y quedarte en tablas, sin contar comisiones: una operación ganadora de +2 compensa dos perdedoras de -1. Al revés, con un ratio de 0,5, tienes que acertar dos de cada tres veces solo para no perder.",
      },
      {
        p: "Por eso un trader que gana a menudo puede acabar perdiendo dinero: si corta las ganancias demasiado pronto y deja correr las pérdidas, su ratio real se hunde.",
      },
      { tip: "Calcula el ratio antes de entrar, nunca después. Una vez dentro, siempre encuentras un buen motivo para acercar el objetivo o alejar el stop." },
      { h2: "Un buen ratio no basta" },
      {
        p: "Un objetivo muy lejano da un ratio bonito sobre el papel, pero el precio no tiene ningún motivo para llegar ahí. El objetivo debe corresponder a un nivel real del gráfico (la siguiente resistencia si compras), y el stop al punto donde la idea deja de ser válida. Un ratio solo tiene sentido si los tres precios salen del gráfico.",
      },
      {
        ul: [
          "Por debajo de 1: la operación gana menos de lo que arriesga. Necesitas un muy buen motivo para hacerla.",
          "Entre 1,5 y 3: la zona donde están la mayoría de las operaciones razonables.",
          "Por encima de 3: comprueba que el objetivo es realista y no solo lejano.",
        ],
      },
      {
        p: "Cuando ninguna operación del gráfico ofrece un ratio aceptable, la mejor decisión suele ser no hacer nada. No operar también es una posición.",
      },
    ],
  },
  {
    key: "analyse-technique-ia",
    slug: "analisis-tecnico-con-ia",
    title: "Análisis técnico con IA: lo que hace bien y sus límites",
    description:
      "Qué puede leer una IA en un gráfico de precios, qué no puede saber y cómo usarla como segunda opinión y no como un oráculo.",
    date: "2026-10-28",
    body: [
      {
        p: "Los modelos de IA capaces de leer imágenes ya saben analizar una captura de un gráfico: detectar la tendencia, trazar niveles, reconocer una figura. Es útil. Pero no es magia, y conviene saber dónde está el límite.",
      },
      { h2: "Lo que hace bien" },
      {
        ul: [
          "**Leer rápido y sin cansarse**: la estructura del mercado, los máximos y mínimos, las zonas de reacción, en pocos segundos y siempre de la misma manera.",
          "**Ser coherente**: aplica las mismas reglas a las 2 de la madrugada que a las 10 de la mañana, sin miedo a perderse el movimiento y sin ganas de recuperar lo perdido tras una mala operación.",
          "**Plantear un plan completo**: entrada, stop, objetivo y el nivel que invalidaría el escenario. Justo lo que se olvida cuando decides en caliente.",
          "**Decir cuándo no hay nada que hacer**: una buena herramienta sabe concluir «esperar» o «no operar» en lugar de forzar una señal.",
        ],
      },
      { h2: "Lo que no puede saber" },
      {
        ul: [
          "**El futuro.** Ningún análisis, humano o automático, sabe lo que hará el precio. Una probabilidad del 70 % significa que el escenario contrario también ocurre, y a menudo.",
          "**Lo que no está en la imagen.** Una captura borrosa, con demasiado zoom o sin un eje de precios legible da una lectura menos fiable.",
          "**Tu situación.** No conoce tu capital, ni tu tolerancia al riesgo, ni tus otras posiciones.",
        ],
      },
      { tip: "Desconfía de un análisis que siempre suena seguro de sí mismo. Los buenos análisis también dicen cuándo la señal es débil o contradictoria." },
      { h2: "Usarla como segunda opinión" },
      {
        p: "La mejor forma de usar un análisis con IA es contrastarlo con el tuyo. Si ve lo mismo que tú, tu idea se sostiene. Si concluye lo contrario, o «esperar», es el momento de preguntarte qué se te ha escapado. Te ahorra tiempo en la lectura y te obliga a plantear un plan con cifras antes de hacer clic.",
      },
      {
        p: "Para eso se ha diseñado Scanzivo: envías una captura de tu gráfico y recibes una lectura estructurada con un plan de acción claro, también cuando ese plan es no hacer nada. La decisión, y el riesgo, siguen siendo tuyos.",
      },
    ],
  },
  {
    key: "capture-ecran-graphique",
    slug: "captura-de-pantalla-grafico",
    title: "Cómo hacer una buena captura de un gráfico para analizarlo",
    description:
      "En TradingView, Binance, MetaTrader o en el móvil: cómo hacer una captura de gráfico legible, qué debe verse y qué conviene evitar.",
    date: "2026-10-28",
    body: [
      {
        p: "Tanto si pides opinión a un amigo, a un foro o a una IA, la calidad de la respuesta depende primero de la captura. Una buena captura se prepara en treinta segundos.",
      },
      { h2: "Lo que tiene que verse" },
      {
        ul: [
          "**El eje de precios**, legible, en el lado derecho. Sin él, es imposible dar un nivel preciso.",
          "**El nombre del activo y la temporalidad** (por ejemplo BTC/USDT, 4H), arriba a la izquierda en la mayoría de las plataformas.",
          "**Suficiente historial**: al menos 50 a 100 velas. Una tendencia no se lee con diez velas.",
          "**Velas**, mejor que una simple línea: muestran las aperturas, los cierres y las mechas.",
        ],
      },
      { h2: "Lo que es mejor evitar" },
      {
        ul: [
          "Un zoom extremo sobre las últimas velas.",
          "Una foto de la pantalla hecha con el móvil: reflejos, ángulo, desenfoque.",
          "Un gráfico lleno de indicadores y dibujos que tapan las velas.",
          "Una ventana de órdenes o un pop-up encima del gráfico.",
        ],
      },
      { h2: "Según tu plataforma" },
      { h3: "TradingView" },
      {
        p: "El icono de la cámara, arriba a la derecha, te permite descargar una imagen limpia del gráfico, sin el resto de la pantalla. Si no, una captura de pantalla normal de la ventana funciona muy bien.",
      },
      { h3: "Binance y las apps de exchanges" },
      {
        p: "Pon el gráfico en pantalla completa (suele ser un icono de flechas), elige la temporalidad y haz una captura de pantalla del móvil. Gira el móvil en horizontal para que se vea más historial.",
      },
      { h3: "MetaTrader 4 y 5" },
      {
        p: "Clic derecho en el gráfico y luego «Guardar como imagen». En el móvil, haz una captura de pantalla con el gráfico en horizontal.",
      },
      { h3: "En el ordenador" },
      {
        p: "Windows: tecla Windows + Mayús + S y selecciona la zona del gráfico. Mac: Cmd + Ctrl + Mayús + 4. En ambos casos, la captura va al portapapeles, lista para pegar.",
      },
      { tip: "En Scanzivo, puedes pegar una captura copiada directamente en la página con Ctrl+V (o Cmd+V), sin pasar por un archivo." },
      {
        p: "Una captura nítida, con el eje de precios y suficiente historial, vale más que diez capturas aproximadas. Es lo que permite dar niveles precisos en lugar de generalidades.",
      },
    ],
  },
  {
    key: "ia-et-trading",
    slug: "ia-y-trading",
    title: "IA y trading: lo que una inteligencia artificial puede hacer de verdad por ti",
    description:
      "Leer un gráfico, resumir la actualidad, seguir un plan: lo que la IA aporta a un trader particular, y lo que nunca hará en tu lugar.",
    date: "2026-10-28",
    body: [
      {
        p: "«Operar con IA» abarca cosas muy distintas: un asistente que comenta un gráfico, una herramienta que resume las noticias, un robot que lanza órdenes solo. Para un trader particular, la pregunta útil no es si la IA es potente, sino en qué paso de tu decisión te ayuda.",
      },
      { h2: "Donde ayuda de verdad" },
      { h3: "Leer un gráfico sin contarse historias" },
      {
        p: "Un modelo capaz de leer imágenes detecta la tendencia, las zonas de reacción y las figuras en pocos segundos. Y, sobre todo, lo hace igual cada vez. Tú, después de tres pérdidas seguidas, ya no lees el mismo gráfico que el lunes por la mañana.",
      },
      { h3: "Fijar un plan antes de hacer clic" },
      {
        p: "El punto débil de la mayoría de traders particulares no es el análisis, es la falta de plan: entran sin saber dónde salir. Una herramienta que siempre te da una entrada, un stop, un objetivo y el nivel que invalida la idea te obliga a hacerte esas preguntas antes de comprar, no después.",
      },
      { h3: "Filtrar las noticias" },
      {
        p: "Una decisión de tipos, un dato de inflación o unos resultados empresariales pueden borrar cualquier señal técnica. Una IA conectada a la web puede listar en segundos los anuncios de los próximos días que afectan a tu activo, con sus fuentes.",
      },
      { h2: "Lo que no hará en tu lugar" },
      {
        ul: [
          "**Predecir el precio.** Estima escenarios. Un escenario al 70 % falla, por definición, unas tres veces de cada diez.",
          "**Decidir cuánto arriesgar.** No conoce tu capital, tus otras posiciones ni lo que puedes permitirte perder.",
          "**Impedirte hacer clic.** El mejor plan no sirve de nada si mueves el stop al primer movimiento en contra.",
        ],
      },
      { tip: "Desconfía de cualquier servicio que presente la IA como una máquina de ganar dinero. Las herramientas serias hablan de probabilidades, planes y riesgo, nunca de rentabilidad garantizada." },
      { h2: "Por dónde empezar" },
      {
        p: "Lo más sencillo es usarla como segunda opinión en operaciones que habrías hecho de todos modos. Analiza primero el gráfico tú mismo, apunta tu plan y compáralo con la lectura de la IA. Donde coincidís, ganas confianza. Donde no, aprendes algo: sobre el mercado o sobre tus propios sesgos.",
      },
      {
        p: "Para eso se creó Scanzivo: una captura del gráfico, una lectura estructurada, un plan con cifras y una decisión que sigue siendo tuya.",
      },
    ],
  },
  {
    key: "analyser-un-graphique-avec-chatgpt",
    slug: "analizar-un-grafico-con-chatgpt",
    title: "Analizar un gráfico con ChatGPT: lo que funciona y lo que falla",
    description:
      "ChatGPT sabe leer una captura de un gráfico. Esto es lo que hace bien, los errores a vigilar y cómo formular tu petición para obtener una respuesta útil.",
    date: "2026-10-28",
    body: [
      {
        p: "Los asistentes generalistas como ChatGPT, Claude o Gemini aceptan imágenes, así que puedes enviarles una captura de tu gráfico y pedir un análisis. El resultado suele ser interesante. También es muy irregular, y conviene saber por qué.",
      },
      { h2: "Lo que funciona bien" },
      {
        ul: [
          "Describir la tendencia general y la estructura (máximos, mínimos, rangos).",
          "Reconocer las figuras clásicas: doble techo, triángulo, canal.",
          "Explicar un indicador que aparece en pantalla, por ejemplo qué significa un RSI por encima de 70.",
          "Responder a tus preguntas de seguimiento, lo que lo convierte en una buena herramienta para aprender.",
        ],
      },
      { h2: "Lo que falla" },
      {
        ul: [
          "**Niveles aproximados.** Un asistente generalista a veces lee mal el eje de precios y cita un soporte que no existe, con mucha seguridad.",
          "**Respuestas que cambian.** La misma captura enviada dos veces puede dar dos conclusiones distintas, porque no sigue un método fijo.",
          "**Respuestas tibias.** Sin instrucciones precisas, la respuesta describe mucho y se moja poco: «el mercado podría subir o bajar».",
          "**Sin plan completo.** Entrada, stop, objetivo y ratio beneficio/riesgo solo aparecen si los pides, y no siempre de forma coherente.",
        ],
      },
      { h2: "Cómo formular mejor tu petición" },
      {
        p: "Buena parte del resultado depende de la pregunta. Da el contexto e impón el formato de la respuesta. Por ejemplo:",
      },
      {
        tip: "«Este es un gráfico de BTC/USDT en 4 horas. Indica la tendencia, los dos soportes y resistencias más cercanos con su precio leído en el eje, y luego un único escenario preferente con entrada, stop, objetivo y ratio beneficio/riesgo. Si ninguna operación tiene un ratio superior a 1,5, dilo.»",
      },
      {
        p: "Después comprueba cada nivel citado en tu propio gráfico. Si un precio no corresponde a nada visible, no lo uses.",
      },
      { h2: "Generalista o herramienta especializada" },
      {
        p: "Un asistente generalista va muy bien para aprender y hacer preguntas. Una herramienta especializada como Scanzivo aplica el mismo método a cada captura, dibuja los niveles en tu gráfico, calcula el ratio beneficio/riesgo y sabe concluir «esperar» o «no operar». El primero explica, la segunda te da un plan. En ambos casos, la decisión es tuya.",
      },
    ],
  },
  {
    key: "bots-de-trading-ia-arnaques",
    slug: "bots-de-trading-ia-estafas",
    title: "Bots de trading «con IA»: cómo detectar las promesas engañosas",
    description:
      "Rentabilidades garantizadas, robots que «nunca pierden», grupos privados de pago: las señales de alerta antes de confiar tu dinero a un bot de trading con IA.",
    date: "2026-10-28",
    body: [
      {
        p: "La palabra «IA» se ha convertido en un argumento de venta para todo tipo de servicios de trading. Algunos son herramientas honestas. Otros repiten los trucos de siempre con un barniz tecnológico. Algunas señales ayudan a distinguirlos.",
      },
      { h2: "Las señales de alerta" },
      {
        ul: [
          "**Una rentabilidad prometida**, sobre todo con cifra de antemano: «+5 % por semana», «30 % al mes». Ninguna herramienta puede garantizar una rentabilidad en los mercados.",
          "**Capturas de ganancias, nunca de pérdidas.** Un historial que solo muestra operaciones ganadoras está incompleto o es inventado.",
          "**Las prisas**: plazas limitadas, una oferta que termina esta noche, «última oportunidad».",
          "**Te piden depositar dinero** en una plataforma que no conoces, o darles acceso a tu cuenta de bróker.",
          "**Un sistema de referidos pagado** como núcleo del negocio: ganas sobre todo captando a otras personas.",
        ],
      },
      { tip: "Una herramienta de análisis seria te muestra cómo razona, reconoce sus límites y te deja decidir. Un servicio que «opera por ti» sin explicar nada te pide sobre todo que confíes en él." },
      { h2: "Lo que necesita autorización" },
      {
        p: "En España, un servicio que gestiona tu dinero, ejecuta órdenes por ti o te recomienda personalmente qué comprar ejerce una actividad regulada y debe estar autorizado por la CNMV. En otros países, el regulador financiero nacional cumple ese papel. Todos mantienen registros públicos que puedes consultar.",
      },
      {
        p: "La CNMV también publica advertencias sobre entidades que ofrecen inversiones sin autorización. Unos segundos de búsqueda en su web antes de pagar pueden ahorrarte muchos disgustos.",
      },
      { h2: "Las preguntas que conviene hacerse" },
      {
        ol: [
          "¿Quién está detrás del servicio: una empresa identificable, con aviso legal?",
          "¿Sigo teniendo el control de mi dinero y de mis órdenes?",
          "¿El servicio habla de riesgos y pérdidas, o solo de ganancias?",
          "¿Puedo dejarlo fácilmente, sin costes ocultos?",
        ],
      },
      {
        p: "Una herramienta que te ayuda a analizar, sin tocar tu dinero y sin prometer resultados, no ejerce ninguna de estas actividades reguladas: decides tú y lanzas tú tus órdenes. Es el caso de Scanzivo, que ofrece una lectura del gráfico con fines informativos y no constituye asesoramiento de inversión.",
      },
    ],
  },
  {
    key: "choisir-un-outil-ia-de-trading",
    slug: "elegir-una-herramienta-de-ia-para-trading",
    title: "Elegir una herramienta de IA para trading: 7 preguntas que hacerse",
    description:
      "Antes de pagar una herramienta de IA para trading, siete preguntas sencillas para saber si te hará progresar o si vende sobre todo una promesa.",
    date: "2026-10-28",
    body: [
      {
        p: "Las herramientas de IA para trading se multiplican, a todos los precios. En lugar de un ranking que quedaría desfasado enseguida, aquí tienes las preguntas que permiten juzgar cualquiera en pocos minutos.",
      },
      { h2: "1. ¿Qué hace exactamente?" },
      {
        p: "Analizar un gráfico, enviar señales, lanzar órdenes automáticamente: son tres oficios distintos, con tres niveles de riesgo. Una herramienta de análisis te deja decidir. Un robot que opera por ti decide por ti.",
      },
      { h2: "2. ¿Muestra su razonamiento?" },
      {
        p: "Un «compra ya» sin explicación no te enseña nada ni te permite comprobar nada. Un buen análisis dice por qué: la tendencia, los niveles, lo que invalidaría el escenario.",
      },
      { h2: "3. ¿Sabe decir «no hagas nada»?" },
      {
        p: "Una herramienta que encuentra una operación en cada gráfico te empuja a sobreoperar. A menudo la mejor decisión es esperar. Comprueba que la herramienta sabe decirlo.",
      },
      { h2: "4. ¿Da un plan con cifras?" },
      {
        p: "Entrada, stop, objetivo y ratio beneficio/riesgo: sin estos cuatro elementos, un análisis es solo una opinión. Con ellos, sabes antes de entrar cuánto arriesgas y para qué.",
      },
      { h2: "5. ¿Funciona con tus herramientas?" },
      {
        p: "Si operas en TradingView, Binance o MetaTrader, la herramienta debe adaptarse a tu plataforma, no al revés. Una simple captura de pantalla suele ser la vía más universal.",
      },
      { h2: "6. ¿Qué promete?" },
      {
        p: "Una tasa de acierto en letras grandes, rentabilidades mensuales, ganancias «garantizadas»: huye. Una herramienta honesta habla de probabilidades y recuerda que el trading conlleva un riesgo de pérdida de capital.",
      },
      { h2: "7. ¿Cuánto cuesta y cómo se cancela?" },
      {
        p: "Mira el precio real después de la prueba, lo que incluye y cómo darte de baja. Una suscripción que se cancela con un clic desde tu cuenta es buena señal. Un compromiso de doce meses con una herramienta que no has probado, mucho menos.",
      },
      {
        tip: "Prueba la herramienta con gráficos pasados cuya continuación ya conoces. Verás rápido si lee el mercado con acierto o si recita generalidades.",
      },
      {
        p: "Por transparencia: Scanzivo es una herramienta de análisis de gráficos a partir de capturas de pantalla. Así responde a estas preguntas: explica su razonamiento, sabe concluir «esperar» o «no operar», da un plan con cifras, no promete ganancias y la suscripción se cancela en cualquier momento desde tu cuenta.",
      },
    ],
  },
];
