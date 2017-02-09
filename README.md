# NyanGrab.JS
NyanGrab adalah web grabber untuk mengambil content atau teks di sebuah website. Nyangrab menggunakan jQuery dan YQL, jadi kamu perlu menambahkan jQuery untuk bisa menggunakan NyanGrab. NyanGrab menggunakan CSS selector.

## Kelebihan
* Asynchronous Request
* Flexibel
* Full Custom

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
          format: 'Mulai dari {{data}}',
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
| `url`          | `string`   | url adalah alamat website yang dikehendaki. | 'http://example.com' |
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



