// @flow

export type Category = {|
  title: string,
  color: string,
|};

export type Task = {|
  id: string,
  title: string,
  category: Category,
  creationDate: string,
  endedDate: string,
  isCompleted: boolean,
  isCanceled: boolean,
|};
