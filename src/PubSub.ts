
type SubscriberCallback<DataType> = (data: DataType) => void
type UnsubscribeFunction = () => void
type StateUpdateCallback<DataType> = (data: DataType) => DataType
type ObservableValue<DataType> = () => DataType
type Observable<DataType> = {
  observe: (callback: SubscriberCallback<DataType>) => () => void,
  update: (newDataOrCallback: DataType|StateUpdateCallback<DataType>) => void,
  value: ObservableValue<DataType>
}

export default function createObservable<DataType>(data: DataType): Observable<DataType> {
  const subscribers = new Set<SubscriberCallback<DataType>>()

  return {
    observe(callback: SubscriberCallback<DataType>): UnsubscribeFunction {
      subscribers.add(callback)
      return function() { subscribers.delete(callback) }
    },
    update(newDataOrCallback: DataType|StateUpdateCallback<DataType>) {
      if (typeof newDataOrCallback === 'function') {
        data = (newDataOrCallback as Function)(data)
      } else {
        data = newDataOrCallback
      }
      subscribers.forEach(callback => {
        callback(data)
      })
    },
    value: () => data
  }
}
