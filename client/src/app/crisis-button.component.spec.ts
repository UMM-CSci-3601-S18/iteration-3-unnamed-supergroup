import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CrisisButtonComponent} from './crisis-button.component';
import {CustomModule} from './custom.module';
import {MatDialogRef} from '@angular/material';

describe('Crisis Button', () => {

    let crisisButtonComponent: CrisisButtonComponent;
    let calledClose: boolean;
    const mockMatDialogRef = {
        close() { calledClose = true; }
    };

    let fixture: ComponentFixture<CrisisButtonComponent>;

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [CustomModule],
            declarations: [CrisisButtonComponent]
        });
    });

    beforeEach(async(() => {
        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(CrisisButtonComponent);
            fixture.detectChanges();
        });
    }));

    it('should close properly', () => {
        crisisButtonComponent.onNoClick();
        expect(calledClose).toBe(true);
    });
});
