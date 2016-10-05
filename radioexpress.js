var express = require('/usr/local/lib/node_modules/express');
var bodyParser = require('/usr/local/lib/node_modules/body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
var exec    = require('child_process').exec;

var stumienie=[
{"nr":"146","title":"Mellow","stream":"https://streaming.radionomy.com/101SMOOTHJAZZMELLOWMIX"},
{"nr":"147","title":"All-Smooth","stream":"https://streaming.radionomy.com/all-smooth-jazz"},
{"nr":"148","title":"InterJazz","stream":"https://streaming.radionomy.com/JazzInternationalRadio"},
{"nr":"","title":"","stream":""},
{"nr":"","title":"","stream":""},
{"nr":"","title":"","stream":""},

];

var script = '\n<script>\n'+
	'function $(id){return document.getElementById(id);}\n'+
	'function axj(){fetch("info").then(function(response){return response.text()}).then(function(tx) {$("info").innerHTML=(tx)}).catch(function(e){console.log("E:",String(e.message));})}\n'+
	'setInterval(function(){\n'+
		'axj();\n'+
		'\n'+
	'},5000);\n'+
	'\n'+
	'\n'+
'\n</script>\n';

var head = '<!DOCTYPE html>\n<head>\n<meta charset="utf-8">\n'+
	'<meta name="viewport" content="width=device-width">\n'+
	'<meta name="mobile-web-app-capable" content="yes">\n'+
	'<link rel="shortcut icon" sizes="144x144" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJAAAACQCAYAAADnRuK4AAAACXBIWXMAABcRAAAXEQHKJvM/AAAgAElEQVR4nO2dC/xfYx3Hv9VCKLKhKA0ZXQhFLmWzzW0qMwyxodymrZJLGTFzjUYXmUIuozSxJUSIWblGootLshRlrCgqS+n7/j/nbL/9/uec5/uc85zf5b//5/V6Xj/zP7/zey6f5/a9Dnj11VdlacJrXiOD9GN9LWtrGaxlLS2raxmUlJW0LKtlmaSAhUl5WcsLWp5LyjNantQyT8sTWh7R7nyuNS3pDAxodwXqREKWrbRsqWVjLRtpWaPEq+in5ZP/hmxDCn7zaf14UMsDWu7UckdfJlWfIpAO3gr6MULLKC3balmP/93iaqyRlB2Tf7+q9XpMP2/Vcr2WW5RQL7W4TrWh6wmkgzNQP3bVsoeWoeK2n04CBB6SlEO0vKx1nqOfV2qZpWRa0M7KVUVXEkgHgLPJaC0HiFtxXt/eGgUBgm+flHO1Lbfo50VaZiuZFra1ZiXQVQTSzl5XPw7Vsr+4A2+3A+LvmJTntH0X6+d5SqTH21qrAHQFgbRjN9ePI7TspuV1ba5OXWBCHKnlcG3vVfo5TYl0T5vr5EVHE0g7chv9OFHLsDZXpZVggoylaPtv088TlEi3t7dK+ehIAiUrzknizglLM4ZpmaP9cbN+HqdEurvN9emFjiKQdhTX39O0jJPWX7978MY3iqywgsgyy7gCFi505SW9fP/jH+2olYzUMkL7Z4Z+HqNEerottchARxBIO4Z6HK7leC0r1vlbb36zyPveJ/Le94qsq0fywYNF1llHZLXVRFZZZTFp8gCR/vpXkfnzRX7/e5F580Qe1yPvr34l8stfivztb7VVnQk1XssY7a+p+nm2EumV2n7NiLYTSDtjU/04X8umsd/92tc6snz4wyJbbimy1VYia61V7Z0Q7C1vcWWjjXr//cknRe64Q+TOO0XmznWk+t//qv1mE5hgZ2jZS/vuICXR/VHfHoi2EUgbzxV2ipajY9aD7ecjH3Fl++3dytJKQFDKXnu5f7NS/fjHItde68pL8WTQTLi7tR8h0xQl0n+ivTkAbSGQNhpl5uVa3h/jfQO0FaNGiey9t8hHP+pI1CmAwPvu6wrk+eEPRb77XZHrrxd5pfoGxPhN1rKD9uk+SqJHKr+xRAVaCm0o+/i5WioPMzP9kENE9t9fZI0yKtIWA2KzMlGe1mPwxReLfOtbIn/4Q+VXMxHv0749TEl0aeW3BaBlBErUD9O0TKz6rvdrd33ucyJjx7rVpxsB4Sfr2nG0buAzZ4qcdZYy4L5Kr2RCXqL9vJl+HtEqtUhLul8bxUnkai1bV3kPxJk61W1XfQVMgI9/3BW2teOPr0wkJugm2udjlETz49QyH7UTKDnvYMawTtl3cM0+Q4+KY8b0vK/Pgomx004603Sqff7zTjxQEkzUO7WvRtV9LqqVQNoAvUDLbC2rlPk+Qr3jjhP5zGdElu00I42awATZbTd3i/zqV0VOPrm08JIJe4e+b9c6VSG1EUgrjoaZbesNZb7PbJw+vbrcplvBhOF8xIF7wgS3vZUAE/eGZDu7IW4NHWohEKzXD72shht3rbyyyNe/7q69/XAT6LrrRC67TGTSJJHnnw9+BRN4to7J3kqiWbHrF51AWlEMvWaWefeHPuQ66h3viF2r7gcTCok6nz/9afDXmcgzdWz2UBLNjlmvqATSCu6gH1eEvpd9nyvtiSeKvK6vWvtEABPrtttEpkwROeUUkUCHGsbkCu3rXfR7N8aqUzQCJQdmzjxB29ZKKzmB2ujRsWrSt8EEO+kkJ9JAgPrCC0FfZ2yu5nyqJJoboz5RCJRc1Vkal/c924i113b6oXe/O0Ytli4w4VDaclt74omgrzJGnIm2inHFr0wgrciq+qHHvLCr+gc/KPKDH4isvnrVGiy9YOKh9d9lF5G7w0zNGKvrdOy2VBI9W6UOlQiUaNQ52a8b8r3tttMvzeospWe3ggl4yy0iu+q996abgr7KmM3SMRxeRe1RdQU6SwLVE2jL0f0st1zFX+7HIjAR0fKjG7zmmqCvMnboJyeV/e3SBFLmIqkJUozuvLPI97/vt/rrRzgQPF55pVP3IDcKwEQdy3t0FZpR5ndLEUh/EC/L80K+M3y4a2A/eeoDfcsEZaL+5CdBX52ekCj4UB1MoOTcc5kE2PNsuqk7ML+hlFKjHyHgaEBfDx0qcr/d2JWxnKFju3WoZWOZFWiKls2sD7/97W5/XrFWU/l+NIK+ps+32ELkj380f40xnaLl2JDfCpUYY4d7tPX59HDXDdaCfQ30OX2/9dZBdthH6xhfrauQ2SLJTKDE9ebCkO+cf77ziuhHe0DfX3CBsxU3grG9AMdO61YWsgLhm76x9WFseAIq3o+agDkIQsavfMX8FcaYsT7d8rCJQMrINfXji9YabLKJsyDsR2fgS18SmTNH5Be/MH/lOLxgdRV6yvegdQU6VYy3ruWXF7n88v7reieBsWBMPvABkX/+0/QVxhoX8/G+B70ESqz8x5l+VnG6Lnzvepf16X60CowJY/PpT5u/sq+O/Tm+EDOWFegUMQY6wH34U5+yPNmPdoCxwakRBawBjDljv13RQ4UESmx8Cl+QgmWSWxf+6N0EgiFgDkGQBNyQCZxAefllF0gB0DZUBQRfoOBtSlAGzFEI1tAtYGwYIwS7C23q05FwoMh2yLcCTbVWbuJEkfe8x/p0e/DMMyI/+5krDzzgImrMr+g5BZmI9LHxxk7mQulkExXGiLHCkdEI4jQNy/tjLoGUeVsUfbERq66qVzTzHa11+O9/RW6/3Xk0/OhHIr/+dfzfgIDonSjpoDBI+HfhWbLNNp1npstYzZgh8qzNEmhoYjeUufEVrUBHWiuENyXeFJ2Cu+5yHXTVVW7VaTUgKuXLX3arEX5e48Y51UIngLE64QS3EhmBXGj3rD9kEiiJhmqyUsbt5OCDzRWpDVxPL7lE5LzzRB58sN21WQwIfO65rhBP6NBDRfbbz4k72omDDhI580xzYIfRcCIremzeCjRBjNFQ8Rxtp8wHPyk8OM85R+S5Dk8oALEPO8yt2Mx+pPXtWrkZs2OPNU9+uAAneu1KvQiURNHwCpDAmmu62dQOoCDkzEEp4WzXVkB0XHNQLxBlhNIO817GDleqp7zy5h6MV25MbjZ/zVqB2LpWtbwRoVSrVx98oZBlEHzgT39q7W/HBsRnNSJGEOoGdIetDB7B2DGG9KUBcCJ1Gl2ELAIdYHkbgQ9affb53e/cGQIj8r4EJsI++4hceKHIN78p8s53tu63CdAVEMABbuQTKElcMsLyJmZLq/ZvVp2vfU3kmGNE/vWv1vxmO4AogIP2aae5laEVqxGOnYwlq6ABhBoe2JggpnkFIiiCKXHJgQea61gJf/mL26sJVFkHUkEgs544RMi0Bg1yt6TGONHc8ji7IDshvC+rYQxBZDOYIJ/9rJNdcaskGmzdYCyNBIIbY8RF1e1BM4HGWt7CLNnMbNRaHuhs9tjDfMgzAWe8HXZwgRwI+1t1gCA4HqIEPLjxRpHf/CZOPZkwaM9xREDHWCcYS8bUKP4grVZvAunShNXyUMsbCMdWNy66yJ13jDqbQtA5LNN77un0VzEBAXGloQD0at/7njvoV5VHMXGGDXOyrQNMJ9PyYEyN9UUyvaJuYy/yj8YViAx/3jsV+/JY0zpVDpx3uOISQKBKOle8EziYctDffPNo1fMCgn7hC67cc4/bGrDF+fe/y72PCfSJT7htk/iQdZ2LGFPOmIY+hyPDtfS4MDYSaCfLDxEVIvYsTkFEdwRt3ETKAnkKB1CEdO1WakJcCqFYEHYSOOvFF8u9i5sS5y8k2nVYPDCmjO3Pf256nOhzvQg03PLNuiKkovhkmZ5Ryj/SKSw/+Uk3S9tNnGZQn1NPdaRG7sN1nfaGgonFYZ7tvQ4FLWNrJNAirvQQKMlunJuJuBE77uh/JhQsm+hmypKHQyBbxcZmk//2ACJBAmIeIn+5p0Q6OfqI0MCQMPZ2xthOtRnwDIEzZKNOVyBSY3urg9ynjvMEonxmVSgw8mJ74NrbaSYTRYDo3NxQZaCPwngtBPTVm94U5GlhAmPLGBtUQ3AFzlyTEsh0UeQ6GXugOBuU6YgNNhC54oru9TujH484QmTkSOd68/DDYd+n3zi3sC3GrBNjjO2UAXBmEYFMi//WleLM9wbCMjoxFETnQsjGLOx2MAHw20JYOjsw/CV9t956cc+ljLGRQD2cSQm0oeUbMQVaRGEn4mjoYZLYyYj6u832ughMBIzfuEaH+NPRd/Thvfe65HkxEDDGPZwZkOi/1rR8IyvBWhmw5yNhDsnuB2HQh/VVrw/ah0YeAz3EENYkdfQhfYnUPkY0/4AjwZpwhxVoA8vTOOsPipSpnYNjgJdkT+fi4123NLYTwARBD4d+ykoi+pI+xYS2KgYOdGP9tC0r6wYQaLDlSRSOMUCc47PPDvsOArilgTwpaCtK1ZDVlj4lYiuqj6pgrI0EGmwm0Dqlc+0sBp2CaiEkhyiCN6TTSxtoM/bURrlMT5/St+RorRrIK2Cs7QQabHqqGMhsHnvM/jwKUPRiSytoO2Yj3/mO7Xn6lj5G7VEFAaqqHgKZ0tJWJRBa6mnT7M+nsW36cn4wH2g7nqS4CLGyWEAfo9Kpoq8MyFWyGgQaaHqyYvZjrt9WjTQh2rCDabfrSyeAPqAvcEe2KGLpY/qa75RFwFgPNBNooOmpbBDsETmHFRwIEZD1w4G+oE/QF1pAX9PnkK4MAsZ6EAQyhQeoQiC8IK22PUSxZwluFZCjIAlGlfDIIyKPPuqCK/z974tnPCsiwj4CKwwZIrL++k6VQrqGVgVXoE9YVSymvfQ1fU6MxDIIGOuVIZBJ/FTWb+mhh+yBr7k9oK2u89xD5yJ0I9UCRuwEWfDdChvtnhvjLyOfQjFKDGxSDSDFravuvBfLRPzuLY4F9DkWhmWEvwFjvSwEMnl2lfX/4lBnXX3Q7dRlrIbrDIdyEtpVSGa7BCAeWwUFIR7qBFQLCAHf9rY4v9EI+oY+styy6HOcLkmlFYqAsV7GvAKVEZNjQYdtsAXYyhgd3IIAWdAv0ZEx7Kt9v4WnJ7o6cnlxmI2lo0pBH3EzswSNoO/xf1/V5Ca6GAFjvWytWZsvvdQ+aHRMzGDk2LQg3mdLLGP9VwW0GQM3jL4wHEM2E8uHjj6ir7ChstQDq4UjzXFWwgGBMGfyXphRgIZeq+lAC9Cx4YERC8w8OhiXm3YC4mLDTB54tvJY3iz0FSaylmAS3/52OIECDNxehkCsEV5qwOYQAiH4+u1vbc8ito+RR4NbE52LF0QnASLjIYL9EwfhqistfUWfWdQcjAFjEWJ4F7DVL0xXIC+IhhGyDM+c6X8GYN/LMl8VSGt33z3csi8P3HpSUnPrqeJilAJi33efy6hTNRwgfcYq9Mor/mcZixACBaRG6FmBsMrx+jEsWODCuVhhTXyGNV3VXBpz57q0jyH2RSnSq/i227pP5DscfJH7pOa7bEXIhTgkQ1Cu/rfeahMBNIPv4xVL/5DGuyzoM/rO0s88wznMigUL/M8keB4CmR4PeGlPhhj8xi1gaa8CUhuhdA0NuoAnx/jxzh7ZZ+cEkRAY4mpM4aoOOINgl81lAatAKzjg417NWQ3ilwV9ZyEQY/Hkk85YzYKAsX7OTKCQIALWQAicqUiOVhb4omON9x9jhiu2JYJfcjvDL74qIB6Rxih4WTDLsSe2bHcQnrojLYZMZUDfIfSzbDnkU7VK+APGegEEMj1OHGUrCDRgwYgR5SXcqB8IXmklD0ZShMEbavL+DweERPpLTgoIZVmBqTttIN4RapFQ0HdIwS0qC8bESiBj3EQwHwLNszwZQiBmowVlnRTZIknea5l5bD/ohTBYH1Cr1MsBgmJiijARoaJPBkUbaAuHa5LzhYI+tBCI2NhWBOShn2cmEM79FnDYtBqNlVkNuHVw5rHEOCZyBmeUuladPEBUYjETI5ozlk8eRVtoE+a+oSS3tg3DNMbG4gplHWsJIZD1UIzy1HIGQLNNrJ5QMDCW2YQJBGekunRrFjC4rMaccXyTijbRNlauENCH9CUWBEVgTBgbi2+fdawlIZBJcoKRNbcO343FGg2eK3Oo5pplHt2OD2Sm4ZrdCUEWIDBiBsQEPsEqbUOWRZQMK+hD8rNZ4kZCDB+BuIEZDerBwwOId6eVIAaYV8qDecBwTwwP6/IXamaQhn7xnSk4R7DydAJ5UlAX6sTgFSXBpW20EXOTEMfJDTe0EchytrGaziqegjvpjquLm59ANMxHIOsBbIgpFshioNPxRbNAcnztteUOo3WDOlE30h0UyaxoI20NiUFp7UvL2BhTQQE4s8i1+QFxQYMKYTl7WJe/ECN9rrsWGxg8V2N5z9YB6kYdfaaptBVf+debwp3a+9IyNgG3NTiziEAm3sFOltmiCB1WKWaI+gIjMJ9s4mMfa13k2CqgjqxESNDzQFtps9WZ0qpi8mnvGduAFajnyZRASG64OxUeaxHBs8QWOeBbCWR1k+b24As4gESbcCfdAsLZIBkuyl9KmzFKs1w0rDbMvpsaY2tMGwFXeqR9PQQi0pRW9FH9z/V937zhhmICGZO69gS4toAZ4dOwY/sTw/GxVaCu1LloW6bNtN2icrH2pW9sGFsjHoUz/Eej2ApzcS+BsGlBwpoHqy2J1e7WF/YO2xoilHUbqDOrZlGKAdpuIZDVBNVnKMbYGrHItaCRQIQVmuD7JrIYTvN5AjqLfUrPDxskrhyefXZFHEiruBy1C9SZuhelnqTtHLp9h2lr1LgiEQhjytgasWitahzGW8VZJxauDZxJaFieATyNtZhEQg7fzCFiqG/fJoZyt4JDchGBaDt94Av6ZFUoFxGRMTUazcGR3isQkcf1HDRHDFmacfbPIxCksBAIF1wfgRp9sLKA52WssDPtAHWnDbgF5YE+8BHI6jJe1N/WAA6KOWmUetC8kbBheAmERBoDqqx8GZxJUNr5wOzyHf5QRxQBLXa3gzYUEYg+wH6pCFZLzDxbbMYyIC3DEl73zQSapeVcMWTswUkvi0Bczy0CK2QSPkWnT6yOfqnbQRuKLiUW1YI11Wee6ISxNILN8urG/7EEgRK9GFoVr1Qac0xi+jUb2lvlO+iEijL+IE8q6hgO4Z2SBbkKaANtybt80Af0RdFFAXNVC7LG5oUX7M6filsac4WBrLsQIb+9BOL6ifMc3peNsOqhfHoZghwUgdUrRlDJdoM20JYicw/6ougcZNU/Zo0NjpfGbIWgVzj4LAIRrRhzLa9DLFdM5BmNMh2r/Y3PtKFIaw3W90qsuge0pYhA9EURgaz+d83CVmR2jKERcKJXJOteBCIrr25jl4pLNl8I8lnhOtuoHLT6gvsObb5Z0UnmGlXha4uvLx56yPY7zblYGbuAZH6XNmdsBnnivOlakO96RVSp5jhdhazacAjEdT9vG/J1Gkl/Y4IVAJsdjPWJE0TwAkT/6NmI2MUqwXll++3DTVF88LWlqC/oQ6sNz4YN4eRZfQJ8xRBBTs/6QyaBlGmP6yrEcrWb780c4DgL4YkAcMyDTD6VBg1HSJZnIefT28QIf4dkluyCLOMQJw+0kbqmLtMkJZk0ydk7xzDU97WlqC+ol0XuxphgqZmCCB8B3hez4UTWH4qaT9hqL4EAPto423Ejo6KYq1pSGSEkyyOQz1e+avZm5CvEYbaeHxpB28aNczP4G9/wG9n54GtLUV/4hK0pGJN0l0DjXiQ6yEBueNRcAinj7tJV6Db9z2G+t+NVQIrKNAorpLAQCCc8DMmzUGVZLwLXZX4TEURVf3c05mTbIegTxvBlV6Mq27UxMcoSE5Wxsni1JEDynGsl5Gvy8Vput/wKTnvopQgagDuLJRo928af/yzy1rf2/puPQGXSbTPTcZ8pMuZqBLY4PpLxd6KTQSa2wzJbq68teX1B3xVtvY1I/fBxemCsApAzxR0KCaSdM1c78SYxqDc483AbwwOSJR3FnU/Jh6E8gSNJLtIMn5UdB90QsPKQtTnPCQ8jdg7IZF/myow4AjJw/kDOctddLvopbttZARWwMsRVmZRNVlNUa1vy+oK+swR3oD54AfMsYxQQvuVmOFD0gGXRRROjC7U/oyEGUJwJOGBix4Kbrw9cJbMI5JPz4P1BR1jtilD+5pGHKBesIo2HzBS4D6P0pGCOykqD8DTrXdjTEMwpxDqSNvg8WfL6gqAOFjAWOBSScyTAZJW116OFMxBIGXivrkKYdY23/CrprjkXMJMtBEqDVDbHNCauX5HDHKsb5yxCpfjAqpG1pUI+CB9iS80tk4gYRF/DBad5NjNIuBvvZMqB7dpQtFLTB1kxDukzq/0OY8FlgbEJwGU69t6TrPXYN1ncjcwbCoEln7AjLOWHH25bYpmxrETNIChSkUaev/kIxAAjYmg+y7CsE3qubHQQAhWwtRCepZFE/A4rMGcNi6rFZ3GQFxjKKkFma6aOhCG2mhsriDpwjOVBE4G0U57SVUjP7nK65XmCC2AoxVno5pv9z+O/zpW4OTQuqYuKOphzR94tLgXLfJaagJWiSmgZwEpDDMTmFYxAVCTGtcR9pA1FyErfRMhiqwIUbT9G/CH52RQnM+aWB0MunlzS9xJjflVWFWaihUDMYMK1MRiNgIBE1sgDyz+KxiLJcFZCX7aXGGH1ACsRq20zEWi/j0DU3SfuyJIxITKwHoS5FQcmNcbfy5wWx0wgZeQrugoRYeZu6/c4JxDZy2LwxLMcQBtzVSHxxegMk4M8MNPzAhIw65p99bmaIwOKCd7HAbpxu+awjZSYiGZ58KU6p+3NadY5cFvtd+j7AFsfgFHJgTrWRiPZsBUIEt2vA4CX1mTL8+y5VuEaM4rbDQEoU3DI5Wpc1AlEPeVwmGXdiG6rGWwJjTqhGCBCBtdkfL0agZtMHoGYFNS9CARaaL5l0kfW1QdVTcC5B5yhY2w3rZdAAiWYIk4uVGAOthiYt1oEcgA5C4OwXYPUCZVBEYEQyyMYyzL7zAp0xY2kDvDeZgIVBdri9udz4qPtjeD91qxH9LnFtLgBRHmcEvQNKUEgljetHGEmseQ1BagLURlMmOA09alEFwkqJiJF+S3YQvDibBa4ZTkkxkxd7ntvnoAQk1/fNkqbkeinYCWZ4HW6WoxANQ23rnEhW1eKUtob/aFHlUQcET1uf+GAKCzTqbidmcS/iw696JLw9ESV0IgsFUGM3K9ZyHpvXj4L6upbHY46akm3Zv4dK0lMBibomAbK9h1KGyPoD16mDSQ05MSy78gDtzGuyGQhBtgbofEvMn7CrwkPhzQEL8ja/2Pm42hEVrDQLC07QROaid4MVlJW1BQILqdnWuNEwTk6lqUXgqrWLKT82ESLIXCaHSy/xHDG3YSlHIEcQTIneqjKEs+hFWkxwAyiWcoLqay+5CHIIstyyy35b7ZUyzZEW1MhJKsOEyhGpPwMEMzFa3lahEoESs5Du4oL9RE1sRFXfySoxKthwNnCMIIqsr4jVwbCQb5DgE1UAM1bBdFmQ8L+W5EVxbZRBUGgTermy3tK3dLtmpva6NHmiBmhYEPcNctMNQSV7em0As8qiZDpcudYper7GoEMh2s8QrpUb8Whumg2IidBUEjINwSMzecGzB/qIFCWWUUq4ESfR518SlPOPLQR0QdXddoeEPAyBGgYd2bsqr4oSuRkDmDaeJ0rPU73UXMtc3XlOovrLUZRbGOoIYpADgsipBIdtdngCluggw+OWUOH2b38FZwNNec2znMWItA22oj8hjY3iwUigZPh6LKH5mZEC72d2A4hZcFcK6rHFgdklJ9kHSSSKfIVnyaaAcuyukO4SMzkZg+FKsBeKMsykNwUmFJYHP+IzErbsFviAG3NdhQIrKfH+Gx8QhA1drtW7EYlEfqyK2O/G4N2orqjRKRz6XDf2SDrGs3snjw57gDxvmbPUswwMPewRM7AljyNjpEapdUAargXYxTzpdGD/2sFZyuJxup/oi+OuhLRsagM2IYobFHWyBSNwJKPqzQWilWB6gVrgmb4wtKk4KZGWzD4om3WNBGBYOXZm7GJ/eJaskdoRWclZyIc8SPkIlwMOpirOiJ9ViP0RWVyomK/jatvlaw9mLk2ymtCQWAo2oAMiTYFuNmEAAED25Y9gF0Aaks/QoWVRCQygvVRb2d0NIZknBmw9yFQU2hGZuRB2MqgES+TyxThHt8LyO63BLhV8tvY9mDoX2YlNYB1kKu6yTGiDGrNX5McrJnjRN+LqkSgw7E34nqMshUBXehgQjqsJ1EtIMGGlGnGwmbDeM4yiARYdbgFFsX08YEVB8kyUmmrW04JIDQYFeu2lYfaEyAlV3xUjWxnUSXWgAHAEwRvA0xUraFOGsFhG5+2aQ1mVChzU7UHuraqjowpuJmhucepsaxvmwGcpFh5Sjg/haEFGbR6SDRfSYRtHUMUXXfGQGB1R4YeYg6FpJ/MA1tcoC2NF9SNm2OghWAoUEMfUVXCbEVLCASSBk1SIjG8GK+WzFWYj9T2mVlOUKay55PYYMsiQFQMYheA1h6m/Wx09omDlhEoBQ1UEiH41xOAFBh8lke6jbEF+XRPdSOtQ81kRqy6T93nnSy0nEAgORdxuJ6i5ei66pGSx2oRGRPpb9ZMYISDmBhPKWMMFgNtIRBIGnysdjRGmudr2dTzlSq/1XK04De5Bx6EnXrtv1SAthEoRWKoj2Ha4eKCOdRk8tVnwJo2VcvZeMq0uzJtJxBIOuJMJRIhnHDSwZw8MCFmnwdrGpaDx2h/2ZNS1oyOIFCKpGP2UyJxSyOXzcg2V6lTgHvmcdo/xmAurUNHEShF0lHbKZHwSyCW1rD21qhtuE3LCXWqIqqiIwmUIum4bZVI+Gdiu0uAB2Numq4FqmEuFtMs0THajY4mUIqkI/dUImF3jTvR/lAzUfAAAADxSURBVFqMMfG7BsTlv1jLeXkBLTsRXUGgFEnHHqVEwg8VcxGyio4QQ26PDgWiDFJL4CU/u1Xqh5joKgKlSDoam8KZSiaySOAZsoeWoRLZiK0GYNxF6C2sNmc1557oNnQlgRqRDADe8xcomdCvsSKN0kIun/Wk/eIArt9o6Yh0hFkLCUs6REtXHV1PoEYkA3NNUlAncE5CZYI5CXGNiKMfkHC8FBBFkMiBODv4y92RJqjti+hTBGpGMnCLCAUSUhG2krQwg7WspWX1pKymBb9VtkH6Jj1bcVZB2Mn2Q7Qi7GyeSQqq23layJnzSF8mSxb+D4KCJdIASdh6AAAAAElFTkSuQmCC"/>'+	
	'<title>Ex radio</title>\n'+
	'<style>\n'+
		'body,button,input {font:normal 1.1em/1.5em verdana; margin:0; padding:0;}\n'+
		'body {background:#888; color:#eee;}\n'+
		'a {text-decoration:none; color:#eee;}\n'+
		'p {color:#eee;}\n'+
		'div {margin:0; padding:0;}\n'+
		'ul.l li {list-style:none;}\n'+
		//'form {width:12.5%; display:inline-block;margin:-5px 0}\n'+
		'form {width:12.5%; display:inline-flex}\n'+
		'input{width:100%;}\n'+
		'input:focus {opacity:0.7;outline: 0;}'+
		'div#info{font-size:0.9em; padding:0.5em 0.5em 1em; width:100%; background:#888; min-height:2.8em; color:#fff;}'+
		//'input[type="submit" i]{float:left;white-space:nowrap;line-height:1.75em;text-align:center;text-decoration:none;color:#ddd;border:2px solid #000;background:#222;padding:.5em;border-radius:.75em}'+
		'input[type="submit" i]{float:left;white-space:nowrap;text-align:center;text-decoration:none;padding:1em 0; border:0;}'+
		//'div.s input{width:5em; line-height:1.25em; background:#444}'+
		'.i0{background-color:#00a300;}.i1,.turquoise{background:#1dd2af}.i2,.green-sea{background:#19b698}.i3,.emerland{background:#40d47e}.i4,.nephritis{background:#2cc36b}.i5,.peter-river{background:#4aa3df}.i6,.belize-hole{background:#2e8ece}.i7,.amethyst{background:#a66bbe}.i8,.wisteria{background:#9b50ba}.i9,.wet-asphalt{background:#3d566e}.i10,.midnight-blue{background:#354b60}.i11,.sun-flower{background:#f2ca27}.i12,.orange{background:#f4a62a}.i13,.carrot{background:#e98b39}.i14,.pumpkin{background:#ec5e00}.i15,.alizarin{background:#ea6153}.i16,.pomegranate{background:#d14233}.i17,.clouds{background:#fbfcfc;color:#bdc3c7}.i18,.silver{background:#cbd0d3}.i19,.concrete{background:#a3b1b2}.i20,.asbestos{background:#8c9899}'+
		'.i21,.green{background-color:#00a300;}.i22,.greendark{background-color:#1e7145;}.i23,.greenlight{background-color:#99b433;}.i24,.magenta{background-color:#ff0097;}.i25,.purplelight{background-color:#9f00a7;}.i26,.purple{background-color:#7e3878;}.i27,.purpledark{background-color:#603cba;}.i28,.darken{background-color:#1d1d1d;}.i29,.teal{background-color:#00aba9;}.i30,.bluelight{background-color:#eff4ff;}.i31,.blue{background-color:#2d89ef;}.i32,.bluedark{background-color:#2b5797;}.i33,.yellow{background-color:#ffc40d;}.i34,.orange{background-color:#e3a21a;}.i35,.orangedark{background-color:#da532c;}.i36,.red{background-color:#b91d47;}.i37,.redlight{background-color:#ee1111;}.i38,.white{background-color:#fff;}'+
		''+
		'.s1{background:#ddd}.s2{background:#eee}.s3{background:#bbb}.s4{background:#ccc}'+
		'div.s input{font-size:1.15em; color:#555;}'+
		'@media screen and (max-width: 1024px){body {font-size:1.03em;}form{width:25%;}div.s form{width:12.5%}}\n'+
		'@media screen and (max-width: 512px) {body {font-size:0.98em;}form{width:50%;}div.s form{width:25.0%}}\n'+
	'</style>\n'+
	script+
	'</head>\n<body>\n';
	



var fin = '\n</body>\n</html>\n';

var posty ='<div>'+
	'<div class="s">'+
		'<form action="/" method="post"><input type="hidden" name="stop" value="1" /><input class="s1" type="submit" value="Stop" /></form>'+ 
		'<form action="/" method="post"><input type="hidden" name="play" value="1" /><input class="s2" type="submit" value="Play" /></form>'+ 
		'<form action="/" method="post"><input type="hidden" name="prev" value="1" /><input class="s1" type="submit" value="Prev" /></form>'+ 
		'<form action="/" method="post"><input type="hidden" name="next" value="1" /><input class="s2" type="submit" value="Next" /></form>'+ 
		
		'<form action="/" method="post"><input type="hidden" name="mute"  value="1" /><input class="s3" type="submit" value="**" /></form>'+ 
		'<form action="/" method="post"><input type="hidden" name="mid"   value="1" /><input class="s4" type="submit" value="*" /></form>'+ 
		'<form action="/" method="post"><input type="hidden" name="minus" value="1" /><input class="s3" type="submit" value="-" /></form>'+ 
		'<form action="/" method="post"><input type="hidden" name="plus"  value="1" /><input class="s4" type="submit" value="+" /></form>'+ 
	'</div>'+
	'<form action="/" method="post"><input type="hidden" name="radio" value="1"  /><input class="k i1"  type="submit" value="RMF-Classic" /></form>'+ 
	'<form action="/" method="post"><input type="hidden" name="radio" value="2"  /><input class="k i2"  type="submit" value="TOK-FM" /></form>'+ 
	'<form action="/" method="post"><input type="hidden" name="radio" value="3"  /><input class="k i3"  type="submit" value="Jedynka" /></form>'+ 
	'<form action="/" method="post"><input type="hidden" name="radio" value="4"  /><input class="k i4"  type="submit" value="Dwójka" /></form>'+ 
	'<form action="/" method="post"><input type="hidden" name="radio" value="5"  /><input class="k i5"  type="submit" value="Trójka" /></form>'+ 
	'<form action="/" method="post"><input type="hidden" name="radio" value="6"  /><input class="k i6"  type="submit" value="Czwórka" /></form>'+ 
	'<form action="/" method="post"><input type="hidden" name="radio" value="7"  /><input class="k i7"  type="submit" value="Szczecin" /></form>'+ 
	'<form action="/" method="post"><input type="hidden" name="radio" value="8"  /><input class="k i8"  type="submit" value="Sz FM" /></form>'+ 
	'<form action="/" method="post"><input type="hidden" name="radio" value="9"  /><input class="k i9"  type="submit" value="Złote" /></form>'+ 
	'<form action="/" method="post"><input type="hidden" name="radio" value="10" /><input class="k i10" type="submit" value="Sax" /></form>'+ 
	'<form action="/" method="post"><input type="hidden" name="radio" value="11" /><input class="k i11" type="submit" value="Smooth" /></form>'+ 
	'<form action="/" method="post"><input type="hidden" name="radio" value="12" /><input class="k i12" type="submit" value="Smooth2" /></form>'+ 
	'<form action="/" method="post"><input type="hidden" name="radio" value="13" /><input class="k i13" type="submit" value="LongLovers" /></form>'+ 
	'<form action="/" method="post"><input type="hidden" name="radio" value="14" /><input class="k i14" type="submit" value="Classic" /></form>'+ 
	zeStrumieni()+
	'<form action="/" method="post"><input type="hidden" name="radio" value="22" /><input class="k i14" type="submit" value="Atrament" /></form>'+ 
	'<form action="/" method="post"><input type="hidden" name="radio" value="37" /><input class="k i13" type="submit" value="BladeR" /></form>'+ 
	'<form action="/" method="post"><input type="hidden" name="radio" value="103" /><input class="k i12" type="submit" value="Komeda" /></form>'+ 
	'<form action="/" method="post"><input type="hidden" name="radio" value="133" /><input class="k i11" type="submit" value="PinkFloyd" /></form>'+ 
	'<form action="/" method="post"><input type="hidden" name="radio" value="121" /><input class="k i10" type="submit" value="Moizm" /></form>'+ 
	//'<div class="i21">21</div><div class="i22">22</div><div class="i23">23</div><div class="i24">24</div>'+
	'</div>';
	function zeStrumieni(){
		var out = '';
		stumienie.forEach(function(s,i){
			if(s.nr){
				//console.log(i,s);
				out += '<form action="/" method="post"><input type="hidden" name="radio" value="'+s.nr+'" /><input class="k i'+i+'" type="submit" value="'+s.title+'" /></form>';
			}
		});
		//console.log('\n'+out+'\n');
		return out;
	}
	var adminhtml = '<div id="admin"><a href="radioexpress/">reRex</a></div>';

var html = posty;// + adminhtml;

app.get('/', function (req, res) {
	res.send(head+'<div id="info">Radio express...</div>'+html+fin);
});

/*
app.get('/radioexpress/', function(req, res){
	exec('ps -ef | grep radioexpress.js | grep -v grep | awk \'{print "sudo kill -9 "$2}\' | sh',function(a,b,c){
		exec('nohup /usr/local/bin/node /home/pi/zerro/radioexpress.js -q > /dev/null &',function(d,e,f){
		});
	});
});
*/

app.get('/radio/*', function (req, res) {
	var rec = req.url.replace('/radio','').replace('/','').replace('/','');
	//console.log(req.url,rec);
	res.send(head+'<div id="info">'+rec+'</div>'+html+fin);
});


app.get('/info', function (req, res) {
	exec('mpc current', function(e,info,r){var inf = (info.split("\n"))[0];res.send(inf);});
});

/*
app.get('/info', function (req, res) {
	exec('mpc current', function(e,info,r){
		var inf = (info.split("\n"))[0];
		exec('mpc play', function(e,info,r){
			var nr = parseplay(info);
			res.send(nr+':'+inf);
		});
	});
});
*/

function parseplay(info){
	var t = (((info.split("#"))[1]).split("/"))[0];
	//console.log(t);
	return t;
}
function ino(pre,info){
	var t = (info.split("\n"))[0];
	return '<div id="info">'+pre+': '+t+'</div>';
}

app.post('/', function (req, res) {
	//console.log('req.body = ',req.body);
	var rec = req.body.radio;
	if (req.body.play==1) {
			exec('mpc play', function(e,info,r){
			var rec = parseplay(info);
			var inf = ino('',info);
			res.send(head+'\n<style>.i'+rec+'{color:white !important;}</style>\n'+inf+html+fin);
		});
	}
	if (req.body.stop==1) {exec('mpc stop', function(e,info,r){var inf = ino('',info);res.send(head+inf+html+fin);});}
	if (req.body.next==1) {exec('mpc next', function(e,info,r){var inf = ino('',info);res.send(head+inf+html+fin);});}
	if (req.body.prev==1) {exec('mpc prev', function(e,info,r){var inf = ino('',info);res.send(head+inf+html+fin);});}
	if (req.body.plus==1) {exec('mpc volume +3', function(e,info,r){var inf = ino('',info);res.send(head+inf+html+fin);});}
	if (req.body.minus==1){exec('mpc volume -3', function(e,info,r){var inf = ino('',info);res.send(head+inf+html+fin);});}
	if (req.body.mute==1) {exec('mpc volume 70', function(e,info,r){var inf = ino('',info);res.send(head+inf+html+fin);});}
	if (req.body.mid==1)  {exec('mpc volume 85', function(e,info,r){var inf = ino('',info);res.send(head+inf+html+fin);});}
	if (rec)         {exec('mpc play '+rec, function(e,info,r){var inf = ino(rec,info);res.send(head+'\n<style>.i'+rec+'{color:white !important;}</style>\n'+inf+html+fin);});}
});


app.listen(3000, function () {
	console.log('Radio Express');
	console.log('Server listening on port: 3000');
});

/*
.i21,.green {background-color: #00a300;}
.i22,.greendark {background-color: #1e7145;}
.i23,.greenlight {background-color: #99b433;}
.i24,.magenta {background-color: #ff0097;}
.i25,.purplelight {background-color: #9f00a7;}
.i26,.purple {background-color: #7e3878;}
.i27,.purpledark {background-color: #603cba;}
.i28,.darken {background-color: #1d1d1d;}
.i29,.teal {background-color: #00aba9;}
.i30,.bluelight {background-color: #eff4ff;}
.i31,.blue {background-color: #2d89ef;}
.i32,.bluedark {background-color: #2b5797;}
.i33,.yellow {background-color: #ffc40d;}
.i34,.orange {background-color: #e3a21a;}
.i35,.orangedark {background-color: #da532c;}
.i36,.red {background-color: #b91d47;}
.i37,.redlight {background-color: #ee1111;}
.i38,.white {background-color: #fff;}

Live:
http://8.38.78.173:8156/stream
*/
