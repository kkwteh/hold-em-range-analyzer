import {
  tileState,
  handClass,
  categorizedHands,
  isCardInputValid,
} from './ranges'

describe('the module', () => {
  it('generates a pair hand class correctly', () => {
    expect(handClass(['Ac', 'As'])).toEqual('AA')
  })

  it('generates a suited hand class correctly', () => {
    expect(handClass(['Ac', '2c'])).toEqual('A2s')
  })

  it('generates an offsuit hand class correctly', () => {
    expect(handClass(['Kc', 'Qs'])).toEqual('KQo')
  })

  it('generates tile state correctly', () => {
    let res = tileState([['Ac', 'As']])
    expect(res.AA).toEqual(true)
    expect(res.AKs).toEqual(false)
    expect(res['32o']).toEqual(false)
  })

  it('determines blocked and unblocked hands correctly', () => {
    let hands = [['Ac', 'As'], ['2d', '3c']]
    let heroBlockers = ['2d', '4c']
    expect(categorizedHands(hands, heroBlockers)).toEqual({
      sortedHands: [['Ac', 'As'], ['2d', '3c']],
      blocked: [['2d', '3c']],
      unblocked: [['Ac', 'As']],
    })
  })

  it('board blockers filter unblocked', () => {
    let hands = [['Ac', 'As'], ['2d', '3c']]
    let heroBlockers = ['2d', '4c']
    let boardBlockers = ['As', 'Kd', 'Qd']
    expect(categorizedHands(hands, heroBlockers, boardBlockers)).toEqual({
      sortedHands: [['2d', '3c']],
      blocked: [['2d', '3c']],
      unblocked: [],
    })
  })
})

describe('card input validation', () => {
  it('does not accept bad inputs', () => {
    expect(isCardInputValid(undefined, 'hero')).toEqual(false)
    expect(isCardInputValid('ac 3d 3c', 'hero')).toEqual(false)
    expect(isCardInputValid('ac', 'hero')).toEqual(false)
    expect(isCardInputValid('ac 3d', 'board')).toEqual(false)
    expect(isCardInputValid('ac 3d 4s 5h 6s 7d', 'board')).toEqual(false)
    expect(isCardInputValid('ac 3', 'hero')).toEqual(false)
    expect(isCardInputValid('ac 3c 4x', 'board')).toEqual(false)
  })

  it('accepts good inputs', () => {
    expect(isCardInputValid('ac 3d', 'hero')).toEqual(true)
    expect(isCardInputValid('ac 3d 4s', 'board')).toEqual(true)
    expect(isCardInputValid('ac 3d 4s 5h', 'board')).toEqual(true)
    expect(isCardInputValid('ac 3d 4s 5h 6s', 'board')).toEqual(true)
  })
})
