# Start new console session

```bash
$ node console
```

# Usage examples
[Sequelize class method docs](https://sequelize.org/master/manual/models-usage.html)

Create new instance object

```js
const Device = models.devices

Device.create(
  {
    name: 'Pinza 1',
    duration: 'hora',
    time_start: Date.now(),
    time_end: Date.now() + 1 * 60 * 60 * 1000,
    average_medition: 1,
    maximum_medition: 2
  }
);
```

Find by id
```js
models.Device.findByPk(1).then(device => console.log(device));
```

Find all devices
```js
models.Device.findAll().then(device => console.log(device))
```
