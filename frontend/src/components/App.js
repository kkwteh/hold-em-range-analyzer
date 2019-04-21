import React from 'react'
import CardForm from './CardForm'
import RangeForm from './RangeForm'
import KeyboardShortcutRegion from './KeyboardShortcutRegion'

const App = () => (
  <KeyboardShortcutRegion>
    <div className={'augranger'}>
      <div className={'header'}>
        <div className='about-author'>
          <span className='author-elem'>By: Kevin Teh</span>
          <span className='author-elem'>
            <a href="https://www.linkedin.com/in/kevin-teh-3a6b9235/">LinkedIn</a>
            <span>|</span>
            <a href="https://twitter.com/kkwteh">Twitter</a>
          </span>
        </div>
        <CardForm label={ 'Hero hole cards' } location={ 'hero' } placeholder={ '9s 8s' } />
        <CardForm label={ 'Board cards' } location={ 'board' } placeholder={ '6d 7s Th 2c As' } />
      </div>
      <div className={'street'}>
        <RangeForm title={ 'Hero preflop' } player={ 'hero' } street={ 'preflop' }/>
        <RangeForm title={ 'Opponent preflop' } player={ 'opponent' } street={ 'preflop' }/>
      </div>
      <div className={'street'}>
        <RangeForm title={ 'Hero flop' } player={ 'hero' } street={ 'flop' }/>
        <RangeForm title={ 'Opponent flop' } player={ 'opponent' } street={ 'flop' }/>
      </div>
      <div className={'street'}>
        <RangeForm title={ 'Hero turn' } player={ 'hero' } street={ 'turn' }/>
        <RangeForm title={ 'Opponent turn' } player={ 'opponent' } street={ 'turn' }/>
      </div>
      <div className={'street'}>
        <RangeForm title={ 'Hero river' } player={ 'hero' } street={ 'river' }/>
        <RangeForm title={ 'Opponent river' } player={ 'opponent' } street={ 'river' }/>
      </div>
    </div>
  </KeyboardShortcutRegion>
)

export default App
