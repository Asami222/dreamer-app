// src/components/CheckBox/CheckBox.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import CheckBox from './index'

describe('CheckBox', () => {
  it('チェック状態のときに DoneIcon が表示される', () => {
    render(<CheckBox isChecked={true} setIsChecked={vi.fn()} />)
    // DoneIcon が描画されるか確認
    const icon = screen.getByTestId('done-icon') // IconButton 側で testId 設定している場合
    expect(icon).toBeInTheDocument()
  })

  it('クリックで setIsChecked が呼ばれる', () => {
    const mockSet = vi.fn()
    render(<CheckBox isChecked={false} setIsChecked={mockSet} />)
    const box = screen.getByRole('button', { hidden: true }) || screen.getByTestId('checkbox')
    fireEvent.click(box)
    expect(mockSet).toHaveBeenCalledTimes(1)
  })

  it('チェックされていないときは DoneIcon が表示されない', () => {
    render(<CheckBox isChecked={false} setIsChecked={vi.fn()} />)
    const icon = screen.queryByTestId('done-icon')
    expect(icon).toBeNull()
  })
})