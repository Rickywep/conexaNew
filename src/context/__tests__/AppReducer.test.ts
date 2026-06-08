import { appReducer } from '../AppReducer';
import type { AppState } from '../../types';

const baseState: AppState = { isAuthenticated: false };

describe('appReducer', () => {
  it('LOGIN establece isAuthenticated en true', () => {
    const result = appReducer(baseState, { type: 'LOGIN' });
    expect(result.isAuthenticated).toBe(true);
  });

  it('LOGOUT establece isAuthenticated en false', () => {
    const result = appReducer({ isAuthenticated: true }, { type: 'LOGOUT' });
    expect(result.isAuthenticated).toBe(false);
  });

  it('LOAD_AUTH restaura el estado de autenticacion', () => {
    const result = appReducer(baseState, { type: 'LOAD_AUTH', payload: true });
    expect(result.isAuthenticated).toBe(true);
  });

  it('LOAD_AUTH con false no autentica', () => {
    const result = appReducer({ isAuthenticated: true }, { type: 'LOAD_AUTH', payload: false });
    expect(result.isAuthenticated).toBe(false);
  });

  it('no muta el estado original', () => {
    const state: AppState = { isAuthenticated: false };
    appReducer(state, { type: 'LOGIN' });
    expect(state.isAuthenticated).toBe(false);
  });
});
