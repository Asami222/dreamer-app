import { render } from "@testing-library/react";
import { screen } from '@testing-library/dom';
//import userEvent from '@testing-library/user-event';
import TextArea from "./index";
import { describe, it, expect } from "vitest";

/**
 * Tailwind + React Compiler 用の動作テスト
 */
describe("TextArea", () => {
  /*
   handleChange 内の currentRows 計算は ブラウザの実際の DOM でしか正しく動作しない。
	 Vitest + jsdom では正確にテストできないため、単体では minRows と maxRows の制御だけテスト。
	 行数の自動増加は E2E テスト（Playwright）で確認する。

  it("入力行数に応じて高さ（rows）が増える", () => {
    const minRows = 3;
    const maxRows = 6;
    render(<TextArea placeholder="コメントを入力" minRows={minRows} maxRows={maxRows} />);
    const textarea = screen.getByPlaceholderText("コメントを入力") as HTMLTextAreaElement;

    // 改行を含む入力をシミュレート
    fireEvent.change(textarea, { target: { value: "1\n2\n3\n4" } });

    // rows が minRows より増加していることを確認
    expect(textarea.rows).toBeGreaterThan(minRows);
    // 最大を超えないことも確認
    expect(textarea.rows).toBeLessThanOrEqual(maxRows);
  });
*/
  it("エラーフラグがtrueのとき、ボーダーがdanger色になる", () => {
    render(<TextArea placeholder="エラー" hasError hasBorder />);
    const textarea = screen.getByPlaceholderText("エラー");

    // Tailwindクラスが反映されていることを確認
    expect(textarea.className).toContain("border-(--danger)");
  });
});