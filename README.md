# NyanGrab.JS

NyanGrab adalah web grabber untuk mengambil content atau teks di sebuah website. Nyangrab menggunakan jQuery dan YQL, jadi kamu perlu menambahkan jQuery untuk bisa menggunakan NyanGrab. NyanGrab menggunakan CSS selector.

## Demo

Kamu bisa mencoba NyanGrab.JS disini - [NyanGrab.JS Demo](https://nyancodeid.github.io/example-nyangrab/index.html) 

## Kelebihan

* Asynchronous Request
* Flexibel
* Full Custom

## Version


| Version      | Tanggal       | Log    |
| :------------- | :--------- | :------------- | 
| `1.0.0`          | `Thursday, 09 February 2017`   | Versi pertama NyanGrab.JS |
| `1.0.4`          | `Thursday, 22 February 2017`   | Add Attribut `format`, Fix |
| `1.1.0`          | `Thursday, 23 February 2017`   | URL lebih dari 1 dengan config yang sama, Fix |

## Require

NyanGrab.JS membutuhkan jQuery untuk menjalankannya.

## Installation

Untuk installasi NyanGrab bisa dibilang mudah karena hanya menambahkan code dibawah ini di atas tag `</body>`.

```html
<script type="text/javascript" src="js/nyangrab.js"></script>
```

## Usage

Berikut adalah contoh penggunaan NyanGrab.JS yang sangat mudah dan flexibel

```javascript
$(function() {
  var config = [
    {
      url: 'https://www.tokopedia.com/hot', /* url website */
      selector: 'div.span4.box.p-10.box-white', /* selector utama */
      loop: true, /* selector di ulang */
      result: [
        {
          name: 'title', /* nama item */
          find: 'div.mt-5.fs-12.ellipsis', /* selector */
          loop: false, /* digunakan jika item butuh perulangan */
          grab: {
            by: 'text', /* tipe grab */
            value: '', 
            custom: function(data) {
	      /* Do something with data */
              data = data.replace(/a/g, 'b');
              return data;
            } /* Custom function untuk memprosess item */
          }
        }, /* -- Item -- */
        {
          name: 'picture',
          find: 'picture img',
          loop: false,
          format: Date() + ' {{data}}', /* Memformat hasil grabbing */
          grab: {
            by: 'attr',
            value: 'src'
          }
        }, /* -- Item -- */
        {
          name: 'link',
          find: 'a.hotlist-url',
          loop: false,
          grab: {
            by: 'attr',
            value: 'href'
          }
        }, /* -- Item -- */
        {
          name: 'harga',
          find: 'span[itemprop="lowPrice"]',
          loop: false,
          format: 'Mulai dari {{data}}', /* Memformat hasil grabbing */
          grab: {
            by: 'text',
            value: ''
          }
        },

      ]
    }, /* -- Website -- */

  ];

  $.nyangrab(config, function(results) {
    /* hasil grabbing di lakukkan di sini */
    document.write('<pre>' + JSON.stringify(results, null, 2) + '</pre>');
  });
});
```
### Result
```json
{
  "result": [
    {
      "title": "Cbtokbn Portbble",
      "picture": "Sat Feb 18 2017 07:42:25 GMT+0700 (SE Asia Standard Time) https://ecs7.tokopedia.net/img/cache/375/hot_product/2017/1/27/15/49/20/318724/catokan-portable.jpg",
      "link": "https://www.tokopedia.com/hot/catokan-portable",
      "harga": "Mulai dari Rp 25rb"
    },
    {
      "title": "Sepbtu Boots Prib",
      "picture": "Sat Feb 18 2017 07:42:25 GMT+0700 (SE Asia Standard Time) https://ecs7.tokopedia.net/img/cache/375/hot_product/2017/1/27/15/51/50/3226/sepatu-boots-pria.jpg",
      "link": "https://www.tokopedia.com/p/fashion-pria/sepatu/boots",
      "harga": "Mulai dari Rp 120rb"
    },
  ]
}
```


## Penjelasan

Berikut penjelasan mengenai syntax penggunaan nya

```javascript
var config = [
	{
		url: 'http://example.com/',
		selector: 'div.box-content',
		loop: true,
		result: [
			{
				name: 'title',
				find: 'h1.title',
				loop: false,
				grab: {
					by: 'text',
					value: '',
				}
			}, 
       	 	]
      },
];
$.nyangrab(config, function(results) {
  console.log(results);
});
```

### Sekilas

| Attribute      | Type       | Description    | Example    |
| :------------- | :--------- | :------------- | :--------- |
| `url`          | `string`   | url adalah alamat website yang dikehendaki. | 'http://example.com' atau 'http://example.com,http://example.com/another' |
| `selector`     | `string`   | CSS selector untuk content yang akan di grab | 'div.main-content' |
| `loop`         | `boolean`  | untuk content atau item yang perlu di perulangan | `true`   |
| `result`       | `array`    | `important` penampung items items   |   |
| `name`         | `string`   | object key untuk item (nama item)   | 'title' |
| `by`           | `string`   | kategori content yang akan digrab   | 'text'  |
| `value`        | `string`   | Value untuk `grab`.`by` attr dan data   | 'href'   |

## Rincian untuk `grab`

Berikut adalah rincian value untuk attribut `grab` : 

| Attribute      | Type       | Value    | Penjelasan    |
| :------------- | :--------- | :------------- | :--------- |
| `text`          | `string`   | `null` | Text digunakan jika content grab yang kita kehendaki berupa text diantara tag html. Misalkan kamu ingin mengambil `title post` yang format di html nya adalah `<h1>Smartphone baru 2017</h1>`  |
| `html`         | `string`   | `null`  | html digunakan jika content grab yang kita kehendaki berupa script html lengkap. Misalnya kamu ingin grab content post yang yang format html nya `<div id="post"><h1>Judul</h1><p>ini content post</p></div>` tentunya kamu ingin mengambil  `<h1>Judul</h1><p>ini content post</p>` bukan. 
| `val`         | `string`   | `null`  | val (Value) digunakan jika content grab yang kita kehendaki berupa textarea. |
| `attr`        | `string`   | `attribut element` | attr (Attribute) digunakan jika content grab yang kita kehendaki di dalam attribut sebuah elemen html |

## Attribut `format`

Attribut `format` untuk memformat data yang akan ditampilkan, mengubah hasil output.

### Syntax
```javascript
format: 'attribut or text',
```

### Example
```javascript
format: 'Tanggal {{data}}', /* Results: Tanggal 27 */

format: 'Harga tahun ini adalah {{data}} untuk produk no. {{index:num}}' /* Results: Harga tahun ini adalah Rp. 24.000 untuk product no. 1 */

format: Date() + ' {{data}}', /* Results: Sat Feb 18 2017 07:42:25 GMT+0700 (SE Asia Standard Time) Hasil Grabing */
```

| Attribute      | Penjelasan    |
| :------------- | :--------- |
| `{{data}}` | hasil output original |
| `{{index:num}}` | index (urutan mulai dari 1) | 

## License

This software is provided free of charge and without restriction under the [MIT License](LICENSE)

## Authors

**Ryan Aunur Rassyid**

+ <https://www.facebook.com/ryan.hac>
+ <https://github.com/nyancodeid>

**Ican Bachors**

+ <https://www.facebook.com/ican.bachors>
+ <http://github.com/bachors>


Build with Love in Jombang, East Java, Indonesia 

