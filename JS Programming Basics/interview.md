###### JavaScript
- Асинхронен single-threaded език създаден от Брендан Айх 1995г. за NetScape като първоначално се е казвал Мока
- Води се, че е интерпретатуем език но не е чист интерпретатуем защото има предварителен пас който проверява за синтактични грешки и хойстване
- Също така има възможност multi-threading със използването на Webworker

# Stack
  - Пази само примитивните типове - Number, Boolean, РЕФЕРЕНЦИИ към обектите и стринговете
  - Място в паметта с линейна структура
# Heap
  - Обектите, стринговете
  - Място в паметта без структура
 
## Floating numbers - 0.1 + 0.2 !== 0.3
- Защото JS работи с base 10 система и се опитва да трансофмира числото до base 2(binary) и от там идва проблема с прецизността
- Fix: Number.parseFloat(num).toPrecision(*1)
- Репрезентира се в 64 битов бинарен формат
- Използва се base 10 система 1/10 (0.1) 1/5 (0.2), 1/2 (0.5)
- Все едно да изчислиш  1/3
- Все едно имаш пица която трябва да разрежеш на супер малки парчета и стигаш до <b>53-тото<b> парче и колкото и прецизно да режеш, не можеш да разрежеш толкова малко парче на равно
# !!!
1. 0.1 = 1/10
2. 0.2 = 1/5
3. 1/5 закръгляме на 1/10 => 1/5 * 2 = 2/10
4. получаваме 1/10 + 2/10 = 3/10 или 1/3

## Web Worker
- АПИ с което можем да използваме Web Worker за да изпълняваме по-тежки операции на background thread-ове
+ Комуникацията става с postMessage() и onmessage()
- Има собствен event-loop
- Няма достъп до DOM, window и глобални променливи

## Callback
- Функция която е аргумент на друга функция

## Closure is a locally declared variable related to the function/method
- Механизъм който ни дава достъп до скоуп-а на външната функция достъпна от вътрешната функция
+ Локално декларирана променлива достъпна в тялото на функцията и вложените такива

## Lexical Scope
- Функцията има достъп до променливите в контекста в който е дефинирана А НЕ в който е извикана

## 'This' referes to the object from where it was called.
- Сочи към инстанцията на обекта който изпълнява текущата функция
- Контекста е контекста на функцията и зависи САМО от това как е извикана.
# ! Важно: За да разберем контекста на this трябва да видим как е извикана функцията
+ Ако имаме метод на клас/обект - this сочи към обекта/класа , същото важи и за constructor функциите
+ Ако е изпълнен просто във функция сочи към глобалния обект(window, global)

## Call, apply - diffrence is between the way that arguments are passed to the function
- Използват се за да променят контекста на this
+ разликата е в начина на подаване на аргументи - function.call(this, arg1, arg2)/.apply(this, [arg1, arg2])

## ES6 Features
- Arrow functions
- let/const
- 'Class' syntax
- Map/Set data structures

* ? ## Capture and bubbling

## Prototypes 
- Механизъм чрез който JS обекти наследяват feature-и 
- Всички JavaScript обекти наследяват пропъртита и методи от прототип.
- Object.create(null) - създава празен обект без прототипи
# Prototypes vs Classes
- На прототипа закачаме пропърти методи докато класа ни е шаблон за обект
- Класовете дефинират тип който може да се инстанцира runtime докато прототипа сам по себе си е инстанция на обект


## Functional programing padarigm - pure functions, avoid side effects
- Чисти функции, без side-effect-и

## Functions:
1. Function declaration - its hoisted - function name() {...}
2. Function expression - assignet to variable, not hoisted const myFunc = function() {...}
3. Arrow function - it comes with ES6 , improves using of <this>
+ Идват с ES6 , подобряват работата на this, може да се използват без къдравите скоби и директно връщат резултат без да се пише 'return'

4. Shorthand method definition - declared as methods in the class
+ Декларират се като методи в обект без префикс function
5. Generator functions
+ Декларират се със звезда - function* name
6. IIFE

## Promises
- Обект който репрезентира евентуалното изпълнение или грешка на асинхронна операция и резултата от нея

1. Може да бъде resolved или rejected
2. приема два параметъра - resolve, reject , new Promise(resolve, reject)
3. Стейтове: fulfilled/resolved , rejected , pending
4. Изпълнява се веднага

# Promise vs Observable
- Промиса връща една стойност а обзървъбъла връща стрийм от стойности
- Promise-a се изпълнява веднага а обзървъбълите могат да са cold || hot

## Observable
- Стрийм от дата

## var/const/let
1. Var is hoisted, only the variable without the value
2. Var its attached to the global scope / var a === win
3. Var има function скоуп докато let/const имат блок скоуп
4. Когато достъпи inner приключва и не търси нагоре за outer ако има shadowing
5. Когато Var е извън функция е закачен за глобалния обект

## Каква е причината да wrapp-ваме целия JS code във функция
- За да запазим private namespace и да избегнем конфликти в именуването с някои библиотеки
 
## Cycles
- for-in/of - off-arr, in-obj(property), while, do/while, foreach
- do/while - прави изпълнява do блока и след това прави проверка за условието 

## Primitive Values
- number, string, boolean, null, undefined, symbol

## False values
- ['', 0, null, undefined, NaN, false];

###### DOM
- Програмен интерфейс който предоставя Обектно Ориентирам модел на HTML-a

## Event Delegation
+ Закачане на listener на parent елемент 
Пример: Вместо на всеки <li> таг да слагаме listener - да закачим един на <ul>

## target vs currentTarget
- div > ul > li
- target е елемента на който е кликнато -> li
- currentTarget е елемента за който е закачен event delegation event

## eventListener(click) vs onclick
- Може да има няколко event listener-а без да се овъррайдват един друг за разлика от onclick

###### Object Oriented Programing - OOP

## Principles

1. Inheritance - for example if we have class Animal which have property - breath, we can extend it and make a new class Dog which will have all public properties and methods of the class Animal and for example we can add the method walk()
- Наследяване. 

2. Capsulation - keeping the data private and exposing to the public only that part which is needed.
- Капсулация

3. Abstraction - it give us a interface to work with without the need from us to know how it works underneeth
- Абстракция

4. Polymorphism  - its the ability of the property on the object to have identical interface work with but with diffrent realization
- Полиморфизъм 

## Interface 
- Можем да го приемем като един вид договор който ни казва КАКВО трябва да можем това без да ни казва КАК
- Концепция на абстракцията и капсулацията

## Object composition vs inheritance ???????????????

###### Hyper Text Transfer Protocol - HTTP 
- Everything is sended like text over HTTP

## Media independant
- Any type of data can be send by HTTP as long both client and server know how to handle the data content.
+ Могат да се изпращат всякакъв тип файлове - снимки, клипове, документи

## Stateless
- The client and server are aware of each other only during current requst.

## Connectionless
+ Every request are made on new connection

## Headers types
- Request
- Response
- General

## REST 
- Архитектурен стил за клиент-сървър комуникация върху HTTP
- CRUD операции
- Example:
+ GET api/customers -> Array<Customer>
+ GET api/customers/1 -> Customer
+ POST api/customers -> {Customer} (create)
+ + Използване на един end-point с различна мета дата
# Features
1. Stateless
2. Поддържа XML и JSON
3. Documentation / Трябва да има up-to-date документация
4. Error Messages / Трябва да има адекватни съобщения за грешки
5. Използва подходящи HTTP статус кодове

## Performane optimization
- Image sprites and compress
- Minification

## HTTP1.1 vs HTTP2
1. Брой connections
- HTTP1 прави нов TCP connection за всеки requеst докато HTTP2 отваря само 1 такъв за всички request-и
2. Server push
- Сървъра знае и праща всички допълнителни файлове като .css файлове, картинки и т.н. преди още да е направена GET заявката за тях
- Разваля семантиката request-response и с един request може да има няколко reponse-a
3. Компресиране на header-ите

## TCP vs HTTP
- TCP е транспортен протокол
- HTTP е application протокол който показва как да се пакетира самата информация

###### Websocket
- Комукационен протокол надграждащ TCP
- След кънектване, кънекцията оставя отворена като позволява real-time data flow
- Представлява стрийм от съобщения
- wss://
- Websocket !== HTTP 

###### Cascade Style Sheet - CSS

## CSS Preprocessor
- Инструмент който ни помага да създаваме CSS код който е по-структуриран и по-бърз

## Architecture patterns
- OOCSS
- BEM
- SMACSS
# Folder Structure
- 7-1

## Selectors: 
1. Tag
2. Class
3. Id 
4. *(star) which selects all

## em vs rem
- em е релативен на парент елемента си а rem на главния html елемент

## Sign selectors
1. div p  ---   Всички <p> елементи в <div>
2. div > p ---  Всичко <p> елементи на които parent е <div>
3. div + p ---  Селектира <p> елемента поставен веднага след <div> // https://www.w3schools.com/css/tryit.asp?filename=trycss_sel_element_pluss
4. p ~ ul  ---	Всеки <ul> след <p> елемента
 
## Pseudo-element/selector
# Used to style particular part of the element. 
+ Example: p::first-line {...} , div::first-child {...}

## Pseudo-class
# CSS technique used to style diffrent state of the element.
+ Example: button:hover {...} , link:active {...}

## CSS Box Model
- Every element is represented like a box with with margin, border, padding and content.
+ Всеки елемент HTML елемент е репрезентиран като правоъгълник с margin, border, padding и content който 

# Блоковите елементи причиняват местене на нов ред
# Инлайн елементите не могат да им се задачва височина и широчина
# Инлайн-блок - поддържат височина и широчина и се визуализират на един ред

## Начини за писане на CSS:
- С таг <style>
- Писане в самия елемент с таг style="" / inline
- С импортване на .css файл 

###### HTML

## HTML5 Features
- # Semantic HTML
- header/footer/nav/article/section/aside
- Използва се за SEO оптимизация.
- Използва се за по-добро ориентиране в сайта от хора с увреждания.

## Microdata
- Допълнителни атрибути към HTML-a добавящи семантична информация за SEO

###### Angular

## Templates
- Темплейтите в Angular се пишат с HTML които използват Angular-specific елементи и атрибути. Те са комбинирани с информация която идва от model/controller която по-късно се рендира за да се предостави динамично view на user-a.

## Design Patterns
1. Decorator pattern
2. MV* pattern

## Data Binding
- String Interpolation
    + {{ movie.title }}

- Property Binding
    + <img [src]="previewUrl">

- Event Binding
    + (click)="fn()"

- Two Way Data Binding
    + [(target)]="expression"
    + + [(ngModel)]="inputValue" // <input [(ngModel)]="inputValue">

## Angular 10 Updates @ Breaking changes
- Any resolver that returns 'EMPTY' will cancel navigation, to work must return 'default!Empty'
- ModuleWithProviders pattern requires generic type because of the new 'Ivy Render Engine'
- Warnings about unknown elements are logged as errors

## Compilers
- Just In Time(JIT) - compiles the app in the browser at runtime.
- Ahead Of Time(AOT) - compiles the app and libraries at build time.

## Features
- Angular CLI
- Cross Platform App Development
- Temaplate
- Testing
- Animation support

## Services
- Singleton обекти които се инстанцират само веднъж през life-cycle-a апликацията
- Използват се организирането на бизнес логика

## Advantaged
- Custom directives
- Community support
- Two-way data binding
- Dependancy Injection
- MVC Pattern
- Animation support

## Disadvantages
- Complexity
- Learning curve
- Low performance if the developer doesn't know how to handle change detection 

## Bulding blocks
1. Modules
2. Components
3. DI
4. Services
  + бизнес логика
5. Directives
  + Атрибутни директиви - променят свойствата на DOM елемента , ngClass
  + Структурни директиви - променят структурата на DOM , пишат се с префикс ' * '
6. Data Binding
7. Routing

## Lifecycle Hooks
1. constructor
2. OnChanges
  + Извиква се всеки път когато има някаква промяна по DOM или input пропъртитата
3. OnInit
4. DoCheck
5. AfterContentInit
6. AfterContentChecked
7. AfterViewInit
8. AfterViewChecked
9. Destroy

## RxJS
+ библиотека за писане на асинхронен функционален код с реактивен стил използваща обзървъри.

###### WEB Applications

## Accessability
- Semantic Markup
- Keyboard accessability - възможност за използване на апликацията само с клавиетура
- Visual Assistance - цвят, контраст, фокус на елементите и текстова репрезентация на аудио елементи и евенти.

## Authentication & Authorization
- Authentication - идентифицира кой си ти.
- Authorization - показва дали имаш ниво на достъп.

## Rendering page
1. URL
  + scheme://domain:port/path:?query_string#frament_id
    + scheme - http, https, wss, ftp
    + port - default 80

2. Fetch resource from domain / Гет заявка за ресурси от домейна
3. HTML => DOM nodes дърво
4. CSS => CSSOM (CSS Object Model)
5. DOM + CSSOM = render tree (render дърво)
6. Layout процес на рендер дървото за да генерира геометрията на всеки елемент
7. Рисуване на всеки елемент - превръщане на елементите в реални пиксели на екрана
  + изпозването на различни стилове оказва влияние на performance
    + Пример: solid color е по-бързо за рендиране от drop-shadow


###### Design Patterns
- Module Pattern === OOP.Capsulation
- Decorator
    + Позволява да се добави определен behavior към индивидуален обект динамично без това да засяга останалите обекти от класа
- Observer
    + Pattern в който обекта е наричан Subject и maintain-ва лист с обекти наричани Обзървъри които автоматично се notify-ват при промяна на Subject-a
      + Subject-a също така може да се нарича и "stream of events"
- Singleton 
    + Работа само с една инстанция на класа
- Adapter Pattern
    + Позволява ни да имаме медиатор между две системи

<!-- - Duck typing in computer programming is an application of the duck test
    + "If it walks like a duck and it quacks like a duck, then it must be a duck"
— to determine if an object can be used for a particular purpose. -->

###### Principles
See /principles.md

###### HR

## Final questions
- What are your expectetions for this role during the first 30 days and for 1 year ?
+ Какви са вашите очаквания към тази позиция в рамките на 30 дни и 1 година ?

- What are the biggest challenges facing the company/department right now?
+ Какви са най-големите предизвикателства с които компанията се сблъсква в момента ?

###### SCRUM
1. Product Backlog -> Sprint Backlog -> Sprint -> Daily Scrum

Полезно:
https://frontendmasters.com/books/front-end-handbook/2018/practice/skills.html
https://www.tutorialspoint.com/design_pattern/design_pattern_interview_questions.htm