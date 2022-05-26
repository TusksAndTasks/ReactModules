## React-Components ТЗ:

### Что должно быть сделано:

1) Создать отдельную ветку для этого задания
2) Использовать CRA с темплейтом --typescript
3) Настроить eslint, prettier так, чтобы проект не собирался при наличие ошибок. 
4) Добавить React-Router версии 6. Добавить хедер который показывает текущую страницу, добавить страницы "About Us", "404". Если в адресной строке попытаться ввести неизвестный роут, приложение должно перенаправлять на "404".
5) Отрисовать следующее на главной странице:
  - Search Bar. 
  Введенное значение сохранять в LocalStorage при анмаунте компонента. При инициализации его смотреть значение LocalStorage и отображать его.
  - Cards. Чем больше деталей на карточке, тем лучше.  
  **В случаях, где нужен доступ к жизненным циклам компонента, или необходим стейт - использовать классовые компоненты. Использование хуков на данном этапе запрещено**
6) Добавить тесты на компоненты. LocalStorage замокать, добавить тесты как на одну карту, так и на список всех карт.
Можно использовать как Testing Library React, так и Enzyme, но только что-то одно. Предпочтение Testing Library React.
  
Все логические части должны быть вынесены в отдельные компоненты.
