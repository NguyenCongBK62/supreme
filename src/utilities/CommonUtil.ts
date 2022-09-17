import { BaseConst, ExtGasKojiInfoConst, GlobalConst, ShutoffState, SupColors } from '../constants/GlobalConst'

////////////////////////////////////////////////////////////////
///
/// System: SUPREME Client
/// Function: 共通クラス
/// Description: アプリケーション全体で使用する共通処理を定義する
///
////////////////////////////////////////////////////////////////

/// <summary>
/// 共通クラス
/// </summary>
class CommonUtil {
  ToLongTimeString(date: Date): string {
    return date.toUTCString()
  }

  /// <summary>
  /// Enum要素を配列で返す
  /// </summary>
  /// <typeparam name="T">型</typeparam>
  /// <returns>Enum要素の配列</returns>
  // public static GetEnumValues<T>(type): T[] {
  //   const enumType = type
  //   IEnumerable<FieldInfo> fields = enumType.GetFields().Where(field => field.IsLiteral);
  //   return fields.Select(field => field.GetValue(enumType)).Select(value => (T)value).ToArray();
  // }

  Format(stringInput: string, ...args: any[]) {
    const regex = /{([0-9]+)}/g
    const found = stringInput.match(regex)
    if (found) {
      let i = 0
      for (const item of found) {
        stringInput = stringInput.replace(item, args[i].toString())
        i++
      }
    }
    return stringInput
  }

  /// <summary>
  /// 復旧状況
  /// 1: 復旧中、2:工事完了、3:復旧完了
  /// </summary>
  /// <param name="infos"></param>
  /// <returns></returns>
  // restorationWorkStatus(
  //   infos: TmpExtGaskojiKaisenInfosModel,
  //   isGsInfoExsist: boolean,
  //   isKaisenInfoExsist: boolean
  // ) {
  //   const result = ExtGasKojiInfoConst.restorationWorkStatus.Ignore

  //   // 開栓情報あり
  //   if (isKaisenInfoExsist) {
  //     if (infos.meterCnt != null) {
  //       // メータ数(母数)が0件 : 復旧中
  //       if (infos.meterCnt == 0) return ExtGasKojiInfoConst.restorationWorkStatus.RestorationDone

  //       // 開栓率100%：復旧完了
  //       if (infos.openMeterCnt != null && infos.meterCnt == infos.openMeterCnt)
  //         return ExtGasKojiInfoConst.restorationWorkStatus.RestorationCompleted

  //       // 開栓率≠100% 且つ復旧工事情報なし : 復旧中
  //       if (!isGsInfoExsist) return ExtGasKojiInfoConst.restorationWorkStatus.RestorationDone
  //     }
  //   }

  //   // 復旧工事情報あり
  //   if (isGsInfoExsist) {
  //     // 工事完了時間とガスIN完了時間の両方が入った状態：工事完了
  //     if (infos.GasWorkEndedAt != null && infos.GasInEndedAt != null)
  //       return ExtGasKojiInfoConst.restorationWorkStatus.GasWorkCompleted
  //     // 工事着手時間または、ガスIN開始時間が入った状態：復旧中
  //     else if (infos.GasWorkStartedAt != null || infos.GasInStartedAt != null)
  //       return ExtGasKojiInfoConst.restorationWorkStatus.RestorationDone
  //   }
  //   return result
  // }

  /// <summary>
  /// 復旧状況に対応する色を返す
  /// </summary>
  /// <param name="status">復旧状況</param>
  /// <returns>復旧状況の色</returns>
  public static GetRestorationWorkStatusColor(status: number) {
    let color = ''
    switch (status) {
      case ExtGasKojiInfoConst.restorationWorkStatus.RestorationDone:
        color = SupColors.Khaki
        break
      case ExtGasKojiInfoConst.restorationWorkStatus.GasWorkCompleted:
        color = SupColors.YellowGreen
        break
      case ExtGasKojiInfoConst.restorationWorkStatus.RestorationCompleted:
        color = SupColors.PaleTurquoise
        break
    }
    return color
  }

  argbToHex(a: number, r: number, g: number, b: number) {
    return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`.toUpperCase()
  }

  // /// <summary>
  //       /// 分離ストレージ空き容量の閾値(バイト数)
  //       /// 空き容量がこの値未満となった場合には、分離ストレージ上のファイルを削除する
  //       /// 分離ストレージ領域に使えるのが1Mバイトで、80%程度使っていれば、削除処理を行う
  //       /// </summary>
  //       private const long THRESHOLD_REMOVE_FILE = (long)(1024 * 1024 * 0.2);

  //       /// <summary>
  //       /// イメージリソースのキャッシュ用
  //       /// </summary>
  //       private static Dictionary<string, BitmapImage> loadedBitmap = new Dictionary<string, BitmapImage>();

  //       /// <summary>
  //       /// イメージリソースを読み込んでImageオブジェクトを作成して返す
  //       /// </summary>
  //       /// <param name="relativeUri">イメージリソースのURI</param>
  //       /// <returns>Imageオブジェクト</returns>
  //       public static Image LoadImage(string relativeUri)
  //       {
  //           Image img = new Image();

  //           if (loadedBitmap.ContainsKey(relativeUri))
  //           {
  //               img.Source = loadedBitmap[relativeUri];
  //           }
  //           else
  //           {
  //               StreamResourceInfo sri = Application.GetResourceStream(new Uri("/Supreme;component/" + relativeUri, UriKind.Relative));

  //               BitmapImage bi = new BitmapImage();
  //               bi.SetSource(sri.Stream);
  //               img.Source = bi;
  //               loadedBitmap.Add(relativeUri, bi);
  //           }

  //           return img;
  //       }

  //       /// <summary>
  //       /// メディアリソースのキャッシュ用
  //       /// </summary>
  //       private static Dictionary<string, StreamResourceInfo> loadedMedia = new Dictionary<string, StreamResourceInfo>();

  //       /// <summary>
  //       /// メディアリソースを読み込んでImageオブジェクトを作成して返す
  //       /// </summary>
  //       /// <param name="relativeUri">イメージリソースのURI</param>
  //       /// <returns>Imageオブジェクト</returns>
  //       public static MediaElement LoadMedia(string relativeUri)
  //       {
  //           MediaElement media = new MediaElement();

  //           StreamResourceInfo sri = Application.GetResourceStream(new Uri("/Supreme;component/" + relativeUri, UriKind.Relative));
  //           media.SetSource(sri.Stream);

  //           return media;
  //       }

  //       /// <summary>
  //       /// サウンドファイルキーを返す
  //       /// </summary>
  //       /// <param name="type">サウンド種別</param>
  //       /// <returns>サウンドファイルキー</returns>
  //       public static string GetSounfFileKey(SoundType type)
  //       {
  //           string fileKey = "";
  //           switch (type)
  //           {
  //               case SoundType.EqInfo:
  //                   fileKey = "EqInfo";
  //                   break;
  //               case SoundType.EqStart:
  //                   fileKey = "EqStart";
  //                   break;
  //               case SoundType.ZoomIn:
  //                   fileKey = "ZoomIn";
  //                   break;
  //               case SoundType.Tsunami:
  //                   fileKey = "Tsunami";
  //                   break;
  //           }

  //           return fileKey;
  //       }

  //       /// <summary>
  //       /// グリッドへのコントロールセット
  //       /// </summary>
  //       /// <param name="grid">グリッド</param>
  //       /// <param name="element">UIオブジェクト</param>
  //       /// <param name="row">行</param>
  //       /// <param name="column">列</param>
  //       public static void SetGrid(Grid grid, UIElement element, int row, int column)
  //       {
  //           element.SetValue(Grid.RowProperty, row);
  //           element.SetValue(Grid.ColumnProperty, column);
  //           grid.Children.Add(element);
  //       }

  //       /// <summary>
  //       /// 数値かどうかチェックする
  //       /// </summary>
  //       public static bool IsNumeric(string stTarget)
  //       {
  //           double dNullable;

  //           return double.TryParse(
  //               stTarget,
  //               System.Globalization.NumberStyles.Any,
  //               null,
  //               out dNullable
  //           );
  //       }

  //       /// <summary>
  //       /// 整数値かどうかチェックする
  //       /// </summary>
  //       public static bool IsNumericInt(string stTarget)
  //       {
  //           int iNullable;

  //           return int.TryParse(
  //               stTarget,
  //               System.Globalization.NumberStyles.Integer,
  //               null,
  //               out iNullable
  //           );
  //       }

  //       /// <summary>
  //       /// 分離ストレージ上のファイルに書き込む
  //       /// </summary>
  //       /// <param name="fileName">ファイル名</param>
  //       /// <param name="content">書き込む内容</param>
  //       /// <param name="mode">FileMode</param>
  //       public static void WriteToIsolatedStorage(string fileName, string content, FileMode mode)
  //       {
  //           using (IsolatedStorageFile isf = IsolatedStorageFile.GetUserStoreForSite())
  //           {
  //               /// 古いファイルを削除する
  //               try
  //               {
  //                   foreach (string file in isf.GetFileNames("*"))
  //                   {
  //                       if (file.IndexOf(".log") != -1) continue;
  //                       Regex r = new Regex(@"[0-9]{17}", RegexOptions.IgnoreCase);
  //                       Match m = r.Match(file);
  //                       if (m.Success)
  //                       {
  //                           DateTime dt = DateTime.ParseExact(m.Value, "yyyyMMddHHmmssfff", null);
  //                           if (dt != null)
  //                           {
  //                               if ((DateTime.Now - dt).TotalMinutes > 60) isf.DeleteFile(file); /// 1時間以上経過していれば削除する
  //                           }
  //                       }
  //                   }
  //               }
  //               catch
  //               {
  //               }

  //               /// 指定された情報を書き込む
  //               try
  //               {
  //                   using (StreamWriter writer = new StreamWriter(isf.OpenFile(fileName, mode, FileAccess.Write)))
  //                   {
  //                       writer.Write(content);
  //                       writer.Close();
  //                   }
  //               }
  //               catch
  //               {
  //               }
  //           }
  //       }

  //       /// <summary>
  //       /// 分離ストレージの空き容量を調べる
  //       /// </summary>
  //       public static long GetIsolatedStorageAvailableFreeSpace()
  //       {
  //           using (IsolatedStorageFile isf = IsolatedStorageFile.GetUserStoreForSite())
  //           {
  //               return isf.AvailableFreeSpace;
  //           }
  //       }

  //       /// <summary>
  //       /// 分離ストレージのファイルを全て削除する
  //       /// </summary>
  //       public static void RemoveIsolatedStorageFile()
  //       {
  //           try
  //           {
  //               /// 印刷が終了している印刷関連のファイルを削除する(csv/que/ctl)
  //               using (IsolatedStorageFile isf = IsolatedStorageFile.GetUserStoreForSite())
  //               {
  //                   foreach (string fileName in isf.GetFileNames("*.end"))
  //                   {
  //                       isf.DeleteFile(fileName);
  //                   }
  //               }

  //               // 空き容量が規定量を超えれば終了する
  //               if (GetIsolatedStorageAvailableFreeSpace() >= THRESHOLD_REMOVE_FILE) return;

  //               /// 全てのファイルを削除する
  //               using (IsolatedStorageFile isf = IsolatedStorageFile.GetUserStoreForSite())
  //               {
  //                   foreach (string fileName in isf.GetFileNames("*"))
  //                   {
  //                       isf.DeleteFile(fileName);
  //                   }
  //               }

  //               // 空き容量が規定量を超えれば終了する
  //               if (GetIsolatedStorageAvailableFreeSpace() >= THRESHOLD_REMOVE_FILE) return;

  //               /// 分離ストレージ領域を全て削除する
  //               using (IsolatedStorageFile isf = IsolatedStorageFile.GetUserStoreForSite())
  //               {
  //                   foreach (string fileName in isf.GetFileNames("*.end"))
  //                   {
  //                       isf.DeleteFile(fileName);
  //                   }
  //               }
  //           }
  //           catch
  //           {
  //               try
  //               {
  //                   /// 分離ストレージ領域を全て削除する
  //                   using (IsolatedStorageFile isf = IsolatedStorageFile.GetUserStoreForSite())
  //                   {
  //                       foreach (string fileName in isf.GetFileNames("*.end"))
  //                       {
  //                           isf.DeleteFile(fileName);
  //                       }
  //                   }
  //               }
  //               catch
  //               {
  //               }
  //           }
  //       }

  //       /// <summary>
  //       /// 印刷依頼ファイルを作成する
  //       /// </summary>
  //       /// <param name="printId">帳票ID</param>
  //       /// <param name="csv">印刷データCSV</param>
  //       /// <param name="ctl">コントロールファイル内容</param>
  //       public static void WriteToPrintQue(string printId, string csv, string ctl)
  //       {
  //           // 空き容量が少ない場合は全て削除する
  //           if (GetIsolatedStorageAvailableFreeSpace() < THRESHOLD_REMOVE_FILE) RemoveIsolatedStorageFile();

  //           // ファイル名日本語置き換え
  //           System.Resources.ResourceManager resource = Properties.PrintIdResource.ResourceManager;
  //           var excelFileName = resource.GetString(printId);
  //           string fileName = string.Format("print_queue_{0}_{2}_{1:yyyyMMddHHmmssfff}", new object[] { printId, DateTime.Now, excelFileName });

  //           // 印刷データファイルを書き出す
  //           if (csv != null) WriteToIsolatedStorage(fileName + ".csv", csv, FileMode.Create);

  //           // コントロールファイルを書き出す
  //           if (ctl != null) WriteToIsolatedStorage(fileName + ".ctl", ctl, FileMode.Create);

  //           // 印刷キューファイルを書き出す
  //           WriteToIsolatedStorage(fileName + ".que", "que", FileMode.Create);
  //       }

  //       /// <summary>
  //       /// WIBU-KEY認証依頼ファイルを作成する
  //       /// </summary>
  //       /// <returns>依頼ファイル名(拡張子除く)</returns>
  //       public static string WriteToWibuKeyQue()
  //       {
  //           // 空き容量が少ない場合は全て削除する
  //           if (GetIsolatedStorageAvailableFreeSpace() < THRESHOLD_REMOVE_FILE) RemoveIsolatedStorageFile();

  //           string fileName = string.Format("wibukey_{0:yyyyMMddHHmmssfff}", DateTime.Now);

  //           // WIBU-KEYキューファイルを書き出す
  //           WriteToIsolatedStorage(fileName + ".que", "que", FileMode.Create);

  //           return fileName;
  //       }

  //       /// <summary>
  //       /// WIBU-KEY認証ファイルの存在をチェックして、結果を返す
  //       /// </summary>
  //       /// <returns>true: 認証OK false:認証NG null:認証待ち</returns>
  //       public static bool? IsAuthenticatedWibuKey(string fileName)
  //       {
  //           using (IsolatedStorageFile isf = IsolatedStorageFile.GetUserStoreForSite())
  //           {
  //               if (isf.FileExists(fileName + ".ok"))
  //                   return true;
  //               else if (isf.FileExists(fileName + ".ng"))
  //                   return false;
  //               else
  //                   return null;
  //           }
  //       }

  //       /// <summary>
  //       /// 日付を文字列にする
  //       /// </summary>
  //       /// <param name="dt">日付</param>
  //       /// <returns>表示文字列</returns>
  //       public static string ToDateString(DateTime? dt)
  //       {
  //           return dt != null ? dt.Value.ToString("yyyy/MM/dd") : "";
  //       }

  //       /// <summary>
  //       /// 日付を文字列にする
  //       /// </summary>
  //       /// <param name="dt">日付</param>
  //       /// <returns>表示文字列</returns>
  //       public static string ToShortTimeString(DateTime? dt)
  //       {
  //           return dt != null ? dt.Value.ToString("yyyy/MM/dd HH:mm") : "－";
  //       }

  //       /// <summary>
  //       /// 日付を文字列にする
  //       /// </summary>
  //       /// <param name="dt">日付</param>
  //       /// <returns>表示文字列</returns>
  //       public static string ToLongTimeString(DateTime? dt)
  //       {
  //           return dt != null ? dt.Value.ToString("yyyy/MM/dd HH:mm:ss") : "－";
  //       }

  //       /// <summary>
  //       /// 日付を文字列にする
  //       /// </summary>
  //       /// <param name="dt">日付</param>
  //       /// <returns>表示文字列</returns>
  //       public static string ToLongTimeStringOrBlank(DateTime? dt)
  //       {
  //           return dt != null ? dt.Value.ToString("yyyy/MM/dd HH:mm:ss") : "";
  //       }

  //       /// <summary>
  //       /// 日付を日本語文字列にする
  //       /// </summary>
  //       /// <param name="dt">日付</param>
  //       /// <param name="type">変換タイプ</param>
  //       /// <returns>表示文字列</returns>
  //       public static string ToTimeStringJp(DateTime? dt, string types)
  //       {
  //           string result = "";
  //           if (dt != null)
  //           {
  //               foreach (string type in types.Split(','))
  //               {
  //                   switch (type)
  //                   {
  //                       case "yyyy":
  //                           result += dt.Value.ToString("yyyy") + "年";
  //                           break;
  //                       case "MM":
  //                           result += dt.Value.ToString("MM") + "月";
  //                           break;
  //                       case "dd":
  //                           result += dt.Value.ToString("dd") + "日";
  //                           break;
  //                       case "HH":
  //                           result += dt.Value.ToString("HH") + "時";
  //                           break;
  //                       case "mm":
  //                           result += dt.Value.ToString("mm") + "分";
  //                           break;
  //                       case "ss":
  //                           result += dt.Value.ToString("ss") + "秒";
  //                           break;
  //                       default:
  //                           break;
  //                   }
  //               }
  //           }
  //           return result;
  //       }

  //       /// <summary>
  //       /// 文字列が日付かどうかチェックする
  //       /// </summary>
  //       /// <param name="s">文字列</param>
  //       /// <returns>日付かどうか</returns>
  //       public static bool IsDate(string s)
  //       {
  //           string[] format = { "yyyy", "yyyy/%M", "yyyy/%M/%d" };
  //           DateTime date;
  //           return DateTime.TryParseExact(s, format, DateTimeFormatInfo.CurrentInfo, DateTimeStyles.None, out date);
  //       }

  //       /// <summary>
  //       /// 文字列が日時かどうかチェックする
  //       /// </summary>
  //       /// <param name="s">文字列</param>
  //       /// <returns>日時かどうか</returns>
  //       public static bool IsDateTime(string s)
  //       {
  //           string[] format = { "yyyy", "yyyy/%M", "yyyy/%M/%d", "yyyy/%M/%d %H", "yyyy/%M/%d %H:%m", "yyyy/%M/%d %H:%m:%s",
  //                                 "yyyy-%M", "yyyy-%M-%d", "yyyy-%M-%d %H", "yyyy-%M-%d %H:%m", "yyyy-%M-%d %H:%m:%s"};
  //           DateTime date;
  //           return DateTime.TryParseExact(s, format, DateTimeFormatInfo.CurrentInfo, DateTimeStyles.None, out date);
  //       }

  //       /// <summary>
  //       /// 文字列が引数の日付(または日時)フォーマットに変更できるかどうかチェックする
  //       /// </summary>
  //       /// <param name="s">文字列</param>
  //       /// <param name="format">指定フォーマット</param>
  //       /// <returns>指定フォーマットに変更できるかどうか</returns>
  //       public static bool IsDateTime(string s, string[] format)
  //       {
  //           DateTime date;
  //           return DateTime.TryParseExact(s, format, DateTimeFormatInfo.CurrentInfo, DateTimeStyles.None, out date);
  //       }

  //       /// <summary>
  //       /// 文字列を日付に変更する
  //       /// </summary>
  //       /// <param name="s">文字列</param>
  //       /// <returns>日付</returns>
  //       public static DateTime ParseDate(string s)
  //       {
  //           string[] format = { "yyyy", "yyyy/%M", "yyyy/%M/%d" };
  //           DateTime date;
  //           DateTime.TryParseExact(s, format, DateTimeFormatInfo.CurrentInfo, DateTimeStyles.None, out date);
  //           return date;
  //       }

  //       /// <summary>
  //       /// 文字列を日時に変更する
  //       /// </summary>
  //       /// <param name="s">文字列</param>
  //       /// <returns>日時</returns>
  //       public static DateTime ParseDateTime(string s)
  //       {
  //           string[] format = { "yyyy", "yyyy/%M", "yyyy/%M/%d", "yyyy/%M/%d %H", "yyyy/%M/%d %H:%m", "yyyy/%M/%d %H:%m:%s" };
  //           return ParseDateTime(s, format);
  //       }

  //       /// <summary>
  //       /// 文字列を日時に変更する
  //       /// </summary>
  //       /// <param name="s">文字列</param>
  //       /// <param name="format">指定フォーマット</param>
  //       /// <returns>日時</returns>
  //       public static DateTime ParseDateTime(string s, string[] format)
  //       {
  //           DateTime date;
  //           DateTime.TryParseExact(s, format, DateTimeFormatInfo.CurrentInfo, DateTimeStyles.None, out date);
  //           return date;
  //       }

  //       /// <summary>
  //       /// 文字列を日付文字列(yyyy/MM/dd HH:mm:ss)に変更する
  //       /// ただし、途中で空文字があった場合はそこまでの日付文字列とする
  //       /// </summary>
  //       /// <param name="yyyy">年</param>
  //       /// <param name="MM">月</param>
  //       /// <param name="dd">日</param>
  //       /// <param name="HH">時</param>
  //       /// <param name="mm">分</param>
  //       /// <param name="ss">秒</param>
  //       /// <returns>変更後の文字列</returns>
  //       public static String ParseDateTimeStr(string yyyy, string MM, string dd, string HH, string mm, string ss)
  //       {
  //           string result = "";

  //           string[] format = { "yyyy", "yyyy/%M", "yyyy/%M/%d", "yyyy/%M/%d %H", "yyyy/%M/%d %H:%m", "yyyy/%M/%d %H:%m:%s" };
  //           string[] format2 = { "{0}", "{0}/{1}", "{0}/{1}/{2}", "{0}/{1}/{2} {3}", "{0}/{1}/{2} {3}:{4}", "{0}/{1}/{2} {3}:{4}:{5}" };

  //           string[] datetimeParts = new string[] { yyyy, MM, dd, HH, mm, ss };
  //           string targetDateTimeStr = "";
  //           string targetFormat = "";
  //           List<string> targetDateTimeParts = new List<string>();
  //           int count = -1;
  //           for (int i = 0; i < datetimeParts.Count(); i++)
  //           {
  //               if (datetimeParts[i] == "") break;
  //               targetDateTimeParts.Add(datetimeParts[i]);
  //               count++;
  //           }
  //           // 途中で抜けていない場合の処理
  //           if (count != -1)
  //           {
  //               targetDateTimeStr = string.Format(format2[count], targetDateTimeParts.ToArray());
  //               targetFormat = format[count];
  //           }

  //           if (IsDateTime(targetDateTimeStr, new string[] { targetFormat }))
  //               result = targetDateTimeStr;

  //           return result;
  //       }

  //       /// <summary>
  //       /// 整数をboolに変換する
  //       /// (空文字列はfalseに変換される)
  //       /// </summary>
  //       /// <param name="s">文字列</param>
  //       /// <returns>文字列の表すDateTimeオブジェクト</returns>
  //       public static bool ParseBool(int i)
  //       {
  //           return ParseBool(i.ToString());
  //       }

  //       /// <summary>
  //       /// 文字列をboolに変換する
  //       /// (空文字列はfalseに変換される)
  //       /// </summary>
  //       /// <param name="s">文字列</param>
  //       /// <returns>文字列の表すDateTimeオブジェクト</returns>
  //       public static bool ParseBool(string s)
  //       {
  //           if ((s == "") || (s == "0") || (s == bool.FalseString))
  //               return false;
  //           else
  //               return true;
  //       }

  /// <summary>
  /// BOOL型の値を数値に変換
  /// </summary>
  /// <param name="b"></param>
  /// <returns></returns>
  public BoolToInteger(b: boolean): number {
    return b === true ? 1 : 0
  }

  //       /// <summary>
  //       /// bool?型の値を数値に変換(null = -1)
  //       /// </summary>
  //       /// <param name="b"></param>
  //       /// <returns></returns>
  //       public static int NullBoolToInteger(bool? b) { return b == null ? -1 : b == true ? 1 : 0; }

  //       /// <summary>
  //       /// int?型の値を有効な範囲の数値に変換(null = -1)
  //       /// </summary>
  //       /// <param name="b"></param>
  //       /// <returns></returns>
  //       public static int NullIntegerToInteger(int? i) { return (int)(i == null ? -1 : i); }

  //       /// <summary>
  //       /// 文字列を分割する
  //       /// </summary>
  //       /// <param name="s"></param>
  //       /// <param name="c"></param>
  //       /// <param name="len"></param>
  //       /// <returns></returns>
  //       public static string[] SplitString(string s, char c, int len)
  //       {
  //           List<string> list = new List<string>();
  //           string s2 = "";
  //           foreach (string s3 in s.Split(c))
  //           {
  //               s2 += (s2 != "" ? "," : "") + s3;
  //               if (s2.Length >= len)
  //               {
  //                   list.Add(s2);
  //                   s2 = "";
  //               }
  //           }
  //           if (s2 != "" || list.Count == 0) list.Add(s2);
  //           string[] ret = new string[list.Count];
  //           for (int i = 0; i < list.Count; i++)
  //               ret[i] = list[i];
  //           return ret;
  //       }

  //       /// <summary>
  //       /// 文字列からカンマと単位を削除する
  //       /// </summary>
  //       /// <param name="str">文字列</param>
  //       /// <param name="unit">単位</param>
  //       /// <returns></returns>
  //       public static String RemoveCommaAndUnit(string str, bool removeCamma, string unit)
  //       {
  //           if (removeCamma) { str = RemoveComma(str); }
  //           if (unit != "") { str = str.Replace(unit, ""); }
  //           return str;
  //       }

  //       /// <summary>
  //       /// 文字列からカンマを削除する
  //       /// </summary>
  //       /// <param name="str">文字列</param>
  //       /// <returns></returns>
  //       public static String RemoveComma(string str)
  //       {
  //           str = str.Replace(",", "");
  //           return str;
  //       }

  //       /// <summary>
  //       /// 対象文字列にあるカンマを印刷用エスケープ文字に置き換える
  //       /// </summary>
  //       /// <param name="str">対象文字列</param>
  //       /// <returns>対象文字列にあるカンマをエスケープ文字に置換した文字列</returns>
  //       public static String EscapeCommaForPrint(string str)
  //       {
  //           return EscapeStrForPrint(str, ",");
  //       }

  //       /// <summary>
  //       /// 対象文字列にある指定文字列を印刷用エスケープ文字に置き換える
  //       /// </summary>
  //       /// <param name="str">対象文字列</param>
  //       /// <param name="value">指定文字列</param>
  //       /// <returns>対象文字列にある指定文字列をエスケープ文字に置換した文字列</returns>
  //       public static String EscapeStrForPrint(string str, string value)
  //       {
  //           return str.Replace(value, PrintConst.ESCAPE_STR);
  //       }

  // /// <summary>
  // /// 指定した精度の数値に四捨五入する
  // /// </summary>
  // /// <param name="value">値</param>
  // /// <returns>四捨五入した後の値</returns>
  // public static double ToRoundUp(double value)
  // {
  //     return ToRoundUp(value, 0);
  // }

  /// <summary>
  /// 指定した精度の数値に四捨五入する
  /// </summary>
  /// <param name="value">値</param>
  /// <param name="digit">有効桁数</param>
  /// <returns>四捨五入した後の値</returns>
  public ToRoundUp(value: number, digit = 0): number {
    // const add = 0.5 * Math.pow(10, digit * -1)
    return this.ToRoundDown(value + 0.5 * Math.pow(10, digit * -1) * (value > 0 ? 1 : -1), digit)
  }

  //       /// <summary>
  //       /// 指定した精度の数値に切り捨てる
  //       /// </summary>
  //       /// <param name="value">値</param>
  //       /// <returns>切り捨て後の値</returns>
  //       public static double ToRoundDown(double value)
  //       {
  //           return ToRoundDown(value, 0);
  //       }

  /// <summary>
  /// 指定した精度の数値に切り捨てる
  /// </summary>
  /// <param name="value">値</param>
  /// <param name="digit">有効桁数</param>
  /// <returns>切り捨て後の値</returns>
  public ToRoundDown(value: number, digit = 0): number {
    const coef = Math.pow(10, digit)
    return value > 0 ? Math.floor(value * coef) / coef : Math.ceil(value * coef) / coef
  }

  //       /// <summary>
  //       /// 指定した名前のオブジェクトを返す。
  //       /// 表示されていないタブアイテム内の検索の場合、FindNameでは取得できないのでこちらを使う。
  //       /// </summary>
  //       /// <typeparam name="T">型</typeparam>
  //       /// <param name="o">検索対象オブジェクト</param>
  //       /// <param name="name">検索対象の名前</param>
  //       /// <returns>検索結果オブジェクト</returns>
  //       public static object MyFindName<T>(DependencyObject o, string name)
  //           where T : DependencyObject
  //       {
  //           int childrenCount = VisualTreeHelper.GetChildrenCount(o);
  //           for (int i = 0; i < childrenCount; i++)
  //           {
  //               var child = VisualTreeHelper.GetChild(o, i);
  //               if (child is T && child.GetValue(FrameworkElement.NameProperty).ToString() == name) return child;

  //               var grandChild = MyFindName<T>(child, name);
  //               if (grandChild != null) return grandChild;
  //           }
  //           return null;
  //       }

  //       /// <summary>
  //       /// 指定した名前のオブジェクトを返す。
  //       /// 表示されていないタブアイテム内の検索の場合、FindNameでは取得できないのでこちらを使う。
  //       /// </summary>
  //       /// <typeparam name="T">型</typeparam>
  //       /// <param name="ti">検索対象タブアイテム</param>
  //       /// <param name="name">検索対象の名前</param>
  //       /// <returns>検索結果オブジェクト</returns>
  //       public static object MyFindName<T>(TabItem ti, string name)
  //           where T : DependencyObject
  //       {
  //           return MyFindName<T>((DependencyObject)ti.Content, name);
  //       }

  //       // <summary>
  //       /// Enum要素数を返す
  //       /// </summary>
  //       /// <typeparam name="T">型</typeparam>
  //       /// <returns>Enum要素数</returns>
  //       public static int GetEnumLength<T>()
  //       {
  //           return GetEnumValues<T>().Count();
  //       }

  //       /// <summary>
  //       /// Enum要素を配列で返す
  //       /// </summary>
  //       /// <typeparam name="T">型</typeparam>
  //       /// <returns>Enum要素の配列</returns>
  //       public static T[] GetEnumValues<T>()
  //       {
  //           Type enumType = typeof(T);
  //           IEnumerable<FieldInfo> fields = enumType.GetFields().Where(field => field.IsLiteral);
  //           return fields.Select(field => field.GetValue(enumType)).Select(value => (T)value).ToArray();
  //       }

  //       /*************** 以下、業務処理につき、別クラスに移すことを検討  ****************/

  //       // 画面表示用メッセージ
  //       public static class Message
  //       {
  //           public const string SHOW_LIMIT_CONFIRM = "表示対象の件数が{0}件を超えています({1}件)\n条件を追加して件数を減らしてください\n動作が遅くなりますが、表示を行いますか？";
  //       }

  //       /// <summary>
  //       /// 通常表示件数を超えた場合の確認メッセージを返す
  //       /// </summary>
  //       /// <param name="num_str"></param>
  //       /// <returns></returns>
  //       public static string GetShowLimitConfirmMessage(int limit, int num)
  //       {
  //           return string.Format(Message.SHOW_LIMIT_CONFIRM, limit.ToString(), num.ToString());
  //       }

  /// <summary>
  /// データがないことを表す文字
  /// </summary>
  private NO_DATA = '－'

  /// <summary>
  /// データが不明であることを表す文字
  /// </summary>
  private UNKNOWN_DATA = '？'

  /// <summary>
  /// データがないことを表す文字を取得する
  /// </summary>
  /// <returns></returns>
  public GetNoData(): string {
    return this.NO_DATA
  }

  //       /// <summary>
  //       /// データが不明であることを表す文字を取得する
  //       /// </summary>
  //       /// <returns></returns>
  //       public static string GetUnknownData() { return UNKNOWN_DATA; }

  //       /// <summary>
  //       /// エリア名を変換して取得する
  //       /// </summary>
  //       public static string ConvertAreaName(int kNo, string area)
  //       {
  //           if (kNo == (int)KblockConst.CHIBA)
  //           {
  //               return "東部(千葉)";
  //           }
  //           else if (kNo == (int)KblockConst.JOSO)
  //           {
  //               return "東部(常総)";
  //           }
  //           else if (kNo == (int)KblockConst.HontenBranchKblockNo.Kumagaya)
  //           {
  //               return "北部(熊谷)";
  //           }
  //           else if (kNo == (int)KblockConst.HontenBranchKblockNo.Tsukuba)
  //           {
  //               return "東部(つくば)";
  //           }
  //           else if (kNo == (int)KblockConst.HontenBranchKblockNo.Sakura)
  //           {
  //               return "東部(佐倉)";
  //           }
  //           else
  //           {
  //               return area;
  //           }
  //       }

  //       /// <summary>
  //       /// エリア毎班数: 中央
  //       /// </summary>
  //       private const int AREA_GROUP_COUNT_CHUO = 111;
  //       /// <summary>
  //       /// エリア毎班数: 東部
  //       /// </summary>
  //       private const int AREA_GROUP_COUNT_TOBU = 144;
  //       /// <summary>
  //       /// エリア毎班数: 西部
  //       /// </summary>
  //       private const int AREA_GROUP_COUNT_SEIBU = 106;
  //       /// <summary>
  //       /// エリア毎班数: 北部
  //       /// </summary>
  //       private const int AREA_GROUP_COUNT_HOKUBU = 98;
  //       /// <summary>
  //       /// エリア毎班数: 神奈川
  //       /// </summary>
  //       private const int AREA_GROUP_COUNT_KANAGAWA = 94;

  //       /// <summary>
  //       /// 事業部毎の班数を取得する
  //       /// </summary>
  //       /// <param name="baseNo">拠点番号</param>
  //       /// <returns>班数</returns>
  //       public static int GetAreaGroupCount(int baseNo)
  //       {
  //           int groupCnt = 0;

  //           switch (baseNo)
  //           {
  //               case 10:
  //                   groupCnt = AREA_GROUP_COUNT_CHUO;
  //                   break;

  //               case 20:
  //                   groupCnt = AREA_GROUP_COUNT_TOBU;
  //                   break;

  //               case 30:
  //                   groupCnt = AREA_GROUP_COUNT_SEIBU;
  //                   break;

  //               case 40:
  //                   groupCnt = AREA_GROUP_COUNT_HOKUBU;
  //                   break;

  //               case 50:
  //                   groupCnt = AREA_GROUP_COUNT_KANAGAWA;
  //                   break;

  //               case 99:
  //                   groupCnt = AREA_GROUP_COUNT_CHUO
  //                            + AREA_GROUP_COUNT_TOBU
  //                            + AREA_GROUP_COUNT_SEIBU
  //                            + AREA_GROUP_COUNT_HOKUBU
  //                            + AREA_GROUP_COUNT_KANAGAWA;
  //                   break;

  //               default:
  //                   break;
  //           }

  //           return groupCnt;
  //       }

  //       /// <summary>
  //       /// Kブロック地震計かどうかを返す
  //       /// true: Kブロック地震計である
  //       /// false:Kブロック地震計でない
  //       /// </summary>
  //       /// <param name="funcId">機能番号</param>
  //       /// <returns></returns>
  //       public static bool IsKSensor(CsaFunc funcId)
  //       {
  //           if (funcId == CsaFunc.KSensor ||
  //               funcId == CsaFunc.BranchKSensorHitachi ||
  //               funcId == CsaFunc.BranchKSensorGunma ||
  //               funcId == CsaFunc.BranchKSensorKumagaya ||
  //               funcId == CsaFunc.BranchKSensorUtsunomiya)
  //               return true;
  //           else
  //               return false;
  //       }

  //       /// <summary>
  //       /// Kブロック番号が広域支社かどうかを返す
  //       /// true: 広域支社である
  //       /// false:広域支社でない
  //       /// </summary>
  //       /// <param name="k_no">Kブロック番号</param>
  //       /// <returns></returns>
  //       public static bool IsBranch(int k_no)
  //       {
  //           return (
  //               k_no >= KblockConst.BRANCH_LOW_KBLOCK_NO &&
  //               k_no <= KblockConst.BRANCH_HIGHT_KBLOCK_NO &&
  //               !Enum.IsDefined(typeof(KblockConst.HontenBranchKblockNo), k_no)
  //           );
  //       }

  //       /// <summary>
  //       /// TGCS確立済固定Kブロックかどうかを返す
  //       /// true: ブロック化が確立している
  //       /// false:ブロック化が確立していない
  //       /// </summary>
  //       public static bool IsTgcsEstdFixKblockNo(string kDashNo)
  //       {
  //           if (KblockConst.TGCS_ESTD_FIX_KBLOCK_NO.Contains(kDashNo)) return true;
  //           return false;
  //       }

  //       /// <summary>
  //       /// ブロック名称から、Kブロック番号を返す
  //       /// ない場合は-1を返す
  //       /// </summary>
  //       /// <param name="blockName">ブロック名称</param>
  //       /// <returns>Kブロック番号</returns>
  //       public static int GetKblockNo(string blockName)
  //       {
  //           int k_no = -1;

  //           Regex regex = new Regex(@"^K[1-9][0-9]*");
  //           Match match = regex.Match(blockName);
  //           if (match.Value != "")
  //               k_no = int.Parse(match.Value.ToString().Split('K')[1]);

  //           return k_no;
  //       }

  //       /// <summary>
  //       /// ブロック名称から、K'ブロック番号を返す
  //       /// ない場合は-1を返す
  //       /// </summary>
  //       /// <param name="blockName">ブロック名称</param>
  //       /// <returns>Kブロック番号</returns>
  //       public static int GetKdashblockNo(string blockName)
  //       {
  //           int kdash_no = -1;

  //           int k_no = GetKblockNo(blockName);
  //           if (k_no == -1) return kdash_no;

  //           Regex regex = new Regex(@"^K" + k_no.ToString() + "-[1-9][0-9]*");
  //           Match match = regex.Match(blockName);
  //           if (match.Value != "")
  //               kdash_no = int.Parse(match.Value.ToString().Split('-')[1]);

  //           return kdash_no;
  //       }

  //       /// <summary>
  //       /// ブロック名称から、Lブロック番号を返す
  //       /// ない場合は-1を返す
  //       /// </summary>
  //       /// <param name="blockName">ブロック名称</param>
  //       /// <returns>Lブロック番号</returns>
  //       public static int GetLblockNo(string blockName)
  //       {
  //           int l_no = -1;

  //           int k_no = GetKblockNo(blockName);
  //           if (k_no == -1) return l_no;

  //           Regex regex = new Regex(@"^K" + k_no.ToString() + "L[1-9][0-9]*");
  //           Match match = regex.Match(blockName);
  //           if (match.Value != "")
  //               l_no = int.Parse(match.Value.ToString().Split('L')[1]);

  //           return l_no;
  //       }

  //       /// <summary>
  //       /// ブロック名称から、Sブロック番号を返す
  //       /// ない場合は-1を返す
  //       /// </summary>
  //       /// <param name="blockName">ブロック名称</param>
  //       /// <returns>Sブロック番号</returns>
  //       public static int GetSblockNo(string blockName)
  //       {
  //           int s_no = -1;

  //           int k_no = GetKblockNo(blockName);
  //           if (k_no == -1) return s_no;

  //           int l_no = GetLblockNo(blockName);
  //           if (l_no == -1) return s_no;

  //           Regex regex = new Regex(@"^K" + k_no.ToString() + "L" + l_no.ToString() + "-" + "[1-9][0-9]*");
  //           Match match = regex.Match(blockName);
  //           if (match.Value != "")
  //               s_no = int.Parse(match.Value.ToString().Split('-')[1]);

  //           return s_no;
  //       }

  /// <summary>
  /// アナログ瞬時値: -991=未確認
  /// </summary>
  private ANALOG_UNCONFIRMED = -991

  /// <summary>
  /// アナログ瞬時値: -993=通信不能
  /// </summary>
  private ANALOG_COMUNABLE = -993

  /// <summary>
  /// アナログ瞬時値: -994=点検中
  /// </summary>
  private ANALOG_CHECKING = -994

  //       /// <summary>
  //       /// アナログ瞬時値: -998=範囲外
  //       /// </summary>
  //       public const int ANALOG_OUT_OF_RANGE = -998;

  /// <summary>
  /// アナログ瞬時値: -998=センサーなし
  /// </summary>
  private ANALOG_NO_SENSOR = -998

  /// <summary>
  /// アナログ瞬時値: -999=無効
  /// </summary>
  private ANALOG_INVALID = -999

  //       /// <summary>
  //       /// 30Kine超過率の上限
  //       /// </summary>
  //       public const double OVER_30KINE_RATE_LIMIT = 0.5;

  //       /// <summary>
  //       /// 60Kine超過率の上限
  //       /// </summary>
  //       public const double OVER_60KINE_RATE_LIMIT = 0.5;

  //       /// <summary>
  //       /// 70Kine超過率の上限
  //       /// </summary>
  //       public const double OVER_70KINE_RATE_LIMIT = 0.5;

  //       /// <summary>
  //       /// 80Kine超過率の上限
  //       /// </summary>
  //       public const double OVER_80KINE_RATE_LIMIT = 0.5;

  //       /// <summary>
  //       /// 90Kine超過率の上限
  //       /// </summary>
  //       public const double OVER_90KINE_RATE_LIMIT = 0.5;

  //       /// <summary>
  //       /// 超過率の小数点有効桁数
  //       /// </summary>
  //       public const int OVER_RATE_DIGIT = 4;

  /// <summary>
  /// アナログ瞬時値(無効、点検中を含む)を表示文字列に変換する
  /// (SI, GAL)
  /// </summary>
  /// <param name="analog">アナログ値</param>
  /// <returns>表示文字列</returns>
  public AnalogConvert(analog: number | null) {
    if (analog == null || analog === this.ANALOG_UNCONFIRMED)
      // データ無し
      return this.UNKNOWN_DATA
    else if (
      analog === this.ANALOG_INVALID ||
      analog === this.ANALOG_NO_SENSOR ||
      analog === this.ANALOG_CHECKING ||
      analog === this.ANALOG_COMUNABLE
    )
      // 無効 || センサーなし || 点検中 || 通信不能
      return this.NO_DATA
    else return Math.floor(analog).toString()
  }

  //       /// <summary>
  //       /// アナログ値(無効を含む)を表示文字列に変換する
  //       /// (MPA, MPB, LP, Pc)
  //       /// </summary>
  //       /// <param name="analog">アナログ値</param>
  //       /// <returns>表示文字列</returns>
  //       public static string AnalogConvert2(double? analog)
  //       {
  //           return AnalogConvert2(analog, true);
  //       }

  //       /// <summary>
  //       /// アナログ値(無効を含む)を表示文字列に変換する
  //       /// (MPA, MPB, LP, Pc)
  //       /// </summary>
  //       /// <param name="analog">アナログ値</param>
  //       /// <returns>表示文字列</returns>
  //       public static string AnalogConvert2(double? analog, bool useUnknownData)
  //       {
  //           if (analog == null)
  //               // データ無し
  //               return useUnknownData ? UNKNOWN_DATA : "";
  //           else if (analog == ANALOG_INVALID)
  //               // 無効
  //               return NO_DATA;
  //           else
  //               // 小数第4位を四捨五入
  //               return ToRoundUp(analog.Value, 3).ToString();
  //       }

  //       /// <summary>
  //       /// アナログ値(無効、範囲外を含む)を表示文字列に変換する
  //       /// (流量1, 流量2)
  //       /// </summary>
  //       /// <param name="analog">アナログ値</param>
  //       /// <returns>表示文字列</returns>
  //       public static string AnalogConvert3(double? analog)
  //       {
  //           if (analog == null)
  //               // データ無し
  //               return "";
  //           else if ((analog == ANALOG_INVALID) || (analog == ANALOG_OUT_OF_RANGE))
  //               // 無効または範囲外
  //               return NO_DATA;
  //           else
  //               // 小数第2位を四捨五入
  //               return ToRoundUp(analog.Value, 1).ToString();
  //       }

  //       /// <summary>
  //       /// アナログ値(無効を含む)を表示文字列に変換する
  //       /// (MPA, MPB, LP, Pc)
  //       /// </summary>
  //       /// <param name="analog">アナログ値</param>
  //       /// <returns>表示文字列</returns>
  //       public static string AnalogConvert4(double? analog)
  //       {
  //           return AnalogConvert4(analog, true);
  //       }

  //       /// <summary>
  //       /// アナログ値(無効を含む)を表示文字列に変換する
  //       /// (MPA, MPB, LP, Pc)
  //       /// </summary>
  //       /// <param name="analog">アナログ値</param>
  //       /// <returns>表示文字列</returns>
  //       public static string AnalogConvert4(double? analog, bool useUnknownData)
  //       {
  //           if (analog == null)
  //               // データ無し
  //               return useUnknownData ? UNKNOWN_DATA : "";
  //           else if (analog == ANALOG_INVALID)
  //               // 無効
  //               return NO_DATA;
  //           else
  //               // 小数第3位を四捨五入
  //               return ToRoundUp(analog.Value, 2).ToString("0.00");
  //       }

  //       /// <summary>
  //       /// SI値から計測震度種別を求めて返す
  //       /// </summary>
  //       /// <param name="si">SI値</param>
  //       /// <returns>計測震度種別</returns>
  //       public static IntensityConst.Type GetIntensityType(double? si)
  //       {
  //           double[] SiBase = IntensityConst.SiBase;

  //           if (si == null || si == ANALOG_UNCONFIRMED || si == ANALOG_INVALID || si == ANALOG_NO_SENSOR || si == ANALOG_CHECKING || si == ANALOG_COMUNABLE)
  //               return IntensityConst.Type.Invalid;
  //           else if (si < SiBase[0])
  //               return IntensityConst.Type.LessThanIntensity3;
  //           else if (SiBase[0] <= si && si < SiBase[1])
  //               return IntensityConst.Type.Intensity3;
  //           else if (SiBase[1] <= si && si < SiBase[2])
  //               return IntensityConst.Type.Intensity4;
  //           else if (SiBase[2] <= si && si < SiBase[3])
  //               return IntensityConst.Type.Intensity5Lower;
  //           else if (SiBase[3] <= si && si < SiBase[4])
  //               return IntensityConst.Type.Intensity5Upper;
  //           else if (SiBase[4] <= si && si < SiBase[5])
  //               return IntensityConst.Type.Intensity6Lower;
  //           else if (SiBase[5] <= si && si < SiBase[6])
  //               return IntensityConst.Type.Intensity6Upper;
  //           else
  //               return IntensityConst.Type.Intensity7;
  //       }

  //       /// <summary>
  //       /// 計測震度種別の表示用文字列を返す
  //       /// </summary>
  //       /// <param name="intensityType">計測震度種別</param>
  //       /// <returns>計測震度種別の表示用文字列</returns>
  //       public static string GetLabelIntensityType(IntensityConst.Type intensityType)
  //       {
  //           string labelntensityType = "";
  //           switch (intensityType)
  //           {
  //               case IntensityConst.Type.Invalid:
  //                   labelntensityType = GetNoData();
  //                   break;
  //               case IntensityConst.Type.LessThanIntensity3:
  //                   labelntensityType = "";
  //                   break;
  //               case IntensityConst.Type.Intensity3:
  //                   labelntensityType = "3";
  //                   break;
  //               case IntensityConst.Type.Intensity4:
  //                   labelntensityType = "4";
  //                   break;
  //               case IntensityConst.Type.Intensity5Lower:
  //                   labelntensityType = "5弱";
  //                   break;
  //               case IntensityConst.Type.Intensity5Upper:
  //                   labelntensityType = "5強";
  //                   break;
  //               case IntensityConst.Type.Intensity6Lower:
  //                   labelntensityType = "6弱";
  //                   break;
  //               case IntensityConst.Type.Intensity6Upper:
  //                   labelntensityType = "6強";
  //                   break;
  //               case IntensityConst.Type.Intensity7:
  //                   labelntensityType = "7";
  //                   break;
  //           }

  //           return labelntensityType;
  //       }

  //       /// <summary>
  //       /// 計測震度種別の値に対応する色を返す
  //       /// </summary>
  //       /// <param name="intensityType">計測震度種別</param>
  //       /// <returns>計測震度種別の色</returns>
  //       public static Color GetIntensityTypeColor(IntensityConst.Type intensityType)
  //       {
  //           Color color = new Color();
  //           switch (intensityType)
  //           {
  //               case IntensityConst.Type.Intensity5Upper:
  //               case IntensityConst.Type.Intensity6Lower:
  //               case IntensityConst.Type.Intensity6Upper:
  //               case IntensityConst.Type.Intensity7:
  //                   color = Color.FromArgb(255, 255, 223, 228);
  //                   break;
  //           }

  //           return color;
  //       }

  //       /// <summary>
  //       /// 復旧状況に対応する色を返す
  //       /// </summary>
  //       /// <param name="status">復旧状況</param>
  //       /// <returns>復旧状況の色</returns>
  //       public static Color GetRestorationWorkStatusColor(int status)
  //       {
  //           Color color = new Color();

  //           switch (status)
  //           {
  //               case (int)ExtGasKojiInfoConst.restorationWorkStatus.RestorationDone:
  //                   color = SupColors.Khaki;
  //                   break;
  //               case (int)ExtGasKojiInfoConst.restorationWorkStatus.GasWorkCompleted:
  //                   color = SupColors.YellowGreen;
  //                   break;
  //               case (int)ExtGasKojiInfoConst.restorationWorkStatus.RestorationCompleted:
  //                   color = SupColors.PaleTurquoise;
  //                   break;
  //           }
  //           return color;
  //       }

  //       /// <summary>
  //       /// 通信要求キューの依頼状態から、遠隔遮断状況に置き換える
  //       /// </summary>
  //       /// <param name="reqStatus">依頼状態</param>
  //       /// <returns>遠隔遮断状況</returns>
  //       public static ShutoffState GetShutoffStatus(ReqStatus? reqStatus)
  //       {
  //           switch (reqStatus)
  //           {
  //               case ReqStatus.Empty:
  //               case null:
  //                   // 空き、null = 遮断なし
  //                   return ShutoffState.None;
  //               case ReqStatus.OnRequest:
  //                   // 要求あり = 未実施
  //                   return ShutoffState.NotOperate;
  //               case ReqStatus.OnConnect:
  //               case ReqStatus.Error:
  //                   // 要求中、異常終了 = 実施中
  //                   return ShutoffState.Operating;
  //               case ReqStatus.Normal:
  //                   // 正常終了 = 完了
  //                   return ShutoffState.Complete;
  //               case ReqStatus.ImpossibleToFuri:
  //               case ReqStatus.ImpossibleToRead:
  //               case ReqStatus.CancelActiveSrvSub:
  //                   // 読み出し不可、キャンセル（稼動サーバSUB）= 失敗
  //                   return ShutoffState.Failure;
  //               case ReqStatus.CompleteSiShutoff:
  //                   // 制御実施済 = 遮断済み
  //                   return ShutoffState.CompletedShutoff;
  //               case ReqStatus.TimeOver:
  //               case ReqStatus.RetryOver:
  //                   // 許容時間オーバー、リトライオーバー = 通信不能
  //                   return ShutoffState.ComUnable;
  //               case ReqStatus.CancelEqMode:
  //               case ReqStatus.CancelTerm:
  //                   // キャンセル(地震)、キャンセル(端末) = 中止
  //                   return ShutoffState.Cancel;
  //               case ReqStatus.ImpossibleToShutoff:
  //                   // 制御不可 = TC異常
  //                   return ShutoffState.AbnormalTc;
  //               default:
  //                   // 上記以外＝異常
  //                   return ShutoffState.Other;
  //           }
  //       }

  /// <summary>
  /// 遠隔遮断状況の値に対応する文字列を取得する
  /// </summary>
  /// <param name="status">遠隔遮断状況</param>
  /// <returns>遠隔遮断状況の文字列</returns>
  public GetShutoffStateName(status: ShutoffState): string {
    switch (status) {
      case ShutoffState.None:
        return ''
      case ShutoffState.NotOperate:
        return '未実施'
      case ShutoffState.Operating:
        return '実施中'
      case ShutoffState.Complete:
        return '完了'
      case ShutoffState.Remain:
        return '残有り'
      case ShutoffState.Failure:
        return '失敗'
      case ShutoffState.CompletedShutoff:
        return '遮断済み'
      case ShutoffState.ComUnable:
        return '通信不能'
      case ShutoffState.Cancel:
        return '中止'
      case ShutoffState.AbnormalTc:
        return 'TC異常'
      default:
        return '異常'
    }
  }

  //       /// <summary>
  //       /// 遠隔遮断状況の値に対応する色を返す
  //       /// </summary>
  //       /// <param name="status">遠隔遮断状況</param>
  //       /// <returns>遠隔遮断状況の色</returns>
  //       public static Color GetShutoffStateColor(ShutoffState status)
  //       {
  //           Color color = new Color();
  //           switch (status)
  //           {
  //               case ShutoffState.None:
  //                   color = Colors.White;
  //                   break;
  //               case ShutoffState.NotOperate:
  //                   color = Color.FromArgb(255, 215, 220, 0);
  //                   break;
  //               case ShutoffState.Operating:
  //                   color = Color.FromArgb(255, 52, 218, 0);
  //                   break;
  //               case ShutoffState.Complete:
  //               case ShutoffState.CompletedShutoff:
  //                   color = Color.FromArgb(255, 128, 255, 255);
  //                   break;
  //               case ShutoffState.Remain:
  //                   color = Color.FromArgb(255, 230, 157, 245);
  //                   break;
  //               case ShutoffState.Failure:
  //                   color = Color.FromArgb(255, 230, 157, 245);
  //                   break;
  //               case ShutoffState.ComUnable:
  //                   color = Colors.Orange;
  //                   break;
  //               case ShutoffState.Cancel:
  //                   color = Color.FromArgb(255, 255, 67, 67);
  //                   break;
  //               case ShutoffState.AbnormalTc:
  //                   color = Color.FromArgb(255, 255, 67, 67);
  //                   break;
  //               default:
  //                   color = Color.FromArgb(255, 255, 67, 67);
  //                   break;
  //           }

  //           return color;
  //       }

  //       /// <summary>
  //       /// 通信要求キューの依頼状態から、遠隔開状況に置き換える
  //       /// </summary>
  //       /// <param name="reqStatus">依頼状態</param>
  //       /// <returns>遠隔開状況</returns>
  //       public static OpenState GetOpenStatus(ReqStatus? reqStatus)
  //       {
  //           switch (reqStatus)
  //           {
  //               case ReqStatus.Empty:
  //               case null:
  //                   // 空き、null = 開なし
  //                   return OpenState.None;
  //               case ReqStatus.OnRequest:
  //                   // 要求あり = 未実施
  //                   return OpenState.NotOperate;
  //               case ReqStatus.OnConnect:
  //               case ReqStatus.Error:
  //                   // 要求中、異常終了 = 実施中
  //                   return OpenState.Operating;
  //               case ReqStatus.Normal:
  //                   // 正常終了 = 完了
  //                   return OpenState.Complete;
  //               case ReqStatus.OpenErrorSiHigher:
  //               case ReqStatus.OpenErrorLpLower:
  //               case ReqStatus.ImpossibleToFuri:
  //               case ReqStatus.ImpossibleToRead:
  //               case ReqStatus.CancelActiveSrvSub:
  //                   // SI値が高いため遠隔開失敗、LP圧が低いため遠隔開失敗、読み出し不可(無効 機能種別/回線種別)、
  //                   // 読み出し不可(無効TEL/IP)、キャンセル（稼動サーバSUB）= 失敗
  //                   return OpenState.Failure;
  //               case ReqStatus.CompleteSiShutoff:
  //                   // 制御実施済 = 開済み
  //                   return OpenState.CompletedOpen;
  //               case ReqStatus.TimeOver:
  //               case ReqStatus.RetryOver:
  //                   // 許容時間オーバー、リトライオーバー = 通信不能
  //                   return OpenState.ComUnable;
  //               case ReqStatus.CancelEqMode:
  //               case ReqStatus.CancelTerm:
  //                   // キャンセル(地震)、キャンセル(端末) = 中止
  //                   return OpenState.Cancel;
  //               case ReqStatus.ImpossibleToShutoff:
  //                   // 制御不可 = TC異常
  //                   return OpenState.AbnormalTc;
  //               default:
  //                   // 上記以外＝異常
  //                   return OpenState.Other;
  //           }
  //       }

  //       /// <summary>
  //       /// 遠隔開状況の値に対応する文字列を取得する
  //       /// </summary>
  //       /// <param name="status">遠隔遮断状況</param>
  //       /// <returns>遠隔開状況の文字列</returns>
  //       public static string GetOpenStateName(OpenState status)
  //       {
  //           switch (status)
  //           {
  //               case OpenState.None:
  //                   return "";
  //               case OpenState.NotOperate:
  //                   return "未実施";
  //               case OpenState.Operating:
  //                   return "実施中";
  //               case OpenState.Complete:
  //                   return "完了";
  //               case OpenState.Remain:
  //                   return "残有り";
  //               case OpenState.Failure:
  //                   return "失敗";
  //               case OpenState.CompletedOpen:
  //                   return "開済み";
  //               case OpenState.ComUnable:
  //                   return "通信不能";
  //               case OpenState.Cancel:
  //                   return "中止";
  //               case OpenState.AbnormalTc:
  //                   return "TC異常";
  //               default:
  //                   return "異常";
  //           }
  //       }

  //       /// <summary>
  //       /// 遠隔開状況の値に対応する色を返す
  //       /// </summary>
  //       /// <param name="status">遠隔開状況</param>
  //       /// <returns>遠隔開状況の色</returns>
  //       public static Color GetOpenStateColor(OpenState status)
  //       {
  //           Color color = new Color();
  //           switch (status)
  //           {
  //               case OpenState.None:
  //                   color = Colors.White;
  //                   break;
  //               case OpenState.NotOperate:
  //                   color = Color.FromArgb(255, 215, 220, 0);
  //                   break;
  //               case OpenState.Operating:
  //                   color = Color.FromArgb(255, 52, 218, 0);
  //                   break;
  //               case OpenState.Complete:
  //               case OpenState.CompletedOpen:
  //                   color = Color.FromArgb(255, 128, 255, 255);
  //                   break;
  //               case OpenState.Remain:
  //                   color = Color.FromArgb(255, 230, 157, 245);
  //                   break;
  //               case OpenState.Failure:
  //                   color = Color.FromArgb(255, 230, 157, 245);
  //                   break;
  //               case OpenState.ComUnable:
  //                   color = Colors.Orange;
  //                   break;
  //               case OpenState.Cancel:
  //                   color = Color.FromArgb(255, 255, 67, 67);
  //                   break;
  //               case OpenState.AbnormalTc:
  //                   color = Color.FromArgb(255, 255, 67, 67);
  //                   break;
  //               default:
  //                   color = Color.FromArgb(255, 255, 67, 67);
  //                   break;
  //           }

  //           return color;
  //       }

  //       /// <summary>
  //       /// 復旧手法判定結果の値に対応する色を返す
  //       /// </summary>
  //       /// <param name="JudgeResult">復旧手法判定結果</param>
  //       /// <returns>復旧手法判定結果の色</returns>
  //       public static Color GetRestorationJudgeResultColor(SblockLpRestorationJudgementConst.JudgeResult? JudgeResult)
  //       {
  //           Color color;
  //           switch (JudgeResult)
  //           {
  //               case SblockLpRestorationJudgementConst.JudgeResult.AJudge:
  //                   color = Colors.Orange;
  //                   break;
  //               case SblockLpRestorationJudgementConst.JudgeResult.BJudge:
  //                   color = Color.FromArgb(255, 128, 255, 128);
  //                   break;
  //               case SblockLpRestorationJudgementConst.JudgeResult.CJudge:
  //                   color = Colors.Green;
  //                   break;
  //               case SblockLpRestorationJudgementConst.JudgeResult.DJudge:
  //                   color = Color.FromArgb(255, 0, 255, 255);
  //                   break;
  //               case SblockLpRestorationJudgementConst.JudgeResult.Unknown:
  //                   color = Colors.Gray;
  //                   break;
  //               default:
  //                   color = Colors.LightGray;
  //                   break;
  //           }

  //           return color;
  //       }

  //       /// <summary>
  //       /// 復旧手法判定結果に対応する色を、指定の透明度に変換して返す
  //       /// </summary>
  //       /// <param name="JudgeResult">復旧手法判定結果</param>
  //       /// <param name="opacity">透明度</param>
  //       /// <returns>透明度を変換した色</returns>
  //       public static Color GetRestorationJudgeResultColor(SblockLpRestorationJudgementConst.JudgeResult? JudgeResult, double opacity)
  //       {
  //           Color color = GetRestorationJudgeResultColor(JudgeResult);
  //           color.A = byte.Parse(ToRoundDown(255 * opacity, 0).ToString());

  //           return color;
  //       }

  //       /// <summary>
  //       /// 架管巡回被災度ランクの値に対応する色を返す
  //       /// </summary>
  //       /// <param name="status">被災度ランク</param>
  //       /// <returns>被災度ランクの色</returns>
  //       public static Color GetGakanPatrolSufferRankColor(GakanDmgEstimationConst.SufferRank sufferRank)
  //       {
  //           Color color = new Color();
  //           switch (sufferRank)
  //           {
  //               case GakanDmgEstimationConst.SufferRank.A:
  //                   color = Color.FromArgb(255, 228, 0, 127);
  //                   break;
  //               case GakanDmgEstimationConst.SufferRank.B:
  //                   color = Color.FromArgb(255, 238, 150, 190);
  //                   break;
  //               case GakanDmgEstimationConst.SufferRank.C:
  //                   color = Color.FromArgb(255, 243, 223, 54);
  //                   break;
  //               case GakanDmgEstimationConst.SufferRank.D:
  //                   color = Color.FromArgb(255, 143, 195, 32);
  //                   break;
  //               case GakanDmgEstimationConst.SufferRank.E:
  //                   color = Color.FromArgb(255, 111, 199, 213);
  //                   break;
  //               default:
  //                   color = Colors.White;
  //                   break;
  //           }

  //           return color;
  //       }

  //       /// <summary>
  //       /// ガバナの●マークを作成する
  //       /// </summary>
  //       /// <param name="x">X位置</param>
  //       /// <param name="y">Y位置</param>
  //       /// <param name="markSize">マークサイズ</param>
  //       /// <param name="strokeThickness">ストロークアウトラインの幅</param>
  //       /// <returns>地区ガバナのマーク</returns>
  //       public static Ellipse MakeGovMark(double x, double y, double markSize, double strokeThickness)
  //       {
  //           Ellipse el = new Ellipse();
  //           el.SetValue(Canvas.LeftProperty, x - markSize / 2);
  //           el.SetValue(Canvas.TopProperty, y - markSize / 2);
  //           el.Width = el.Height = markSize;
  //           el.StrokeThickness = strokeThickness;

  //           return el;
  //       }

  //       /// <summary>
  //       /// 単独ガバナの★マークを作成する
  //       /// </summary>
  //       /// <param name="x">X位置</param>
  //       /// <param name="y">Y位置</param>
  //       /// <param name="markSize">マークサイズ</param>
  //       /// <returns>単独ガバナのマーク</returns>
  //       public static Polygon MakeLpUnconnectedGovMark(double x, double y, double markSize)
  //       {
  //           Polygon polygon = new Polygon();
  //           PointCollection pc = new PointCollection();
  //           pc.Add(new Point(x, y - 1.5 * markSize));
  //           pc.Add(new Point(x + 1.5 * markSize * 0.58779, y + 1.5 * markSize * 0.80902));
  //           pc.Add(new Point(x - 1.5 * markSize * 0.95106, y - 1.5 * markSize * 0.30902));
  //           pc.Add(new Point(x + 1.5 * markSize * 0.95106, y - 1.5 * markSize * 0.30902));
  //           pc.Add(new Point(x - 1.5 * markSize * 0.58779, y + 1.5 * markSize * 0.80902));
  //           polygon.Points = pc;
  //           polygon.FillRule = FillRule.Nonzero;

  //           return polygon;
  //       }

  //       /// <summary>
  //       /// パスを作成する
  //       /// </summary>
  //       /// <param name="pc">座標コレクション</param>
  //       /// <param name="strokeThickness">パスの太さ</param>
  //       /// <param name="brush">パスの色</param>
  //       /// <returns>パス</returns>
  //       public static System.Windows.Shapes.Path MakePath(PointCollection pc, double strokeThickness, SolidColorBrush brush)
  //       {
  //           System.Windows.Shapes.Path path = new System.Windows.Shapes.Path();
  //           GeometryGroup gg = new GeometryGroup();
  //           PathGeometry pg = new PathGeometry();
  //           PathFigure pf = new PathFigure();
  //           PolyLineSegment pls = new PolyLineSegment();
  //           path.Data = gg;
  //           path.StrokeThickness = strokeThickness;
  //           path.Stroke = brush;
  //           gg.Children.Add(pg);
  //           pg.Figures.Add(pf);
  //           pf.Segments.Add(pls);
  //           pf.StartPoint = pc[0];
  //           pls.Points = pc;

  //           return path;
  //       }

  //       /// <summary>
  //       /// ヘッダーコントロール作成
  //       /// 一覧画面用のヘッダーをpropertyListを元に作成する
  //       /// </summary>
  //       /// <param name="propertyList"></param>
  //       /// <param name="height"></param>
  //       /// <param name="textMouseLeftButtonDownEventHandler"></param>
  //       /// <returns></returns>
  //       public static List<FrameworkElement> GetGridHeader(string[] propertyList, int height, MouseButtonEventHandler textMouseLeftButtonDownEventHandler)
  //       {
  //           Grid g = new Grid();

  //           g.RowDefinitions.Add(new RowDefinition());
  //           g.RowDefinitions[0].Height = new GridLength(height);
  //           g.RowDefinitions.Add(new RowDefinition());
  //           g.RowDefinitions[1].Height = new GridLength(1, GridUnitType.Star);
  //           g.Margin = new Thickness(0, 0, 1, 0);

  //           Canvas c = new Canvas();
  //           c.HorizontalAlignment = HorizontalAlignment.Left;
  //           g.Children.Add(c);

  //           Canvas c4 = new Canvas();
  //           c4.VerticalAlignment = VerticalAlignment.Top;
  //           c4.Background = new SolidColorBrush(Colors.Transparent);

  //           ScrollViewer sv = new ScrollViewer();
  //           sv.BorderThickness = new Thickness(0);
  //           sv.Padding = new Thickness(0);
  //           sv.VerticalScrollBarVisibility = ScrollBarVisibility.Auto;
  //           sv.HorizontalAlignment = HorizontalAlignment.Left;
  //           sv.Margin = new Thickness(0, 0, 0, 1);
  //           sv.Content = c4;
  //           sv.Background = new SolidColorBrush(Colors.Transparent);
  //           sv.SetValue(Grid.RowProperty, 1);

  //           g.Children.Add(sv);

  //           ScrollViewer sv2 = new ScrollViewer();
  //           sv2.BorderThickness = new Thickness(0);
  //           sv2.Padding = new Thickness(0);
  //           sv2.Background = new SolidColorBrush(Colors.Transparent);
  //           sv2.VerticalScrollBarVisibility = ScrollBarVisibility.Disabled;
  //           sv2.HorizontalScrollBarVisibility = ScrollBarVisibility.Auto;

  //           sv2.Content = g;

  //           List<FrameworkElement> ret = new List<FrameworkElement>();
  //           ret.Add(sv2);
  //           ret.Add(c4);
  //           ret.Add(c);
  //           ret.Add(sv);

  //           Border b_HeaderText1 = new Border();
  //           bool isHeaderBorderFirst = true;
  //           bool isHeaderCommentBorderFirst = true;
  //           double left = 0.0;
  //           double commentBorderTop = 0.0;
  //           for (int i = 0; i < propertyList.Count(); i++)
  //           {
  //               bool isHeaderText = false;
  //               bool isHeaderTextOff = false;
  //               bool isHeaderCommentText = false;
  //               bool isHeaderCommentStraightText = false;
  //               bool isHeaderCommentBorderLast = false;
  //               string[] p = propertyList[i].Split(',');

  //               string[] hw = p[GlobalConst.HEADER_PROPERTYLIST_WIDTH].Split('#');
  //               Border b = new Border();
  //               b.Width = int.Parse(hw[0]);
  //               bool isBorderThicknessRight = false;
  //               if (i == propertyList.Count() - 1) isBorderThicknessRight = true;
  //               if (hw.Count() > 1)
  //               {
  //                   for (int k = 1; k < hw.Count(); k++)
  //                   {
  //                       if (hw[k].IndexOf("headerCommentText") != -1)
  //                           isHeaderCommentText = true;
  //                       else if (hw[k].IndexOf("headerCommentStraightText") != -1)
  //                       {
  //                           isHeaderCommentBorderFirst = true;
  //                           isHeaderCommentText = true;
  //                           // 上部コメント列が最終の場合は、右罫線を引く
  //                           if (hw[k].IndexOf("headerCommentStraightTextLast") != -1)
  //                           {
  //                               isHeaderCommentBorderLast = true;
  //                           }
  //                           // 上部コメント列の開始位置を指定
  //                           if (hw[k].IndexOf("headerCommentStraightTextMargin") != -1)
  //                           {
  //                               commentBorderTop += int.Parse(hw[k].Split('_')[1]);
  //                           }
  //                       }
  //                       else if (hw[k].IndexOf("headerTextOff") != -1)
  //                           isHeaderTextOff = true;
  //                       else if (hw[k].IndexOf("headerText") != -1)
  //                           isHeaderText = true;
  //                       else if (hw[k].IndexOf("rightThickness") != -1)
  //                           isBorderThicknessRight = true;
  //                       else if (hw[k].IndexOf("rightMargin") != -1)
  //                           left += int.Parse(hw[k].Split('_')[1]);
  //                       else
  //                           b.Width = int.Parse(hw[k]);
  //                   }
  //               }

  //               // 合計値列 or 上段コメント列の右隣の列の場合、空白Borderを上部に追加して、左側罫線を引く
  //               if (isHeaderTextOff || (isHeaderCommentBorderFirst && isHeaderText))
  //               {
  //                   Border b_HeaderTextOff = new Border();
  //                   b_HeaderTextOff.Width = int.Parse(hw[0]);
  //                   b_HeaderTextOff.Visibility = Visibility.Visible;
  //                   b_HeaderTextOff.BorderBrush = new SolidColorBrush(SupColors.ListBorderColor);
  //                   b_HeaderTextOff.BorderThickness = new Thickness(1, 0, 0, 0);
  //                   b_HeaderTextOff.SetValue(Canvas.TopProperty, (double)0);
  //                   b_HeaderTextOff.SetValue(Canvas.LeftProperty, left);
  //                   b_HeaderTextOff.Height = double.Parse(p[GlobalConst.HEADER_PROPERTYLIST_TOP]);
  //                   b_HeaderTextOff.SetValue(Canvas.ZIndexProperty, 1);
  //                   c.Children.Add(b_HeaderTextOff);
  //               }

  //               // 上部コメント列の場合、
  //               if (isHeaderCommentText || isHeaderCommentStraightText)
  //               {
  //                   // 最上部にBorderを追加して背景色を設定し、上部コメントヘッダー行を作成する
  //                   if (isHeaderCommentBorderFirst)
  //                   {
  //                       isHeaderCommentBorderFirst = false;
  //                       b_HeaderText1 = new Border();

  //                       b_HeaderText1.Width = int.Parse(hw[0]);
  //                       b_HeaderText1.Visibility = Visibility.Visible;
  //                       b_HeaderText1.BorderBrush = new SolidColorBrush(SupColors.ListBorderColor);

  //                       LinearGradientBrush lgb_sub = new LinearGradientBrush()
  //                       {
  //                           StartPoint = new Point(0, 0),
  //                           EndPoint = new Point(0, 1),
  //                       };
  //                       lgb_sub.GradientStops.Add(new GradientStop() { Color = Colors.White, Offset = 0 });

  //                       {
  //                           /// 背景色を設定(グラデーション)
  //                           GradientStop gs = new GradientStop();
  //                           gs.Color = SupColors.HeaderCanvasColor;
  //                           gs.Offset = 1;
  //                           lgb_sub.GradientStops.Add(gs);
  //                       }
  //                       b_HeaderText1.Background = lgb_sub;
  //                       b_HeaderText1.BorderThickness = new Thickness(isHeaderCommentBorderLast ? 0 : 1, 1, isHeaderCommentBorderLast ? 1 : 0, 0);
  //                       b_HeaderText1.SetValue(Canvas.TopProperty, commentBorderTop);
  //                       b_HeaderText1.SetValue(Canvas.LeftProperty, left);
  //                       b_HeaderText1.Height = double.Parse(p[GlobalConst.HEADER_PROPERTYLIST_TOP]) - commentBorderTop;
  //                       b_HeaderText1.SetValue(Canvas.ZIndexProperty, 1);

  //                       c.Children.Add(b_HeaderText1);

  //                       TextBlock t1 = new TextBlock();
  //                       t1.Name = String.Format(GlobalConst.HEADER_COMMENT_KEY_STRING, p[GlobalConst.HEADER_PROPERTYLIST_ITEM].Split('#')[GlobalConst.HEADER_PROPERTYLIST_ITEM_SORT_TAG]);
  //                       t1.Visibility = Visibility.Visible;
  //                       t1.VerticalAlignment = VerticalAlignment.Center;
  //                       t1.Margin = new Thickness(0, 0, 5, 0);
  //                       t1.HorizontalAlignment = HorizontalAlignment.Center;
  //                       t1.SetValue(Canvas.ZIndexProperty, 1);
  //                       t1.TextWrapping = TextWrapping.Wrap;

  //                       b_HeaderText1.Child = t1;
  //                   }
  //                   else b_HeaderText1.Width += int.Parse(hw[0]);
  //               }

  //               // 合計値列の場合、
  //               if (isHeaderText)
  //               {

  //                   // 最上部にBorderを追加して背景色を設定し、合計コメントヘッダー行を作成する
  //                   if (isHeaderBorderFirst)
  //                   {
  //                       isHeaderBorderFirst = false;
  //                       b_HeaderText1 = new Border();

  //                       b_HeaderText1.Width = int.Parse(hw[0]);
  //                       b_HeaderText1.Visibility = Visibility.Visible;
  //                       b_HeaderText1.BorderBrush = new SolidColorBrush(SupColors.ListBorderColor);

  //                       LinearGradientBrush lgb_sub = new LinearGradientBrush()
  //                       {
  //                           StartPoint = new Point(0, 0),
  //                           EndPoint = new Point(0, 1),
  //                       };
  //                       lgb_sub.GradientStops.Add(new GradientStop() { Color = Colors.White, Offset = 0 });

  //                       {
  //                           /// 背景色を設定(グラデーション)
  //                           GradientStop gs = new GradientStop();
  //                           gs.Color = SupColors.HeaderCanvasColor;
  //                           gs.Offset = 1;
  //                           lgb_sub.GradientStops.Add(gs);
  //                       }
  //                       b_HeaderText1.Background = lgb_sub;
  //                       b_HeaderText1.BorderThickness = new Thickness(1, 1, 0, 0);

  //                       b_HeaderText1.SetValue(Canvas.TopProperty, (double)0);
  //                       b_HeaderText1.SetValue(Canvas.LeftProperty, left);
  //                       b_HeaderText1.Height = GlobalConst.LINE_HEIGHT;
  //                       b_HeaderText1.SetValue(Canvas.ZIndexProperty, 1);

  //                       c.Children.Add(b_HeaderText1);

  //                       TextBlock t1 = new TextBlock();
  //                       t1.Visibility = Visibility.Visible;
  //                       t1.VerticalAlignment = VerticalAlignment.Center;
  //                       t1.Margin = new Thickness(10, 0, 5, 0);
  //                       t1.HorizontalAlignment = HorizontalAlignment.Left;
  //                       t1.SetValue(Canvas.ZIndexProperty, 1);
  //                       t1.Text = "合計";

  //                       b_HeaderText1.Child = t1;
  //                   }
  //                   else
  //                   {
  //                       // 「合計」表示行で終わる時の右側罫線
  //                       b_HeaderText1.Width += int.Parse(hw[0]);
  //                       b_HeaderText1.BorderThickness = new Thickness(1, 1, isBorderThicknessRight ? 1 : 0, 0);
  //                   }
  //                   // 合計欄を作成する
  //                   Border b_HeaderText2 = new Border();
  //                   b_HeaderText2.Width = int.Parse(hw[0]);
  //                   b_HeaderText2.Visibility = Visibility.Visible;
  //                   b_HeaderText2.BorderBrush = new SolidColorBrush(SupColors.ListBorderColor);
  //                   // 合計行とヘッダーテキストを併用する場合、表の最終列でないにも関わらずisBorderThicknessRightがTRUEになることがある為、ガードをかける
  //                   b_HeaderText2.BorderThickness = new Thickness(1, 1, (i == propertyList.Count() - 1) ? (isBorderThicknessRight ? 1 : 0) : 0, 0);

  //                   b_HeaderText2.SetValue(Canvas.TopProperty, (double)GlobalConst.LINE_HEIGHT);
  //                   b_HeaderText2.SetValue(Canvas.LeftProperty, left);
  //                   b_HeaderText2.Height = GlobalConst.LINE_HEIGHT;
  //                   b_HeaderText2.SetValue(Canvas.ZIndexProperty, 1);

  //                   c.Children.Add(b_HeaderText2);

  //                   TextBlock t = new TextBlock();
  //                   t.Visibility = Visibility.Visible;
  //                   t.VerticalAlignment = VerticalAlignment.Center;
  //                   t.Margin = new Thickness(0, 0, 5, 0);
  //                   t.HorizontalAlignment = HorizontalAlignment.Right;
  //                   t.SetValue(Canvas.ZIndexProperty, 1);

  //                   t.Name = String.Format(GlobalConst.TOTAL_COUNT_KEY_STRING, p[GlobalConst.HEADER_PROPERTYLIST_ITEM].Split('#')[GlobalConst.HEADER_PROPERTYLIST_ITEM_SORT_TAG]);
  //                   b_HeaderText2.Child = t;
  //               }

  //               b.BorderBrush = new SolidColorBrush(SupColors.ListBorderColor);
  //               b.BorderThickness = new Thickness(1, 1, isBorderThicknessRight ? 1 : 0, 1);
  //               b.Height = height - double.Parse(p[GlobalConst.HEADER_PROPERTYLIST_TOP]);
  //               b.SetValue(Canvas.TopProperty, double.Parse(p[GlobalConst.HEADER_PROPERTYLIST_TOP]));
  //               b.SetValue(Canvas.LeftProperty, left);
  //               left += int.Parse(hw[0]);
  //               LinearGradientBrush lgb = new LinearGradientBrush()
  //               {
  //                   StartPoint = new Point(0, 0),
  //                   EndPoint = new Point(0, 1),
  //               };
  //               lgb.GradientStops.Add(new GradientStop() { Color = Colors.White, Offset = 0 });
  //               b.Background = lgb;
  //               c.Children.Add(b);

  //               Canvas c2 = null;
  //               if (p.Count() - GlobalConst.HEADER_PROPERTYLIST_ITEM > 1) c2 = new Canvas();
  //               for (int j = GlobalConst.HEADER_PROPERTYLIST_ITEM; j < p.Count(); j++)
  //               {
  //                   if (p[j].Split('#')[GlobalConst.HEADER_PROPERTYLIST_ITEM_TYPE] == "noHeader")
  //                   {
  //                       // 背景色は設定しない
  //                       // 枠線を消す
  //                       b.BorderThickness = new Thickness(0);
  //                   }

  //                   if (p[j].Split('#')[GlobalConst.HEADER_PROPERTYLIST_ITEM_TYPE] == "headerText")
  //                   {
  //                       /// 背景色を設定
  //                       b.Background = new SolidColorBrush(Color.FromArgb(255, 238, 238, 238));
  //                   }

  //                   if (p[j].Split('#')[GlobalConst.HEADER_PROPERTYLIST_ITEM_TYPE] == "asSortText")
  //                   {
  //                       /// 背景色を設定(グラデーション)
  //                       GradientStop gs = new GradientStop();
  //                       gs.Color = SupColors.HeaderCanvasColor;
  //                       gs.Offset = 1;
  //                       lgb.GradientStops.Add(gs);
  //                   }

  //                   if (p[j].Split('#')[GlobalConst.HEADER_PROPERTYLIST_ITEM_TYPE] == "sortTextRedBorder")
  //                   {
  //                       /// 背景色を設定
  //                       b.Background = new SolidColorBrush(Color.FromArgb(255, 255, 69, 0)); // 背景色を赤
  //                   }

  //                   if ((p[j].Split('#')[GlobalConst.HEADER_PROPERTYLIST_ITEM_TYPE] == "sortText" || p[j].Split('#')[GlobalConst.HEADER_PROPERTYLIST_ITEM_TYPE] == "sortTextRedBorder")
  //                       && p[j].Split('#').Count() > GlobalConst.HEADER_PROPERTYLIST_ITEM_SORTMARK_LEFT)
  //                   {
  //                       /// 背景色を設定(グラデーション)
  //                       if (lgb.GradientStops.Count < 2)
  //                       {
  //                           GradientStop gs = new GradientStop();
  //                           gs.Color = SupColors.HeaderCanvasColor;
  //                           gs.Offset = 1;
  //                           gs.SetValue(System.Windows.FrameworkElement.NameProperty, String.Format(GlobalConst.SORT_BORDER_GRADIENT_KEY_STRING, p[j].Split('#')[GlobalConst.HEADER_PROPERTYLIST_ITEM_SORT_TAG]));
  //                           lgb.GradientStops.Add(gs);
  //                       }

  //                       /// ソートマーク用のキャンバス
  //                       Canvas c3 = new Canvas();
  //                       c3.Visibility = Visibility.Collapsed;
  //                       c3.Name = String.Format(GlobalConst.SORT_BORDER_CANVAS_KEY_STRING, p[j].Split('#')[GlobalConst.HEADER_PROPERTYLIST_ITEM_SORT_TAG]);
  //                       c3.Tag = p[j].Split('#')[GlobalConst.HEADER_PROPERTYLIST_ITEM_SORT_TAG];
  //                       c3.Cursor = Cursors.Hand;
  //                       c3.MouseLeftButtonDown += textMouseLeftButtonDownEventHandler;
  //                       c3.SetValue(Canvas.LeftProperty, double.Parse(p[j].Split('#')[GlobalConst.HEADER_PROPERTYLIST_ITEM_SORTMARK_LEFT]));
  //                       c3.SetValue(Canvas.TopProperty, double.Parse(p[j].Split('#')[GlobalConst.HEADER_PROPERTYLIST_ITEM_SORTMARK_TOP]));
  //                       c3.Children.Add(new System.Windows.Shapes.Rectangle()
  //                       {
  //                           Width = 12,
  //                           Height = 12,
  //                           StrokeThickness = 1,
  //                           Stroke = new SolidColorBrush(Colors.Black),
  //                           Fill = new SolidColorBrush(Colors.White)
  //                       });

  //                       /// 下向きのマーク
  //                       GeometryGroup gg = new GeometryGroup();
  //                       PathGeometry pg = new PathGeometry();
  //                       PathFigure pf = new PathFigure();
  //                       pf.StartPoint = new Point(2, 2);
  //                       PointCollection pc = new PointCollection();
  //                       pc.Add(new Point(10, 2));
  //                       pc.Add(new Point(6, 10));
  //                       pc.Add(new Point(2, 2));
  //                       pf.Segments.Add(new PolyLineSegment() { Points = pc });
  //                       pg.Figures.Add(pf);
  //                       gg.Children.Add(pg);
  //                       c3.Children.Add(new System.Windows.Shapes.Path()
  //                       {
  //                           Data = gg,
  //                           Fill = new SolidColorBrush(Colors.Black),
  //                           Name = String.Format(GlobalConst.SORT_DOWN_MARK_KEY_STRING, p[j].Split('#')[GlobalConst.HEADER_PROPERTYLIST_ITEM_SORT_TAG])
  //                       });

  //                       /// 上向きのマーク
  //                       GeometryGroup gg2 = new GeometryGroup();
  //                       PathGeometry pg2 = new PathGeometry();
  //                       PathFigure pf2 = new PathFigure();
  //                       pf2.StartPoint = new Point(6, 2);
  //                       PointCollection pc2 = new PointCollection();
  //                       pc2.Add(new Point(10, 10));
  //                       pc2.Add(new Point(2, 10));
  //                       pc2.Add(new Point(6, 2));
  //                       pf2.Segments.Add(new PolyLineSegment() { Points = pc2 });
  //                       pg2.Figures.Add(pf2);
  //                       gg2.Children.Add(pg2);
  //                       c3.Children.Add(new System.Windows.Shapes.Path()
  //                       {
  //                           Data = gg2,
  //                           Fill = new SolidColorBrush(Colors.Black),
  //                           Name = String.Format(GlobalConst.SORT_UP_MARK_KEY_STRING, p[j].Split('#')[GlobalConst.HEADER_PROPERTYLIST_ITEM_SORT_TAG])
  //                       });

  //                       if (c2 == null) c2 = new Canvas();
  //                       c2.Children.Add(c3);
  //                   }

  //                   FrameworkElement f = null;
  //                   if (p[j].Split('#')[GlobalConst.HEADER_PROPERTYLIST_ITEM_TYPE] == "checkBox")
  //                   {
  //                       f = new CheckBox();
  //                       f.Margin = new Thickness(double.Parse(p[j].Split('#')[GlobalConst.HEADER_PROPERTYLIST_ITEM_LEFT]), double.Parse(p[j].Split('#')[GlobalConst.HEADER_PROPERTYLIST_ITEM_TOP]), 0, 0);
  //                       f.Cursor = Cursors.Hand;
  //                       ret.Add(f);
  //                   }
  //                   else
  //                   {
  //                       f = new TextBlock();
  //                       (f as TextBlock).Text = p[j].Split('#')[GlobalConst.HEADER_PROPERTYLIST_ITEM_TEXT];
  //                       f.Margin = new Thickness(double.Parse(p[j].Split('#')[GlobalConst.HEADER_PROPERTYLIST_ITEM_LEFT]), double.Parse(p[j].Split('#')[GlobalConst.HEADER_PROPERTYLIST_ITEM_TOP]), 0, 0);
  //                       if (p[j].Split('#')[GlobalConst.HEADER_PROPERTYLIST_ITEM_TYPE] == "sortText" || p[j].Split('#')[GlobalConst.HEADER_PROPERTYLIST_ITEM_TYPE] == "sortTextRedBorder")
  //                       {
  //                           f.MouseLeftButtonDown += textMouseLeftButtonDownEventHandler;
  //                           (f as TextBlock).Foreground = new SolidColorBrush(Colors.Blue);
  //                           f.Cursor = Cursors.Hand;
  //                           (f as TextBlock).TextDecorations = TextDecorations.Underline;
  //                           f.Tag = p[j].Split('#')[GlobalConst.HEADER_PROPERTYLIST_ITEM_SORT_TAG];
  //                       }
  //                   }
  //                   if (c2 == null)
  //                       b.Child = f;
  //                   else
  //                       c2.Children.Add(f);
  //               }
  //               if (c2 != null) b.Child = c2;
  //           }

  //           c.Width = left + 16;
  //           sv.Width = c.Width;

  //           return ret;
  //       }

  //       /// <summary>
  //       /// キャンバス(データ行)作成
  //       /// </summary>
  //       /// <param name="data"></param>
  //       /// <param name="backgroundColor"></param>
  //       /// <param name="propertyList"></param>
  //       /// <param name="row"></param>
  //       /// <param name="canvasHeight"></param>
  //       /// <returns></returns>
  //       public static Canvas MakeCanvas(string data, List<SolidColorBrush> backgroundColor, List<string> propertyList, int row, int canvasHeight)
  //       {
  //           Canvas c = new Canvas();
  //           c.Height = canvasHeight;

  //           double left = 0;
  //           string[] item = data.Split('#');
  //           for (int i = 0; i < propertyList.Count(); i++)
  //           {
  //               string[] p = propertyList[i].Split(',');
  //               Border b = new Border();
  //               string[] hw = p[GlobalConst.PROPERTYLIST_WIDTH].Split('#');
  //               b.Width = int.Parse(hw[0]);
  //               bool isBorderThicknessRight = false;
  //               bool isNoBorder = false;
  //               if (hw.Count() > 1)
  //               {
  //                   for (int k = 1; k < hw.Count(); k++)
  //                   {
  //                       if (hw[k] == "rightThickness")
  //                           isBorderThicknessRight = true;
  //                       else if (hw[k].IndexOf("rightMargin") != -1)
  //                           left += int.Parse(hw[k].Split('_')[1]);
  //                   }
  //               }
  //               if (i == propertyList.Count() - 1) isBorderThicknessRight = true;

  //               b.Height = canvasHeight;

  //               // 枠線に関する設定
  //               if (p.Count() >= GlobalConst.PROPERTYLIST_BORDER + 1)
  //               {
  //                   if (p[GlobalConst.PROPERTYLIST_BORDER] == "noBorder")
  //                       isNoBorder = true;
  //               }

  //               if (isNoBorder)
  //               {
  //                   b.BorderThickness = new Thickness(0);
  //               }
  //               else
  //               {
  //                   b.BorderThickness = new Thickness(1, 0, (isBorderThicknessRight ? 1 : 0), 1);
  //                   b.BorderBrush = new SolidColorBrush(SupColors.ListBorderColor);
  //               }

  //               switch (p[GlobalConst.PROPERTYLIST_TYPE])
  //               {
  //                   case "markCanvas":
  //                       // データがないことを表す文字の場合はそのままテキスト表示
  //                       string str = item[int.Parse(p[GlobalConst.PROPERTYLIST_ITEM])].ToString();
  //                       if (str == GetNoData())
  //                       {
  //                           TextBlock txt = new TextBlock();
  //                           txt.VerticalAlignment = VerticalAlignment.Center;
  //                           txt.HorizontalAlignment = HorizontalAlignment.Center;
  //                           txt.Text = str;
  //                           b.Child = txt;
  //                           break;
  //                       }
  //                       Canvas mc = new Canvas();

  //                       foreach (var s in item[int.Parse(p[GlobalConst.PROPERTYLIST_ITEM])].Split('$'))
  //                       {
  //                           if (s == "True")
  //                           {
  //                               System.Windows.Shapes.Rectangle r = new System.Windows.Shapes.Rectangle();
  //                               r.Width = 8;
  //                               r.Height = 8;
  //                               r.SetValue(Canvas.TopProperty, 8.0);
  //                               r.SetValue(Canvas.LeftProperty, (mc.Children.Count + 1) * 14.0);
  //                               LinearGradientBrush lgb = new LinearGradientBrush();
  //                               lgb.StartPoint = new Point(0, 0);
  //                               lgb.EndPoint = new Point(1, 0);
  //                               lgb.GradientStops.Add(new GradientStop()
  //                               {
  //                                   Color = Colors.White,
  //                                   Offset = 1.0,
  //                               });
  //                               lgb.GradientStops.Add(new GradientStop()
  //                               {
  //                                   Color = Color.FromArgb(255, 200, 0, 0),
  //                                   Offset = 0.0,
  //                               });
  //                               r.Fill = lgb;
  //                               mc.Children.Add(r);
  //                           }
  //                       }
  //                       b.Child = mc;
  //                       break;
  //                   case "ellipse":
  //                       if (item[int.Parse(p[GlobalConst.PROPERTYLIST_ITEM])] == "True")
  //                       {
  //                           b.Child = new System.Windows.Shapes.Ellipse()
  //                           {
  //                               Width = 10,
  //                               Height = 10,
  //                               Fill = new SolidColorBrush(Colors.Black),
  //                               VerticalAlignment = VerticalAlignment.Center,
  //                               HorizontalAlignment = HorizontalAlignment.Center,
  //                           };
  //                       }
  //                       else
  //                       {
  //                           // IFの条件に当てはまらない場合、b.Childが作られず、
  //                           // onClickイベント等が拾えなくなるため、属性無しのTextBlockで代用。
  //                           b.Child = new TextBlock();
  //                       }
  //                       break;
  //                   case "check":
  //                       b.Child = new CheckBox()
  //                       {
  //                           VerticalAlignment = VerticalAlignment.Center,
  //                           HorizontalAlignment = HorizontalAlignment.Center,
  //                           IsChecked = item[int.Parse(p[GlobalConst.PROPERTYLIST_ITEM])] == "1" ? true : false,
  //                           Cursor = Cursors.Hand,
  //                       };
  //                       break;
  //                   case "textbox":
  //                       b.Child = new TextBox()
  //                       {
  //                           Margin = new Thickness(5, 5, 5, 5),
  //                           Text = item[int.Parse(p[GlobalConst.PROPERTYLIST_ITEM])]
  //                       };
  //                       if (backgroundColor[int.Parse(p[GlobalConst.PROPERTYLIST_ITEM])] != null)
  //                       {
  //                           b.Background = backgroundColor[int.Parse(p[GlobalConst.PROPERTYLIST_ITEM])];
  //                       }
  //                       break;
  //                   case "stackText":
  //                       StackPanel sp = new StackPanel();
  //                       sp.VerticalAlignment = VerticalAlignment.Center;
  //                       sp.HorizontalAlignment = HorizontalAlignment.Center;
  //                       sp.Orientation = Orientation.Horizontal;
  //                       foreach (var s in item[int.Parse(p[GlobalConst.PROPERTYLIST_ITEM])].Split('$'))
  //                       {
  //                           TextBlock st = new TextBlock();
  //                           st.Text = s;
  //                           if (sp.Children.Count == 0 && backgroundColor[int.Parse(p[GlobalConst.PROPERTYLIST_ITEM])] != null)
  //                               st.Foreground = backgroundColor[int.Parse(p[GlobalConst.PROPERTYLIST_ITEM])];
  //                           if (sp.Children.Count != 0) st.Margin = new Thickness(2, 0, 0, 0);
  //                           sp.Children.Add(st);
  //                       }
  //                       b.Child = sp;
  //                       break;
  //                   default:
  //                       TextBlock t = new TextBlock();
  //                       t.VerticalAlignment = VerticalAlignment.Center;
  //                       if (int.Parse(p[GlobalConst.PROPERTYLIST_ITEM]) >= 0)
  //                       {
  //                           if (p[GlobalConst.PROPERTYLIST_TYPE] == "toolTipText")
  //                           {
  //                               string[] tt = item[int.Parse(p[GlobalConst.PROPERTYLIST_ITEM])].Split('@');
  //                               t.Text = tt[0];
  //                               if (tt[1] != "")
  //                               {
  //                                   string[] tt1 = tt[1].Split('$');
  //                                   string viewStr = "";
  //                                   for (int j = 0; j < tt1.Count(); j++)
  //                                   {
  //                                       viewStr += ((viewStr != "") ? ((j % 20 == 0) ? ",\r\n" : ", ") : "") + tt1[j];
  //                                   }
  //                                   ToolTipService.SetToolTip(t, viewStr);
  //                               }
  //                           }
  //                           else
  //                           {
  //                               if (CommonUtil.IsNumeric(item[int.Parse(p[GlobalConst.PROPERTYLIST_ITEM])]) && p[GlobalConst.PROPERTYLIST_TYPE] == "commaText")
  //                                   t.Text = int.Parse(item[int.Parse(p[GlobalConst.PROPERTYLIST_ITEM])]).ToString("#,##0");
  //                               else
  //                                   t.Text = item[int.Parse(p[GlobalConst.PROPERTYLIST_ITEM])];
  //                           }

  //                           if (p[GlobalConst.PROPERTYLIST_TYPE] == "centerText")
  //                               t.HorizontalAlignment = HorizontalAlignment.Center;
  //                           else
  //                           {
  //                               if (CommonUtil.IsNumeric(item[int.Parse(p[GlobalConst.PROPERTYLIST_ITEM])]))
  //                               {
  //                                   t.Margin = new Thickness(0, 0, 5, 0);
  //                                   t.HorizontalAlignment = HorizontalAlignment.Right;
  //                               }
  //                               else
  //                                   t.Margin = new Thickness(5, 0, 0, 0);
  //                           }
  //                           if (backgroundColor[int.Parse(p[GlobalConst.PROPERTYLIST_ITEM])] != null)
  //                           {
  //                               if (p[GlobalConst.PROPERTYLIST_TYPE] == "colorText" || p[GlobalConst.PROPERTYLIST_TYPE] == "toolTipText")
  //                               {
  //                                   t.Foreground = backgroundColor[int.Parse(p[GlobalConst.PROPERTYLIST_ITEM])];
  //                               }
  //                               else
  //                               {
  //                                   b.Background = backgroundColor[int.Parse(p[GlobalConst.PROPERTYLIST_ITEM])];
  //                               }
  //                           }
  //                       }
  //                       if (p[GlobalConst.PROPERTYLIST_TYPE] == "linkText")
  //                       {
  //                           t.Foreground = new SolidColorBrush(Colors.Blue);
  //                           t.TextDecorations = TextDecorations.Underline;
  //                           t.Cursor = Cursors.Hand;
  //                           if (p.Count() >= GlobalConst.PROPERTYLIST_ALIGN + 1)
  //                               t = SetAlign(t, p[GlobalConst.PROPERTYLIST_ALIGN]);
  //                       }

  //                       t = SetAlign(t, p[GlobalConst.PROPERTYLIST_TYPE]);
  //                       b.Child = t;
  //                       break;
  //               }
  //               b.SetValue(Canvas.LeftProperty, left);
  //               left += b.Width;
  //               c.Children.Add(b);
  //           }

  //           c.Width = left;

  //           return c;
  //       }

  //       /// <summary>
  //       /// 共通メソッドで作ったヘッダの上に更にヘッダを置いて、Cellspanされているように見せる。
  //       /// </summary>
  //       /// <param name="top">上位置</param>
  //       /// <param name="left">左位置</param>
  //       /// <param name="width">幅</param>
  //       /// <param name="height">高さ</param>
  //       /// <param name="str">表示文字列</param>
  //       /// <param name="isRightBorder">右枠線を書くかどうか</param>
  //       /// <returns></returns>
  //       public static Border GetBorderHeaderOnHeader(double top, double left, double width, double height, string str, bool isRightBorder)
  //       {
  //           Border b = new Border();
  //           b.Width = width;
  //           b.Height = height;
  //           b.BorderBrush = new SolidColorBrush(SupColors.ListBorderColor);
  //           b.BorderThickness = new Thickness(1, 1, isRightBorder ? 1 : 0, 0);
  //           b.SetValue(Canvas.TopProperty, top);
  //           b.SetValue(Canvas.LeftProperty, left);
  //           Canvas c = new Canvas();
  //           c.Background = new SolidColorBrush(Color.FromArgb(255, 238, 238, 238));
  //           TextBlock t = new TextBlock();
  //           t.Text = str;
  //           t.Width = b.Width;
  //           t.Height = b.Height;
  //           t.SetValue(Canvas.TopProperty, 3.0);
  //           t.SetValue(Canvas.LeftProperty, width / 2 - str.Length * 7);
  //           c.Children.Add(t);
  //           b.Child = c;
  //           return b;
  //       }

  //       /// <summary>
  //       /// TextBlockの配置設定
  //       /// </summary>
  //       /// <param name="t"></param>
  //       /// <param name="alignStr"></param>
  //       /// <returns></returns>
  //       private static TextBlock SetAlign(TextBlock t, string alignStr)
  //       {
  //           if (alignStr == "centerText")
  //           {
  //               t.Margin = new Thickness(0, 0, 0, 0);
  //               t.HorizontalAlignment = HorizontalAlignment.Center;
  //           }
  //           else if (alignStr == "rightText" || alignStr == "toolTipText")
  //           {
  //               t.Margin = new Thickness(0, 0, 5, 0);
  //               t.HorizontalAlignment = HorizontalAlignment.Right;
  //           }
  //           else if (alignStr == "leftText")
  //           {
  //               t.Margin = new Thickness(5, 0, 0, 0);
  //               t.HorizontalAlignment = HorizontalAlignment.Left;
  //           }

  //           return t;
  //       }

  //       /// <summary>
  //       /// string配列のインスタンスを比較する
  //       /// </summary>
  //       /// <param name="x"></param>
  //       /// <param name="y"></param>
  //       /// <returns></returns>
  //       public static bool Equals(string[] x, string[] y)
  //       {
  //           if (x.Length != y.Length)
  //               return false;
  //           for (int i = 0; i < x.Length; i++)
  //               if (x[i] != y[i])
  //                   return false;
  //           return true;
  //       }

  //       /// <summary>
  //       /// int配列のインスタンスを比較する
  //       /// </summary>
  //       /// <param name="x"></param>
  //       /// <param name="y"></param>
  //       /// <returns></returns>
  //       public static bool Equals(int[] x, int[] y)
  //       {
  //           if (x.Length != y.Length)
  //               return false;
  //           for (int i = 0; i < x.Length; i++)
  //               if (x[i] != y[i])
  //                   return false;
  //           return true;
  //       }

  //       /// <summary>
  //       /// double配列のインスタンスを比較する
  //       /// </summary>
  //       /// <param name="x"></param>
  //       /// <param name="y"></param>
  //       /// <returns></returns>
  //       public static bool Equals(double[] x, double[] y)
  //       {
  //           if (x.Length != y.Length)
  //               return false;
  //           for (int i = 0; i < x.Length; i++)
  //               if (x[i] != y[i])
  //                   return false;
  //           return true;
  //       }

  //       /// <summary>
  //       /// マッピング座標からメッシュ番号を返す
  //       /// </summary>
  //       /// <param name="x">x座標(マッピング座標)</param>
  //       /// <param name="y">y座標(マッピング座標)</param>
  //       /// <returns>メッシュ番号</returns>
  //       public static int GetMeshNum(double x, double y)
  //       {
  //           // x,y座標それぞれがマイナス値の場合は、最小値を設定する
  //           if (x < 0) x = 0;
  //           if (y > 0) y = 0;

  //           int bigX = (int)(-y / GlobalConst.MAPPING_SCALE_FACTOR) / GlobalConst.BIG_MESH_HEIGHT;
  //           bigX += GlobalConst.MAP_ORG_BIG_MESH_X;
  //           double mX = (double)(-y / GlobalConst.MAPPING_SCALE_FACTOR) % GlobalConst.BIG_MESH_HEIGHT;
  //           int smallX = (int)(CommonUtil.ToRoundDown(mX, 0) / GlobalConst.MESH_SIZE);

  //           int bigY = (int)(x / GlobalConst.MAPPING_SCALE_FACTOR) / GlobalConst.BIG_MESH_WIDTH;
  //           bigY += GlobalConst.MAP_ORG_BIG_MESH_Y;
  //           double mY = (double)(x / GlobalConst.MAPPING_SCALE_FACTOR) % GlobalConst.BIG_MESH_WIDTH;
  //           int smallY = (int)(CommonUtil.ToRoundDown(mY, 0) / GlobalConst.MESH_SIZE);

  //           // x, yそれぞれが99over時は最大値99を設定する
  //           if (bigX > 99) bigX = 99;
  //           if (bigY > 99) bigY = 99;

  //           return bigX * 1000000 + bigY * 10000 + smallX * 100 + smallY;
  //       }

  //       /// <summary>
  //       /// 切り捨て対象文字と切り捨て対象外の文字列をつなげて返す。
  //       /// 返す文字列が限度文字数を超えていた場合、
  //       /// 切り捨て対象の文字列を限度文字数まで切り捨て、代わりに"..."を入れて返す。
  //       /// </summary>
  //       /// <param name="nameStr">切り捨て対象文字列</param>
  //       /// <param name="siStr">切り捨て対象外の文字列</param>
  //       /// <param name="maxLength">最大文字数</param>
  //       /// <returns></returns>
  //       public static string RoundDownStr(string roundDownStr, string remainStr, int limitLength)
  //       {
  //           int startIndex = limitLength - remainStr.Length;
  //           if (startIndex < roundDownStr.Length)
  //           {
  //               roundDownStr = roundDownStr.Remove(startIndex - 1) + "...";
  //           }
  //           return string.Format("{0}{1}", roundDownStr, remainStr);
  //       }

  //       /// <summary>
  //       /// 復旧状況
  //       /// 1: 復旧中、2:工事完了、3:復旧完了
  //       /// </summary>
  //       /// <param name="infos"></param>
  //       /// <returns></returns>
  //       public static int restorationWorkStatus(ShutoffBlock.TmpExtGaskojiKaisenInfosModel infos, bool isGsInfoExsist, bool isKaisenInfoExsist)
  //       {
  //           int result = (int)ExtGasKojiInfoConst.restorationWorkStatus.Ignore;

  //           // 開栓情報あり
  //           if (isKaisenInfoExsist)
  //           {
  //               if (infos.meterCnt != null)
  //               {
  //                   // メータ数(母数)が0件 : 復旧中
  //                   if (infos.meterCnt == 0)
  //                       return (int)ExtGasKojiInfoConst.restorationWorkStatus.RestorationDone;

  //                   // 開栓率100%：復旧完了
  //                   if (infos.openMeterCnt != null && infos.meterCnt == infos.openMeterCnt)
  //                       return (int)ExtGasKojiInfoConst.restorationWorkStatus.RestorationCompleted;

  //                   // 開栓率≠100% 且つ復旧工事情報なし : 復旧中
  //                   if (!isGsInfoExsist)
  //                       return (int)ExtGasKojiInfoConst.restorationWorkStatus.RestorationDone;
  //               }
  //           }

  //           // 復旧工事情報あり
  //           if (isGsInfoExsist)
  //           {
  //               // 工事完了時間とガスIN完了時間の両方が入った状態：工事完了
  //               if (infos.GasWorkEndedAt != null && infos.GasInEndedAt != null)
  //                   return (int)ExtGasKojiInfoConst.restorationWorkStatus.GasWorkCompleted;
  //               else
  //                   // 工事着手時間または、ガスIN開始時間が入った状態：復旧中
  //                   if (infos.GasWorkStartedAt != null || infos.GasInStartedAt != null)
  //                   return (int)ExtGasKojiInfoConst.restorationWorkStatus.RestorationDone;
  //           }
  //           return result;
  //       }

  //       /// <summary>
  //       /// ブロック区分優先順位 Model
  //       /// </summary>
  //       private class BlockCategorySortPriority
  //       {
  //           public int ID { get; set; }
  //           public string Name { get; set; }
  //       }

  //       /// <summary>
  //       /// ブロック区分のソート優先順位を返す
  //       /// </summary>
  //       /// <param name="blockCategory">ブロック区分</param>
  //       /// <returns>ソート優先順位</returns>
  //       public static int BlockCategoryId(string blockCategory)
  //       {
  //           var i = 0;
  //           foreach (KeyValuePair<string, string> kvp in GlobalConst.BLOCK_CATEGORY_DICT)
  //           {
  //               if (GlobalConst.BLOCK_CATEGORY_DICT[kvp.Key] == blockCategory) return i;
  //               i++;
  //           }

  //           return 99;
  //       }

  //       /// <summary>
  //       /// ブロック区分のソート優先順位順にソートしたリストを返す
  //       /// </summary>
  //       /// <param name="blockCategoryList">ブロック区分リスト</param>
  //       /// <returns>ソート後ブロック区分リスト</returns>
  //       public static List<string> BlockCategoryPriority(List<string> blockCategoryList)
  //       {
  //           List<BlockCategorySortPriority> blockCategorySortList = new List<BlockCategorySortPriority>();
  //           foreach (string blockCategory in blockCategoryList)
  //           {
  //               BlockCategorySortPriority blockCategorySort = new BlockCategorySortPriority();
  //               blockCategorySort.ID = BlockCategoryId(blockCategory);
  //               blockCategorySort.Name = blockCategory;
  //               blockCategorySortList.Add(blockCategorySort);
  //           }
  //           blockCategorySortList.Sort((a, b) => a.ID - b.ID); // 任意のソート順でラムダ式でソート

  //           List<String> BlockCategoryPriorityList = new List<string>();
  //           for (int i = 0; i < blockCategorySortList.Count(); i++)
  //               BlockCategoryPriorityList.Add(blockCategorySortList[i].Name);

  //           return BlockCategoryPriorityList;
  //       }

  //       /// <summary>
  //       /// 印刷区分を追記したコントロールファイルを返す
  //       /// </summary>
  //       /// <param name="clt">コントロールファイル</param>
  //       /// <returns>印刷区分を追記したコントロールファイル</returns>
  //       public static string GetPrintingDivision(string ctl, int printingDivision)
  //       {
  //           // コントロールファイル末尾に印刷区分を追記
  //           ctl += "printing_division," + printingDivision.ToString() + "\r\n";
  //           return ctl;
  //       }

  /// <summary>
  /// 首都中枢ブロックかどうか
  /// </summary>
  /// <param name="klBlock"></param>
  /// <returns>true: 首都中枢ブロック, false:首都中枢ブロックでない</returns>
  public IsCapitalOfCentralBlock(klBlock: string): boolean {
    if (GlobalConst.CAPITAL_OF_CENTRAL_BLOCKS_DICT.has(klBlock)) return true
    return false
  }

  /// <summary>
  /// 首都中枢ブロック区分表示用ラベル
  /// </summary>
  /// <param name="klBlock"></param>
  /// <returns>首都中枢ブロック区分表示用ラベル</returns>
  public LabelCapitalOfCentralBlock(): string {
    const value = GlobalConst.BLOCK_CATEGORY_DICT.get(
      GlobalConst.BlockCategory[GlobalConst.BlockCategory.CapitalOfCentral].toString()
    )
    if (value) return value
    return ''
  }

  //       /// <summary>
  //       /// 首都中枢ブロック地図表示用ラベル
  //       /// </summary>
  //       /// <param name="klBlock"></param>
  //       /// <returns>首都中枢ブロック地図表示用ラベル</returns>
  //       public static string LabelCapitalOfCentralBlockForMap(string klBlock)
  //       {
  //           var place = GlobalConst.CAPITAL_OF_CENTRAL_BLOCKS_DICT.ContainsKey(klBlock) ? GlobalConst.CAPITAL_OF_CENTRAL_BLOCKS_DICT[klBlock] : string.Empty;
  //           return GlobalConst.BLOCK_CATEGORY_DICT[GlobalConst.BlockCategory.CapitalOfCentral.ToString()] + ": " + place;
  //       }

  //       /// <summary>
  //       /// 2次圧閾値の取得
  //       /// </summary>
  //       /// <param name="csaNo"></param>
  //       /// <returns>2次圧閾値</returns>
  //       public static double GetLmpSupCsaLp(int csaNo)
  //       {
  //           // 指定したcsaNoのLmpSupCsaModelオブジェクトを取得
  //           LmpSupCsaModel lmpSupCsa = ModelManager.Get<LmpSupCsaModel>(csaNo);

  //           // 2次圧のデフォルト値を返す
  //           if (lmpSupCsa == null) return Supreme.LmpSupCsaModel.REMOTE_OPEN_MIN_LP;

  //           // 2次圧閾値を返す
  //           return (double)lmpSupCsa.LmpSecondaryPressureThreshold;
  //       }

  //       /// <summary>
  //       /// 支社の文字を除外したKブロック名(名称)を取得
  //       /// ※広域支社または、本店扱い広域支社を対象とする
  //       /// </summary>
  //       /// <param name="kBlock">Kブロックモデル</param>
  //       /// <returns>Sブロック番号</returns>
  //       public static string RemoveKBlockShisyaName(KDashBlockModel kBlock)
  //       {
  //           string kBlockName = kBlock.Name;
  //           if (
  //                   Enum.IsDefined(typeof(KblockConst.BranchKblockNo), kBlock.KBlockNo) ||
  //                   Enum.IsDefined(typeof(KblockConst.HontenBranchKblockNo), kBlock.KBlockNo)
  //               )
  //           {
  //               kBlockName = GetStringWithBranchNotationDeleted(kBlockName);
  //           }

  //           return kBlockName;
  //       }

  /// <summary>
  /// "支社"表記を削除したを文字列を取得
  /// </summary>
  /// <param name="target">対象文字列</param>
  /// <returns>"支社"表記を削除したを文字列</returns>
  public GetStringWithBranchNotationDeleted(target: string): string {
    return target.replace('支社', '')
  }

  /// <summary>
  /// 引数:拠点番号が過去地震時の拠点番号の場合、現行の拠点番号に変換
  /// 過去地震データが旧拠点番号でデータ保存されているため、そのままモデルにセットすると、
  /// 正常に動作しない可能性があるため、現行の拠点番号に変換して、モデルにセットする
  /// </summary>
  /// <param name="baseNo">拠点番号</param>
  /// <returns>変換後の拠点番号</returns>
  public ConvertBaseNoForPastEq(baseNo: number) {
    if (BaseConst.ConvertBaseNoListForPastEq.has(baseNo))
      return BaseConst.ConvertBaseNoListForPastEq.get(baseNo)

    return baseNo
  }
}
const commonUtil = new CommonUtil()
export default commonUtil
