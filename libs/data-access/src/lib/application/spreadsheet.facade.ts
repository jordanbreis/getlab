import {
  SpreadsheetRow,
  ParseSpreadsheetDto,
  BuildSpreadsheetDto,
  ParseSpreadsheetUseCase,
  BuildSpreadsheetUseCase,
  DownloadSpreadsheetUseCase,
} from '@getlab/domain';
import { Store } from '../base/store';

interface SpreadsheetState {
  data: SpreadsheetRow[];
  loading: boolean;
  parsed: string;
}

export class SpreadsheetFacade extends Store<SpreadsheetState> {
  loading$ = this.select((state) => state.loading);
  parsed$ = this.select((state) => state.parsed);
  data$ = this.select((state) => state.data);

  constructor(
    private readonly parseUseCase: ParseSpreadsheetUseCase,
    private readonly buildUseCase: BuildSpreadsheetUseCase,
    private readonly downloadUseCase: DownloadSpreadsheetUseCase
  ) {
    super({
      data: [],
      parsed: '',
      loading: false,
    });
  }

  build(value: BuildSpreadsheetDto) {
    this.buildUseCase.execute(value).then((data) => {
      this.setState({ data });
    });
  }

  parse(value: ParseSpreadsheetDto) {
    this.parseUseCase.execute(value).then((parsed) => {
      this.setState({ parsed });
    });
  }

  download() {
    this.downloadUseCase.execute(this.state.data);
  }
}
