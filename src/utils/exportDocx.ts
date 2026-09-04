import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';
import { ResumeData } from '../types';

export async function exportResumeToDocx(resume: ResumeData, filename: string = 'Resume.docx'): Promise<void> {
  const children: Paragraph[] = [];

  // 1. Header (Name, Title, Contact)
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: resume.personal.fullName || 'Untitled Name',
          bold: true,
          size: 32, // 16pt
          color: '1E1B4B'
        }),
      ]
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: resume.personal.jobTitle || '',
          bold: true,
          size: 24, // 12pt
          color: '4F46E5'
        }),
      ]
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: [
            resume.personal.email,
            resume.personal.phone,
            resume.personal.location,
            resume.personal.website,
            resume.personal.linkedin
          ].filter(Boolean).join('  |  '),
          size: 18,
          color: '64748B'
        })
      ]
    }),
    new Paragraph({ text: '' }) // Empty line
  );

  // 2. Summary
  if (resume.personal.summary) {
    children.push(
      new Paragraph({
        text: 'PROFESSIONAL SUMMARY',
        heading: HeadingLevel.HEADING_2,
      }),
      new Paragraph({
        children: [new TextRun({ text: resume.personal.summary, size: 20 })]
      }),
      new Paragraph({ text: '' })
    );
  }

  // 3. Work Experience
  if (resume.experiences.length > 0) {
    children.push(
      new Paragraph({
        text: 'WORK EXPERIENCE',
        heading: HeadingLevel.HEADING_2,
      })
    );

    resume.experiences.forEach(exp => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: exp.position, bold: true, size: 22 }),
            new TextRun({ text: ` — ${exp.company}`, bold: true, size: 22, color: '334155' }),
            new TextRun({ text: `  (${exp.startDate} - ${exp.current ? 'Present' : exp.endDate})`, italic: true, size: 18 })
          ]
        })
      );

      exp.bullets.forEach(bullet => {
        if (bullet.trim()) {
          children.push(
            new Paragraph({
              bullet: { level: 0 },
              children: [new TextRun({ text: bullet, size: 20 })]
            })
          );
        }
      });

      children.push(new Paragraph({ text: '' }));
    });
  }

  // 4. Skills
  if (resume.skills.length > 0) {
    children.push(
      new Paragraph({
        text: 'SKILLS & EXPERTISE',
        heading: HeadingLevel.HEADING_2,
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: resume.skills.map(s => s.name).join(' • '),
            size: 20
          })
        ]
      }),
      new Paragraph({ text: '' })
    );
  }

  // 5. Education
  if (resume.education.length > 0) {
    children.push(
      new Paragraph({
        text: 'EDUCATION',
        heading: HeadingLevel.HEADING_2,
      })
    );

    resume.education.forEach(edu => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: `${edu.degree} in ${edu.fieldOfStudy}`, bold: true, size: 22 }),
            new TextRun({ text: ` — ${edu.institution}`, size: 20 }),
            new TextRun({ text: ` (${edu.startDate} - ${edu.endDate})`, italic: true, size: 18 })
          ]
        })
      );
    });
    children.push(new Paragraph({ text: '' }));
  }

  // 6. Projects
  if (resume.projects.length > 0) {
    children.push(
      new Paragraph({
        text: 'KEY PROJECTS',
        heading: HeadingLevel.HEADING_2,
      })
    );

    resume.projects.forEach(proj => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: proj.title, bold: true, size: 22 }),
            new TextRun({ text: proj.link ? ` (${proj.link})` : '', italic: true, size: 18 })
          ]
        }),
        new Paragraph({
          children: [new TextRun({ text: proj.description, size: 20 })]
        })
      );

      proj.bullets.forEach(b => {
        if (b.trim()) {
          children.push(
            new Paragraph({
              bullet: { level: 0 },
              children: [new TextRun({ text: b, size: 20 })]
            })
          );
        }
      });
      children.push(new Paragraph({ text: '' }));
    });
  }

  // Create docx document instance
  const doc = new Document({
    sections: [
      {
        properties: {},
        children
      }
    ]
  });

  // Pack into blob and trigger download
  const blob = await Packer.toBlob(doc);
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
}
