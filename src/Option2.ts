interface OptionCommon<A> {
  /**
   * Returns the Option containing the value from the callback
   *
   * (Option\<A>, A => B) => Option\<B>
   */
  map<B>(this: Option<A>, f: (value: A) => B): Option<B>;

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

const getOptionCommon = <A>(): OptionCommon<A> => ({
  map<B>(this: Option<A>, f: (value: A) => B): Option<B> {
    return this.tag === "Some"
      ? Some(f(this.value))
      : (this as unknown as Option<B>);
  },

  getWithDefault(defaultValue: A): A {
    return this.tag === "Some" ? this.value : defaultValue;
  },

  isSome(this: Option<A>) {
    return this.tag === "Some";
  },

  isNone(this: Option<A>) {
    return this.tag === "None";
  },
});

type Some<A> = OptionCommon<A> & {
  tag: "Some";
  value: A;

  /**
   * Returns the value. Use within `if (option.isSome()) { ... }`
   */
  get(this: Some<A>): A;
};

type None<A> = OptionCommon<A> & {
  tag: "None";
};

export type Option<A> = Some<A> | None<A>;

const Some = <A>(value: A): Some<A> => ({
  ...getOptionCommon<A>(),

  tag: "Some",
  value,

  get(this: Some<A>): A {
    return this.value;
  },
});

const None = <A>(): None<A> => ({
  ...getOptionCommon<A>(),

  tag: "None",
});

export const Option = {
  /**
   * Create an Option.Some value
   */
  Some: <A>(value: A): Option<A> => Some(value),

  /**
   * Create an Option.None value
   */
  None: <A>(): Option<A> => None(),

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
