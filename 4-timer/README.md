# Timer

Таймер, куда передаётся время звонка и после окончания таймера отображается сообщение.
Чтение аргументов можно сделать разбором строки: 1h 5m 10s (1 час, 5 минут, 10 секунд).

```shell
node index.js 1000
node index.js 1h
node index.js 5m
node index.js 10s
node index.js 1h 5m 10s
node index.js 1h 10s
node index.js 5m 10s
```
