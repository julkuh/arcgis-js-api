// COPYRIGHT © 2021 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/3.36/esri/copyright.txt for details.

define("esri/layers/vectorTiles/core/workers/nls/worker-init_pt-br",{"dojo/cldr/nls/number":{scientificFormat:"#E0","currencySpacing-afterCurrency-currencyMatch":"[:^S:]",infinity:"∞",superscriptingExponent:"×",list:";",percentSign:"%",minusSign:"-","currencySpacing-beforeCurrency-surroundingMatch":"[:digit:]","decimalFormat-short":"000 tri","currencySpacing-afterCurrency-insertBetween":" ",nan:"NaN",plusSign:"+","currencySpacing-afterCurrency-surroundingMatch":"[:digit:]","currencySpacing-beforeCurrency-currencyMatch":"[:^S:]",currencyFormat:"¤#,##0.00;(¤#,##0.00)",perMille:"‰",group:".",percentFormat:"#,##0%","decimalFormat-long":"000 trilhões",decimalFormat:"#,##0.###",decimal:",","currencySpacing-beforeCurrency-insertBetween":" ",exponential:"E",_localized:{}},"dojo/cldr/nls/gregorian":{"dateFormatItem-Ehm":"E, h:mm a","days-standAlone-short":["dom","seg","ter","qua","qui","sex","sáb"],"months-format-narrow":["J","F","M","A","M","J","J","A","S","O","N","D"],"field-second-relative+0":"agora","quarters-standAlone-narrow":["1","2","3","4"],"field-weekday":"Dia da semana","dateFormatItem-yQQQ":"y QQQ","dateFormatItem-yMEd":"E, dd/MM/y","field-wed-relative+0":"esta quarta-feira","field-wed-relative+1":"próxima quarta-feira","dateFormatItem-GyMMMEd":"E, d 'de' MMM 'de' y G","dateFormatItem-MMMEd":"E, d 'de' MMM",eraNarrow:["a.C.","d.C."],"field-tue-relative+-1":"terça-feira passada","days-format-short":["dom","seg","ter","qua","qui","sex","sáb"],"dateTimeFormats-appendItem-Day-Of-Week":"{0} {1}","dateFormat-long":"d 'de' MMMM 'de' y","field-fri-relative+-1":"sexta-feira passada","field-wed-relative+-1":"quarta-feira passada","months-format-wide":["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"],"dateTimeFormat-medium":"{1} {0}","dayPeriods-format-wide-pm":"PM","dateFormat-full":"EEEE, d 'de' MMMM 'de' y","field-thu-relative+-1":"quinta-feira passada","dateFormatItem-Md":"d/M","dayPeriods-format-abbr-am":"AM","dateTimeFormats-appendItem-Second":"{0} ({2}: {1})","dayPeriods-format-wide-noon":"meio-dia","dateFormatItem-yMd":"dd/MM/y","field-era":"Era","dateFormatItem-yM":"MM/y","months-standAlone-wide":["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"],"timeFormat-short":"HH:mm","quarters-format-wide":["1º trimestre","2º trimestre","3º trimestre","4º trimestre"],"dateFormatItem-yQQQQ":"y QQQQ","timeFormat-long":"HH:mm:ss z","field-year":"Ano","dateFormatItem-yMMM":"MMM 'de' y","dateTimeFormats-appendItem-Era":"{1} {0}","field-hour":"Hora","months-format-abbr":["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"],"field-sat-relative+0":"este sábado","field-sat-relative+1":"próximo sábado","timeFormat-full":"HH:mm:ss zzzz","dateTimeFormats-appendItem-Week":"{0} ({2}: {1})","field-day-relative+0":"hoje","field-thu-relative+0":"esta quinta-feira","field-day-relative+1":"amanhã","field-thu-relative+1":"próxima quinta-feira","dateFormatItem-GyMMMd":"d 'de' MMM 'de' y G","dateFormatItem-H":"HH","months-standAlone-abbr":["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"],"quarters-format-abbr":["T1","T2","T3","T4"],"quarters-standAlone-wide":["1º trimestre","2º trimestre","3º trimestre","4º trimestre"],"dateFormatItem-Gy":"y G","dateFormatItem-M":"L","days-standAlone-wide":["domingo","segunda-feira","terça-feira","quarta-feira","quinta-feira","sexta-feira","sábado"],"dayPeriods-format-abbr-noon":"noon","timeFormat-medium":"HH:mm:ss","field-sun-relative+0":"este domingo","dateFormatItem-Hm":"HH:mm","field-sun-relative+1":"próximo domingo","quarters-standAlone-abbr":["T1","T2","T3","T4"],eraAbbr:["a.C.","d.C."],"field-minute":"Minuto","field-dayperiod":"AM/PM","days-standAlone-abbr":["dom","seg","ter","qua","qui","sex","sáb"],"dateFormatItem-d":"d","dateFormatItem-ms":"mm:ss","quarters-format-narrow":["1","2","3","4"],"field-day-relative+-1":"ontem","dateTimeFormat-long":"{1} {0}","dayPeriods-format-narrow-am":"a","dateFormatItem-h":"h a","dateFormatItem-MMMd":"d 'de' MMM","dateFormatItem-MEd":"E, dd/MM","dateTimeFormat-full":"{1} {0}","field-fri-relative+0":"esta sexta-feira","field-fri-relative+1":"próxima sexta-feira","field-day":"Dia","days-format-wide":["domingo","segunda-feira","terça-feira","quarta-feira","quinta-feira","sexta-feira","sábado"],"field-zone":"Fuso horário","months-standAlone-narrow":["J","F","M","A","M","J","J","A","S","O","N","D"],"dateFormatItem-y":"y","dateTimeFormats-appendItem-Day":"{0} ({2}: {1})","field-year-relative+-1":"ano passado","field-month-relative+-1":"mês passado","dateTimeFormats-appendItem-Year":"{1} {0}","dateFormatItem-hm":"h:mm a","dateTimeFormats-appendItem-Hour":"{0} ({2}: {1})","dayPeriods-format-abbr-pm":"PM","days-format-abbr":["dom","seg","ter","qua","qui","sex","sáb"],eraNames:["Antes de Cristo","Ano do Senhor"],"dateFormatItem-yMMMd":"d 'de' MMM 'de' y","days-format-narrow":["D","S","T","Q","Q","S","S"],"field-month":"Mês","days-standAlone-narrow":["D","S","T","Q","Q","S","S"],"dateFormatItem-MMM":"LLL","field-tue-relative+0":"esta terça-feira","dateTimeFormats-appendItem-Quarter":"{0} ({2}: {1})","field-tue-relative+1":"próxima terça-feira","dayPeriods-format-wide-am":"AM","dateTimeFormats-appendItem-Month":"{0} ({2}: {1})","dateTimeFormats-appendItem-Minute":"{0} ({2}: {1})","dateFormatItem-EHm":"E, HH:mm","field-mon-relative+0":"esta segunda-feira","field-mon-relative+1":"próxima segunda-feira","dateFormat-short":"dd/MM/yy","dateFormatItem-EHms":"E, HH:mm:ss","dateFormatItem-Ehms":"E, h:mm:ss a","dayPeriods-format-narrow-noon":"n","field-second":"Segundo","field-sat-relative+-1":"sábado passado","dateFormatItem-yMMMEd":"E, d 'de' MMM 'de' y","field-sun-relative+-1":"domingo passado","field-month-relative+0":"este mês","field-month-relative+1":"próximo mês","dateTimeFormats-appendItem-Timezone":"{0} {1}","dateFormatItem-Ed":"E, d","field-week":"Semana","dateFormat-medium":"d 'de' MMM 'de' y","field-week-relative+-1":"semana passada","field-year-relative+0":"este ano","field-year-relative+1":"próximo ano","dayPeriods-format-narrow-pm":"p","dateTimeFormat-short":"{1} {0}","dateFormatItem-Hms":"HH:mm:ss","dateFormatItem-hms":"h:mm:ss a","dateFormatItem-GyMMM":"MMM 'de' y G","field-mon-relative+-1":"segunda-feira passada","field-week-relative+0":"esta semana","field-week-relative+1":"próxima semana","dateFormatItem-yMM":"MM/y","dayPeriods-format-wide-morning":"manhã","dateFormatItem-MMdd":"dd/MM","field-day-relative+2":"depois de amanhã","dateFormatItem-HHmmss":"HH:mm:ss","dayPeriods-format-wide-night":"noite","field-day-relative+-2":"anteontem","dateFormatItem-HHmm":"HH:mm","dayPeriods-format-wide-afternoon":"tarde",_localized:{}},"esri/layers/vectorTiles/nls/common":{_localized:{}}});