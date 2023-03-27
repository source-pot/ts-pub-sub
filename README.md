# ts-pub-sub
A basic pub/sub model written in typescript.
Written in a functional style with a factory method that starts you off

## Installation

`npm i @source-pot/pub-sub`


## Usage

Create an "observable" value using the factory method:

```ts
import createObservable from '@source-pot/pub-sub'

const observable = createObservable<Number>(10)
```

Subscribe to changes in the value by "observing" it:

```ts
observable.observe(value => console.log(value))
```

When the value being observed is changed, all observers are notified:

```ts
const observable = createObservable<Number>(10)

observable.observe(value => console.log(value))

observable.update(10)  // the observer callback above is invoked
// -> 10 is logged to the console
```

You can manually unsubscribe from an observable by using the function returned from observe:

```ts
const unsubscribe = observable.observe(...)

unsubscribe()  // callback no longer called when the value changes
```

This little library is fully typed with Typescript, the values are either inferred from your initial
value passed to the creater factory or you can manually specify them:

```ts
const observable1 = createObservable(10) // 'number' is inferred
const observable2 = createObservable<number|null>(10) // 'number|null' is specified

observable1.update(null) // type error as null is not a number
observable2.update(null) // allowed as the null is included in the type for this value
```

## Use cases

1. State management.  Storing a value and subscribing to changes allows you to build reactive UIs
   that update when values change.
2. todo add more use cases ;)