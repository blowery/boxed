interface OptionProto<A> {
  /**
   * Returns the Option containing the value from the callback
   *
   * (Option\<A>, A => B) => Option\<B>
   */
  map<B>(this: Option<A>, f: (value: A) => B): Option<B>;

  /**
   * Returns the Option containing the value from the callback
   *
   * (Option\<A>, A => Option\<B>) => Option\<B>
   */
  flatMap<B>(this: Option<A>, f: (value: A) => Option<B>): Option<B>;

  /**
   * Return the value if present, and the fallback otherwise
   *
   * (Option\<A>, A) => A
   */
  getWithDefault(this: Option<A>, defaultValue: A): A;

  /**
   * Typeguard
   */
  isSome(this: Option<A>): this is Some<A>;

  /**
   * Typeguard
   */
  isNone(this: Option<A>): this is None<A>;
}

interface SomeProto<A> extends OptionProto<A> {
  /**
   * Returns the value. Use within `if (option.isSome()) { ... }`
   */
  get(this: Some<A>): A;
}

interface NoneProto<A> extends OptionProto<A> {}

interface Some<A> extends SomeProto<A> {
  tag: "Some";
  value: A;
}

interface None<A> extends OptionProto<A> {
  tag: "None";
}

export type Option<A> = Some<A> | None<A>;

const optionProto: OptionProto<unknown> = {
  map(f) {
    return this.tag === "Some"
      ? Some(f(this.value))
      : (this as Option<ReturnType<typeof f>>);
  },

  flatMap(f) {
    return this.tag === "Some" ? f(this.value) : (this as ReturnType<typeof f>);
  },

  getWithDefault(defaultValue) {
    return this.tag === "Some" ? this.value : defaultValue;
  },

  isSome() {
    return this.tag === "Some";
  },

  isNone() {
    return this.tag === "None";
  },
};

const someProto: SomeProto<unknown> = {
  ...optionProto,

  get(this: Some<unknown>): unknown {
    return this.value;
  },
};

const noneProto: NoneProto<unknown> = optionProto;

const Some = <A>(value: A): Option<A> => {
  const some = Object.create(someProto) as Some<A>;
  some.tag = "Some";
  some.value = value;
  return some;
};

const None = <A>(): Option<A> => {
  const none = Object.create(noneProto) as None<A>;
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
   * Create an Option from a null | value
   */
  fromNull: <A>(nullable: A | null): Option<A> =>
    nullable === null ? None<A>() : Some<A>(nullable),

  /**
   * Create an Option from a undefined | value
   */
  fromUndefined: <A>(nullable: A | undefined): Option<A> =>
    nullable === undefined ? None<A>() : Some<A>(nullable),

  // TODO: Implements the rest
};
