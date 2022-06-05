interface OptionPrototype<A> {
  /**
   * Returns the Option containing the value from the callback
   *
   * (Option\<A>, A => B) => Option\<B>
   */
  map<B>(this: Option<A>, func: (value: A) => B): Option<B>;

  /**
   * Returns the Option containing the value from the callback
   *
   * (Option\<A>, A => Option\<B>) => Option\<B>
   */
  flatMap<B>(this: Option<A>, func: (value: A) => Option<B>): Option<B>;

  /**
   * Return the value if present, and the fallback otherwise
   *
   * (Option\<A>, A) => A
   */
  getWithDefault(this: Option<A>, defaultValue: A): A;

  /**
   * Explodes the Option given its case
   */
  match<B>(
    this: Option<A>,
    config: { Some: (value: A) => B; None: () => B },
  ): B;

  /**
   * Runs the callback and returns `this`
   */
  tap(this: Option<A>, func: (option: Option<A>) => unknown): Option<A>;

  /**
   * Converts the Option\<A> to a `A | undefined`
   */
  toUndefined(this: Option<A>): A | undefined;

  /**
   * Converts the Option\<A> to a `A | null`
   */
  toNull(this: Option<A>): A | null;

  // TODO: Add toResult

  /**
   * Typeguard
   */
  isSome(this: Option<A>): this is Some<A>;

  /**
   * Typeguard
   */
  isNone(this: Option<A>): this is None<A>;
}

interface SomePrototype<A> extends OptionPrototype<A> {
  /**
   * Returns the value. Use within `if (option.isSome()) { ... }`
   */
  get(this: Some<A>): A;
}

interface NonePrototype<A> extends OptionPrototype<A> {}

interface Some<A> extends SomePrototype<A> {
  tag: "Some";
  value: A;
}

interface None<A> extends NonePrototype<A> {
  tag: "None";
}

export type Option<A> = Some<A> | None<A>;

const optionPrototype: OptionPrototype<unknown> = {
  map(func) {
    return this.tag === "Some"
      ? Some(func(this.value))
      : (this as Option<ReturnType<typeof func>>);
  },

  flatMap(func) {
    return this.tag === "Some"
      ? func(this.value)
      : (this as ReturnType<typeof func>);
  },

  getWithDefault(defaultValue) {
    return this.tag === "Some" ? this.value : defaultValue;
  },

  match(config) {
    return this.tag === "Some" ? config.Some(this.value) : config.None();
  },

  tap(func) {
    func(this);
    return this;
  },

  toUndefined() {
    return this.tag === "Some" ? this.value : undefined;
  },

  toNull() {
    return this.tag === "Some" ? this.value : null;
  },

  isSome() {
    return this.tag === "Some";
  },

  isNone() {
    return this.tag === "None";
  },

  // @ts-expect-error
  __boxed_type__: "Option",
};

const somePrototype: SomePrototype<unknown> = {
  ...optionPrototype,

  get(this: Some<unknown>): unknown {
    return this.value;
  },
};

const nonePrototype: NonePrototype<unknown> = {
  ...optionPrototype,
};

const Some = <A>(value: A): Option<A> => {
  const some = Object.create(somePrototype) as Some<A>;
  some.tag = "Some";
  some.value = value;
  return some;
};

const None = <A>(): Option<A> => {
  const none = Object.create(nonePrototype) as None<A>;
  none.tag = "None";
  return none;
};

export const Option = {
  /**
   * Create an Option.Some value
   */
  Some,

  /**
   * Create an Option.None value
   */
  None,

  /**
   * Create an Option from a nullable value
   */
  fromNullable: <A>(nullable: A | null | undefined): Option<A> =>
    nullable == null ? None<A>() : Some<A>(nullable),

  /**
   * Create an Option from a value | null
   */
  fromNull: <A>(nullable: A | null): Option<A> =>
    nullable === null ? None<A>() : Some<A>(nullable),

  /**
   * Create an Option from a undefined | value
   */
  fromUndefined: <A>(nullable: A | undefined): Option<A> =>
    nullable === undefined ? None<A>() : Some<A>(nullable),

  // TODO: Implement last static methods

  equals: <A>(a: Option<A>, b: Option<A>, equals: (a: A, b: A) => boolean) =>
    a.isSome() && b.isSome() ? equals(a.value, b.value) : a.tag === b.tag,

  pattern: {
    Some: <A>(value: A) => ({ tag: "Some", value } as const),
    None: { tag: "None" } as const,
  },
};
