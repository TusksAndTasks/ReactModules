code exported from

# tusksandtasks-REACT2022Q1

Private repository for @tusksandtasks

## React-Components ТЗ:

### Что должно быть сделано:

Создать отдельную ветку для этого задания
Использовать CRA с темплейтом --typescript
Настроить eslint, prettier так, чтобы проект не собирался при наличие ошибок.
Добавить React-Router версии 6. Добавить хедер который показывает текущую страницу, добавить страницы "About Us", "404". Если в адресной строке попытаться ввести неизвестный роут, приложение должно перенаправлять на "404".
Отрисовать следующее на главной странице:
Search Bar.
Введенное значение сохранять в LocalStorage при анмаунте компонента. При инициализации его смотреть значение LocalStorage и отображать его.
Cards. Чем больше деталей на карточке, тем лучше.
В случаях, где нужен доступ к жизненным циклам компонента, или необходим стейт - использовать классовые компоненты. Использование хуков на данном этапе запрещено
Добавить тесты на компоненты. LocalStorage замокать, добавить тесты как на одну карту, так и на список всех карт. Можно использовать как Testing Library React, так и Enzyme, но только что-то одно. Предпочтение Testing Library React.
Все логические части должны быть вынесены в отдельные компоненты.

## React-Form ТЗ:

### Что должно быть сделано:

Нужно выполнять задание на базе React.Components

1. Создать отдельную ветку для этого задания, от ветки предыдущего задания.
2. Создать отдельный роут для форм.
3. Делать форму используя uncontrolled components
4. Добавить функционал к приложению:

   - Собирать информацию через форму.
   - Тип информации может быть любой, но форма как минимум должна иметь по одному контролу следующих типов:
   - input, date input, dropdown/select, checkbox, switcher, file upload (image)

   ```
   **Пример:**
   input - Имя, Фамилия, Zip код;
   date input - день рождения, дата доставки;
   dropdown/select - список стран, список штатов (выбрать можно только один элемент из списка)
   checkbox - поле "согласен на обработку данных", список дополнительных подарков к заказу (выбрать можно несколько из списка)
   switcher - male/female, хочу получать уведомления об акциях/ не хочу
   file upload - profile picture
   ```

   Валидация полей должна происходить при нажатии на кнопку **Submit**. Если какие-то из полей заполнены не верно, то под ними должны отобразиться сообщения об ошибках. Карточка не должна создаваться пока все ошибки не будут исправлены.

   При изменении значения введённого в input, происходит сброс не всех ошибок валидации формы, а только для этого конкретного поля.

   Кнопка Submit должна быть заблокирована при инициализации формы (до первого ввода), а также до тех пор, пока все ошибки валидации не будут исправлены.

   При нажатии на кнопку Submit все данные из формы должны отобразиться в виде карточки в списке карточек под формой, должно отобразиться сообщение, что данные успешно сохранены, а сама форма должна быть очищена.
   Если мы 5 раз заполнили и сабмитнули форму, то у нас должно быть 5 карточек в списке под формой.

5. Добавить тесты:
6. Все логические части должны быть вынесены в компоненты.  
   Все данные должны храниться в локальном стейте компонент.  
   Компоненты не должны обращаться к API, не должно быть redux и других сторонних решений для state management.  
   **Использование каких либо библиотек с компонентами или библиотек, которые работают с формами в этом задании запрещено.**

## React-API ТЗ:

### Что должно быть сделано:

1. Создать отдельную ветку для этого задания
2. Выбрать апи
   Предлагается использовать следующие API(но можно использовать любое другое, которое вам нравится, если оно поддерживает поиск, пагинацию и сортировку): - https://www.flickr.com/services/api/flickr.photos.search.html - https://the-one-api.dev/documentation - https://rickandmortyapi.com/documentation/ - https://developers.themoviedb.org/3/getting-started/introduction - https://pipedream.com/apps/swapi - https://github.com/public-apis/public-apis
   **Обязательно, чтобы апи поддерживало поиск, пагинацию и сортировку, хоть на этом этапе они не понадобятся, но велика вероятность что пригодятся позже**
3. Переписать страницу для поиска, разбить ее на 2 логических части:
   - **строка поиска.** Вводим текст -> нажимаем Enter -> отправляем запрос к API с введенным параметром -> список результатов поиска обновляется
   - **список результатов поиска**: отображаем данные которые вернул API запрос при помощи Cards.
4. Кастомер решил что требования поменялись. Каждый элемент списка теперь должен отображать минимальную информацию. При клике на элемент - отображаем всю доступную информацию об этом элементе в модальном окне. Закрываться модальное окно должно по клику на крестик в верхнем правом углу или по нажатию на странизу за пределами модального окна. При открытии модального окна на страницу должен быть наложен overlay.
5. Сделать индикатор загрузки (компонент с анимацией или хотя бы строка - "Загружаем"). Расположение индикатора на свое чувство прекрасного.

Все логические части должны быть вынесены в компоненты.
**User friendly интерфейс с индекатором загрузки и сообщениями на случай если данные не найдены или что-то сломалось приветствуются.** 5) Добавить тесты, апи коллы в тестах замокать

## React-Hooks ТЗ:

### Что должно быть сделано:

1. Создать отдельную ветку для этого задания
2. Переписать основную страницу на хуки сохранив функционал. Все тесты по итогу должны работать
3. Переписать форму на React Hook Form, сохранив функционал. Все тесты по итогу должны работать

## React-Custom-App-State ТЗ:

### Что должно быть сделано:

1. Создать отдельную ветку для этого задания
2. Создать стейт менеджмент используя useReducer и Context API, где сохранять результаты поиска и данные формы. Теперь при переключении между страницами все данные должны сохраняться.
3. Добавить в глобальный стейт
   - **переключатели для сортировки**(как минимум три варианта сортировки). Выбираем параметр -> отправляем запрос к API с введенным параметром -> список результатов поиска обновляется
   - **переключатели для пагинации.** Должна быть возможность выбрать количество результатов на странице и номер страницы, на которой мы находимся сейчас + общее количество страниц. Выбираем параметр -> отправляем запрос к API с введенным параметром -> список результатов поиска обновляется
4. Кастомер изменил требования к выводу деталей. Теперь при нажатии на каждый айтем из результатов поиска не нужно открывать модалку, а открывать информацию на отдельной странице. Также на этой странице добавить ссылку "Назад". В хедере отобразить текущее положение. Страница с деталями должна брать данные из глобального стейта.
   Если данных нет, то сделать редирект на хоум пейдж.

## React-Redux ТЗ:

### Что должно быть сделано:

1. Создать отдельную ветку для этого задания
2. Переписать стейт менеджмент на Redux используя RTK
3. Реквесты к апи переместить в thunks
4. Сделать выводы что лучше - кастомный стейт менеджмент через контекст либо Redux
