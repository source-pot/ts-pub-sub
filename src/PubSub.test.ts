import { create } from 'domain'
import createObservable from './PubSub'

test('can create observable', () => {
  expect(createObservable<number>(5).value())
    .toStrictEqual(5)
})

test('can update observable with value', () => {
  const observable = createObservable<boolean>(true)

  observable.update(false)

  expect(observable.value()).toStrictEqual(false)
})

test('can update observable with function', () => {
  const observable = createObservable<boolean>(true)

  observable.update(val => false)

  expect(observable.value()).toStrictEqual(false)
})

test('can subscribe to observable', () => {
  const observable = createObservable<number>(5)
  const unsubscribe = observable.observe(num => {
    expect(num).toStrictEqual(10)
  })

  observable.update(10)
})

test('can unsubscribe', () => {
  const observable = createObservable<number>(5)
  const callback = jest.fn(num => {})
  const unsubscribe = observable.observe(callback)

  unsubscribe()

  expect(callback).toBeCalledTimes(0)
})
