# ODCS FRONTEND

- [Фич лист](https://docs.google.com/spreadsheets/d/1GwV1-NoSkC2oHRamFoRoKfmjsDQTBtnCVACTTKllpCs/edit#gid=1450262909)

- [Дизайн](https://www.figma.com/file/3SieWKz3TaNqmqWhlz0dSt/Online-discount-card-service?type=design&node-id=41%3A2638&mode=design&t=eCfXjjFrXwwvUsxf-1)

## 💾 Git

### 📦 Ветки

#### Шаблон

`[префикс]/[задача]`

#### Примеры

- `feature/project-structure`
- `refactor/default-button`

### ✒️ Коммиты

```bash
## Для коммитов необходимо использовать комманду
npm commit
```

### 📝 Слияние веток и пуллреквесты

> ⚠️ **Обратить внимение**
>
> Для слияния исходной ветки с веткой `develop` необходимо делать, вмето обычноного merge, **squash merge**.

> **squash merge** - объединяет все коммиты из исходной ветки в один коммит для целевой ветки.

- Название пуллреквеста должно совпадать с названием ветки
- Пуллреквест, не связанный с новой версией, должен откываться в ветку `develop`
- Октрытие, squash merge и удаление ветки делает тот кто работал над исходной веткой

### 📌 Варианты префиксов

Можно использовать как для веток и пуллреквестов, так и для коммитов (commitezen делает это самостоятельно).

#### Перечислены основные варианты:

- **feature**
- **fix**
- **refactor**
- **docs**
- **chore**

## Именование файлов и директорий

Для наименования файлов и директорий необходимо использовать Kebab Case

### Примеры

- Директория `default-button`, `user`
- Файлы `app.tsx`, `default-form.tsx`, `form.ts`

## Экспорт компонентов

Используйте только именованные экспорты компонентов

## Структура директорий

> ⚠️ **Обратить внимение**
>
> Код из модуля не может быть использован в других модулях этого слоя или в нижнем слое, **только на уровне выше**. В случае недостаточности существующих слоев приложения можго обсудить чтобы добавить новые.

```
src
├── app // файлы верхнего уровня приложеня
│   ├── app.tsx
│   └── index.ts
├── pages // роутинг
│   ├── index.ts
│   └── ...
├── features // сущности, фичи
│   ├── feature-1
│   │   ├── index.ts
│   │   ├── lib
│   │   ├── ui
│   │   ├── api
│   │   └── model
│   ├── feature-2
│   ├── feature-3
│   └── ...
├── stories // story book
├── shared
│   ├── const
│   │   ├── index.ts
│   │   └── ...
│   ├── api
│   │   ├── index.ts
│   │   └── ...
│   ├── ui
│   │   ├── index.ts
│   │   └── ...
│   └── lib
│       ├── index.ts
│       └── ...
└── ...

```
