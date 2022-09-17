////////////////////////////////////////////////////////////////
///
/// System: SUPREME Client
/// Function: Kブロック-Lブロックモデル
/// Description: Kブロック-Lブロックのモデル
///
////////////////////////////////////////////////////////////////

import KDashBlockModel from './KDashBlockModel'
import ModelBase from './ModelBase'

/// <summary>
/// Kブロック-Lブロック Model
/// </summary>
export default class KDashBlockLBlockModel extends ModelBase {
  /// <summary>
  /// KブロックID
  /// </summary>
  KDashBlockId!: number

  /**LブロックID */
  LBlockId!: number

  /// <summary>
  /// Kブロック情報への参照
  /// </summary>
  public getKDashBlock(kDashBlockList: KDashBlockModel[]): KDashBlockModel | null {
    const kDashBlock = kDashBlockList.find((o) => o.Key === this.KDashBlockId)
    return kDashBlock !== undefined ? kDashBlock : null
  }
}
