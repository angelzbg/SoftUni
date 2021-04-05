import { observer } from 'mobx-react';
import { useStore } from '../../../store/store';
import { ChevronLeftIcon } from '@primer/octicons-react';
import { setColorScheme, themeIcons } from '../../../utils/themes';
import { toggles } from '../constants';

export default observer(({ setToggle }) => {
  const { theme, themes, nextTheme } = useStore().themeStore;
  return (
    <div className="user-menu-pop">
      <div onMouseLeave={() => nextTheme(theme)}>
        {themes.map((name) => (
          <div
            key={`theme-${name}`}
            className="user-menu-item"
            onMouseEnter={() => setColorScheme(name)}
            onClick={() => {
              nextTheme(name);
              setToggle(toggles.main);
            }}
          >
            <div className={`user-menu-icon ${name}`}>{themeIcons[name]}</div>{' '}
            <div className="user-menu-title">{name} theme</div>
          </div>
        ))}
      </div>
      <div className="user-menu-separator" />
      <div className="user-menu-item" onClick={() => setToggle(toggles.main)}>
        <div className="user-menu-icon">
          <ChevronLeftIcon />
        </div>{' '}
        <div className="user-menu-title">Back</div>
      </div>
    </div>
  );
});
