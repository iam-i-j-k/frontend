import preferencesReducer, { toggleCategory, setTheme } from '../src/lib/features/preferencesSlice'

describe('preferencesSlice', () => {
  const initialState = {
    categories: ['technology', 'sports'],
    theme: 'system' as 'light' | 'dark' | 'system',
  }

  it('should handle initial state', () => {
    expect(preferencesReducer(undefined, { type: 'unknown' })).toEqual(initialState)
  })

  it('should handle toggleCategory (adding)', () => {
    const actual = preferencesReducer(initialState, toggleCategory('finance'))
    expect(actual.categories).toEqual(['technology', 'sports', 'finance'])
  })

  it('should handle toggleCategory (removing)', () => {
    const actual = preferencesReducer(initialState, toggleCategory('sports'))
    expect(actual.categories).toEqual(['technology'])
  })

  it('should handle setTheme', () => {
    const actual = preferencesReducer(initialState, setTheme('dark'))
    expect(actual.theme).toEqual('dark')
  })
})
