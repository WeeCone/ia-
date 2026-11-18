import type { Article } from "./blog";

/** Spanish versions of the technical guides in blog-fr-3.ts; `key` is the French slug. */
export const ARTICLES_ES_3: Omit<Article, "locale">[] = [
  {
    key: "macd-indicateur",
    slug: "indicador-macd",
    title: "MACD: cómo leer el indicador y sus divergencias",
    description:
      "Las dos líneas, el histograma, los cruces y las divergencias del MACD, con un ejemplo numérico y los límites que conviene conocer antes de fiarte de él.",
    date: "2026-11-19",
    body: [
      {
        p: "El MACD (Moving Average Convergence Divergence) mide la distancia entre dos medias móviles exponenciales para mostrar si el impulso de un mercado se acelera o se agota. No predice nada: resume la velocidad de la tendencia actual. Usado en solitario, da muchas señales falsas.",
      },
      { h2: "¿Cómo se construye el MACD?" },
      {
        p: "Con los ajustes clásicos (12, 26, 9), el indicador tiene tres elementos, que se dibujan debajo del gráfico de precio.",
      },
      {
        ul: [
          "**La línea MACD**: media móvil exponencial de 12 periodos menos la de 26. Cuando es positiva, la media corta está por encima de la larga.",
          "**La línea de señal**: media móvil exponencial de 9 periodos de la línea MACD. Reacciona más despacio.",
          "**El histograma**: la diferencia entre la línea MACD y la línea de señal. Sube de cero cuando el MACD está por encima de su señal y baja de cero en el caso contrario.",
        ],
      },
      {
        p: "Estos ajustes vienen de una época en la que se operaba seis días por semana. Nada te obliga a conservarlos, pero son los que mira la mayoría de los traders, y por eso son los que más pesan.",
      },
      { h2: "¿Qué significa un cruce del MACD?" },
      {
        p: "Cuando la línea MACD pasa por encima de la línea de señal, el impulso alcista toma el mando: es un cruce alcista. Cuando pasa por debajo, es un cruce bajista. En el histograma, equivale al momento en que las barras atraviesan la línea cero.",
      },
      {
        p: "Que la propia línea MACD cruce el cero es otra referencia. Por encima de cero, la media corta está sobre la larga: el mercado se inclina al alza. Por debajo, a la baja.",
      },
      {
        p: "**Ejemplo (ilustrativo):** un activo sube desde hace tres semanas y la línea MACD es positiva. El precio hace una pausa, el histograma se reduce y después la línea MACD cruza hacia abajo su señal. Eso no dice que la subida haya terminado. Dice que el impulso ha perdido fuerza. A ti te toca comprobar si el precio aguanta un soporte antes de sacar conclusiones.",
      },
      { h2: "¿Cómo se lee el histograma?" },
      {
        p: "Importan las barras, no solo su color. Barras positivas que crecen muestran una subida que gana velocidad. Barras positivas que se acortan muestran una subida que frena, aunque el precio siga subiendo. El histograma suele anticipar el cruce unas cuantas velas antes de que ocurra.",
      },
      { h2: "¿Qué es una divergencia del MACD?" },
      {
        p: "Hay divergencia cuando el precio y el indicador cuentan dos historias distintas.",
      },
      {
        ul: [
          "**Divergencia bajista**: el precio marca un nuevo máximo, pero el MACD dibuja un máximo más bajo. La subida lleva menos impulso.",
          "**Divergencia alcista**: el precio marca un nuevo mínimo, pero el MACD dibuja un mínimo más alto. La bajada se agota.",
        ],
      },
      {
        p: "Es una señal de alerta, no una señal de entrada. Una divergencia puede durar mucho tiempo mientras el precio sigue en la misma dirección. Muchos traders esperan a que una ruptura de estructura o una vela de giro la confirme. Sobre esas velas, mira las [velas japonesas](/blog/velas-japonesas).",
      },
      { h2: "¿Cuáles son los límites del MACD?" },
      {
        ul: [
          "**Llega tarde.** Se calcula con medias móviles, es decir, con precios pasados. El cruce suele llegar cuando el movimiento ya ha empezado.",
          "**Falla en rango.** Cuando el precio oscila sin dirección, las líneas se cruzan una y otra vez y producen una serie de falsas señales. Para saber dónde estás, lee [tendencia o rango](/blog/tendencia-o-rango).",
          "**No da niveles ni stop.** No dice dónde entrar, dónde salir ni dónde proteger la operación. Para eso necesitas un gráfico con [soportes y resistencias](/blog/soportes-y-resistencias).",
          "**Depende de la temporalidad.** Un cruce alcista en 5 minutos puede convivir con una tendencia bajista en 4 horas. Mira cómo [elegir la temporalidad](/blog/elegir-temporalidad).",
        ],
      },
      { h2: "¿Cómo combinar el MACD con otras herramientas?" },
      {
        p: "El MACD mide el impulso, el [RSI](/blog/indicador-rsi) mide el exceso y las [medias móviles](/blog/medias-moviles) dan la dirección. Ninguno sustituye a la lectura del propio precio. Una rutina sencilla: identifica la estructura (tendencia, soportes, resistencias) y luego mira si el MACD confirma o contradice lo que ves. Si lo contradice, no es una orden de no hacer nada, es una razón para reducir el tamaño o esperar. Sobre el tamaño, consulta el [tamaño de posición](/blog/tamano-de-posicion).",
      },
      { tip: "Si empiezas, añade un solo indicador cada vez. Obsérvalo en veinte gráficos pasados antes de darle peso en una decisión." },
      { h2: "¿Y si quieres una lectura rápida de tu gráfico?" },
      {
        p: "[Scanzivo](/) lee la captura de pantalla de un gráfico, con o sin indicadores, y propone niveles y un plan numerado. Puedes comparar lo que dice del MACD con lo que ves tú: es una buena forma de entrenarte.",
      },
      {
        p: "Este contenido es educativo y no constituye asesoramiento de inversión. Operar conlleva riesgo de pérdida de capital, que puede alcanzar la totalidad del dinero invertido.",
      },
    ],
  },
  {
    key: "moyennes-mobiles",
    slug: "medias-moviles",
    title: "Medias móviles: MM20, MM50, MM200, cruces y límites",
    description:
      "Qué calcula una media móvil, la diferencia entre SMA y EMA, el papel de las medias de 20, 50 y 200 periodos y por qué los cruces engañan en rango.",
    date: "2026-11-19",
    body: [
      {
        p: "Una media móvil suaviza los precios de cierre durante un periodo dado para que se vea la dirección. No prevé nada: describe lo que ya ha pasado. Su fuerza es hacer legible una tendencia; su debilidad, llegar tarde.",
      },
      { h2: "¿Cómo funciona una media móvil?" },
      {
        p: "Una media móvil de 20 periodos suma los últimos 20 cierres y divide entre 20. Con cada vela nueva, la más antigua sale del cálculo y entra la nueva: la línea «se desplaza». En un gráfico de 1 hora, la MM20 cubre las últimas 20 horas. En un gráfico diario, los últimos 20 días.",
      },
      { h2: "¿Qué diferencia hay entre SMA y EMA?" },
      {
        ul: [
          "**SMA (simple)**: todos los cierres pesan lo mismo. La línea es regular pero reacciona tarde.",
          "**EMA (exponencial)**: los cierres recientes pesan más. La línea se pega más al precio y reacciona antes, a costa de más falsas salidas.",
        ],
      },
      {
        p: "Ninguna es mejor en sí misma. En un mismo gráfico, la diferencia entre las dos suele ser pequeña. Lo importante es ser coherente: no cambies de tipo de media en cada operación para que la historia encaje.",
      },
      { h2: "¿Para qué sirven la MM20, la MM50 y la MM200?" },
      {
        p: "Son los periodos más seguidos, así que muchos participantes miran los mismos niveles a la vez.",
      },
      {
        ul: [
          "**MM20**: el corto plazo. En una tendencia sana, el precio se aleja de ella y suele volver a tocarla.",
          "**MM50**: el medio plazo. Se usa a menudo como zona de retroceso en una tendencia consolidada.",
          "**MM200**: el largo plazo. Un precio por encima suele leerse como mercado alcista de fondo y por debajo como bajista. En el gráfico diario es la más vigilada.",
        ],
      },
      {
        p: "**Ejemplo (ilustrativo):** un activo está por encima de sus MM20, MM50 y MM200, las tres miran hacia arriba y en ese orden. El precio retrocede hacia la MM50 y deja una vela de rechazo. Muchos traders ven ahí una zona de interés. No es una garantía: si el cierre pasa claramente por debajo de la MM50, hay que revisar el escenario.",
      },
      { h2: "¿Qué es un cruce de medias móviles?" },
      {
        p: "Cuando una media corta pasa por encima de una larga, es un cruce alcista. Lo contrario es un cruce bajista. El más conocido en bolsa es el de la MM50 con la MM200: se habla de «cruz dorada» cuando la MM50 pasa por encima y de «cruz de la muerte» cuando pasa por debajo.",
      },
      {
        p: "Los nombres son espectaculares, no mágicos. El cruce llega mucho después de que el movimiento haya empezado, porque dos medias ya son pasado. A menudo confirma una tendencia que ha recorrido buena parte de su camino.",
      },
      { h2: "¿Cuáles son los límites de las medias móviles?" },
      {
        ul: [
          "**El retraso.** Cuanto más largo el periodo, más tarde llega la señal.",
          "**El rango.** Cuando el precio se mueve sin dirección, cruza la media en los dos sentidos y cada cruce parece una señal. Ahí es donde más cuestan. Lee [tendencia o rango](/blog/tendencia-o-rango).",
          "**Ningún nivel preciso.** La media es una zona, no una línea exacta. Un stop puesto justo encima o debajo suele saltar.",
          "**El efecto de la optimización.** Siempre se encuentra a posteriori el periodo que habría funcionado. Eso no dice nada del futuro.",
        ],
      },
      { h2: "¿Cómo usarlas sin caer en trampas?" },
      {
        ol: [
          "**Identifica la tendencia** en una temporalidad superior (mira [elegir la temporalidad](/blog/elegir-temporalidad)).",
          "**Fíjate en la pendiente.** Una media plana indica un mercado sin tendencia: las señales pierden valor.",
          "**Busca confluencia**: una MM50 que coincide con un soporte horizontal pesa más que una MM50 sola. Mira [soportes y resistencias](/blog/soportes-y-resistencias).",
          "**Define la invalidación**: dónde tu idea es falsa, con un stop (consulta [dónde poner el stop loss](/blog/donde-poner-el-stop-loss)).",
        ],
      },
      {
        p: "Las medias móviles combinan bien con el [MACD](/blog/indicador-macd), que está hecho de medias móviles, y con las [bandas de Bollinger](/blog/bandas-de-bollinger), cuya línea central es una MM20.",
      },
      { tip: "Para saber si la MM200 cuenta en tu activo, mira si el precio ha reaccionado ya en ella en el pasado. Si no, es una línea más." },
      {
        p: "Si quieres una segunda opinión sobre un gráfico cargado de líneas, [Scanzivo](/) lee tu captura de pantalla, separa lo que importa (niveles, tendencia) de lo que estorba y propone un plan numerado que puedes discutir.",
      },
      {
        p: "Este contenido es educativo y no constituye asesoramiento de inversión. Operar conlleva riesgo de pérdida de capital, que puede alcanzar la totalidad del dinero invertido.",
      },
    ],
  },
  {
    key: "bandes-de-bollinger",
    slug: "bandas-de-bollinger",
    title: "Bandas de Bollinger: qué miden y cómo leerlas",
    description:
      "Construcción de las bandas, lectura de su anchura, el squeeze y por qué tocar una banda no es ni una señal de compra ni de venta.",
    date: "2026-11-19",
    body: [
      {
        p: "Las bandas de Bollinger rodean el precio con dos envolventes que se ensanchan cuando sube la volatilidad y se estrechan cuando baja. Miden la dispersión del precio en torno a su media. No dicen adónde irá el mercado, y tocar una banda no es una señal de giro.",
      },
      { h2: "¿Cómo se construyen las bandas de Bollinger?" },
      {
        p: "El ajuste clásico es (20, 2) y da tres líneas.",
      },
      {
        ul: [
          "**La banda media**: una media móvil simple de 20 periodos (mira [medias móviles](/blog/medias-moviles)).",
          "**La banda superior**: la media más 2 desviaciones típicas de los últimos 20 cierres.",
          "**La banda inferior**: la media menos 2 desviaciones típicas.",
        ],
      },
      {
        p: "La desviación típica mide cuánto se alejan los precios de su media. Cuanto más grandes y agitadas son las velas, más alta es y más se separan las bandas. Con 2 desviaciones, el precio pasa la mayor parte del tiempo entre las dos bandas, pero no siempre: sale con regularidad, y ahí está justo la trampa.",
      },
      { h2: "¿Qué dice la anchura de las bandas?" },
      {
        p: "La anchura cuenta más que la posición del precio. Unas bandas anchas indican volatilidad alta, por ejemplo tras un anuncio o una tendencia fuerte. Unas bandas estrechas indican un mercado tranquilo. La volatilidad alterna: tras una fase calmada suele llegar una agitada, y al revés. Es la idea más útil de la herramienta.",
      },
      { h2: "¿Qué es un squeeze de Bollinger?" },
      {
        p: "El squeeze es un estrechamiento de las bandas hasta un nivel bajo respecto a las últimas semanas. Señala que la volatilidad es baja y que podría llegar una expansión. No dice nada sobre la dirección.",
      },
      {
        p: "**Ejemplo (ilustrativo):** en un gráfico de 1 hora, el precio se mueve dos días en un pasillo estrecho y las bandas se acercan. Después, una vela grande cierra por encima de la banda superior, las bandas se abren y el volumen sube. Puede ser el inicio de un movimiento, o una falsa salida que vuelve al pasillo. Por eso conviene leer [falsa ruptura](/blog/falsa-ruptura) antes de actuar con este tipo de señal.",
      },
      { h2: "¿Tocar la banda superior es una señal de venta?" },
      {
        p: "No. Es el error más extendido. En una tendencia fuerte, el precio puede recorrer la banda superior durante muchas velas: se dice que «camina por la banda». Vender en cada contacto sería ponerse en contra de la tendencia una y otra vez.",
      },
      {
        p: "En cambio, en un mercado sin dirección, las bandas sirven bien de referencia: el precio suele rebotar hacia la media tras tocar un extremo. Todo depende del contexto, y por eso necesitas saber si estás en tendencia o en rango (mira [tendencia o rango](/blog/tendencia-o-rango)).",
      },
      { h2: "¿Qué errores evitar con las bandas de Bollinger?" },
      {
        ul: [
          "**Leerlas como soportes y resistencias.** Se mueven con cada vela. Un nivel de verdad es horizontal y ya ha sido probado; mira [soportes y resistencias](/blog/soportes-y-resistencias).",
          "**Ignorar la tendencia.** Las mismas bandas dan lecturas opuestas según el contexto.",
          "**Actuar en un squeeze sin esperar confirmación.** La dirección de la salida es desconocida. Algunos traders esperan un cierre fuera de las bandas acompañado de más volumen (mira [el volumen en trading](/blog/volumen-en-trading)).",
          "**Olvidar la temporalidad.** Un squeeze en 5 minutos no tiene el mismo alcance que en diario. Mira [elegir la temporalidad](/blog/elegir-temporalidad).",
          "**Apilar indicadores de la misma naturaleza.** Las bandas, el RSI y el MACD derivan de los mismos precios: tres coincidencias no son tres pruebas.",
        ],
      },
      { h2: "¿Cómo combinarlas con otras referencias?" },
      {
        p: "Un uso razonable: identifica primero la estructura (tendencia, niveles) y usa las bandas para juzgar el estado de la volatilidad. Una salida de rango precedida por un estrechamiento es más interesante que una salida en plena agitación. El [RSI](/blog/indicador-rsi) puede ayudar a ver si el movimiento ya está muy estirado. Y la gestión del riesgo sigue siendo independiente: el tamaño se calcula a partir del stop, no de las bandas (mira [tamaño de posición](/blog/tamano-de-posicion)).",
      },
      { tip: "Cuando las bandas están muy separadas tras un gran movimiento, no uses la banda opuesta como objetivo. Puede estar muy lejos o estar ya acercándose." },
      {
        p: "Sobre tu propio gráfico, [Scanzivo](/) puede leer la captura con tus bandas dibujadas y sacar niveles y un plan numerado, que después contrastas con tu lectura del contexto.",
      },
      {
        p: "Este contenido es educativo y no constituye asesoramiento de inversión. Operar conlleva riesgo de pérdida de capital, que puede alcanzar la totalidad del dinero invertido.",
      },
    ],
  },
  {
    key: "retracement-de-fibonacci",
    slug: "retroceso-de-fibonacci",
    title: "Retroceso de Fibonacci: niveles y cómo trazarlo",
    description:
      "Cómo trazar los niveles de Fibonacci paso a paso, qué significan el 38,2 / 50 / 61,8 % y por qué hay que tratarlos como zonas, no como certezas.",
    date: "2026-11-19",
    body: [
      {
        p: "El retroceso de Fibonacci coloca niveles (38,2 %, 50 %, 61,8 %) entre el inicio y el final de un movimiento para ver dónde podría detenerse un retroceso. Son zonas de atención, no garantías: muchos traders las miran, lo que a veces les da peso, pero el precio también las atraviesa a menudo.",
      },
      { h2: "¿De dónde salen estos porcentajes?" },
      {
        p: "Derivan de la sucesión de Fibonacci, en la que cada número es la suma de los dos anteriores. El cociente entre un número y el siguiente tiende a 61,8 %, y a 38,2 % con el que viene después. El 50 % no es un ratio de Fibonacci en sentido estricto: se añade porque muchos movimientos vuelven a la mitad. Ninguna ley del mercado obliga al precio a respetar estas proporciones. Su utilidad es práctica: dan referencias objetivas y compartidas.",
      },
      { h2: "¿Cómo se traza un retroceso de Fibonacci?" },
      {
        ol: [
          "**Localiza un movimiento claro**: una pierna nítida entre un mínimo y un máximo (o al revés), sin maraña.",
          "**Elige los dos puntos**: el inicio y el final del movimiento. En una subida, del mínimo al máximo. En una bajada, del máximo al mínimo. Puedes usar mechas o cierres, pero sé coherente.",
          "**Arrastra la herramienta** en tu plataforma: los niveles aparecen entre los dos puntos.",
          "**Observa la reacción del precio** cuando vuelve hacia el 38,2 %, el 50 % o el 61,8 %.",
        ],
      },
      {
        p: "**Ejemplo (ilustrativo):** un activo sube de 100 € a 120 €. El movimiento mide 20 €. El nivel del 38,2 % está en 120 − 7,64 = 112,36 €. El 50 %, en 110 €. El 61,8 %, en 120 − 12,36 = 107,64 €. Si el precio baja, se observa qué hace alrededor de esas zonas, por ejemplo una vela de rechazo o una ruptura clara.",
      },
      { h2: "¿Qué significa cada nivel?" },
      {
        ul: [
          "**38,2 %**: un retroceso débil. En una tendencia fuerte, el precio suele arrancar de nuevo desde ahí.",
          "**50 %**: un retroceso medio, considerado a menudo el límite de una corrección «sana».",
          "**61,8 %**: un retroceso profundo. Más allá, la idea de simple pausa se pone en duda; aumenta el riesgo de giro.",
        ],
      },
      {
        p: "Un retroceso que supera el 78,6 % o vuelve al origen del movimiento invalida casi siempre el escenario. Eso es lo que da a la herramienta una utilidad concreta: ayuda a fijar un umbral en el que la idea deja de ser válida.",
      },
      { h2: "¿Cuáles son los límites de Fibonacci?" },
      {
        p: "Seamos directos: los retrocesos tienen límites serios.",
      },
      {
        ul: [
          "**La elección de los puntos es subjetiva.** Dos traders trazan dos rejillas distintas sobre el mismo gráfico, y cada uno encuentra reacciones.",
          "**Hay demasiados niveles.** Con varias rejillas, casi cualquier precio acaba cerca de un nivel. Se ve lo que funcionó y se olvida el resto.",
          "**El precio atraviesa los niveles** a menudo sin detenerse.",
          "**No hay ninguna ventaja estadística garantizada.** Trata la herramienta como una referencia visual, no como un método probado.",
        ],
      },
      { h2: "¿Cómo darle más peso?" },
      {
        p: "Buscando confluencia: un nivel de Fibonacci que cae sobre un [soporte o una resistencia](/blog/soportes-y-resistencias) ya probado, sobre una [media móvil](/blog/medias-moviles) importante o sobre un número redondo merece más atención que un nivel aislado. Una vela de rechazo en ese punto (mira las [velas japonesas](/blog/velas-japonesas)) añade confirmación. Sin ella, es mejor esperar.",
      },
      {
        p: "En cuanto al riesgo, el retroceso ayuda a situar el stop: bajo el nivel siguiente o bajo el origen del movimiento. Mira [dónde poner el stop loss](/blog/donde-poner-el-stop-loss) y comprueba después el [ratio riesgo/beneficio](/blog/ratio-riesgo-beneficio): el objetivo natural es el máximo anterior, lo que da una relación medible antes de entrar. Un retroceso hacia el 61,8 % con el stop justo debajo ofrece normalmente mejor relación que una entrada en el 38,2 %, pero con menos probabilidad de que el precio llegue hasta ese nivel.",
      },
      { tip: "Traza siempre la rejilla sobre la pierna más evidente, la que ve todo el mundo. Una rejilla que solo dibujas tú no tiene motivo para ser seguida por el mercado." },
      {
        p: "Para comparar tu trazado con otra mirada, [Scanzivo](/) lee una captura de tu gráfico y propone niveles de entrada, stop y objetivo en un plan numerado, que puedes contrastar con tu rejilla.",
      },
      {
        p: "Este contenido es educativo y no constituye asesoramiento de inversión. Operar conlleva riesgo de pérdida de capital, que puede alcanzar la totalidad del dinero invertido.",
      },
    ],
  },
  {
    key: "fausse-cassure",
    slug: "falsa-ruptura",
    title: "Falsa ruptura: cómo reconocerla y evitar la trampa",
    description:
      "Por qué el precio perfora un nivel y vuelve, las señales de alerta y tres hábitos para limitar el daño sin pretender evitarlas todas.",
    date: "2026-11-19",
    body: [
      {
        p: "Una falsa ruptura es una salida de un soporte, una resistencia o un rango que no se sostiene: el precio supera el nivel, atrae entradas y luego vuelve a la zona. No se evitan todas. Se aprende a reconocerlas antes y a limitar lo que cuestan.",
      },
      { h2: "¿Qué es una falsa ruptura?" },
      {
        p: "Un nivel claro concentra órdenes: stops justo detrás y órdenes de entrada de traders de ruptura. Cuando el precio supera ese nivel, esas órdenes se activan. Si no hay demanda real suficiente detrás del movimiento, el precio se agota y da la vuelta. Quienes entraron en la ruptura quedan atrapados, y sus stops alimentan el movimiento contrario.",
      },
      {
        p: "**Ejemplo (ilustrativo):** una resistencia en 50 € ha sido probada tres veces. Una vela supera hasta 50,4 € y después el precio baja y cierra en 49,6 €. Los compradores de la ruptura están en pérdidas. El nivel de 50 € no se ha roto: ha sido «barrido».",
      },
      { h2: "¿Qué señales deben ponerte en alerta?" },
      {
        ul: [
          "**Una mecha, no un cuerpo.** El precio supera el nivel con una mecha larga, pero la vela cierra por debajo. El cierre cuenta más que el máximo.",
          "**Un volumen que no acompaña.** Una ruptura sin volumen superior al normal carece de convicción (mira [el volumen en trading](/blog/volumen-en-trading), con sus límites).",
          "**Un contexto contrario.** La ruptura va contra la tendencia de la temporalidad superior.",
          "**Un momento frágil.** Apertura, anuncio económico, fin de semana: la liquidez es menor y los movimientos más nerviosos (mira [el calendario económico](/blog/calendario-economico)).",
          "**Una vela de giro justo después**, como una envolvente o una estrella vespertina. Mira las [velas japonesas](/blog/velas-japonesas).",
        ],
      },
      { h2: "¿Cómo evitar caer en la trampa?" },
      { h3: "Esperar un cierre" },
      {
        p: "En lugar de entrar en cuanto se toca el nivel, espera al cierre de la vela más allá del nivel, en la temporalidad que sigues. Pierdes un poco de precio. Evitas muchas mechas.",
      },
      { h3: "Esperar el retest" },
      {
        p: "Una ruptura franca suele volver a probar el nivel, que pasa a ser un soporte (antigua resistencia) o una resistencia (antiguo soporte). Si el precio aguanta en ese retest, la entrada queda mejor situada y el stop más cerca. El riesgo es perderte el movimiento si no vuelve: es el precio de la prudencia.",
      },
      { h3: "Poner el stop en el lado correcto" },
      {
        p: "Un stop justo debajo del nivel roto suele saltar por una mecha. Un stop bajo el último mínimo significativo, o bajo la zona, deja margen. Implica una posición más pequeña: es el cálculo descrito en [tamaño de posición](/blog/tamano-de-posicion) y [dónde poner el stop loss](/blog/donde-poner-el-stop-loss).",
      },
      { h2: "¿Se puede sacar partido de una falsa ruptura?" },
      {
        p: "Algunos traders la tratan como una señal en sí misma: el precio vuelve bajo la resistencia, venden y ponen el stop por encima de la mecha. La idea es lógica, porque el stop es preciso y cercano, lo que da un buen [ratio riesgo/beneficio](/blog/ratio-riesgo-beneficio). Pero sigue siendo una apuesta: un segundo intento de ruptura puede salir bien donde falló el primero.",
      },
      { h2: "¿Qué errores frecuentes empeoran la situación?" },
      {
        ul: [
          "**Correr detrás del precio**: entrar tarde en una vela ya estirada.",
          "**Aumentar el tamaño para «recuperar»** tras una trampa.",
          "**Mover el stop** cuando el precio vuelve en tu contra.",
          "**Confundir rango y tendencia**: en rango, la mayoría de las rupturas fallan (mira [tendencia o rango](/blog/tendencia-o-rango)).",
          "**Ignorar el contexto**: ruptura en 5 minutos contra una tendencia fuerte en 4 horas.",
        ],
      },
      { tip: "Anota tus diez últimas rupturas, con resultado y contexto. Verás pronto si tus fallos vienen de un momento, de un tipo de nivel o de tu impaciencia." },
      {
        p: "Antes de decidir, puede ayudar que otra mirada repase tu gráfico: [Scanzivo](/) analiza una captura de pantalla, localiza los posibles niveles de ruptura y propone un plan numerado con invalidación, que conservas o descartas.",
      },
      {
        p: "Este contenido es educativo y no constituye asesoramiento de inversión. Operar conlleva riesgo de pérdida de capital, que puede alcanzar la totalidad del dinero invertido.",
      },
    ],
  },
  {
    key: "tendance-et-range",
    slug: "tendencia-o-rango",
    title: "Tendencia o rango: cómo reconocerlos",
    description:
      "Máximos y mínimos, pendiente de las medias, ausencia de dirección: las referencias para distinguir un mercado en tendencia de uno en rango y qué cambia en cada caso.",
    date: "2026-11-19",
    body: [
      {
        p: "Un mercado está en tendencia cuando encadena máximos y mínimos cada vez más altos (o cada vez más bajos). Está en rango cuando oscila entre un techo y un suelo sin avanzar. Saber cuál de los dos tienes delante es la primera pregunta que hay que hacerse, porque la mayoría de las herramientas funcionan en uno y fallan en el otro.",
      },
      { h2: "¿Cómo reconocer una tendencia alcista o bajista?" },
      {
        p: "La referencia más sencilla es la estructura.",
      },
      {
        ul: [
          "**Tendencia alcista**: cada máximo supera al anterior y cada mínimo es más alto que el anterior.",
          "**Tendencia bajista**: cada máximo y cada mínimo son más bajos que los anteriores.",
        ],
      },
      {
        p: "Puedes añadir la pendiente de las [medias móviles](/blog/medias-moviles): una MM50 claramente inclinada, con un precio que se mantiene del mismo lado, confirma la dirección. Pero la estructura manda: una media es consecuencia del precio, no causa.",
      },
      {
        p: "**Ejemplo (ilustrativo):** mínimo en 100 €, máximo en 110 €, retroceso a 104 €, nuevo máximo en 116 €, retroceso a 108 €. Los mínimos (100, 104, 108) y los máximos (110, 116) suben: tendencia alcista. Si el próximo retroceso baja de 108 €, la estructura se rompe y la lectura cambia.",
      },
      { h2: "¿Cómo reconocer un rango?" },
      {
        ul: [
          "El precio rebota al menos dos veces en un mismo suelo y en un mismo techo.",
          "Las medias móviles son planas y el precio las cruza en los dos sentidos.",
          "Los máximos y los mínimos no progresan.",
          "Las velas suelen ser pequeñas, con mechas a ambos lados.",
        ],
      },
      {
        p: "El techo y el suelo son tus [soportes y resistencias](/blog/soportes-y-resistencias). La anchura del rango determina el potencial que queda: un rango estrecho deja poco espacio para un buen [ratio riesgo/beneficio](/blog/ratio-riesgo-beneficio) después de comisiones.",
      },
      { h2: "¿Cómo adaptar tu lectura según el mercado?" },
      { h3: "En tendencia" },
      {
        p: "Los retrocesos hacia una media o un soporte son zonas de interés en el sentido de la tendencia. Los [indicadores de impulso](/blog/indicador-macd) dan señales útiles, y los retrocesos ([Fibonacci](/blog/retroceso-de-fibonacci)) ayudan a situar la profundidad del retroceso. El riesgo principal: operar contra la tendencia porque el precio «está demasiado alto».",
      },
      { h3: "En rango" },
      {
        p: "Los extremos son las zonas de interés y el centro es una zona sin ventaja. Un [RSI](/blog/indicador-rsi) que toca extremos es más útil aquí que en una tendencia fuerte. El riesgo principal: que te sorprenda la salida, que puede ser una [falsa ruptura](/blog/falsa-ruptura) o una real.",
      },
      { h2: "¿Y cuando el mercado pasa de uno a otro?" },
      {
        p: "Es el momento más difícil. Una tendencia suele acabar en rango (el mercado se pone en pausa) y un rango acaba en tendencia (el mercado elige bando). Algunas señales de transición: una ruptura de la estructura (un mínimo que baja del anterior en una subida), un estrechamiento de la volatilidad (mira [bandas de Bollinger](/blog/bandas-de-bollinger)) o un volumen que cambia de comportamiento (mira [el volumen en trading](/blog/volumen-en-trading)).",
      },
      { h2: "¿Cambia la respuesta según la temporalidad?" },
      {
        p: "Sí, y es una fuente de confusión. Un mercado puede estar en tendencia alcista en diario y en rango en 15 minutos. La regla práctica: identifica la dirección en una temporalidad superior y busca después tu entrada en una más fina. Mira [elegir la temporalidad](/blog/elegir-temporalidad) y, para las bases, [cómo leer un gráfico de trading](/blog/como-leer-un-grafico-de-trading).",
      },
      { h2: "¿Qué errores se repiten más?" },
      {
        ul: [
          "**Ver una tendencia en todas partes.** Un movimiento de tres velas no es una tendencia.",
          "**Aplicar siempre el mismo método.** Una estrategia de ruptura en rango, o de rebote en tendencia fuerte, se desgasta rápido.",
          "**Ignorar el contexto de anuncios.** Una publicación puede romper un rango sin avisar (mira [el calendario económico](/blog/calendario-economico)).",
          "**Cambiar la lectura con cada vela.** Fija tus criterios de antemano.",
        ],
      },
      { tip: "Hazte una pregunta antes de cada operación: si apago la pantalla y la abro dentro de una semana, ¿el precio estará más alto, más bajo o en el mismo sitio? Tu respuesta dice lo que crees ver." },
      {
        p: "Para una mirada externa, [Scanzivo](/) lee tu captura de pantalla, indica si la estructura se parece a una tendencia o a un rango y propone niveles con un plan numerado. Contrasta siempre lo que dice con tu propia lectura.",
      },
      {
        p: "Este contenido es educativo y no constituye asesoramiento de inversión. Operar conlleva riesgo de pérdida de capital, que puede alcanzar la totalidad del dinero invertido.",
      },
    ],
  },
  {
    key: "volume-trading",
    slug: "volumen-en-trading",
    title: "El volumen en trading: qué confirma y qué no",
    description:
      "Cómo leer las barras de volumen, qué confirman en una ruptura o una tendencia y por qué el volumen del forex y de las criptomonedas no significa lo mismo.",
    date: "2026-11-19",
    body: [
      {
        p: "El volumen mide la cantidad negociada durante una vela. Ayuda a juzgar si un movimiento se apoya en una participación real o si es débil. No da la dirección y, según el mercado (acciones, cripto, forex), no significa lo mismo.",
      },
      { h2: "¿Qué mide realmente el volumen?" },
      {
        p: "Bajo el gráfico, cada barra representa el número de unidades negociadas en el periodo: acciones, contratos o unidades de cripto. Una barra alta significa muchos intercambios y una barra baja, pocos. Lo que cuenta es la comparación con las barras recientes, no el valor bruto.",
      },
      { h2: "¿Qué confirma el volumen?" },
      {
        ul: [
          "**Una ruptura.** Un precio que sale de un nivel con un volumen claramente mayor tiene más probabilidades de continuar que una salida con volumen bajo. Reduce el riesgo de [falsa ruptura](/blog/falsa-ruptura), sin eliminarlo.",
          "**Una tendencia.** En una subida sana, el volumen suele aumentar en los impulsos y calmarse en los retrocesos.",
          "**Un pico de agotamiento.** Un volumen excepcional tras un movimiento largo puede marcar el final de una tendencia, pero solo si el precio reacciona después.",
          "**Un nivel.** Un soporte defendido con volumen es más creíble que un nivel tocado sin actividad. Mira [soportes y resistencias](/blog/soportes-y-resistencias).",
        ],
      },
      {
        p: "**Ejemplo (ilustrativo):** un precio supera una resistencia. Las 20 barras anteriores rondan las 1.000 unidades y la barra de ruptura marca 3.500. La participación es clara. Si marca 900, la ruptura es sospechosa: pocos participantes la han seguido.",
      },
      { h2: "Lo que el volumen no dice" },
      {
        ul: [
          "**La dirección.** Un gran volumen puede acompañar una subida o una bajada. Indica actividad, no quién ha ganado.",
          "**La intención.** En cada intercambio se cruzan compras y ventas: el volumen cuenta todas.",
          "**Lo que viene después.** Un pico no anticipa la vela siguiente.",
        ],
      },
      { h2: "El volumen en cripto: ¿es fiable?" },
      {
        p: "En cripto, el volumen se consolida a partir de muchas plataformas, o se limita a una sola según la fuente de tu gráfico. Las cifras difieren, pues, de una plataforma a otra, y parte del volumen declarado por algunos mercados se ha puesto en cuestión. No es inútil: los picos relativos conservan sentido dentro de una misma fuente. Pero las comparaciones entre plataformas y los valores absolutos exigen prudencia. Además, el mercado funciona 24 horas, de modo que el volumen varía según la hora (mira [análisis técnico del bitcoin](/blog/analisis-tecnico-bitcoin)).",
      },
      { h2: "El volumen en forex: un caso aparte" },
      {
        p: "El forex no tiene un mercado central único: los intercambios se hacen directamente entre bancos y brókeres. El «volumen» que muestran la mayoría de las plataformas minoristas es un volumen de ticks, es decir, el número de cambios de precio, no la cantidad realmente negociada. Sigue estando correlacionado con la actividad, así que sirve como indicio de agitación, pero no sustituye a un volumen real de bolsa. En los CFD ocurre lo mismo: ves el de tu bróker, no el del mercado.",
      },
      { h2: "¿Cómo usarlo en la práctica?" },
      {
        ol: [
          "**Compáralo con la media reciente.** Una barra vale en relación con sus vecinas.",
          "**Léelo junto al precio.** Mucho volumen y vela pequeña: muchos intercambios sin avance, señal de absorción. Mucho volumen y vela grande: un movimiento con respaldo.",
          "**Ten en cuenta la hora.** La apertura y los anuncios inflan el volumen sin un significado especial (mira [el calendario económico](/blog/calendario-economico)).",
          "**Úsalo como confirmación**, nunca como único disparador. La [estructura](/blog/tendencia-o-rango) va primero.",
        ],
      },
      { tip: "Si la fuente de volumen de tu gráfico es dudosa (forex, CFD), no bases ninguna decisión en ella. Úsala solo para detectar los momentos de actividad." },
      {
        p: "El volumen es uno de los elementos que [Scanzivo](/) puede leer en una captura de pantalla, junto con la estructura y los niveles: de ahí saca un plan numerado. Pero solo ve lo que muestra tu gráfico, así que la fiabilidad de la fuente es cosa tuya.",
      },
      {
        p: "Este contenido es educativo y no constituye asesoramiento de inversión. Operar conlleva riesgo de pérdida de capital, que puede alcanzar la totalidad del dinero invertido.",
      },
    ],
  },
  {
    key: "analyse-technique-bitcoin",
    slug: "analisis-tecnico-bitcoin",
    title: "Análisis técnico del bitcoin: cómo leer un gráfico de BTC",
    description:
      "Cómo leer un gráfico del bitcoin: temporalidades, volatilidad, niveles, efecto de los anuncios y límites de un análisis que es un escenario, no una predicción.",
    date: "2026-11-19",
    body: [
      {
        p: "Leer un gráfico del bitcoin exige las mismas herramientas que con cualquier activo: tendencia, soportes y resistencias, volumen, gestión del riesgo. Lo que cambia es la volatilidad, el mercado abierto 24 horas y la sensibilidad a los anuncios. Un análisis es un escenario con un punto de invalidación, nunca una predicción.",
      },
      { h2: "¿Qué hace diferente al BTC de otros activos?" },
      {
        ul: [
          "**Un mercado continuo.** No hay apertura ni cierre diario. En fin de semana la liquidez es menor y los movimientos pueden ser bruscos.",
          "**Una volatilidad alta.** Variaciones de varios puntos porcentuales en un día no son raras. Tus stops y tus tamaños de posición deben tenerlo en cuenta (mira [tamaño de posición](/blog/tamano-de-posicion)).",
          "**Varias plataformas de intercambio.** Los precios y los volúmenes varían ligeramente según la plataforma (mira [el volumen en trading](/blog/volumen-en-trading)).",
          "**Sensibilidad a las noticias.** Decisiones de reguladores, anuncios de productos financieros, hackeos, declaraciones de bancos centrales.",
        ],
      },
      { h2: "¿Qué temporalidad elegir para el bitcoin?" },
      {
        p: "Depende de tu horizonte. Un esquema habitual: el gráfico diario o de 4 horas da la dirección y los grandes niveles, y el de 1 hora o 15 minutos sirve para situar la entrada. Para operar en 24 horas, se miran sobre todo las velas de 5 a 15 minutos y la de 1 hora. A 7 días, el de 4 horas y el diario dan una visión más estable. Cuanto más corta es la temporalidad, más ruido hay. Detalle en [elegir la temporalidad](/blog/elegir-temporalidad).",
      },
      { h2: "¿Cómo localizar los niveles importantes en el BTC?" },
      {
        p: "Empieza por los extremos de las últimas semanas: máximos y mínimos que han frenado el precio varias veces. Añade los números redondos (por ejemplo, los miles exactos), que muchos participantes vigilan. Después busca las zonas donde el precio cambió de comportamiento, como una antigua resistencia convertida en soporte. El método es el de [soportes y resistencias](/blog/soportes-y-resistencias) y se aplica igual de bien al oro: mira [niveles redondos en el oro](/blog/niveles-redondos-oro) y el [análisis especializado en oro](/gold).",
      },
      {
        p: "**Ejemplo (ilustrativo, cifras inventadas):** el BTC oscila desde hace diez días entre 60.000 € y 64.000 €. El techo se ha probado tres veces y el suelo, dos. Mientras el precio siga en ese pasillo, estamos en rango (mira [tendencia o rango](/blog/tendencia-o-rango)). Un cierre diario por encima de 64.000 € con más volumen se convierte en un escenario alcista. Un cierre por debajo de 60.000 € invalida el rango a la baja.",
      },
      { h2: "¿Qué indicadores usar en el bitcoin?" },
      {
        p: "Pocos, y sin abusar. Las [medias móviles](/blog/medias-moviles) (MM50, MM200 en diario) dan el contexto. El [RSI](/blog/indicador-rsi) señala excesos, pero en una tendencia fuerte permanece mucho tiempo en zona extrema. El [MACD](/blog/indicador-macd) mide el impulso. Las [bandas de Bollinger](/blog/bandas-de-bollinger) ayudan a ver las fases de calma antes de los grandes movimientos. Ninguno sustituye a la lectura del precio, y que coincidan no prueba nada.",
      },
      { h2: "¿Cómo tener en cuenta los anuncios?" },
      {
        p: "Antes de entrar, mira lo que está previsto: las publicaciones macroeconómicas estadounidenses (inflación, empleo, decisiones de la Fed) hacen reaccionar al bitcoin como a muchos otros activos de riesgo. Consulta el [calendario económico](/blog/calendario-economico) y evita abrir una posición justo antes de una cita importante sin haberlo decidido a conciencia. Las noticias imprevistas, en cambio, no tienen calendario: es una razón más para tener siempre un stop definido de antemano (mira [dónde poner el stop loss](/blog/donde-poner-el-stop-loss)).",
      },
      { h2: "¿Qué errores son frecuentes en el BTC?" },
      {
        ul: [
          "**Usar un apalancamiento alto** en un activo ya muy volátil: una mecha basta para liquidar una posición.",
          "**Seguir los movimientos por miedo a perdérselos** y entrar tarde tras una vela grande.",
          "**Confundir ruido y señal** en las temporalidades pequeñas.",
          "**Fiarse del volumen o del precio de una sola plataforma** sin comprobarlo.",
          "**Caer en una [falsa ruptura](/blog/falsa-ruptura)**, frecuentes en torno a los números redondos.",
          "**Dejarse seducir por las promesas** de bots o de señales: mira [bots de trading con IA y estafas](/blog/bots-de-trading-ia-estafas).",
        ],
      },
      { h2: "¿Cuáles son los límites de un análisis técnico del bitcoin?" },
      {
        p: "El bitcoin reacciona también a factores que el gráfico no muestra: regulación, flujos institucionales, acontecimientos propios del mundo cripto. El análisis técnico encuadra el riesgo y sitúa los niveles, pero no dice qué va a pasar. Muchos traders se quedan al margen mientras su escenario no está claro, y es una decisión legítima.",
      },
      { tip: "Escribe antes de entrar: nivel de entrada, stop, objetivo e importe arriesgado. Si falta uno de los cuatro, no tienes un plan, solo una intuición." },
      {
        p: "Para ganar tiempo, [Scanzivo](/) puede leer una captura de tu gráfico de BTC y proponer niveles y un plan numerado. Para hacer la captura, mira [captura de pantalla del gráfico](/blog/captura-de-pantalla-grafico). Y para entender lo que la IA puede o no hacer, lee [la IA y el trading](/blog/ia-y-trading).",
      },
      {
        p: "Este contenido es educativo y no constituye asesoramiento de inversión. Operar con criptomonedas conlleva un riesgo elevado de pérdida de capital, que puede alcanzar la totalidad del dinero invertido.",
      },
    ],
  },
];
