import classNames from 'classnames';

type MapProps = {
  className?: string;
};

// TODO ВОПРОС: Я передал в дженерик тип пропса, но IDE все равно ругалось, что нужно типизировать параметры функции
export const Map: React.FC<MapProps> = ({ className }: MapProps) => (
  <section
    className={classNames({
      map: true,
      [className as string]: className,
    })}
  />
);
