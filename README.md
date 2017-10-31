# node-rest-mongo
Здесь будет список вопросов, которые нужно задать:
##
Нужна ли связь предметам с факультетом или еще чем-то.
Связь между аудиторией и чем? (Факультетом или корпусом(которых нету в базе));


## запрос
req: факультет, (бакалавр/магистратура/специалитет/аспирантура), номер курса.

## ответ
```
res: [
    'Понедельник': {
        '8:30 - 10:05' : {
            teacher: 'Солдатенко И.С.',
            subject: 'Математический анализ',
            subgroup: '1',
            plus_minus: '+',
            room: {},
        }
    }
]
```