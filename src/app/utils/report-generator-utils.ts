import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export class ReportGeneratorUtils {
    static exportPDF(data: any[][], reportTitle: string, columnNames: string[], stablishmentName: string, user: string): void {
        const currentDate = new Date();
        const dateString = currentDate.getTime();
        const filename = `${reportTitle}_${dateString}.pdf`;
    
        const doc = new jsPDF({
            orientation: 'landscape',
            format: 'a4'
        });
    
        const establishmentName = stablishmentName === null || stablishmentName === undefined ? 'Supermarket' : stablishmentName;
        const header = function(data) {
            const fontSize = 10;
            doc.setFontSize(fontSize);
            doc.setTextColor(40);
            doc.setFont('helvetica', 'normal');
            const textWidth = doc.getStringUnitWidth(establishmentName) * fontSize / doc.internal.scaleFactor;
            const textHeight = fontSize;
            const marginLeft = (doc.internal.pageSize.width - textWidth) / 2;
            doc.text(establishmentName, marginLeft, textHeight);
        };
    
        const userName = user === null || user === undefined ? 'User' : user;
        const footer = function(data) {
            const formattedDate = currentDate.toLocaleString('pt-BR');
            const str = `Gerado por ${userName}, em ${formattedDate}`;
            const fontSize = 10;
            doc.setFontSize(fontSize);
            doc.text(str, data.settings.margin.left, doc.internal.pageSize.height - (fontSize / 2));
        };
    
        autoTable(doc, {
            head: [columnNames],
            body: data,
            didDrawPage: function(data) {
              header(data);
              footer(data);
            }
          });
    
        doc.save(filename);
      }
    
      static exportExcel(data: any[]): void {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, 'historical_purchases_report');
      }
    
      private static saveAsExcelFile(buffer: any, fileName: string): void {
        const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
        saveAs(data, `${fileName}_${new Date().getTime()}${EXCEL_EXTENSION}`);
      }
    }
    
    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const EXCEL_EXTENSION = '.xlsx';
    