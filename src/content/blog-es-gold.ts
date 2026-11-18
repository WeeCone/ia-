import type { Article } from "./blog";

/** Spanish versions of the gold (XAU/USD) guides in blog-fr-gold.ts; `key` is the French slug. Times are Madrid time. */
export const ARTICLES_ES_GOLD: Omit<Article, "locale">[] = [
  {
    key: "comment-trader-l-or",
    slug: "como-operar-el-oro",
    title: "Cómo operar el oro (XAU/USD): guía para empezar",
    description:
      "Qué mueve el oro, cómo se cotiza, qué es un CFD sobre oro, las sesiones que conviene conocer y una rutina sencilla para empezar sin dispersarte.",
    date: "2026-11-19",
    body: [
      {
        p: "Para operar el oro, la mayoría de los particulares abren un CFD sobre el XAU/USD en un bróker: apuestan a que el precio de una onza de oro, expresado en dólares, sube o baja, sin poseer metal. Es accesible, pero es un mercado nervioso. Así funciona y por dónde empezar.",
      },
      { h2: "¿Qué es el XAU/USD?" },
      {
        p: "XAU es el código del oro y USD el del dólar estadounidense. El precio que ves es el de **una onza troy de oro (unos 31,1 gramos) en dólares**. Cuando el gráfico marca 2.400, una onza vale 2.400 $. Según la plataforma verás XAU/USD, XAUUSD o simplemente GOLD: es el mismo instrumento.",
      },
      {
        p: "Como el precio está en dólares, el oro reacciona a todo lo que afecta al dólar. Es lo primero que hay que recordar: un dólar que sube suele pesar sobre el oro y un dólar que baja lo ayuda. El detalle está en [por qué sube o baja el oro](/blog/por-que-sube-o-baja-el-oro).",
      },
      { h2: "Cómo se opera el oro: CFD, futuros, ETF" },
      {
        ul: [
          "**El CFD**: un contrato con tu bróker sobre la diferencia de precio entre la apertura y el cierre. Puedes comprar o vender en corto, con apalancamiento. Es el más habitual en intradía.",
          "**Los futuros**: contratos estandarizados negociados en bolsa, con tamaños de contrato grandes. Más bien para perfiles avanzados.",
          "**Los ETF y el oro físico**: para mantener oro a largo plazo, sin apalancamiento. No es trading en sentido estricto.",
        ],
      },
      {
        p: "Esta guía habla del CFD. Aporta flexibilidad, pero también riesgos propios: apalancamiento, spread, costes de financiación. Se detallan en [operar oro con CFD: los riesgos](/blog/operar-oro-cfd-riesgos).",
      },
      { h2: "¿Por qué se mueve tanto el oro?" },
      {
        p: "En una sesión, el oro puede moverse varias decenas de dólares, más en los días de anuncios. En puntos de precio, son movimientos mucho más amplios que en la mayoría de los pares de divisas. Dos consecuencias prácticas: tus stops deben ser más amplios, y por tanto tus posiciones más pequeñas, y los errores cuestan antes.",
      },
      {
        p: "El oro reacciona sobre todo a las estadísticas estadounidenses (empleo, inflación), a las decisiones de la Fed, al dólar, a los tipos de interés reales y a las tensiones geopolíticas. El calendario cuenta tanto como el gráfico: mira [el calendario económico](/blog/calendario-economico).",
      },
      { h2: "Las sesiones que conviene conocer" },
      {
        p: "El oro se negocia casi sin parar, pero la actividad varía mucho a lo largo del día. En hora peninsular española: la sesión asiática suele ser tranquila, Londres abre hacia las 9:00 y Nueva York hacia las 14:30 con las estadísticas estadounidenses. Los movimientos más grandes se concentran, por lo general, entre Londres y el final de la sesión neoyorquina. El detalle está en [las mejores horas para operar el oro](/blog/mejores-horas-para-operar-oro).",
      },
      { h2: "Una rutina sencilla para empezar" },
      {
        ol: [
          "**Antes de la sesión**, mira el calendario: un anuncio estadounidense importante cambia el plan del día.",
          "**Lee la dirección en 1 hora**: tendencia, últimos máximos y mínimos, zonas donde el precio ya ha reaccionado. [Cómo leer un gráfico](/blog/como-leer-un-grafico-de-trading) te da las bases.",
          "**Localiza los niveles**: antiguos máximos y mínimos y números redondos (mira [los niveles redondos en el oro](/blog/niveles-redondos-oro)).",
          "**Define el plan antes de entrar**: entrada, stop, objetivo. Si la relación riesgo/beneficio es baja, déjalo pasar ([ratio riesgo/beneficio](/blog/ratio-riesgo-beneficio)).",
          "**Calcula el tamaño** a partir del stop, no de las ganas: mira [el tamaño de lote en el oro](/blog/tamano-de-lote-xau-usd).",
          "**Anota el resultado**, sea cual sea, para entender lo que haces de verdad.",
        ],
      },
      {
        p: "La versión intradía detallada de esta rutina está en [una rutina para el oro: 1 hora, 15 minutos, 5 minutos](/blog/rutina-oro-1h-15m-5m).",
      },
      { h2: "Los errores clásicos de los principiantes" },
      {
        ul: [
          "**Abrir una posición demasiado grande** porque el precio de la onza parece «pequeño» frente a la volatilidad real.",
          "**Operar en pleno anuncio** sin haberlo visto en el calendario.",
          "**Entrar pegado a un nivel redondo** con el stop justo detrás: las mechas se lo llevan.",
          "**Multiplicar las operaciones** para «recuperar» tras una pérdida.",
          "**Cambiar de método cada semana**: sin una serie de pruebas comparables, es imposible saber qué funciona.",
        ],
      },
      {
        p: "Empieza en una cuenta demo, con pocas cosas que mirar: un instrumento, dos o tres temporalidades, una rutina. Cuando quieras, también puedes enviar una captura de tu gráfico al [análisis con IA especializado en oro](/gold) para comparar su lectura con la tuya.",
      },
      {
        p: "Esta guía es contenido educativo y no constituye asesoramiento de inversión. Los CFD son productos complejos que conllevan un riesgo elevado de pérdida de capital, sobre todo por el apalancamiento: no arriesgues más de lo que puedas permitirte perder.",
      },
    ],
  },
  {
    key: "meilleures-heures-pour-trader-l-or",
    slug: "mejores-horas-para-operar-oro",
    title: "Mejores horas para operar el oro (hora de España)",
    description:
      "Sesiones de Tokio, Londres y Nueva York, solapamiento, horas de anuncios estadounidenses: a qué hora se mueve más el oro, en hora peninsular, y cuándo evitarlo.",
    date: "2026-11-19",
    body: [
      {
        p: "El oro se mueve más entre la apertura de Londres, hacia las 9:00 hora peninsular, y el final de la sesión estadounidense. El momento más activo suele ser el solapamiento Londres / Nueva York, de 14:30 a 17:30 aproximadamente. La noche asiática suele ser más tranquila y más propensa a movimientos falsos.",
      },
      { h2: "Los horarios en hora peninsular" },
      {
        p: "Estas horas son orientativas y pueden desplazarse una hora durante unas semanas al año, cuando Europa y Estados Unidos no cambian la hora en la misma fecha. Compruébalas en tu plataforma en esos periodos.",
      },
      {
        ul: [
          "**Sesión asiática (Tokio, Sídney)**: de 1:00 a 9:00 aproximadamente. A menudo, un rango estrecho.",
          "**Sesión de Londres**: apertura hacia las 9:00, cierre hacia las 17:30. Primer empuje real de volumen del día.",
          "**Sesión de Nueva York**: las estadísticas estadounidenses salen normalmente a las **14:30**, la bolsa abre hacia las 15:30 y el final de sesión es hacia las 22:00.",
          "**Solapamiento Londres / Nueva York**: de 14:30 a 17:30 aproximadamente. Muchos participantes, y por tanto movimientos más amplios.",
        ],
      },
      { h2: "Por qué importa la apertura de Londres" },
      {
        p: "Durante la noche, el oro suele construir un rango: un máximo y un mínimo en torno a los cuales gira el precio. En la apertura de Londres, ese rango se rompe con frecuencia, hacia un lado o hacia el otro. Esa ruptura a veces marca la dirección del inicio del día, pero también puede ser una salida en falso que el precio recupera en la hora siguiente.",
      },
      {
        p: "Una referencia sencilla: traza el máximo y el mínimo de la sesión asiática en tu gráfico. Observa cómo se comporta el precio cuando los alcanza, en lugar de anticipar la ruptura. Lo que buscas es un cierre claro más allá del rango y un retorno que mantenga el nivel.",
      },
      { h2: "14:30: la hora de los anuncios estadounidenses" },
      {
        p: "Muchas estadísticas estadounidenses se publican a las 14:30 hora peninsular: empleo (NFP), inflación (CPI), ventas minoristas, solicitudes semanales de subsidio de desempleo. El oro reacciona a veces en pocos segundos, con diferenciales que se amplían. Las decisiones de la Fed llegan más bien al final de la tarde, hacia las 20:00. Consulta siempre [el calendario económico](/blog/calendario-economico) antes de abrir una posición.",
      },
      {
        p: "Cómo comportarse en torno a estos anuncios se trata aparte: [operar el oro durante el NFP, el CPI y la Fed](/blog/operar-oro-nfp-fed).",
      },
      { h2: "Cuándo evitar operar el oro" },
      {
        ul: [
          "**Justo antes y justo después de un anuncio importante**: spread más amplio y movimientos en ambos sentidos.",
          "**Al final de la sesión estadounidense y en el cierre del viernes**: menos liquidez, el spread puede ampliarse.",
          "**Los festivos estadounidenses**: poco volumen, rupturas poco fiables.",
          "**El domingo por la noche, en la reapertura**: pueden aparecer huecos de precio respecto al cierre del viernes.",
        ],
      },
      { h2: "¿Qué franja elegir según tu horario?" },
      {
        p: "No necesitas estar delante de la pantalla todo el día. Es mejor una franja fija que conozcas bien.",
      },
      {
        ul: [
          "**La mañana (de 9:00 a 12:00)**: lectura del rango asiático y de la reacción en Londres. Conviene si trabajas después.",
          "**La tarde (de 14:30 a 17:30)**: lo más activo, pero también lo más rápido. Reservado a quienes pueden seguir sus posiciones de cerca.",
          "**La noche**: el mercado suele calmarse, salvo anuncio de la Fed. Una posición abierta durante la noche te expone a huecos y a costes de financiación.",
        ],
      },
      { h2: "Adaptar la temporalidad a la sesión" },
      {
        p: "En un mercado tranquilo, un gráfico de 5 minutos tiene mucho ruido y poca información. En un mercado activo, resulta útil para afinar la entrada. La lógica se describe en [elegir la temporalidad](/blog/elegir-temporalidad) y se pone en práctica en [la rutina de 1 hora, 15 minutos y 5 minutos](/blog/rutina-oro-1h-15m-5m).",
      },
      {
        p: "Los análisis de la [herramienta especializada en oro](/gold) tienen en cuenta las sesiones: el rango asiático roto en Londres, los anuncios de las 14:30. Si envías una captura, hazla a la hora en que la estás mirando: es la que se leerá.",
      },
      {
        p: "Esta guía es contenido educativo y no constituye asesoramiento de inversión. Los CFD son productos complejos que conllevan un riesgo elevado de pérdida de capital: incluso en las mejores horas, una pérdida sigue siendo posible.",
      },
    ],
  },
  {
    key: "pourquoi-l-or-monte-ou-baisse",
    slug: "por-que-sube-o-baja-el-oro",
    title: "Por qué sube o baja el oro: los factores que debes conocer",
    description:
      "Dólar, tipos reales, Fed, inflación, compras de los bancos centrales, tensiones geopolíticas, ETF: qué pesa sobre el precio del oro y cómo tenerlo en cuenta.",
    date: "2026-11-19",
    body: [
      {
        p: "El precio del oro se mueve sobre todo con el dólar estadounidense y los tipos de interés reales, es decir, los tipos descontada la inflación. Cuando el dólar o los tipos reales bajan, el oro tiende a subir. Cuando suben, tiende a bajar. Las tensiones geopolíticas, las compras de los bancos centrales y los flujos de los ETF se suman a ello. Son tendencias, no leyes.",
      },
      { h2: "El dólar: el primer reflejo" },
      {
        p: "El oro se cotiza en dólares. Si el dólar se fortalece, hacen falta menos dólares para el mismo valor: el oro expresado en dólares suele bajar. Un dólar más débil abarata la onza para los compradores de fuera de Estados Unidos, lo que sostiene la demanda. La relación es frecuente, no permanente: algunos días, oro y dólar suben juntos.",
      },
      { h2: "Los tipos de interés reales" },
      {
        p: "El oro no paga intereses ni dividendos. Cuando las inversiones sin riesgo rinden mucho después de inflación, mantener oro sale caro en coste de oportunidad. Cuando los tipos reales bajan o se vuelven negativos, el oro resulta más atractivo. Es a menudo el factor de fondo más citado por los analistas.",
      },
      {
        p: "En concreto, vigila el rendimiento de los bonos estadounidenses a 10 años y las expectativas de bajadas o subidas de tipos. Una subida brusca de los rendimientos suele pesar sobre el oro a corto plazo.",
      },
      { h2: "La Fed y sus decisiones" },
      {
        p: "La Fed, el banco central estadounidense, fija su tipo oficial y comenta su trayectoria. El mercado reacciona tanto a las palabras como a la cifra. Una comunicación más laxa de lo previsto suele sostener al oro, un tono más firme lo hace retroceder. Las fechas de las reuniones están en el calendario: mira [el calendario económico](/blog/calendario-economico) y [operar el oro durante el NFP, el CPI y la Fed](/blog/operar-oro-nfp-fed).",
      },
      { h2: "La inflación: una relación menos simple de lo que parece" },
      {
        p: "Se dice a menudo que el oro protege de la inflación. A largo plazo, la idea tiene defensores. A corto plazo, hay matices: un dato de inflación alto puede hacer subir el oro, o hacerlo bajar si empuja a la Fed a mantener los tipos altos. Lo que cuenta para el precio es la cifra **frente a lo esperado** y la reacción prevista del banco central.",
      },
      { h2: "Los bancos centrales" },
      {
        p: "Varios bancos centrales tienen oro en sus reservas, y sus compras o ventas influyen en la demanda. Sus posiciones se publican con retraso, por organismos como el World Gold Council. Esta información da un contexto de fondo, pocas veces una señal para entrar con precisión horaria.",
      },
      { h2: "Las tensiones geopolíticas y la aversión al riesgo" },
      {
        p: "El oro se considera un valor refugio. En periodos de incertidumbre (conflicto, crisis financiera, tensión política), la demanda puede aumentar y el precio subir rápido. Pero este efecto suele diluirse cuando la tensión remite, y no avisa: es posible un giro seco.",
      },
      { h2: "Los ETF y la demanda física" },
      {
        p: "Los ETF respaldados por oro físico ven aumentar o disminuir sus tenencias según las entradas y salidas de los inversores. Entradas sostenidas apuntan más bien a una demanda firme. La demanda de joyería y de inversión física, sobre todo en Asia, también pesa, con una estacionalidad propia.",
      },
      { h2: "Cómo usarlo cuando operas" },
      {
        ol: [
          "**Saber qué se espera**: mira el calendario de la semana y anota los anuncios estadounidenses.",
          "**Identificar el contexto**: ¿el dólar y los rendimientos suben o bajan desde hace unos días? ¿El oro va en el mismo sentido o a contracorriente?",
          "**Dejar que el gráfico decida la entrada**: el contexto da un sesgo, no un punto de entrada. Los niveles y la estructura (mira [soportes y resistencias](/blog/soportes-y-resistencias)) hacen el resto.",
          "**Desconfiar del relato a posteriori**: encontrar una explicación después del movimiento es fácil. Prever el movimiento no lo es.",
        ],
      },
      {
        tip: "Un mercado puede subir con todas las noticias en contra, y al revés. No operes una opinión macro contra un gráfico que dice lo contrario.",
      },
      {
        p: "Para mantener una visión de conjunto, anota en unas líneas antes de la sesión: el sentido del dólar, la tendencia de los tipos, el próximo anuncio. El [análisis especializado en oro](/gold) de Scanzivo lee tu captura con reglas propias del oro: niveles redondos, sesiones, publicaciones estadounidenses. Puede equivocarse como cualquier lectura: ayuda a estructurar, no a predecir.",
      },
      {
        p: "Esta guía es contenido educativo y no constituye asesoramiento de inversión. Los CFD son productos complejos que conllevan un riesgo elevado de pérdida de capital, y ninguna explicación macroeconómica garantiza la dirección del precio.",
      },
    ],
  },
  {
    key: "taille-de-lot-xau-usd",
    slug: "tamano-de-lote-xau-usd",
    title: "Calcular el tamaño de lote en el oro (XAU/USD)",
    description:
      "Valor del punto en el oro, tamaño del contrato, ejemplo numérico en euros con un 1 % de riesgo: el método para calcular tu lote y por qué hay que comprobarlo en tu bróker.",
    date: "2026-11-19",
    body: [
      {
        p: "Para calcular tu tamaño de lote en el oro: importe que aceptas perder ÷ (distancia del stop en dólares × número de onzas por lote). En muchos brókeres, 1 lote de oro equivale a 100 onzas, pero no es universal: **el tamaño del contrato y el valor del pip dependen del bróker. Compruébalos en tu plataforma antes de cualquier cálculo.**",
      },
      { h2: "Lo que debes saber antes de calcular" },
      {
        ul: [
          "**El tamaño del contrato**: cuántas onzas representa 1 lote. A menudo 100, a veces 1.000 o menos según el instrumento y el bróker.",
          "**El lote mínimo**: a menudo 0,01 lotes, a veces más.",
          "**La divisa de la cuenta**: si tu cuenta está en euros, la ganancia o la pérdida, calculadas en dólares, se convierten al tipo EUR/USD del momento.",
          "**La definición de «pip» en el oro**: varía. Algunos brókeres hablan de pip a 0,10 $, otros de punto a 0,01 $. Para evitar confusiones, razona en **dólares de movimiento del precio**.",
        ],
      },
      {
        p: "En tu plataforma, la ficha del instrumento («especificaciones del contrato») da estos valores. Otra forma de comprobarlo: abre una posición demo con el lote mínimo, mueve mentalmente el precio 1 $ y mira la variación del resultado que se muestra.",
      },
      { h2: "La fórmula" },
      {
        p: "Con un contrato de 100 onzas por lote, una variación de 1 $ en el precio cambia el resultado en 100 $ por lote. La fórmula general es la del [tamaño de posición](/blog/tamano-de-posicion):",
      },
      {
        ol: [
          "**Importe arriesgado** = capital × porcentaje de riesgo.",
          "**Pérdida por lote** = distancia del stop en $ × onzas por lote (convertida a euros si la cuenta está en euros).",
          "**Tamaño de lote** = importe arriesgado ÷ pérdida por lote.",
        ],
      },
      { h2: "Ejemplo numérico (ilustrativo)" },
      {
        p: "Las cifras siguientes son **un ejemplo**, no una recomendación ni un precio de mercado. Supuestos: cuenta de 5.000 €, riesgo del 1 %, contrato de 100 onzas por lote, EUR/USD en 1,10, stop a 10 $ de la entrada.",
      },
      {
        ul: [
          "Importe arriesgado: 5.000 € × 1 % = **50 €**, unos 55 $.",
          "Pérdida por 1 lote si se toca el stop: 10 $ × 100 onzas = 1.000 $, unos 909 €.",
          "Tamaño de lote: 55 $ ÷ 1.000 $ = **0,055 lotes**.",
          "Se redondea **hacia abajo**: 0,05 lotes. Si se toca el stop, la pérdida es de unos 50 $, algo menos de 46 €, es decir, por debajo del riesgo previsto.",
        ],
      },
      {
        p: "Con un stop más amplio, el mismo método da una posición más pequeña. Stop a 20 $: 55 $ ÷ 2.000 $ = 0,0275 lotes, es decir, 0,02 lotes al redondear. El stop impone el tamaño, nunca al revés.",
      },
      { h2: "¿Y si el cálculo sale por debajo del lote mínimo?" },
      {
        p: "Con una cuenta pequeña, a veces el cálculo da 0,008 lotes cuando el mínimo es 0,01. En ese caso, abrir de todos modos es arriesgar más de lo previsto. Las opciones honestas: reducir la distancia del stop si el gráfico lo permite, buscar un bróker con un contrato más pequeño o dejar pasar la operación. No fuerces el tamaño para «entrar como sea».",
      },
      { h2: "No olvides el spread ni el deslizamiento" },
      {
        p: "Tu pérdida real puede superar el stop teórico: el spread se suma a la entrada y a la salida, y durante un anuncio el precio puede saltarse el nivel del stop. Deja un pequeño margen en tu cálculo y evita las posiciones pesadas en torno a las estadísticas ([el caso del NFP y la Fed](/blog/operar-oro-nfp-fed)).",
      },
      { h2: "¿Dónde poner el stop antes de calcular?" },
      {
        p: "El stop se coloca según el gráfico, no según el importe que quieres arriesgar. En el oro, normalmente debe superar las mechas recientes y el nivel que invalidaría tu idea. Mira [dónde poner el stop loss](/blog/donde-poner-el-stop-loss). Un stop de 3 $ en un mercado que se mueve 10 $ en pocos minutos saltará casi siempre.",
      },
      {
        p: "El [análisis con IA para oro](/gold) propone un plan numérico con entrada, stop y objetivos a partir de tu captura. El tamaño del lote te toca calcularlo a ti, con los valores de tu bróker y tu propio porcentaje de riesgo.",
      },
      {
        p: "Esta guía es contenido educativo y no constituye asesoramiento de inversión. Los ejemplos numéricos son ilustrativos. Los CFD conllevan un riesgo elevado de pérdida de capital, que puede superar el importe previsto ante una fuerte variación.",
      },
    ],
  },
  {
    key: "trader-l-or-cfd-risques",
    slug: "operar-oro-cfd-riesgos",
    title: "Operar el oro con CFD: apalancamiento, spread, swap y riesgos reales",
    description:
      "Qué es un CFD sobre oro, cómo funcionan el apalancamiento, el spread, el swap y la llamada de margen, y qué arriesgas de verdad. Sin promesas de ganancia.",
    date: "2026-11-19",
    body: [
      {
        p: "Un CFD sobre oro es un contrato con un bróker sobre la diferencia de precio del XAU/USD. Te permite apostar al alza o a la baja con apalancamiento. El apalancamiento amplifica tanto las ganancias como las pérdidas: puedes perder rápido todo tu depósito o buena parte de él. Muchas cuentas de particulares pierden dinero con estos productos.",
      },
      { h2: "¿Qué es un CFD sobre oro?" },
      {
        p: "CFD significa contrato por diferencias. No posees ningún lingote: intercambias con el bróker la diferencia entre el precio de apertura y el de cierre. Si compras a 2.400 y cierras a 2.410, ganas diez dólares por onza del contrato. Si el precio baja a 2.390, los pierdes. Lo contrario vale para una venta en corto.",
      },
      { h2: "El apalancamiento: un amplificador en los dos sentidos" },
      {
        p: "El apalancamiento permite abrir una posición mucho mayor que tu depósito. Con un apalancamiento de 20, una posición de 20.000 $ solo exige unos 1.000 $ de margen. Pero la **pérdida se calcula sobre el tamaño total de la posición**, no sobre el margen. Un movimiento del 1 % en tu contra cuesta 200 $ en este ejemplo, es decir, el 20 % del margen comprometido.",
      },
      {
        p: "El apalancamiento máximo permitido a los minoristas está limitado en la Unión Europea, pero ese límite sigue siendo alto en un mercado tan movido como el oro. La protección es tu tamaño de posición, no el apalancamiento disponible: mira [el tamaño de lote en el oro](/blog/tamano-de-lote-xau-usd).",
      },
      { h2: "El spread: un coste en la entrada" },
      {
        p: "El spread es la diferencia entre el precio de compra y el de venta. Cada operación empieza, por tanto, un poco en negativo. En el oro varía: estrecho en plena sesión, más ancho en la apertura, en el cierre del viernes y en torno a los anuncios. Si operas movimientos pequeños, pesa mucho en tu resultado. Mídelo antes de hacer clic.",
      },
      { h2: "El swap: el coste de mantener una posición de un día para otro" },
      {
        p: "Si mantienes una posición después del cierre diario de tu bróker, se te carga o se te abona un coste de financiación (el swap) según el sentido de la posición y los tipos vigentes. A menudo es negativo en ambos sentidos. Es pequeño para un solo día, pero se vuelve notable en posiciones mantenidas durante semanas. El fin de semana suele cobrarse triple el miércoles o el viernes, según el bróker: comprueba sus condiciones.",
      },
      { h2: "La llamada de margen y el cierre forzoso" },
      {
        p: "Tu bróker exige que tu capital cubra las pérdidas en curso de tus posiciones. Cuando el capital disponible cae por debajo de cierto umbral, puede pedirte que ingreses fondos (llamada de margen) o **cerrar tus posiciones automáticamente** (stop-out), a menudo en el peor momento. Los minoristas de la Unión Europea cuentan con protección frente al saldo negativo, lo que no significa que la cuenta no pueda vaciarse.",
      },
      { h2: "Los huecos de precio (gaps) y el deslizamiento" },
      {
        p: "Tu stop no garantiza una salida a un precio concreto. Si el mercado se salta el nivel (anuncio, reapertura del domingo), la orden se ejecuta al siguiente precio disponible, a veces bastante más lejos. Es el deslizamiento. Algunos brókeres ofrecen stops garantizados, normalmente con un coste adicional. Más sobre los anuncios en [operar el oro durante el NFP, el CPI y la Fed](/blog/operar-oro-nfp-fed).",
      },
      { h2: "Los riesgos que vienen de ti" },
      {
        ul: [
          "**El tamaño excesivo**: el primer factor de pérdida de una cuenta.",
          "**No querer cortar una pérdida**: alejar el stop convierte una pérdida pequeña en una grande.",
          "**El exceso de operaciones**: más operaciones, más spread pagado y más errores.",
          "**El trading de venganza** tras una racha perdedora.",
          "**Las promesas externas**: desconfía de cualquier vendedor de señales, robots o cursos que anuncie ganancias regulares ([las estafas de los bots de trading](/blog/bots-de-trading-ia-estafas)).",
        ],
      },
      { h2: "Cómo limitar los daños" },
      {
        ol: [
          "**Arriesga un porcentaje pequeño por operación**, a menudo entre el 0,5 % y el 1 % de tu capital ([tamaño de posición](/blog/tamano-de-posicion)).",
          "**Pon siempre un stop** en un lugar lógico del gráfico ([dónde poner el stop loss](/blog/donde-poner-el-stop-loss)).",
          "**Exige una relación riesgo/beneficio coherente** antes de entrar ([ratio riesgo/beneficio](/blog/ratio-riesgo-beneficio)).",
          "**Evita los anuncios importantes** mientras estés empezando.",
          "**Empieza en demo**, y luego con una cantidad pequeña cuya pérdida no te cambie la vida.",
        ],
      },
      {
        p: "Las herramientas de análisis, incluido el [análisis con IA especializado en oro](/gold), no eliminan estos riesgos. Sirven para leer un gráfico y estructurar un plan. No predicen el precio.",
      },
      {
        p: "Esta guía es contenido educativo y no constituye asesoramiento de inversión. Los CFD son productos complejos que conllevan un riesgo elevado de pérdida de capital, debido al apalancamiento. La mayoría de las cuentas de particulares pierden dinero al operarlos.",
      },
    ],
  },
  {
    key: "trader-l-or-nfp-fed",
    slug: "operar-oro-nfp-fed",
    title: "Operar el oro durante el NFP, el CPI y los anuncios de la Fed",
    description:
      "Movimientos falsos, spread que se abre, deslizamiento: cómo abordar el oro los días de NFP, de CPI y de decisión de la Fed, y por qué esperar suele ser una opción válida.",
    date: "2026-11-19",
    body: [
      {
        p: "Los días de NFP, de CPI o de decisión de la Fed, el oro puede moverse varias decenas de dólares en pocos minutos, en un sentido y luego en el otro. El spread se ensancha y los stops se ejecutan más lejos de lo previsto. Para la mayoría de los traders, la mejor estrategia es no estar en posición en el momento de la publicación y esperar a que el mercado se estabilice.",
      },
      { h2: "¿De qué anuncios hablamos?" },
      {
        ul: [
          "**El NFP (Non-Farm Payrolls)**: el informe de empleo estadounidense, publicado por lo general el primer viernes del mes a las 14:30 hora peninsular.",
          "**El CPI**: el índice de precios al consumo estadounidense, medida de la inflación, publicado una vez al mes, a menudo también a las 14:30.",
          "**Las decisiones de la Fed (FOMC)**: anuncio del tipo oficial hacia las 20:00 hora peninsular, seguido de una rueda de prensa que puede mover el mercado tanto como la decisión.",
          "**Otras estadísticas**: PCE, ventas minoristas, índices de actividad, solicitudes de subsidio. Suelen ser menos relevantes, pero el oro a veces reacciona.",
        ],
      },
      {
        p: "Las fechas y horas exactas figuran en [el calendario económico](/blog/calendario-economico). Compruébalas cada semana: pueden cambiar.",
      },
      { h2: "Por qué reacciona tanto el oro" },
      {
        p: "Estas cifras modifican las expectativas sobre los tipos de interés estadounidenses y, por tanto, sobre el dólar y los tipos reales, dos motores del oro ([por qué sube o baja el oro](/blog/por-que-sube-o-baja-el-oro)). El precio no reacciona a la cifra sola, sino a su diferencia con las previsiones. Un buen dato ya descontado puede no mover nada.",
      },
      { h2: "Las trampas del minuto siguiente" },
      {
        ul: [
          "**El spread que se abre**: la diferencia entre compra y venta puede multiplicarse, lo que encarece cualquier entrada.",
          "**El deslizamiento**: tu stop se ejecuta al precio disponible, no al que elegiste.",
          "**Los movimientos falsos**: un primer impulso violento suele recuperarse en parte en los minutos siguientes. Entrar en ese impulso es comprar el máximo o vender el mínimo.",
          "**Las órdenes pendientes**: una orden colocada a cada lado (la estrategia llamada straddle) puede activarse en los dos sentidos y perder dos veces.",
          "**La liquidez que desaparece**: los precios saltan de un nivel a otro sin transacciones intermedias.",
        ],
      },
      { h2: "Tres formas razonables de abordar esos días" },
      {
        ol: [
          "**Quedarse al margen**: no tener una posición abierta a la hora del anuncio ni órdenes nuevas durante los minutos siguientes. Es la opción más sencilla, y no es una debilidad.",
          "**Reducir el tamaño**: si mantienes una posición, divídela por dos o más y pon un stop más amplio de lo habitual, aceptando que la pérdida siga calculada ([tamaño de lote en el oro](/blog/tamano-de-lote-xau-usd)).",
          "**Esperar la reacción y luego leer el gráfico**: dejar pasar los primeros 15 a 30 minutos, ver dónde se ha estabilizado el mercado y buscar después un retest de un nivel roto en 5 o 15 minutos ([elegir la temporalidad](/blog/elegir-temporalidad)).",
        ],
      },
      {
        tip: "Si tienes una posición en ganancias antes del anuncio, puedes asegurarla cerrándola o subiendo el stop. En ambos casos, decide antes, no durante.",
      },
      { h2: "¿Qué hacer si te pilla el movimiento?" },
      {
        p: "No alejes tu stop para «dejar respirar» tras el anuncio. El plan se hizo antes, con una pérdida máxima aceptada. Si el stop se toca, la pérdida es la que es. Haz una pausa antes de volver a operar: las decisiones bajo adrenalina rara vez son las mejores.",
      },
      { h2: "Preparar la semana" },
      {
        ul: [
          "El domingo, haz la lista de los anuncios de la semana y marca sus horas.",
          "Anota los niveles importantes del oro antes del anuncio (mira [los niveles redondos en el oro](/blog/niveles-redondos-oro)).",
          "Define de antemano si operas, reduces o te quedas al margen ese día.",
          "Después del anuncio, compara el movimiento real con tu escenario: así construyes experiencia.",
        ],
      },
      {
        p: "Cuando envías una captura al [análisis gold](/gold) un día de anuncio, la herramienta recuerda el riesgo de falsas rupturas y puede concluir que conviene esperar. Un «esperar» es una respuesta válida, no un fracaso.",
      },
      {
        p: "Esta guía es contenido educativo y no constituye asesoramiento de inversión. Los CFD son productos complejos que conllevan un riesgo elevado de pérdida de capital, en particular durante los anuncios económicos.",
      },
    ],
  },
  {
    key: "niveaux-ronds-or",
    slug: "niveles-redondos-oro",
    title: "Soportes, resistencias y niveles redondos en el oro",
    description:
      "Cómo localizar los niveles que importan en el oro: múltiplos de 50 y 100 dólares, antiguos máximos y mínimos, zonas en vez de líneas, y cómo colocar el stop y el objetivo.",
    date: "2026-11-19",
    body: [
      {
        p: "En el oro, los niveles que cuentan son los múltiplos de 50 y de 100 dólares (2.400, 2.450, 2.500…), los antiguos máximos y mínimos y las zonas donde el precio ya ha reaccionado varias veces. Hay que trazarlos como zonas de unos pocos dólares de ancho, no como líneas perfectas.",
      },
      { h2: "Por qué los números redondos importan" },
      {
        p: "Los traders piensan en números redondos. Muchos colocan sus objetivos, sus órdenes pendientes y sus stops sobre 2.400, 2.450 o 2.500, o muy cerca. Las órdenes se acumulan en torno a esos precios, y el mercado duda, rebota o los atraviesa a tirones. No es magia: es una profecía autocumplida, que sigue siendo observable en el oro porque su precio se expresa en cifras simples.",
      },
      {
        p: "Los escalones de 100 $ son los más marcados y los de 50 $ vienen después. Los múltiplos de 10 $ pueden servir de etapas en intradía, pero pesan menos. No busques un significado especial en cada número redondo: un nivel que el mercado nunca ha tocado ni respetado no tiene importancia particular.",
      },
      { h2: "Los antiguos máximos y mínimos" },
      {
        p: "Lo más fiable sigue siendo lo que el propio precio ha dibujado. Un antiguo máximo se convierte en resistencia, un antiguo mínimo en soporte, y cuando se rompen pueden cambiar de papel. Cuantas más veces se ha probado un nivel, y cuanto más legible es el historial en una temporalidad alta, más cuenta. Las bases están en [soportes y resistencias](/blog/soportes-y-resistencias).",
      },
      {
        ul: [
          "**Máximo y mínimo del día anterior**: referencias muy seguidas en intradía.",
          "**Máximo y mínimo de la sesión asiática**: límites del rango antes de la apertura de Londres ([mejores horas para operar el oro](/blog/mejores-horas-para-operar-oro)).",
          "**Máximo y mínimo de la semana**: niveles de contexto.",
          "**Máximos históricos**: cuando el precio se acerca, las reacciones suelen ser fuertes y rápidas.",
        ],
      },
      { h2: "Zonas, no líneas" },
      {
        p: "Un nivel rara vez se respeta al dólar. El oro suele perforar unos dólares antes de volver. Traza, pues, un rectángulo que englobe las mechas, no un trazo fino. En un gráfico de 1 hora, una zona de 5 a 10 $ de ancho es habitual. Lo que miras: dónde se han rechazado las velas y cómo cierran ([las velas japonesas](/blog/velas-japonesas)).",
      },
      { h2: "Cuando coinciden un nivel redondo y uno técnico" },
      {
        p: "El caso más interesante es la confluencia: un número redondo que coincide con un antiguo máximo o un mínimo. Varias razones para reaccionar en el mismo sitio refuerzan la zona. Si 2.450 corresponde también a un máximo de la semana pasada, merece una vigilancia de cerca. Sigue siendo una probabilidad, no una certeza.",
      },
      { h2: "Cómo usarlo para el plan" },
      {
        ol: [
          "**Marca las zonas** en el gráfico de 1 hora: dos o tres niveles por encima y dos o tres por debajo del precio.",
          "**Elige el escenario**: rebote en un soporte, ruptura de una resistencia con retest o espera.",
          "**Pon el stop más allá de la zona**, no dentro ni justo sobre el número redondo. Una zona de 2.450 puede superarse hasta 2.453 antes de volver: un stop en 2.449,5 saltará en balde ([dónde poner el stop loss](/blog/donde-poner-el-stop-loss)).",
          "**Pon el objetivo justo antes del siguiente nivel**, en vez de encima: allí hay muchas órdenes de toma de beneficios y el precio puede dar la vuelta a pocos dólares.",
          "**Comprueba la relación riesgo/beneficio** una vez fijadas estas cifras ([ratio riesgo/beneficio](/blog/ratio-riesgo-beneficio)).",
        ],
      },
      { h2: "Los errores frecuentes" },
      {
        ul: [
          "**Trazar demasiados niveles**: el gráfico se vuelve ilegible. Quédate con los más evidentes.",
          "**Entrar en el primer toque** sin señal de reacción. Esperar una vela de rechazo o un cierre más allá reduce las salidas en falso.",
          "**Olvidar el contexto**: un nivel redondo pesa poco ante un anuncio estadounidense importante ([operar el oro durante el NFP y la Fed](/blog/operar-oro-nfp-fed)).",
          "**Mezclar temporalidades** sin saber cuál manda: el nivel de 1 hora se impone al de 5 minutos.",
        ],
      },
      {
        p: "El [análisis con IA para oro](/gold) traza los niveles sobre tu captura teniendo en cuenta los números redondos. Puedes comparar con tus propias zonas: si la diferencia es grande, pregúntate por qué antes de operar.",
      },
      {
        p: "Esta guía es contenido educativo y no constituye asesoramiento de inversión. Ningún nivel tiene garantizado ser respetado. Los CFD conllevan un riesgo elevado de pérdida de capital.",
      },
    ],
  },
  {
    key: "strategie-or-1h-15m-5m",
    slug: "rutina-oro-1h-15m-5m",
    title: "Una rutina intradía para el oro: 1 hora, 15 minutos, 5 minutos",
    description:
      "Dirección en 1 hora, plan en 15 minutos, entrada en 5 minutos: una rutina de análisis multitemporal en el oro, explicada paso a paso y con sus límites.",
    date: "2026-11-19",
    body: [
      {
        p: "Esta rutina va del marco más grande al más pequeño: lees la dirección en el gráfico de 1 hora, construyes el plan en el de 15 minutos y buscas la entrada en el de 5 minutos. El objetivo es no operar una señal de 5 minutos que va contra todo lo que muestra el de 1 hora. No es un método ganador garantizado: es un marco de trabajo.",
      },
      { h2: "¿Por qué tres temporalidades?" },
      {
        p: "Un solo gráfico da una imagen parcial. El de 5 minutos es ruidoso en el oro y puede mostrar una ruptura que no es más que un movimiento dentro de una tendencia bajista en 1 hora. El de 1 hora da el contexto pero no el punto de entrada preciso. Los tres juntos responden a tres preguntas: adónde va el mercado, dónde están los niveles, cuándo actuar. Mira también [elegir la temporalidad](/blog/elegir-temporalidad).",
      },
      { h2: "Paso 0: antes de abrir el gráfico" },
      {
        ul: [
          "Consulta el calendario: ¿anuncio estadounidense a las 14:30? ¿Decisión de la Fed esta noche? ([calendario económico](/blog/calendario-economico)).",
          "Decide tu franja de trading ([mejores horas para operar el oro](/blog/mejores-horas-para-operar-oro)).",
          "Fija tu riesgo máximo por operación y por día, por ejemplo un 1 % por operación y tres pérdidas como máximo antes de parar.",
        ],
      },
      { h2: "Paso 1: la dirección en 1 hora" },
      {
        p: "Mira los últimos días. ¿Los máximos y los mínimos suben, bajan o se estancan en un rango? ¿Dónde ha reaccionado el precio varias veces? Traza dos o tres zonas por encima y por debajo ([niveles redondos y soportes en el oro](/blog/niveles-redondos-oro)).",
      },
      {
        p: "Al terminar este paso, debes poder escribir una frase: «Tendencia alcista, el precio está bajo la resistencia de 2.450, soporte en 2.400». Si no lo consigues, el mercado no es legible: déjalo pasar. Es una respuesta válida.",
      },
      { h2: "Paso 2: el plan en 15 minutos" },
      {
        p: "En el de 15 minutos, afina los niveles útiles para el día y elige un escenario principal, con uno alternativo. Por ejemplo: «Si el precio cierra por encima de 2.432, busco la compra con un stop bajo 2.418 y un objetivo hacia 2.450. Si 2.418 se rompe, abandono la idea». Las cifras son aquí un ejemplo, no un consejo.",
      },
      {
        ul: [
          "**Escribe las condiciones de entrada** antes de que el precio llegue.",
          "**Fija el stop** más allá de la zona, no pegado ([dónde poner el stop loss](/blog/donde-poner-el-stop-loss)).",
          "**Calcula la relación riesgo/beneficio**: por debajo de 1,5 o 2, la idea merece ponerse en duda ([ratio riesgo/beneficio](/blog/ratio-riesgo-beneficio)).",
          "**Calcula el tamaño de lote** según la distancia al stop ([tamaño de lote en el oro](/blog/tamano-de-lote-xau-usd)).",
        ],
      },
      { h2: "Paso 3: la entrada en 5 minutos" },
      {
        p: "El gráfico de 5 minutos sirve para elegir el momento, no la dirección. Espera a que se cumpla tu condición: un cierre por encima de un nivel, un retest que aguanta, una vela de rechazo en un soporte ([velas japonesas](/blog/velas-japonesas)). Si el precio se agita bajo la zona sin cerrar por encima, esperas.",
      },
      {
        p: "No entres en plena vela que se dispara. Es mejor perder una operación que correr detrás de un precio que ya se ha ido: el stop queda demasiado lejos y la relación riesgo/beneficio se degrada.",
      },
      { h2: "Paso 4: la gestión" },
      {
        ul: [
          "Una vez en posición, no toques el stop salvo para subirlo en el sentido de la operación, según reglas decididas de antemano.",
          "Toma parte de la ganancia en un nivel lógico si tu plan lo prevé.",
          "Cierra antes de un anuncio importante si no has previsto atravesarlo ([NFP, CPI y Fed](/blog/operar-oro-nfp-fed)).",
          "Anota la operación y guarda una captura, ganadora o perdedora: es tu material para progresar.",
        ],
      },
      { h2: "Los límites de esta rutina" },
      {
        ul: [
          "**No predice nada**: el escenario principal se equivoca a menudo, y el stop está para eso.",
          "**Supone disciplina**: saltarte un paso o mover un stop anula el interés del método.",
          "**Solo vale si la pruebas**: en al menos varias decenas de operaciones en demo o con tamaño pequeño, con un diario, antes de sacar una conclusión.",
          "**Se adapta mal a los días de anuncios**: la estructura habitual se altera.",
          "**Los costes cuentan**: spread y swap reducen el resultado, sobre todo con objetivos pequeños ([riesgos de los CFD](/blog/operar-oro-cfd-riesgos)).",
        ],
      },
      {
        p: "Es la lógica que sigue el [análisis especializado en oro](/gold): una captura por temporalidad, de la dirección a la entrada, con una conclusión de «esperar» posible. También puedes hacerlo a mano y usar la herramienta para comparar. Para capturas bien legibles, mira [cómo hacer una buena captura de pantalla](/blog/captura-de-pantalla-grafico).",
      },
      {
        p: "Esta guía es contenido educativo y no constituye asesoramiento de inversión. Las cifras citadas son ejemplos. Los CFD son productos complejos que conllevan un riesgo elevado de pérdida de capital.",
      },
    ],
  },
  {
    key: "analyser-l-or-avec-l-ia",
    slug: "analizar-oro-con-ia",
    title: "Analizar el oro con IA: qué lee y qué no",
    description:
      "Qué puede leer una IA en un gráfico XAU/USD (tendencia, niveles, plan), qué no puede hacer (predecir, ver el tiempo real) y cómo usarla sin equivocarte.",
    date: "2026-11-19",
    body: [
      {
        p: "Una IA puede leer una captura de un gráfico XAU/USD como lo haría un trader: identificar la tendencia, localizar niveles, describir velas y proponer un plan con entrada, stop y objetivos. No puede predecir el precio, solo ve la imagen que le das y no sustituye a tu criterio ni a tu gestión del riesgo.",
      },
      { h2: "Lo que una IA lee en un gráfico de oro" },
      {
        ul: [
          "**La tendencia y la estructura**: sucesión de máximos y mínimos, rango o ruptura.",
          "**Los niveles**: zonas donde el precio ha reaccionado, antiguos máximos y mínimos, números redondos ([niveles redondos en el oro](/blog/niveles-redondos-oro)).",
          "**Las velas y las figuras**: mechas de rechazo, envolventes, figuras de continuación ([velas japonesas](/blog/velas-japonesas), [patrones chartistas](/blog/patrones-chartistas)).",
          "**Los indicadores visibles**: RSI, medias móviles, si aparecen en la captura ([RSI](/blog/indicador-rsi)).",
          "**Un plan numérico**: entrada, stop, objetivos y el nivel que invalidaría la idea.",
        ],
      },
      {
        p: "El interés está sobre todo en ganar tiempo y en obtener una segunda lectura, argumentada, que puedes contrastar con la tuya. El principio general se explica en [el análisis técnico con IA](/blog/analisis-tecnico-con-ia).",
      },
      { h2: "Lo que una IA no sabe hacer" },
      {
        ul: [
          "**Predecir**: sopesa escenarios. El escenario principal puede equivocarse, y un porcentaje mostrado no es una probabilidad estadística garantizada.",
          "**Ver el tiempo real**: solo conoce tu captura. Si el precio se ha movido desde entonces, la lectura está caducada.",
          "**Leer una imagen ilegible**: un eje de precios cortado, un gráfico sobrecargado o una captura borrosa empeoran la respuesta ([cómo hacer bien la captura](/blog/captura-de-pantalla-grafico)).",
          "**Conocer tu situación**: tu capital, tu tolerancia al riesgo, tus costes, tu bróker. No envía órdenes ni gestiona tu dinero.",
          "**Sustituir la disciplina**: una buena lectura seguida de un tamaño de posición excesivo sigue siendo una mala idea.",
        ],
      },
      { h2: "Por qué el oro necesita ajustes propios" },
      {
        p: "El oro no es una acción ni un par de divisas como los demás. Es muy movido, reacciona con fuerza a las estadísticas estadounidenses y los números redondos desempeñan en él un papel visible. Una lectura genérica puede poner un stop demasiado cerca o ignorar que llega un anuncio. Eso motiva un análisis ajustado al oro ([cómo operar el oro](/blog/como-operar-el-oro)).",
      },
      { h2: "El análisis gold de Scanzivo" },
      {
        p: "Scanzivo ofrece un [análisis especializado en oro](/gold). Envías una captura de tu gráfico XAU/USD, sea cual sea la plataforma (TradingView, MetaTrader, cTrader o la aplicación de tu bróker). El análisis sigue pautas propias del oro: números redondos, sesiones, estadísticas estadounidenses, stops colocados más allá de las mechas recientes. El modelo de IA, en cambio, es el mismo que para los demás activos. La rutina de análisis en tres capturas se describe en [la rutina de 1 hora, 15 minutos y 5 minutos](/blog/rutina-oro-1h-15m-5m).",
      },
      {
        p: "Lo que el servicio no hace: no predice el precio, no envía ninguna orden, no manda señales y no da asesoramiento de inversión personalizado.",
      },
      { h2: "Cómo usarlo con cabeza" },
      {
        ol: [
          "**Haz primero tu propia lectura**, en unas líneas: dirección, niveles, escenario.",
          "**Envía después la captura** y compara. Una coincidencia no prueba nada; una discrepancia te invita a mirar más de cerca.",
          "**Comprueba los niveles en tu gráfico**: la IA puede colocar mal una línea. Tú eres el último revisor.",
          "**Controla el calendario**: un anuncio cercano lo cambia todo ([NFP, CPI y Fed](/blog/operar-oro-nfp-fed)).",
          "**Calcula tú mismo tu tamaño** con tus datos ([tamaño de lote en el oro](/blog/tamano-de-lote-xau-usd)).",
          "**Lleva un diario** para ver, con el tiempo, si la lectura te ayuda o no.",
        ],
      },
      {
        tip: "Si el análisis concluye que es mejor esperar, es una información útil. Una herramienta que siempre encuentra una operación que hacer debería preocuparte.",
      },
      { h2: "Las malas razones para usar una IA" },
      {
        ul: [
          "Para no tener que aprender a leer un gráfico.",
          "Para encontrar una operación a toda costa cuando el mercado no ofrece nada.",
          "Para justificar una posición ya tomada.",
          "Porque una fuente promete resultados regulares: desconfía ([estafas de bots de trading](/blog/bots-de-trading-ia-estafas)).",
        ],
      },
      {
        p: "Usada como ayuda para pensar, la IA puede acelerar tu rutina y hacerte ver lo que has pasado por alto. Usada como bola de cristal, te hará perder dinero.",
      },
      {
        p: "Esta guía es contenido educativo y no constituye asesoramiento de inversión. El análisis con IA no garantiza ningún resultado. Los CFD son productos complejos que conllevan un riesgo elevado de pérdida de capital.",
      },
    ],
  },
];
